import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Trash2, ArrowRight, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import PropertyCard from '../components/PropertyCard';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const { cartItems, removeFromCart } = useCart();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen pt-32 pb-20 bg-white">
            <div className="max-w-screen-2xl mx-auto px-6">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-12 text-left">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 text-accent mb-3 font-black tracking-[0.2em] text-[10px]">
                            <button onClick={() => navigate('/')} className="hover:underline flex items-center gap-1 transition-all uppercase">BACK TO HOME</button>
                            <span className="opacity-20">/</span>
                            <span className="text-slate-400">FAVORITES</span>
                        </div>
                        <h1 className="text-4xl md:text-7xl font-bold text-slate-900">Your <span className="text-grad-primary italic font-heading font-normal text-6xl md:text-8xl">Wishlist</span></h1>
                        <p className="text-slate-400 mt-4 text-lg font-medium">You have {cartItems.length} properties saved in your cart.</p>
                    </div>
                </div>

                {/* Results Info */}
                <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-100">
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">{cartItems.length} SAVED ITEMS</span>
                </div>

                {/* Property Grid */}
                <AnimatePresence mode="wait">
                    {cartItems.length > 0 ? (
                        <motion.div
                            key="cart-results"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                        >
                            {cartItems.map((prop, i) => (
                                <div key={prop.id} className="relative">
                                    <PropertyCard property={prop} index={i} />
                                    {/* Action button to remove from cart explicitly if needed, although "heart" in card works too */}
                                    <button 
                                        onClick={() => removeFromCart(prop.id)}
                                        className="absolute -top-3 -left-3 w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center shadow-xl z-20 hover:scale-110 transition-transform"
                                        title="Remove from favorites"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="cart-empty"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="py-40 text-center bg-slate-50 rounded-[4rem] border border-dashed border-slate-200"
                        >
                            <ShoppingCart size={64} className="mx-auto text-slate-200 mb-8" />
                            <h3 className="text-3xl font-bold mb-3 text-slate-300">Your Cart is Empty</h3>
                            <p className="text-slate-400 max-w-sm mx-auto text-sm">Save properties you love by clicking the heart icon on any property card.</p>
                            <button onClick={() => navigate('/search')} className="mt-10 px-10 py-5 bg-accent text-white rounded-2xl font-black text-xs tracking-widest shadow-primary hover:scale-105 transition-all">EXPLORE PROPERTIES</button>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
};

export default CartPage;
