import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Bot, 
  FolderLock, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  Sparkles, 
  FileCheck2, 
  Lock 
} from 'lucide-react';

export const HeroCarousel = ({ onNavigate, onOpenProfile }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      badge: 'National Citizen Welfare Gateway',
      title: 'Direct Benefit Schemes & Precision Eligibility Matching',
      description: 'Discover over 500+ Central and State welfare initiatives personalized to your income, housing type, state, and occupation. Instant eligibility percentage scores calculated in real-time.',
      ctaText: 'Explore Eligible Schemes',
      ctaAction: () => onNavigate('home'),
      secondaryText: 'Update Profile',
      secondaryAction: onOpenProfile,
      pillBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      icon: ShieldCheck,
      iconColor: 'text-[#064E3B]',
      stat1: '₹5 Lakh+',
      stat1Label: 'Ayushman Health Cover',
      stat2: '₹2.67 Lakh',
      stat2Label: 'PMAY Housing Subsidy',
      stat3: '₹20 Lakh',
      stat3Label: 'Mudra Collateral-Free Loans',
      visualElement: (
        <div className="relative w-full h-full min-h-[230px] rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 p-5 flex flex-col justify-between overflow-hidden shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-100/80 text-[#064E3B] border border-emerald-200 flex items-center">
              <Sparkles className="w-3.5 h-3.5 mr-1 text-emerald-700" />
              Dynamic Match Engine
            </span>
            <span className="text-xs text-slate-500 font-medium">DBT Live Integrated</span>
          </div>

          <div className="space-y-2.5 my-3">
            <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-xs">
                  PMAY
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">PM Awas Yojana (Urban 2.0)</div>
                  <div className="text-[10px] text-slate-500">Housing Assistance for Rental Families</div>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                96% Match
              </span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-green-100 text-green-700 flex items-center justify-center font-bold text-xs">
                  MNRE
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">PM Surya Ghar: Muft Bijli</div>
                  <div className="text-[10px] text-slate-500">Rooftop Solar Subsidy up to ₹78,000</div>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                92% Match
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
            <span>Sovereign Identity Verified</span>
            <span className="text-green-600 font-semibold">Direct Portal Routing</span>
          </div>
        </div>
      )
    },
    {
      id: 2,
      badge: 'Multilingual Copilot & Anti-Fraud Shield',
      title: 'AI Advisory, Spam Link Verification & Quality Inspector',
      description: 'Interact with the Indian Government Sovereign AI Copilot in your native mother tongue (Tamil, English, and regional languages). Check suspicious scheme links to protect against cyber scams and verify document clarity before upload.',
      ctaText: 'Open VYNORA Copilot',
      ctaAction: () => onNavigate('copilot'),
      secondaryText: 'Verify Suspicious Link',
      secondaryAction: () => onNavigate('copilot'),
      pillBg: 'bg-green-50 text-green-800 border-green-200',
      icon: Bot,
      iconColor: 'text-green-600',
      stat1: '11+',
      stat1Label: 'Indian Languages Supported',
      stat2: '100%',
      stat2Label: 'Fake Link Detection (.gov.in)',
      stat3: 'Instant',
      stat3Label: 'Document Clarity Audit',
      visualElement: (
        <div className="relative w-full h-full min-h-[230px] rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 p-5 flex flex-col justify-between overflow-hidden shadow-sm">
          
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-green-100/80 text-green-800 border border-green-200 flex items-center">
              <Bot className="w-3.5 h-3.5 mr-1 text-green-600" />
              Multilingual Copilot Intelligence
            </span>
            <span className="text-xs text-emerald-700 font-semibold">1930 Cyber Shield</span>
          </div>

          <div className="space-y-2.5 my-3 text-xs">
            <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 shadow-xs">
              <span className="text-green-600 font-bold">User (தமிழ்):</span> பிஎம் கிசான் விண்ணப்பிக்க என்ன ஆவணங்கள் தேவை?
            </div>
            <div className="p-2.5 rounded-xl bg-green-50/80 border border-green-200/80 text-slate-800 space-y-1 shadow-xs">
              <div className="font-bold text-green-700 flex items-center">
                <Bot className="w-3.5 h-3.5 mr-1 text-green-600" /> Copilot:
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                1. ஆதார் அட்டை (Aadhaar Card with e-KYC), 2. நில உடைமை ஆவணம் (Patta/Chitta), 3. NPCI வங்கி கணக்கு.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
            <span className="text-orange-600 font-medium flex items-center">
              <Lock className="w-3 h-3 mr-1" /> Anti-Phishing Guard
            </span>
            <span className="text-slate-500">Zero Hallucination Grounding</span>
          </div>
        </div>
      )
    },
    {
      id: 3,
      badge: 'DigiLocker & Document Optimizer',
      title: 'Digital Sovereign Locker & 100 KB Portal Compressor',
      description: 'Store your Aadhaar, PAN, certificates, and marksheet PDFs securely. Automatically compress images and documents to exactly 100 KB (or custom target) to satisfy strict UPSC, SSC, and state recruitment portal upload limits.',
      ctaText: 'Access DigiLocker Vault',
      ctaAction: () => onNavigate('digilocker'),
      secondaryText: 'Student Internships',
      secondaryAction: () => onNavigate('internships'),
      pillBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      icon: FolderLock,
      iconColor: 'text-[#064E3B]',
      stat1: '100 KB',
      stat1Label: 'Default Portal Standard',
      stat2: 'PDF & Img',
      stat2Label: 'Complete Multi-Format',
      stat3: '1-Click',
      stat3Label: 'Complete ZIP Archive Export',
      visualElement: (
        <div className="relative w-full h-full min-h-[230px] rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 p-5 flex flex-col justify-between overflow-hidden shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-100/80 text-[#064E3B] border border-emerald-200 flex items-center">
              <FolderLock className="w-3.5 h-3.5 mr-1" />
              Sovereign Document Vault
            </span>
            <span className="text-xs text-orange-600 font-bold">100KB Ready</span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs my-2 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <FileCheck2 className="w-4 h-4 text-emerald-600" />
                <span className="font-bold text-slate-800">Aadhaar_Card_Verified.jpg</span>
              </div>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold border border-emerald-200">Verified</span>
            </div>
            
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
              <span>Original: <strong className="text-slate-700">2.4 MB</strong></span>
              <span>Compressed: <strong className="text-green-600 font-bold">96.8 KB (UPSC Portal)</strong></span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
            <span>Lossless Text Clarity</span>
            <span className="text-emerald-700 font-semibold">Instant ZIP Download</span>
          </div>
        </div>
      )
    }
  ];

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, slides.length]);

  const slide = slides[currentSlide];
  const IconComponent = slide.icon;

  return (
    <section 
      className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="relative rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 shadow-sm transition-all duration-300 overflow-hidden">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Headline, Description & Actions */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Top Pill */}
            <div className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl border text-xs font-semibold ${slide.pillBg}`}>
              <IconComponent className={`w-4 h-4 ${slide.iconColor}`} />
              <span>{slide.badge}</span>
              <span className="text-slate-400">•</span>
              <span className="font-bold text-[11px]">Feature 0{slide.id}/03</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight font-sans">
              {slide.title}
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              {slide.description}
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/80">
                <div className="text-base sm:text-lg font-bold text-slate-900 font-sans">{slide.stat1}</div>
                <div className="text-[11px] text-slate-500 leading-tight mt-0.5 font-medium">{slide.stat1Label}</div>
              </div>
              <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/80">
                <div className="text-base sm:text-lg font-bold text-orange-600 font-sans">{slide.stat2}</div>
                <div className="text-[11px] text-slate-500 leading-tight mt-0.5 font-medium">{slide.stat2Label}</div>
              </div>
              <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/80">
                <div className="text-base sm:text-lg font-bold text-[#064E3B] font-sans">{slide.stat3}</div>
                <div className="text-[11px] text-slate-500 leading-tight mt-0.5 font-medium">{slide.stat3Label}</div>
              </div>
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={slide.ctaAction}
                className="px-5 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-xs sm:text-sm flex items-center space-x-2 shadow-sm shadow-green-200 transition-all cursor-pointer"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={slide.secondaryAction}
                className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-700 font-semibold text-xs sm:text-sm transition-all cursor-pointer"
              >
                {slide.secondaryText}
              </button>
            </div>

          </div>

          {/* Right Column: Visual Interactive Feature Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md">
              {slide.visualElement}
            </div>
          </div>

        </div>

        {/* Carousel Navigation Arrows & Indicators */}
        <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-100">
          
          {/* Dots Indicator */}
          <div className="flex items-center space-x-2">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentSlide === idx
                    ? 'w-8 bg-green-600'
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Prev / Next Arrows */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer border border-slate-200/80"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer border border-slate-200/80"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
