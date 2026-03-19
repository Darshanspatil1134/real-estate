import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Building2, User, ShoppingCart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { cartItems } = useCart();

  useEffect(() => {
    // Threshold changed to 20 for faster transition as per "scroll little" request
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'BUY', path: '/search?type=buy' },
    { name: 'RENT', path: '/search?type=rent' },
    { name: 'SELL', path: '/sell' },
    { name: 'ADMIN', path: '/admin' },
    { name: 'CART', path: '/cart', icon: true },
  ];

  return (
    <nav className={`fixed top-0 w-full z-[1000] transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-xl border-b border-slate-100 py-3 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-screen-2xl mx-auto px-6 h-full flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-4 group">
          <div className="relative h-10 w-10 flex items-center justify-center">
            <div className="absolute inset-0 bg-accent rounded-xl rotate-12 opacity-5 group-hover:rotate-45 transition-all duration-500"></div>
            <Building2 className="text-accent relative z-10" size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter leading-[0.85] italic uppercase text-slate-900">VIJAY <br /> <span className="text-accent">ESTATE</span></span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10">
          <div className="flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`text-[10px] font-black tracking-[0.2em] transition-all relative py-2 group flex items-center gap-2 ${location.pathname === link.path.split('?')[0] ? 'text-accent' : 'text-slate-400 hover:text-slate-900'}`}
              >
                {link.icon && (
                  <div className="relative">
                    <ShoppingCart size={18} />
                    {cartItems.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">{cartItems.length}</span>
                    )}
                  </div>
                )}
                {link.name}
                <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-accent transition-all duration-500 origin-left ${location.pathname === link.path.split('?')[0] ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'}`}></span>
              </Link>
            ))}
          </div>

          <div className="h-6 w-[1px] bg-slate-200"></div>

          <div className="flex items-center gap-4">
            <Link to="/auth" className="flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-all uppercase">
              <User size={14} className="text-accent" /> LOGIN
            </Link>
            <Link to="/sell" className="px-6 py-3 grad-primary text-white rounded-xl font-black text-[9px] tracking-[0.2em] shadow-primary hover:scale-105 transition-all">
              POST PROPERTY
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 lg:hidden">
          <Link to="/cart" className="relative p-2 text-slate-900">
             <ShoppingCart size={24} />
             {cartItems.length > 0 && (
               <span className="absolute top-0 right-0 bg-red-500 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center border border-white">{cartItems.length}</span>
             )}
          </Link>
          <button onClick={() => setIsOpen(true)} className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-slate-900 hover:text-accent transition-all">
             <Menu size={20} />
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-slate-900/60 backdrop-blur-md lg:hidden"
          >
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 w-[300px] h-screen bg-white shadow-2xl p-10 flex flex-col z-[1001]"
            >
              <div className="flex justify-between items-center mb-12">
                 <Building2 className="text-accent" size={28} />
                 <button onClick={() => setIsOpen(false)} className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-slate-900 hover:text-red-500 transition-all"><X size={20}/></button>
              </div>

              <div className="flex flex-col gap-6 flex-1">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} to={link.path} onClick={() => setIsOpen(false)}
                    className={`text-xl font-black tracking-tight transition-all flex items-center gap-3 ${location.pathname === link.path.split('?')[0] ? 'text-accent' : 'text-slate-900/40 hover:text-slate-900'}`}
                  >
                    {link.icon && <ShoppingCart size={20} />}
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="pt-8 border-t border-slate-100 space-y-4">
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
