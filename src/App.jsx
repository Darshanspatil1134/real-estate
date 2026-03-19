import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, ArrowUpRight } from 'lucide-react';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Auth from './pages/Auth';
import PropertyDetail from './pages/PropertyDetail';
import SearchPage from './pages/SearchPage';
import PostProperty from './pages/PostProperty';
import AdminPanel from './pages/AdminPanel';

import { CartProvider } from './context/CartContext';
import CartPage from './pages/CartPage';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const whatsappNumber = "+91 73873 34536";
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\s+/g, '')}`;

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <CartProvider>
        <ScrollToTop />
        {/* Changed background and text logic for the global White theme */}
        <div className="min-h-screen bg-white text-slate-800 selection:bg-accent selection:text-white">
          <Navbar />
          
          {/* Added top padding to main to prevent content from going under the fixed header */}
          <main className="pt-24 md:pt-32">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/property/:id" element={<PropertyDetail />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/sell" element={<PostProperty />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </main>

          <Footer />

          {/* Global UI Elements */}
          {/* Scroll to Top */}
          <AnimatePresence>
            {showScrollTop && (
              <motion.button
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-28 right-6 w-14 h-14 bg-slate-900 rounded-full flex items-center justify-center text-accent hover:grad-primary hover:text-white transition-all z-50 hidden md:flex shadow-2xl"
              >
                <ArrowUpRight className="-rotate-45" size={24} />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Floating WhatsApp Button */}
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
          >
             <motion.div 
               initial={{ opacity: 0, scale: 0.8, x: 20 }}
               animate={{ opacity: 1, scale: 1, x: 0 }}
               transition={{ delay: 2, duration: 0.5 }}
               className="bg-slate-900 text-white px-5 py-3 rounded-[1.2rem] text-xs font-black shadow-2xl mb-1 relative mr-2"
             >
               Chat with our Experts?
               <div className="absolute top-full right-5 w-3 h-3 bg-slate-900 rotate-45 -mt-1.5"></div>
             </motion.div>
             
             <a 
               href={whatsappLink}
               target="_blank"
               rel="noopener noreferrer"
               className="w-16 h-16 bg-[#25D366] rounded-full shadow-[0_10px_40px_-10px_rgba(37,211,102,0.8)] flex items-center justify-center text-white scale-110 hover:scale-125 hover:rotate-[360deg] transition-all duration-700"
             >
               <Phone size={28} fill="currentColor" />
             </a>
          </motion.div>
        </div>
      </CartProvider>
    </Router>
  );
};

export default App;
