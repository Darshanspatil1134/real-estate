import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#080a0f] border-t border-white/5 pt-24 pb-12 text-left">
      <div className="max-w-screen-2xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          
          {/* Brand Column */}
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-4 group">
              <div className="relative h-12 w-12 flex items-center justify-center">
                <div className="absolute inset-0 bg-accent rounded-xl rotate-12 opacity-10 group-hover:rotate-45 transition-all duration-500"></div>
                <Building2 className="text-accent relative z-10" size={28} />
              </div>
              <span className="text-2xl font-black tracking-tighter italic uppercase text-white">VIJAY <br /> <span className="text-secondary">ESTATE</span></span>
            </Link>
            <p className="text-white/40 font-bold text-sm leading-relaxed max-w-xs">
              Redefining luxury real estate in Maharashtra. Specializing in Nashik's most prestigious addresses with 120+ curated postings.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <button key={i} className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white/40 hover:text-accent hover:border-accent transition-all group">
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-[0.3em] mb-10">Quick Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'Buy Properties', 'Rent Properties', 'Sell Property', 'Admin Hub'].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === 'Home' ? '/' : item.includes('Buy') ? '/search?type=buy' : item.includes('Rent') ? '/search?type=rent' : item.includes('Sell') ? '/sell' : '/admin'}
                    className="text-white/40 hover:text-accent font-bold text-sm transition-all flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-4 h-[1px] bg-accent transition-all"></span> {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Areas */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-[0.3em] mb-10">Nashik Hotspots</h4>
            <ul className="space-y-4 text-sm font-bold text-white/40">
               {['College Road', 'Gangapur Road', 'Indira Nagar', 'Nashik Road', 'Pathardi Phata'].map(area => (
                 <li key={area} className="hover:text-white cursor-pointer transition-all flex items-center gap-3">
                   <MapPin size={14} className="text-secondary" /> {area}
                 </li>
               ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="bg-white/5 p-8 rounded-[2rem] border border-white/5 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent opacity-5 rounded-full blur-3xl"></div>
            <h4 className="text-xs font-black text-white uppercase tracking-[0.3em] mb-8">Get In Touch</h4>
            <div className="space-y-6">
              <div className="flex gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all shrink-0"><Phone size={18} /></div>
                <div>
                  <p className="text-[10px] text-white/20 font-black uppercase tracking-widest">Call Us</p>
                  <a href="tel:+917387334536" className="font-bold text-sm text-white/60 hover:text-white transition-colors">+91 73873 34536</a>
                </div>
              </div>
              <div className="flex gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all shrink-0"><Mail size={18} /></div>
                <div>
                  <p className="text-[10px] text-white/20 font-black uppercase tracking-widest">Email</p>
                  <a href="mailto:vijaygosavi004@gmail.com" className="font-bold text-sm text-white/60 hover:text-white transition-colors">vijaygosavi004@gmail.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">
            &copy; {currentYear} VIJAY ESTATE. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8 text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">
             <button className="hover:text-white transition-all">Privacy Policy</button>
             <button className="hover:text-white transition-all">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
