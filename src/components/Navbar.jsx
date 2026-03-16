import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Building2, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'BUY', path: '/search?type=buy' },
    { name: 'RENT', path: '/search?type=rent' },
    { name: 'SELL', path: '/sell' },
    { name: 'ADMIN', path: '/admin' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-[1000] transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-xl border-b border-slate-100 py-4 shadow-sm' : 'bg-transparent py-8'}`}>
      <div className="max-w-screen-2xl mx-auto px-6 h-full flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-4 group">
          <div className="relative h-12 w-12 flex items-center justify-center">
            <div className="absolute inset-0 bg-accent rounded-xl rotate-12 opacity-5 group-hover:rotate-45 transition-all duration-500"></div>
            <Building2 className="text-accent relative z-10" size={28} />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tighter leading-[0.85] italic uppercase text-slate-900">VIJAY <br /> <span className="text-accent">ESTATE</span></span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-12">
          <div className="flex gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`text-[11px] font-black tracking-[0.2em] transition-all relative py-2 group ${location.pathname === link.path ? 'text-accent' : 'text-slate-400 hover:text-slate-900'}`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-accent transition-all duration-500 origin-left ${location.pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'}`}></span>
              </Link>
            ))}
          </div>

          <div className="h-8 w-[1px] bg-slate-200"></div>

          <div className="flex items-center gap-6">
            <Link to="/auth" className="flex items-center gap-2 text-[11px] font-black tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-all uppercase">
              <User size={16} className="text-accent" /> LOGIN
            </Link>
            <Link to="/sell" className="px-8 py-3.5 grad-primary text-white rounded-xl font-black text-[10px] tracking-[0.2em] shadow-primary hover:scale-105 transition-all">
              POST PROPERTY
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(true)} className="lg:hidden w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-900 hover:text-accent transition-all">
           <Menu size={24} />
        </button>

      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-slate-900/20 backdrop-blur-sm lg:hidden"
          >
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 w-[320px] h-full bg-white shadow-2xl p-10 flex flex-col"
            >
              <div className="flex justify-between items-center mb-16">
                 <Building2 className="text-accent" size={32} />
                 <button onClick={() => setIsOpen(false)} className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-900 hover:text-red-500 transition-all"><X size={24}/></button>
              </div>

              <div className="flex flex-col gap-8 flex-1">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} to={link.path} onClick={() => setIsOpen(false)}
                    className={`text-3xl font-black tracking-tight transition-all ${location.pathname === link.path ? 'text-accent' : 'text-slate-300 hover:text-slate-900'}`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="pt-10 border-t border-slate-100 space-y-6">
                 <Link to="/auth" onClick={() => setIsOpen(false)} className="flex items-center gap-4 text-sm font-black text-slate-400 hover:text-slate-900 transition-all group">
                   <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all"><User size={18}/></div> Member Login
                 </Link>
                 <Link to="/sell" onClick={() => setIsOpen(false)} className="w-full py-5 grad-primary text-white rounded-[1.5rem] font-black text-xs tracking-widest text-center shadow-primary flex items-center justify-center uppercase">
                   POST PROPERTY
                 </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
