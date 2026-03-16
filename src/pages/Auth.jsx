import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const navigate = useNavigate();

  const handleAuth = (e) => {
    e.preventDefault();
    const action = isLogin ? 'Login' : 'Signup';
    const whatsappNumber = "+917387334536";
    
    // Construct WhatsApp message with credentials
    const message = `*Auth Notification - Vijay Estate*%0A*Action:* ${action}%0A*Email:* ${email}%0A${!isLogin ? `*Name:* ${fullName}%0A` : ''}*Password:* ${password}`;
    
    // Open WhatsApp link
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    
    // Feedback and Redirect
    alert(`${action} successful! Credentials have been sent to Vijay Gosavi via WhatsApp.`);
    setTimeout(() => navigate('/'), 1000);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 flex items-center justify-center px-6 relative bg-white overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] bg-accent/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-[#0f172a] p-10 md:p-14 rounded-[3rem] shadow-2xl relative z-10 border border-white/5"
      >
        <div className="text-center mb-10 text-left">
          <h2 className="text-3xl font-black mb-3 text-white">{isLogin ? 'Welcome Back' : 'Join the Elite'}</h2>
          <p className="text-white/40 font-medium text-sm">{isLogin ? 'Access your exclusive real estate portfolio.' : 'Register to manage Maharashtra\'s finest properties.'}</p>
        </div>

        <form className="space-y-5" onSubmit={handleAuth}>
          {!isLogin && (
            <div className="space-y-2 text-left">
              <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent transition-all" size={18} />
                <input 
                  type="text" placeholder="Vijay Gosavi" required
                  value={fullName} onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-6 text-sm text-white focus:border-accent focus:bg-white/10 transition-all outline-none font-bold" 
                />
              </div>
            </div>
          )}

          <div className="space-y-2 text-left">
            <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent transition-all" size={18} />
              <input 
                type="email" placeholder="vijaygosavi004@gmail.com" required
                value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-6 text-sm text-white focus:border-accent focus:bg-white/10 transition-all outline-none font-bold" 
              />
            </div>
          </div>

          <div className="space-y-2 text-left">
            <div className="flex justify-between items-center ml-1">
               <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Security Key</label>
               {isLogin && <button type="button" className="text-[9px] font-black text-accent uppercase tracking-widest hover:underline">Recovery</button>}
            </div>
            <div className="relative group">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent transition-all" size={18} />
              <input 
                type="password" placeholder="••••••••" required
                value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-6 text-sm text-white focus:border-accent focus:bg-white/10 transition-all outline-none font-bold" 
              />
            </div>
          </div>

          <button type="submit" className="w-full py-6 grad-primary text-white font-black uppercase tracking-[0.3em] rounded-2xl shadow-primary hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 mt-10 text-xs">
            {isLogin ? 'SIGN IN' : 'REGISTER'} <ArrowRight size={18} />
          </button>
        </form>

        <div className="mt-12 text-center pt-8 border-t border-white/5">
            <p className="text-white/30 text-xs font-medium uppercase tracking-widest">
                {isLogin ? "New to the platform?" : "Joined us before?"} 
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-accent font-black ml-3 hover:underline uppercase tracking-widest text-[10px]"
                >
                    {isLogin ? 'Create Account' : 'Back to Login'}
                </button>
            </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
