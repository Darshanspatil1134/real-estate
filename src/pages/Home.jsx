import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Search, ChevronRight, Play, CheckCircle, Globe, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { allProperties } from '../data/properties';

// Assets
import video1 from '../assets/WhatsApp Video 2026-03-15 at 8.21.36 AM.mp4';
import property2 from '../assets/property2.png';

const Home = () => {
  const [activeTab, setActiveTab] = useState('buy');
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const featuredProperties = allProperties.filter(p => p.city === 'Nashik').slice(0, 3);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?location=${searchQuery}&type=${activeTab}`);
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-[#080a0f] rounded-[0_0_4rem_4rem]">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover scale-105 opacity-50">
          <source src={video1} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent"></div>
        
        <div className="max-w-screen-2xl mx-auto px-6 w-full relative z-10 grid lg:grid-cols-2 gap-20 items-center py-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-1.5 bg-accent rounded-full"></span>
              <span className="text-secondary text-[11px] font-black tracking-[0.4em] uppercase">Premium Real Estate Partner</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[0.85] text-white">
              Find Your <br /> Perfect <br /> <span className="text-grad-primary italic font-heading font-normal">Sanctuary.</span>
            </h1>
            <p className="text-xl text-white/60 max-w-lg mb-12 leading-relaxed font-medium">
              Curating 120+ exclusive listings across Maharashtra, specializing in <span className="text-accent border-b-2 border-accent/20 pb-1">Nashik's</span> finest addresses.
            </p>
            
            <div className="flex flex-wrap gap-12 mt-16 font-bold">
              {[ { l: '120+', s: 'Postings' }, { l: ' Nashik', s: 'Top Location' }, { l: '15+', s: 'Exp Years' } ].map((item, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-3xl text-white flex items-center gap-1 font-black">{item.l}</span>
                  <span className="text-[10px] text-white/40 uppercase font-black tracking-widest mt-1">{item.s}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="hidden lg:block relative group"
          >
            <div className="bg-[#0f172a]/90 backdrop-blur-xl p-12 rounded-[4rem] shadow-2xl relative overflow-hidden border border-white/10">
               <div className="absolute -top-24 -right-24 w-60 h-60 bg-accent opacity-5 blur-3xl"></div>
               <div className="flex gap-2 mb-10 p-1.5 bg-white/5 rounded-2xl border border-white/5">
                  {['buy', 'rent', 'sell'].map(tab => (
                    <button 
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-3 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${activeTab === tab ? 'bg-accent text-white shadow-sm' : 'text-white/40 hover:text-white'}`}
                    >
                      {tab}
                    </button>
                  ))}
               </div>

               <form onSubmit={handleSearch} className="space-y-5">
                  <div className={`p-6 rounded-2xl border transition-all duration-500 ${searchFocused ? 'border-accent bg-accent/5' : 'border-white/10 bg-white/5'}`}>
                    <label className="text-[9px] font-black text-accent uppercase tracking-[0.3em] mb-3 block">Location</label>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent"><MapPin size={20} /></div>
                      <input 
                        type="text" placeholder="Search Nashik, Mumbai, etc..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)}
                        className="bg-transparent border-none outline-none w-full font-bold text-lg text-white placeholder:text-white/20 focus:ring-0" 
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-accent/30 transition-all cursor-pointer group">
                      <label className="text-[9px] font-black text-white/40 uppercase tracking-[0.3em] mb-2 block">Property Type</label>
                      <span className="font-bold text-sm flex items-center justify-between text-white">Any Type <ChevronRight size={14} className="rotate-90 text-accent" /></span>
                    </div>
                    <div className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-accent/30 transition-all cursor-pointer group">
                      <label className="text-[9px] font-black text-white/40 uppercase tracking-[0.3em] mb-2 block">Budget</label>
                      <span className="font-bold text-sm flex items-center justify-between text-white">₹20L - ₹20Cr <ChevronRight size={14} className="rotate-90 text-accent" /></span>
                    </div>
                  </div>
                  <button type="submit" className="w-full py-6 grad-primary text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-primary hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                    <Search size={20} /> SEARCH PROPERTIES
                  </button>
               </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Properties (Nashik) */}
      <section className="py-24 max-w-screen-2xl mx-auto px-6 bg-white">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 text-left">
          <div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">Pride of <br /><span className="text-grad-primary italic font-heading font-normal">Nashik</span></h2>
            <p className="text-slate-400 mt-4 text-lg font-medium">Curated premium listings in Maharashtra's booming wine capital.</p>
          </div>
          <button onClick={() => navigate('/search?location=Nashik')} className="px-8 py-4 bg-slate-50 border border-slate-200 rounded-full font-black text-[10px] tracking-widest hover:bg-slate-900 hover:text-white transition-all whitespace-nowrap">EXPLORE NASHIK</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {featuredProperties.map((prop, i) => (
            <PropertyCard key={prop.id} property={prop} index={i} />
          ))}
        </div>
      </section>

      {/* Virtual Tour Experience */}
      <section className="py-24 max-w-screen-2xl mx-auto px-6 bg-white">
        <div className="relative h-[75vh] rounded-[4rem] overflow-hidden group border border-slate-100 shadow-2xl">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-all duration-[3000ms]">
            <source src="https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-living-room-interior-32770-large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10">
             <div className="w-24 h-24 grad-primary rounded-full flex items-center justify-center mb-10 hover:scale-110 transition-transform cursor-pointer relative shadow-primary">
               <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-20"></div>
               <Play size={36} className="text-white ml-1.5" fill="currentColor" />
             </div>
             <h2 className="text-4xl md:text-7xl font-black mb-6 max-w-4xl tracking-tight text-white">Experience Your <br /> <span className="text-accent font-heading italic font-normal text-6xl">Future Address.</span></h2>
             <p className="text-white/70 tracking-[0.4em] uppercase font-black text-[10px]">WATCH CINEMATIC PROPERTY TOURS</p>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-32 max-w-screen-2xl mx-auto px-6 bg-white border-t border-slate-50">
        <div className="grid md:grid-cols-2 gap-24 items-center">
          <div className="relative rounded-[4rem] overflow-hidden shadow-2xl border border-slate-100">
             <img src={property2} alt="Expert" className="w-full h-[650px] object-cover" />
             <div className="absolute inset-x-8 bottom-8 p-10 bg-[#0f172a]/95 backdrop-blur-md rounded-[3rem] shadow-xl border border-white/5 text-white">
                <p className="text-accent text-[11px] font-black uppercase tracking-widest mb-3">Lead Consultant</p>
                <h3 className="text-3xl font-black mb-2 text-white">Vijay Gosavi</h3>
                <p className="text-sm text-white/50 font-bold tracking-tight">10+ Years of Maharashtra Real Estate Mastery</p>
             </div>
          </div>
          <div className="text-left">
            <span className="text-secondary text-xs font-black tracking-[0.4em] uppercase mb-8 block">Why Partner With Us</span>
            <h2 className="text-4xl md:text-6xl font-black mb-14 text-slate-900 leading-[1.1]">Expertise Across <br /> <span className="text-accent italic font-heading font-normal">Maharashtra</span>.</h2>
            <div className="space-y-12">
              {[
                { t: "Personalized Portfolio", d: "Curating a list of 120+ properties matching your unique lifestyle.", i: <Heart size={24} /> },
                { t: "State-wide Coverage", d: "From Mumbai to Nashik, we have every prime location covered.", i: <Globe size={24} /> },
                { t: "Transparent Deals", d: "End-to-end support with full legal clarity and documentation.", i: <CheckCircle size={24} /> },
              ].map((item, i) => (
                <div key={i} className="flex gap-8 group">
                  <div className="w-16 h-16 rounded-[1.2rem] bg-slate-50 border border-slate-100 flex items-center justify-center text-accent shrink-0 group-hover:grad-primary group-hover:text-white transition-all duration-500 shadow-sm">{item.i}</div>
                  <div>
                    <h4 className="text-xl font-black mb-2 text-slate-800 group-hover:text-accent transition-colors">{item.t}</h4>
                    <p className="text-slate-400 max-w-sm leading-relaxed font-bold text-sm">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
