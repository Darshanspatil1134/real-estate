import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, MapPin, Search, Grid, List, ChevronLeft, Filter, X } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import { allProperties } from '../data/properties';

const SearchPage = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(search);
  
  const initialLocation = queryParams.get('location') || '';
  const initialType = queryParams.get('type') || 'all';

  const [locationQuery, setLocationQuery] = useState(initialLocation);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [viewType, setViewType] = useState('grid');
  const [priceRange, setPriceRange] = useState(20); 
  const [showFilters, setShowFilters] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Apartment', 'Villa', 'Penthouse', 'Commercial Space', 'Plot', 'Duplex'];

  useEffect(() => {
    let result = allProperties;

    if (initialLocation) {
      result = result.filter(p => 
        p.location.toLowerCase().includes(initialLocation.toLowerCase()) ||
        p.city.toLowerCase().includes(initialLocation.toLowerCase())
      );
    }

    if (initialType && initialType !== 'all') {
      result = result.filter(p => p.type.toLowerCase() === initialType.toLowerCase());
    }

    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }

    result = result.filter(p => p.priceValue <= priceRange * 100);

    setFilteredProperties(result);
  }, [search, initialLocation, initialType, activeCategory, priceRange]);

  const handleSearchUpdate = (e) => {
    e.preventDefault();
    navigate(`/search?location=${locationQuery}&type=${initialType}`);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-white">
      <div className="max-w-screen-2xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-12 text-left">
          <div className="flex-1">
             <div className="flex items-center gap-2 text-accent mb-3 font-black tracking-[0.2em] text-[10px]">
               <button onClick={() => navigate('/')} className="hover:underline flex items-center gap-1 transition-all"><ChevronLeft size={14}/> BACK TO HOME</button>
               <span className="opacity-20">/</span>
               <span className="text-slate-400">MAHARASHTRA LISTINGS</span>
             </div>
             <h1 className="text-4xl md:text-7xl font-bold text-slate-900">Elite <span className="text-grad-primary italic font-heading font-normal text-6xl md:text-8xl">Residences</span></h1>
             <p className="text-slate-400 mt-4 text-lg font-medium">Found {filteredProperties.length} luxury postings matching your criteria.</p>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
             <button onClick={() => setViewType('grid')} className={`flex-1 md:flex-none h-14 w-14 rounded-2xl flex items-center justify-center transition-all border ${viewType === 'grid' ? 'bg-[#0f172a] text-white border-[#0f172a] shadow-xl scale-105' : 'bg-white text-slate-400 border-slate-100 hover:border-accent/20'}`}>
                <Grid size={20} />
             </button>
             <button onClick={() => setViewType('list')} className={`flex-1 md:flex-none h-14 w-14 rounded-2xl flex items-center justify-center transition-all border ${viewType === 'list' ? 'bg-[#0f172a] text-white border-[#0f172a] shadow-xl scale-105' : 'bg-white text-slate-400 border-slate-100 hover:border-accent/20'}`}>
                <List size={20} />
             </button>
          </div>
        </div>

        {/* Filter Bar - Making it Dark again for contrast */}
        <div className="bg-[#0f172a] p-5 md:p-6 rounded-[2.5rem] mb-10 border border-white/5 shadow-2xl flex flex-col lg:flex-row gap-5 items-center">
          <form onSubmit={handleSearchUpdate} className="flex-1 w-full flex flex-col md:flex-row gap-4">
             <div className="flex-1 relative group">
                <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder="Change City or Locality..." 
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl pl-16 pr-6 text-sm font-bold outline-none focus:border-accent text-white transition-all"
                />
             </div>
             <button type="submit" className="h-16 px-10 grad-primary text-white rounded-2xl font-black text-xs tracking-widest flex items-center justify-center gap-3 shadow-primary hover:scale-[1.02] active:scale-95 transition-all uppercase">
                <Search size={18} /> UPDATE
             </button>
          </form>

          <div className="h-10 w-[1px] bg-white/10 hidden lg:block"></div>

          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`h-16 px-8 rounded-2xl flex items-center gap-4 text-xs font-black tracking-widest border transition-all uppercase ${showFilters ? 'bg-accent text-white border-accent' : 'bg-white/5 text-white/60 border-white/10 hover:border-accent/30'}`}
          >
             {showFilters ? <X size={18} /> : <SlidersHorizontal size={18} className="text-accent" />} 
             {showFilters ? 'CLOSE FILTERS' : 'ADVANCED FILTERS'}
          </button>
        </div>

        {/* Expandable Advanced Filters - Dark themed */}
        <AnimatePresence>
          {showFilters && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-12"
            >
              <div className="bg-[#1e293b] p-10 rounded-[2.5rem] border border-white/5 shadow-2xl grid md:grid-cols-2 gap-12 text-left">
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest flex items-center gap-2">
                    <Filter size={14} className="text-accent" /> Property Categories
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {categories.map(cat => (
                      <button 
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${activeCategory === cat ? 'bg-accent text-white border-accent shadow-md' : 'bg-white/5 text-white/40 border-white/10 hover:border-accent/20'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                   <div className="flex justify-between items-end">
                      <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest">Pricing Threshold</h4>
                      <span className="text-2xl font-black text-accent tracking-tighter">Under ₹{priceRange} Cr</span>
                   </div>
                   <div className="relative pt-6">
                      <input 
                        type="range" min="0.2" max="20" step="0.5" 
                        value={priceRange} 
                        onChange={(e) => setPriceRange(e.target.value)} 
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent" 
                      />
                      <div className="flex justify-between mt-4 text-[9px] font-black text-white/20 uppercase tracking-widest">
                        <span>Min ₹20L</span>
                        <span>Max ₹20Cr</span>
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Info */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-100">
          <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">{filteredProperties.length} Matches</span>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-60">Sort By</span>
            <select className="bg-transparent border-none outline-none font-bold text-xs uppercase cursor-pointer hover:text-accent transition-colors text-slate-600">
               <option>Price (High to Low)</option>
               <option>Price (Low to High)</option>
            </select>
          </div>
        </div>

        {/* Property Grid - Cards are DARK on WHITE background */}
        <AnimatePresence mode="wait">
          {filteredProperties.length > 0 ? (
            <motion.div 
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={viewType === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10" : "flex flex-col gap-8"}
            >
              {filteredProperties.map((prop, i) => (
                <PropertyCard key={prop.id} property={prop} index={i} variant={viewType} />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-40 text-center bg-slate-50 rounded-[4rem] border border-dashed border-slate-200"
            >
               <Search size={64} className="mx-auto text-slate-200 mb-8" />
               <h3 className="text-3xl font-bold mb-3 text-slate-300">No Listings Found</h3>
               <p className="text-slate-400 max-w-sm mx-auto text-sm">Try widening your price range or exploring more locations.</p>
               <button onClick={() => { setActiveCategory('All'); setPriceRange(20); }} className="mt-10 px-10 py-5 bg-accent text-white rounded-2xl font-black text-xs tracking-widest shadow-primary hover:scale-105 transition-all">RESET ALL FILTERS</button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination placeholder */}
        {filteredProperties.length > 12 && (
          <div className="mt-24 flex justify-center gap-4">
             {[1, 2, 3, '...', 10].map((n, i) => (
               <button key={i} className={`h-14 w-14 rounded-2xl flex items-center justify-center font-bold text-xs transition-all border ${n === 1 ? 'bg-slate-900 text-white border-slate-900 shadow-xl' : 'bg-white text-slate-400 border-slate-100 hover:border-accent/20 hover:text-accent'}`}>
                 {n}
               </button>
             ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default SearchPage;
