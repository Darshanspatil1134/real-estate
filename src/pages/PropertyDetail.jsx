import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, Home, Briefcase, Ruler, Heart, Share2, 
  Calendar, Phone, Mail, CheckCircle, ArrowRight, Play, Star, ChevronLeft
} from 'lucide-react';

// Using local videos/images for demo
import video1 from '../assets/WhatsApp Video 2026-03-15 at 8.21.36 AM.mp4';
import property1 from '../assets/property1.png';

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const property = {
    id: 1,
    name: 'Skyline Penthouse',
    price: '₹12.5 Cr',
    location: 'Worli, Mumbai',
    beds: 4,
    baths: 5,
    sqft: 4500,
    tags: ['Trending', 'Sea View'],
    video: video1,
    images: [property1, property1, property1],
    description: "Experience the pinnacle of luxury living in this sprawling penthouse overlooking the Arabian Sea. Designed by international architects, this residence offers floor-to-ceiling windows, a private overflow pool, and a home automation system that caters to your every whim.",
    amenities: ['Private Pool', 'Home Theater', 'Gym', 'Concierge', 'Smart Home', 'Sea View', '4 Car Parking'],
    agent: { name: 'Vijay Gosavi', phone: '+91 73873 34536', email: 'vijaygosavi004@gmail.com' }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Media Section */}
      <section className="h-[75vh] relative overflow-hidden flex items-end bg-[#080a0f] rounded-[0_0_4rem_4rem]">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src={property.video} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        
        <div className="max-w-screen-2xl mx-auto px-6 w-full relative z-10 pb-16 text-left">
           <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-white/40 text-[10px] font-black tracking-widest uppercase mb-10 hover:text-accent transition-colors">
              <ChevronLeft size={16}/> Back to browse
           </button>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-end gap-10"
          >
            <div>
              <div className="flex gap-2 mb-6">
                {property.tags.map(tag => (
                  <span key={tag} className="px-4 py-1.5 glass backdrop-blur-md rounded-xl text-[10px] font-black tracking-widest uppercase text-white border border-white/10">{tag}</span>
                ))}
              </div>
              <h1 className="text-5xl md:text-8xl font-black mb-4 text-white leading-tight">{property.name}</h1>
              <div className="flex items-center gap-2 text-white/60 font-medium text-lg">
                <MapPin size={22} className="text-accent" /> {property.location}
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">Exclusive Release</p>
              <h2 className="text-5xl md:text-7xl font-black text-accent italic font-heading font-normal">{property.price}</h2>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content on White Background */}
      <section className="max-w-screen-2xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-3 gap-24 font-main">
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-24 text-left">
            
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
               {[
                 { icon: <Home />, label: 'Type', val: 'Penthouse' },
                 { icon: <Briefcase />, label: 'Beds', val: property.beds },
                 { icon: <Star />, label: 'Baths', val: property.baths },
                 { icon: <Ruler />, label: 'Area', val: `${property.sqft} SF` }
               ].map((stat, i) => (
                 <div key={i} className="bg-[#0f172a] p-10 rounded-[2.5rem] text-center border border-white/5 shadow-2xl group transition-all duration-500">
                    <div className="w-14 h-14 mx-auto mb-6 bg-white/5 flex items-center justify-center text-accent rounded-2xl group-hover:grad-primary group-hover:text-white transition-all shadow-inner">
                      {stat.icon}
                    </div>
                    <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-2">{stat.label}</p>
                    <p className="font-extrabold text-2xl text-white">{stat.val}</p>
                 </div>
               ))}
            </div>

            {/* Description Section */}
            <div className="space-y-10">
               <h3 className="text-4xl font-black text-slate-900 leading-tight">About <span className="text-grad-primary italic font-heading font-normal">this Residence</span></h3>
               <p className="text-slate-500 text-2xl leading-[1.6] italic max-w-4xl font-medium">
                 "{property.description}"
               </p>
            </div>

            {/* Amenities Section */}
            <div className="space-y-12">
               <h3 className="text-4xl font-black text-slate-900 leading-tight">Elite <span className="text-grad-primary italic font-heading font-normal text-3xl">Lifestyle Amenities</span></h3>
               <div className="grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-6">
                 {property.amenities.map(item => (
                   <div key={item} className="flex items-center gap-4 group">
                     <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                        <CheckCircle size={20} />
                     </div>
                     <span className="font-black text-xs uppercase tracking-widest text-slate-500 group-hover:text-slate-900 transition-colors">{item}</span>
                   </div>
                 ))}
               </div>
            </div>

            {/* Cinematic Walkthrough Area */}
            <div className="relative h-[600px] rounded-[4rem] overflow-hidden group border border-slate-100 shadow-2xl">
               <img src={property1} className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-all duration-[2000ms]" />
               <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-28 h-28 grad-primary rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer relative shadow-primary">
                    <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-20"></div>
                    <Play size={40} className="text-white ml-2" fill="currentColor" />
                  </div>
               </div>
               <div className="absolute bottom-10 left-10 p-5 font-black text-[10px] uppercase tracking-widest bg-white rounded-2xl shadow-xl text-slate-900 border border-slate-50">CINEMATIC WALKTHROUGH</div>
            </div>
          </div>

          {/* Right Column: Contact Area */}
          <div className="space-y-10">
            {/* Quick Actions */}
            <div className="flex gap-4">
              <button className="flex-1 py-5 bg-[#0f172a] rounded-[2rem] flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-widest text-white border border-white/10 hover:bg-white hover:text-slate-900 hover:border-slate-200 transition-all shadow-xl">
                 <Heart size={18} className="text-accent" /> Save
              </button>
              <button className="flex-1 py-5 bg-[#0f172a] rounded-[2rem] flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-widest text-white border border-white/10 hover:bg-white hover:text-slate-900 hover:border-slate-200 transition-all shadow-xl">
                 <Share2 size={18} className="text-accent" /> Share
              </button>
            </div>

            {/* Lead Agent Card (Updated to Vijay Gosavi) */}
            <div className="bg-[#0f172a] p-12 rounded-[3.5rem] relative overflow-hidden border border-white/5 shadow-2xl text-left">
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent opacity-[0.1] rounded-full blur-3xl"></div>
               <h4 className="font-extrabold text-2xl text-white mb-10 leading-none">Contact <span className="text-accent italic font-heading font-normal">the Expert</span></h4>
               <div className="flex items-center gap-6 mb-12">
                  <div className="w-20 h-20 rounded-3xl bg-accent flex items-center justify-center text-white font-black text-3xl italic shadow-primary">VG</div>
                  <div>
                    <h5 className="font-black text-xl text-white">{property.agent.name}</h5>
                    <p className="text-[10px] text-white/40 font-black uppercase tracking-widest mt-1">Direct Consultant</p>
                  </div>
               </div>
               
               <div className="space-y-4">
                  <button className="w-full py-6 grad-primary text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-primary hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-xs">
                    <Calendar size={20} /> BOOK A TOUR
                  </button>
                  <a href={`tel:${property.agent.phone}`} className="w-full py-6 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest text-white hover:border-accent transition-all">
                    <Phone size={20} className="text-accent" /> +91 73873 34536
                  </a>
               </div>
            </div>

            {/* Inquiry Form Card */}
            <div className="bg-slate-900/5 backdrop-blur-md p-12 rounded-[3.5rem] border border-slate-100 shadow-xl text-left">
               <h4 className="font-black text-xl text-slate-800 mb-8 leading-none">Confidential Inquiry</h4>
               <div className="space-y-4">
                 <input type="text" placeholder="Full Name" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-5 px-8 text-sm outline-none focus:border-accent focus:bg-white transition-all font-bold" />
                 <input type="email" placeholder="Professional Email" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-5 px-8 text-sm outline-none focus:border-accent focus:bg-white transition-all font-bold" />
                 <textarea placeholder="Message..." rows="4" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-5 px-8 text-sm outline-none focus:border-accent focus:bg-white transition-all font-bold resize-none"></textarea>
                 <button className="w-full py-6 bg-slate-900 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-accent transition-all text-[10px] flex items-center justify-center gap-3">
                    SUBMIT REQUEST <ArrowRight size={18} />
                 </button>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertyDetail;
