import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, MapPin, IndianRupee, Image as ImageIcon, 
  Video as VideoIcon, Plus, CheckCircle, ArrowRight, Home, Briefcase, Ruler
} from 'lucide-react';

const PostProperty = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    type: 'Buy',
    propertyType: 'Apartment',
    beds: '',
    baths: '',
    sqft: '',
    amenities: [],
  });

  const amenitiesList = ['Private Pool', 'Gym', 'Sea View', 'Garden', 'Smart Home', 'Gated Community', 'Clubhouse', 'Parking'];

  const toggleAmenity = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity) 
        ? prev.amenities.filter(a => a !== amenity) 
        : [...prev.amenities, amenity]
    }));
  };

  return (
    <div className="min-h-screen pb-20 px-6 bg-white overflow-hidden">
      {/* Curved Header Background for visual continuity */}
      <div className="absolute top-0 left-0 w-full h-[300px] bg-[#080a0f] rounded-[0_0_4rem_4rem] z-0"></div>
      
      <div className="max-w-4xl mx-auto relative z-10 pt-16">
        <div className="mb-16 text-left">
          <span className="text-secondary text-[11px] font-black uppercase tracking-[0.4em] mb-4 block">Merchant Portal</span>
          <h1 className="text-4xl md:text-7xl font-black text-white leading-tight">List Your <span className="text-grad-primary italic font-heading font-normal">Property</span></h1>
          <p className="text-white/40 mt-6 max-w-xl font-medium">Reach thousands of premium buyers in Maharashtra. Every listing is curated to maintain our standard of luxury.</p>
        </div>

        <form className="space-y-12">
          {/* Basic Info - Dark Card */}
          <div className="bg-[#0f172a] p-10 md:p-16 rounded-[3rem] space-y-12 border border-white/5 shadow-2xl text-left">
            <h3 className="text-2xl font-black text-white flex items-center gap-5">
              <span className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent text-sm shadow-inner">01</span>
              Primary Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-3 lg:col-span-2">
                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-1">Property Title</label>
                <div className="relative group">
                  <Building2 className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent transition-all" size={20} />
                  <input 
                    type="text" placeholder="e.g. Nashik Valley Luxury Estate" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 pl-16 pr-8 text-sm text-white focus:border-accent transition-all outline-none font-bold" 
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-1">Location / Address</label>
                <div className="relative group">
                  <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent transition-all" size={20} />
                  <input 
                    type="text" placeholder="Gangapur Road, Nashik" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 pl-16 pr-8 text-sm text-white focus:border-accent transition-all outline-none font-bold" 
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-1">Asking Price (₹)</label>
                <div className="relative group">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-accent font-black text-lg italic">₹</div>
                  <input 
                    type="number" placeholder="50,00,000" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 pl-16 pr-8 text-sm text-white focus:border-accent transition-all outline-none font-bold" 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Specifications - Dark Card */}
          <div className="bg-[#0f172a] p-10 md:p-16 rounded-[3rem] space-y-12 border border-white/5 shadow-2xl text-left">
            <h3 className="text-2xl font-black text-white flex items-center gap-5">
              <span className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent text-sm shadow-inner">02</span>
              Technical Specs
            </h3>

            <div className="grid grid-cols-2 gap-6 lg:gap-8">
               {[
                 { icon: <Home size={18}/>, label: 'Beds', key: 'beds' },
                 { icon: <Briefcase size={18}/>, label: 'Baths', key: 'baths' },
                 { icon: <Ruler size={18}/>, label: 'Area (SQFT)', key: 'sqft' },
                 { icon: <Plus size={18}/>, label: 'Floors', key: 'floors' }
               ].map((spec) => (
                 <div key={spec.key} className="space-y-3 font-main">
                    <label className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] ml-1">{spec.label}</label>
                    <div className="relative group">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-accent transition-all">{spec.icon}</div>
                      <input type="number" className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-4 text-sm text-white focus:border-accent outline-none font-black" />
                    </div>
                 </div>
               ))}
            </div>

            <div className="space-y-6 pt-6">
               <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-1">Amenities Checklist</label>
               <div className="flex flex-wrap gap-3">
                 {amenitiesList.map(a => (
                   <button 
                     key={a} type="button"
                     onClick={() => toggleAmenity(a)}
                     className={`px-8 py-3.5 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all ${formData.amenities.includes(a) ? 'bg-accent text-white border-accent shadow-primary' : 'bg-white/5 text-white/40 border-white/10 hover:border-accent/30 hover:text-white'}`}
                   >
                     {a}
                   </button>
                 ))}
               </div>
            </div>
          </div>

          {/* Media Assets - Dark Card */}
          <div className="bg-[#0f172a] p-10 md:p-16 rounded-[3rem] space-y-12 border border-white/5 shadow-2xl text-left">
            <h3 className="text-2xl font-black text-white flex items-center gap-5">
              <span className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent text-sm shadow-inner">03</span>
              Media Assets
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
               <div className="bg-white/5 border-2 border-dashed border-white/10 rounded-[3rem] p-12 flex flex-col items-center justify-center text-center hover:border-accent hover:bg-accent/5 transition-all cursor-pointer group">
                  <div className="w-20 h-20 bg-accent/10 rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all text-accent">
                    <ImageIcon size={36} />
                  </div>
                  <h5 className="font-black text-xl text-white mb-2">Upload Images</h5>
                  <p className="text-[10px] text-white/30 font-black uppercase tracking-widest">High-Res PNG or JPG</p>
               </div>
               <div className="bg-white/5 border-2 border-dashed border-white/10 rounded-[3rem] p-12 flex flex-col items-center justify-center text-center hover:border-secondary hover:bg-secondary/5 transition-all cursor-pointer group">
                  <div className="w-20 h-20 bg-secondary/10 rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-secondary group-hover:text-white transition-all text-secondary">
                    <VideoIcon size={36} />
                  </div>
                  <h5 className="font-black text-xl text-white mb-2">Property Tour</h5>
                  <p className="text-[10px] text-white/30 font-black uppercase tracking-widest">MP4 Video Format</p>
               </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6 pt-10">
            <button className="w-full md:flex-1 py-7 grad-primary text-white font-black uppercase tracking-[0.3em] rounded-[2rem] shadow-primary hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 text-xs">
              SUBMIT LISTING <CheckCircle size={22} />
            </button>
            <button type="button" className="w-full md:w-auto px-12 py-7 bg-slate-50 border border-slate-200 text-slate-400 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all">
               CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostProperty;
