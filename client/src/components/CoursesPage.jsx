import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Building2, 
  MapPin, 
  Award, 
  ExternalLink, 
  Search, 
  Filter 
} from 'lucide-react';
import { COURSES_DATABASE } from '../data/coursesData';
import { INDIAN_STATES_AND_UTS } from '../data/indianStates';

export const CoursesPage = ({ userProfile, onOpenProfile }) => {
  const [selectedOrg, setSelectedOrg] = useState('All');
  const [selectedState, setSelectedState] = useState(userProfile?.state || 'All India');
  const [selectedSector, setSelectedSector] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const orgTypes = ['All', 'PMKVY', 'EDII', 'JSS', 'SWAYAM', 'NIELIT'];

  const sectors = [
    'All',
    'IT & Digital Technology',
    'Business, Startups & MSME',
    'Green Energy & Solar Power',
    'Aerospace, Agriculture & GIS',
    'Computer Science & Engineering',
    'Agri-Tech & Food Processing',
    'Handicrafts, Textiles & Retail',
    'Cybersecurity & Ethical Hacking'
  ];

  // Filter courses
  const filteredCourses = useMemo(() => {
    return COURSES_DATABASE.filter((course) => {
      const matchesOrg = selectedOrg === 'All' || course.organizationType === selectedOrg;
      
      const matchesState = 
        selectedState === 'All India' || 
        course.regionalAvailability.includes('All India') || 
        course.regionalAvailability.includes(selectedState);

      const matchesSector = selectedSector === 'All' || course.sector === selectedSector;

      const matchesSearch = 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.partnerOrganization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.sector.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesOrg && matchesState && matchesSector && matchesSearch;
    });
  }, [selectedOrg, selectedState, selectedSector, searchQuery]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 mb-1.5">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center">
              <BookOpen className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
              National Skill Development Mission (MSDE)
            </span>
            <span className="text-xs text-slate-500 font-medium">EDII • PMKVY • JSS • SWAYAM</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-sans">
            Government Skilling & Professional Certification Courses
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl">
            Government-backed vocational and technical skilling programs in collaboration with NSDC, IITs, EDII, and Jan Shikshan Sansthan. Free and subsidized certificates recognized nationwide.
          </p>
        </div>

        {/* Regional Filter Pill */}
        <div className="flex items-center space-x-2 bg-white border border-slate-200 p-2.5 rounded-xl text-xs shadow-xs">
          <MapPin className="w-4 h-4 text-green-600" />
          <span className="text-slate-500 font-medium">Regional Filter:</span>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="bg-slate-50 text-slate-800 font-semibold rounded-lg px-2.5 py-1 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 cursor-pointer"
          >
            <option value="All India">All India Centers</option>
            {INDIAN_STATES_AND_UTS.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Controls Bar: Organization Filter, Sector Filter & Search */}
      <div className="space-y-4">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-8 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search courses (e.g. AI, Solar PV Installer, Drone Pilot, Entrepreneurship, Cyber)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 shadow-xs"
            />
          </div>

          <div className="md:col-span-4 flex items-center space-x-2">
            <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 shadow-xs cursor-pointer"
            >
              {sectors.map((sec) => (
                <option key={sec} value={sec}>
                  {sec === 'All' ? 'All Sectors & Industries' : sec}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Organization Badges */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-thin">
          <span className="text-xs font-semibold text-slate-500 mr-1 flex-shrink-0">Initiative:</span>
          {orgTypes.map((org) => (
            <button
              key={org}
              onClick={() => setSelectedOrg(org)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedOrg === org
                  ? 'bg-green-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 border border-slate-200 shadow-xs'
              }`}
            >
              {org === 'All' ? 'All Initiatives (EDII / PMKVY / JSS)' : org}
            </button>
          ))}
        </div>

      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="rounded-2xl bg-white border border-slate-200 hover:border-green-300 hover:shadow-md p-6 shadow-xs flex flex-col justify-between transition-all"
          >
            <div>
              {/* Header Badges */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-green-50 text-green-700 border border-green-200">
                  {course.organizationType} Initiative
                </span>

                <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {course.cost}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight font-sans mb-1">
                {course.title}
              </h3>

              {/* Partner */}
              <div className="flex items-center space-x-1.5 text-xs text-slate-500 mb-3">
                <Building2 className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span>{course.partnerOrganization}</span>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {course.description}
              </p>

              {/* Meta Grid */}
              <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 mb-4 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Duration & Mode</span>
                  <span className="font-semibold text-slate-800">{course.duration} ({course.mode})</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Eligibility</span>
                  <span className="text-slate-700 font-medium truncate block">{course.eligibility}</span>
                </div>
              </div>

              {/* Certification Badge */}
              <div className="p-3 bg-emerald-50/80 rounded-xl border border-emerald-200 text-xs text-emerald-900 mb-4 flex items-start space-x-2.5">
                <Award className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[11px] text-emerald-800 uppercase font-bold">Recognized Certification:</strong>
                  <span className="text-slate-700">{course.certificationType}</span>
                </div>
              </div>

              {/* Regional Coverage */}
              <div className="text-[11px] text-slate-500 mb-4 flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>Available Centers: <strong className="text-slate-700">{course.regionalAvailability.join(', ')}</strong></span>
              </div>
            </div>

            {/* Enroll Link */}
            <a
              href={course.courseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-2 shadow-xs transition-all cursor-pointer"
            >
              <span>Enroll / View Center Details</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

          </div>
        ))}
      </div>

    </section>
  );
};
