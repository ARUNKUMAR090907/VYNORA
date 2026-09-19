import React, { useState, useMemo } from 'react';
import { 
  GraduationCap, 
  Calendar, 
  Clock, 
  Bell, 
  BellRing, 
  ExternalLink, 
  Search, 
  Filter, 
  Building2, 
  X, 
  Check 
} from 'lucide-react';
import { INTERNSHIPS_DATABASE } from '../data/internshipsData';

export const InternshipsPage = ({
  userProfile,
  reminders,
  onToggleReminder,
  onOpenProfile
}) => {
  const [selectedStream, setSelectedStream] = useState('All Streams');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalInternship, setActiveModalInternship] = useState(null);
  const [reminderDate, setReminderDate] = useState('2026-09-05');
  const [reminderNotes, setReminderNotes] = useState('Prepare college Dean bonafide letter and SOP.');

  const streams = [
    'All Streams',
    'Engineering',
    'Medical',
    'Arts',
    'Law',
    'Commerce',
    'Sciences'
  ];

  // If user has a selected stream in profile, preselect or highlight
  const userStream = userProfile?.educationStream;

  // Filter internships
  const filteredInternships = useMemo(() => {
    return INTERNSHIPS_DATABASE.filter((item) => {
      const matchesStream = 
        selectedStream === 'All Streams' || 
        item.stream === selectedStream || 
        item.stream === 'All Streams';
      
      const matchesSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.ministry.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesStream && matchesSearch;
    });
  }, [selectedStream, searchQuery]);

  const handleOpenReminderModal = (internship) => {
    setActiveModalInternship(internship);
    // default reminder date 3 days before end date
    const end = new Date(internship.endDate);
    end.setDate(end.getDate() - 3);
    setReminderDate(end.toISOString().split('T')[0]);
    setReminderNotes(`Submit application for ${internship.organization} before deadline.`);
  };

  const handleSaveReminder = () => {
    if (!activeModalInternship) return;
    const existing = reminders.find(r => r.internshipId === activeModalInternship.id);

    const reminderObj = {
      internshipId: activeModalInternship.id,
      internshipTitle: activeModalInternship.title,
      reminderDate,
      notifyEmail: true,
      notes: reminderNotes,
      active: existing ? !existing.active : true,
    };

    onToggleReminder(reminderObj);
    setActiveModalInternship(null);
  };

  const isReminderActive = (id) => {
    return reminders.some(r => r.internshipId === id && r.active);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 mb-1.5">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200 flex items-center">
              <GraduationCap className="w-3.5 h-3.5 mr-1.5 text-green-600" />
              National Student Career Gateway
            </span>
            <span className="text-xs text-slate-500 font-medium">PSU & Central Ministries</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-sans">
            Government of India College Internships
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl">
            Official internship opportunities across NITI Aayog, DRDO, ISRO, Digital India, MEA, RBI, ICMR, and Ministry of Law. Set reminders to never miss an application deadline.
          </p>
        </div>

        {/* Active Reminders Quick Counter */}
        <div className="flex items-center space-x-3 bg-white border border-slate-200 p-2.5 rounded-xl text-xs shadow-xs">
          <div className="flex items-center space-x-1.5 text-green-700 font-bold">
            <BellRing className="w-4 h-4 text-green-600" />
            <span>{reminders.filter(r => r.active).length} Active Reminders Set</span>
          </div>
        </div>
      </div>

      {/* Stream Tabs & Search Controls */}
      <div className="space-y-4">
        
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search Box */}
          <div className="sm:col-span-8 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by ministry, title, stipend (e.g. NITI Aayog, DRDO, RBI, AI, Legal)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 shadow-xs"
            />
          </div>

          {/* User Stream Quick Filter */}
          {userStream && (
            <div className="sm:col-span-4 flex items-center justify-end">
              <button
                onClick={() => setSelectedStream(userStream.charAt(0).toUpperCase() + userStream.slice(1))}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs text-green-700 font-semibold flex items-center space-x-1.5 transition-colors shadow-xs cursor-pointer"
              >
                <span>My Stream: {userStream.toUpperCase()}</span>
              </button>
            </div>
          )}
        </div>

        {/* Academic Stream Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-thin">
          <Filter className="w-3.5 h-3.5 text-slate-400 mr-1 flex-shrink-0" />
          {streams.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStream(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedStream === st
                  ? 'bg-green-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 border border-slate-200 shadow-xs'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

      </div>

      {/* Internships Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredInternships.map((internship) => {
          const hasReminder = isReminderActive(internship.id);

          return (
            <div
              key={internship.id}
              className="rounded-2xl bg-white border border-slate-200 hover:border-green-300 hover:shadow-md p-6 shadow-xs flex flex-col justify-between transition-all"
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-green-50 text-green-700 border border-green-200">
                    Stream: {internship.stream}
                  </span>

                  {/* Reminder Button */}
                  <button
                    onClick={() => handleOpenReminderModal(internship)}
                    className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      hasReminder
                        ? 'bg-green-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                    }`}
                  >
                    <Bell className={`w-3.5 h-3.5 ${hasReminder ? 'fill-current' : ''}`} />
                    <span>{hasReminder ? 'Reminder Set ✓' : 'Set Reminder'}</span>
                  </button>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight font-sans mb-1">
                  {internship.title}
                </h3>

                {/* Organization & Ministry */}
                <div className="flex items-center space-x-1.5 text-xs text-slate-500 mb-3">
                  <Building2 className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span>{internship.organization} • {internship.ministry}</span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {internship.description}
                </p>

                {/* Stipend & Duration Pill */}
                <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 mb-4 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Stipend / Grant</span>
                    <span className="font-bold text-emerald-700">{internship.stipend}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Duration & Location</span>
                    <span className="text-slate-700 font-medium">{internship.duration} ({internship.location})</span>
                  </div>
                </div>

                {/* Eligibility Criteria */}
                <div className="text-xs text-slate-700 mb-4 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <strong className="text-slate-800 block text-[10px] uppercase font-bold mb-0.5">Eligibility:</strong>
                  <span>{internship.eligibility}</span>
                </div>

                {/* Application Dates */}
                <div className="flex items-center justify-between text-xs py-2 border-t border-slate-100 mb-4">
                  <div className="flex items-center space-x-1.5 text-slate-500">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Opens: <strong className="text-slate-700">{internship.openDate}</strong></span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-rose-700 font-medium">
                    <Clock className="w-3.5 h-3.5 text-rose-600" />
                    <span>Last Date: <strong className="text-rose-700 font-bold">{internship.endDate}</strong></span>
                  </div>
                </div>
              </div>

              {/* Apply Direct Link */}
              <a
                href={internship.applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-2 shadow-xs transition-all cursor-pointer"
              >
                <span>Official Ministry Application Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

            </div>
          );
        })}
      </div>

      {/* Set Reminder Modal */}
      {activeModalInternship && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-xl p-6 text-slate-800 space-y-4">
            
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                <BellRing className="w-5 h-5 text-green-600" />
                <h3 className="text-base font-bold text-slate-900 font-sans">Set Deadline Reminder</h3>
              </div>
              <button
                onClick={() => setActiveModalInternship(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Set an alert for <strong className="text-slate-900">{activeModalInternship.title}</strong> before the application closing deadline ({activeModalInternship.endDate}).
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Alert Date
                </label>
                <input
                  type="date"
                  value={reminderDate}
                  onChange={(e) => setReminderDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Reminder Notes & Checklist
                </label>
                <textarea
                  rows={3}
                  value={reminderNotes}
                  onChange={(e) => setReminderNotes(e.target.value)}
                  placeholder="e.g. Upload Bonafide certificate and 100KB marksheet..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setActiveModalInternship(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveReminder}
                className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-bold flex items-center space-x-1.5 shadow-xs cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Save Reminder</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
