import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Home, Briefcase, Video, Heart, ArrowUpRight, Ruler } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useCart } from '../context/CartContext';

const PropertyCard = ({ property, index, variant = 'grid' }) => {
  const isList = variant === 'list';
  const { isInCart, toggleCart } = useCart();
  const liked = isInCart(property.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: (index % 6) * 0.1 }}
      viewport={{ once: true }}
      className={`group relative ${isList ? 'w-full' : ''}`}
    >
      <div className={`bg-[#0f172a] rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-accent/30 transition-all duration-500 flex ${isList ? 'flex-col md:flex-row h-auto md:h-80' : 'flex-col shadow-2xl'}`}>
        
        {/* Media Section */}
        <div className={`relative overflow-hidden ${isList ? 'w-full md:w-[420px] shrink-0' : 'h-72'}`}>
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="absolute inset-0 w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 opacity-60 group-hover:opacity-100"
          >
            <source src={property.video} type="video/mp4" />
          </video>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>

          {/* Top Badges */}
          <div className="absolute top-5 left-5 flex flex-col gap-2">
            {property.tags && property.tags.map(tag => (
              <span key={tag} className="px-3 py-1 glass backdrop-blur-md rounded-lg text-[9px] font-black tracking-widest uppercase text-accent border border-white/10">
                {tag}
              </span>
            ))}
          </div>

          <button 
            onClick={(e) => { e.preventDefault(); toggleCart(property); }}
            className={`absolute top-5 right-5 w-11 h-11 glass backdrop-blur-md rounded-full flex items-center justify-center transition-all ${liked ? 'bg-red-500 text-white shadow-xl scale-110 border-none' : 'text-white hover:text-red-500 border border-white/10'}`}
          >
            <Heart size={18} fill={liked ? "currentColor" : "none"} />
          </button>

          <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
            <div className="flex items-center gap-1.5 glass-light px-3 py-1.5 rounded-lg text-[9px] font-black tracking-widest uppercase text-white/90">
               <Video size={13} className="text-secondary" /> MOCK-TOUR
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-7 flex flex-col justify-between flex-1">
          <div>
            <div className="flex justify-between items-start mb-4">
               <span className="text-accent font-black text-2xl tracking-tighter leading-none">{property.price}</span>
               <span className={`px-2.5 py-1 rounded-lg text-[8px] font-black tracking-widest uppercase bg-white/5 ${property.type === 'Buy' ? 'text-emerald-400' : 'text-blue-400'}`}>{property.type}</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-accent transition-colors leading-tight">
              {property.name}
            </h3>
            <div className="flex items-center gap-2 text-gray-400 text-xs font-medium mb-6">
              <MapPin size={14} className="text-secondary" /> {property.location}
            </div>

            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/5 mb-7">
              <div className="flex flex-col gap-1">
                 <span className="text-[8px] text-gray-500 uppercase font-black tracking-widest">Beds</span>
                 <span className="font-bold text-sm flex items-center gap-2 text-white/80"><Home size={14} className="text-accent opacity-70" /> {property.beds}</span>
              </div>
              <div className="flex flex-col gap-1">
                 <span className="text-[8px] text-gray-500 uppercase font-black tracking-widest">Baths</span>
                 <span className="font-bold text-sm flex items-center gap-2 text-white/80"><Briefcase size={14} className="text-accent opacity-70" /> {property.baths}</span>
              </div>
              <div className={`flex-col gap-1 ${isList ? 'flex' : 'hidden sm:flex'}`}>
                 <span className="text-[8px] text-gray-500 uppercase font-black tracking-widest">Area</span>
                 <span className="font-bold text-sm flex items-center gap-2 text-white/80"><Ruler size={14} className="text-accent opacity-70" /> {property.sqft} <span className="text-[9px] opacity-40">SF</span></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4">
            <Link to={`/property/${property.id}`} className="flex-1 py-4 glass hover:bg-white hover:text-black rounded-2xl text-[10px] font-black tracking-widest transition-all text-center uppercase text-white/70">
              RESERVE VIEWING
            </Link>
            <button className="w-12 h-12 grad-primary rounded-2xl flex items-center justify-center text-white shadow-primary hover:scale-105 active:scale-95 transition-all">
              <ArrowUpRight size={22} />
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default PropertyCard;
