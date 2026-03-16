import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Building2, TrendingUp, Search, 
  Edit3, Trash2, Eye, Plus, LayoutDashboard
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  const [activeView, setActiveView] = useState('properties');

  const properties = [
    { id: 1, name: 'Skyline Penthouse', price: '12.5 Cr', status: 'Available', type: 'Buy' },
    { id: 2, name: 'The Golden Villa', price: '8.2 Cr', status: 'Sold', type: 'Buy' },
    { id: 3, name: 'Azure Heights', price: '5.9 Cr', status: 'Available', type: 'Rent' },
  ];

  return (
    <div className="min-h-screen pt-24 bg-white flex overflow-hidden">
      {/* Sidebar - Dark theme as a large vertical card */}
      <div className="w-80 h-[calc(100vh-6rem)] fixed left-10 top-32 bottom-10 bg-[#0f172a] rounded-[3rem] border border-white/10 p-10 hidden lg:flex flex-col shadow-2xl z-10 transition-all">
        <div className="flex items-center gap-5 mb-16 p-6 bg-white/5 rounded-[2rem] border border-white/5">
          <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center text-white shadow-primary">
            <LayoutDashboard size={24} />
          </div>
          <div className="text-left">
            <h4 className="font-black text-white leading-none">Admin Hub</h4>
            <p className="text-[10px] text-white/30 font-black uppercase tracking-widest mt-1">Master Control</p>
          </div>
        </div>

        <nav className="space-y-6 flex-1 text-left">
           {[
             { id: 'properties', l: 'Manage Properties', i: <Building2 size={20}/> },
             { id: 'users', l: 'System Users', i: <Users size={20}/> },
             { id: 'stats', l: 'Market Analytics', i: <TrendingUp size={20}/> }
           ].map(item => (
             <button 
               key={item.id}
               onClick={() => setActiveView(item.id)}
               className={`w-full p-6 rounded-[1.5rem] flex items-center gap-5 font-black text-xs uppercase tracking-widest transition-all ${activeView === item.id ? 'bg-accent text-white shadow-primary' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}
             >
               {item.i} {item.l}
             </button>
           ))}
        </nav>

        <div className="pt-10 border-t border-white/10">
           <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] text-center">v2.1 Nashik Edition</p>
        </div>
      </div>

      {/* Main Panel - White Background with the list in a Dark Card */}
      <div className="flex-1 lg:ml-96 p-10 lg:pl-16 pr-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 text-left">
          <div className="flex-1">
            <span className="text-accent text-[11px] font-black uppercase tracking-[0.4em] mb-4 block">Merchant Console / {activeView}</span>
            <h2 className="text-4xl md:text-7xl font-black text-slate-900 leading-tight">Elite <span className="text-grad-primary italic font-heading font-normal">Dashboard</span></h2>
          </div>
          <Link to="/sell" className="px-10 py-6 bg-[#0f172a] text-white rounded-[2rem] font-black text-xs tracking-widest flex items-center gap-4 hover:grad-primary transition-all group shadow-xl uppercase">
             <Plus size={20} /> New Listing
          </Link>
        </div>

        {/* List Content - Wrapped in a Dark premium card as requested */}
        <div className="bg-[#0f172a] p-10 lg:p-14 rounded-[4rem] border border-white/5 shadow-2xl overflow-hidden text-left">
          <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8 mb-14">
            <div className="flex gap-3 flex-wrap">
               {['All Results', 'Available', 'Sold Out', 'Archived'].map(f => (
                 <button key={f} className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${f === 'All Results' ? 'bg-white text-slate-900 border-white shadow-lg' : 'border-white/10 text-white/30 hover:border-white/30 hover:text-white'}`}>{f}</button>
               ))}
            </div>
            <div className="relative w-full xl:w-96">
               <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30" />
               <input type="text" placeholder="Search Listings..." className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] py-5 pl-16 pr-8 text-sm outline-none focus:border-accent text-white font-bold transition-all" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="pb-8 text-[11px] font-black text-white/20 uppercase tracking-widest leading-none px-4">Property Identity</th>
                  <th className="pb-8 text-[11px] font-black text-white/20 uppercase tracking-widest leading-none px-4">Price Point</th>
                  <th className="pb-8 text-[11px] font-black text-white/20 uppercase tracking-widest leading-none px-4 text-center">Status</th>
                  <th className="pb-8 text-right text-[11px] font-black text-white/20 uppercase tracking-widest leading-none px-4">Management</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {properties.map(prop => (
                  <tr key={prop.id} className="group hover:bg-white/[0.03] transition-colors">
                    <td className="py-8 px-4">
                       <p className="font-extrabold text-white text-lg leading-tight">{prop.name}</p>
                       <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.2em] mt-1">{prop.type} Category</p>
                    </td>
                    <td className="py-8 px-4 font-black text-accent text-xl tracking-tighter italic">₹{prop.price}</td>
                    <td className="py-8 px-4 text-center">
                      <span className={`px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest leading-none ${prop.status === 'Available' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                        {prop.status}
                      </span>
                    </td>
                    <td className="py-8 px-4 text-right">
                      <div className="flex justify-end gap-3">
                         <button className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white/30 hover:text-accent hover:bg-white/10 transition-all"><Eye size={20}/></button>
                         <button className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white/30 hover:text-blue-400 hover:bg-white/10 transition-all"><Edit3 size={20}/></button>
                         <button className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-400/30 hover:text-red-500 hover:bg-red-500/20 transition-all"><Trash2 size={20}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
