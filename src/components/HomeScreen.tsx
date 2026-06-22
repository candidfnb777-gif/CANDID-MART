import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { PRODUCTS } from '../data';
import { Plus, Bolt, Sparkles, Check, Flame, MapPin, BadgePercent } from 'lucide-react';

interface HomeScreenProps {
  onAddToCart: (product: Product) => void;
  setScreen: (screen: 'login' | 'home' | 'cart' | 'track' | 'retailer') => void;
}

export default function HomeScreen({ onAddToCart, setScreen }: HomeScreenProps) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleProductAdd = (product: Product) => {
    onAddToCart(product);
    setToastMessage(`Added 1x ${product.name} to Basket`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 pb-28 space-y-8">
      {/* Toast Feedback */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#005d90] text-white px-6 py-3 rounded-full shadow-lg font-bold flex items-center gap-2 border border-[#94ccff]/20 text-xs"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Banner Section (Clean, Localized to Indore, No Subscription mentioned!) */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-[#023e8a] py-10 px-6 md:px-12 flex items-center group shadow-md text-white">
        {/* Decorative background overlay circles */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full pointer-events-none transform translate-x-10 -translate-y-10 group-hover:scale-105 transition-transform duration-700"></div>
        <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-white/5 rounded-full pointer-events-none transform -translate-x-10 translate-y-10"></div>
        
        <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="max-w-xl space-y-3">
            <span className="inline-block bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-wider border border-white/10 uppercase">
              🇮🇳 INDORE EXCLUSIVE HUB
            </span>
            <h2 className="text-2xl md:text-3.5xl font-extrabold leading-tight tracking-tight">
              Premium Packaged Drinking Water
            </h2>
            <p className="opacity-95 text-xs md:text-sm font-semibold leading-relaxed">
              Same flat rates for all customers & retailers. Checked for pure freshness, and sealed securely for your lifestyle.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <span className="bg-emerald-500/25 border border-emerald-400/40 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>10 KM delivery is 100% FREE</span>
              </span>
              <span className="bg-white/10 px-3 py-1 rounded-lg text-xs font-semibold">
                Beyond 10 KM: ₹20/Km
              </span>
            </div>
          </div>
          <button 
            onClick={() => setScreen('cart')}
            className="bg-white text-primary hover:bg-[#f1f4f8] px-8 py-3.5 rounded-full font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
          >
            <span>View Current Basket</span>
          </button>
        </div>
      </section>

      {/* Single Product range announcement (Mandatory requirement!) */}
      <div className="border-b border-[#ebeef2] pb-2 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-lg md:text-xl font-extrabold text-[#181c1f] tracking-tight">
            Our Packaged Drinking Water Catalog
          </h3>
          <p className="text-xs text-[#404850] font-semibold">
            Honest, uniform pricing for both household end consumers and business retailers
          </p>
        </div>
        <span className="bg-blue-50 border border-blue-200 text-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Single Product Range Only
        </span>
      </div>

      {/* Product list - Grid directly mapping to 5 custom water models with India prices */}
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {PRODUCTS.map((product) => (
          <motion.article
            key={product.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl p-4 shadow-xs flex flex-col group hover:-translate-y-1 hover:shadow-md transition-all border border-[#ebeef2]/50"
          >
            <div className="relative bg-[#f7fafe] rounded-xl aspect-square mb-4 overflow-hidden flex items-center justify-center">
              <img
                className="w-full h-full object-contain p-4 mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                alt={product.name}
                referrerPolicy="no-referrer"
                src={product.image}
              />
              {product.isBestValue && (
                <span className="absolute top-2 left-2 bg-primary text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                  Popular SKU
                </span>
              )}
            </div>
            
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <p className="text-[9px] font-bold text-[#404850] mb-0.5 uppercase tracking-wide">
                  {product.subtext}
                </p>
                <h4 className="text-sm md:text-md font-extrabold text-[#181c1f] mb-2 leading-tight">
                  {product.name}
                </h4>
              </div>
              
              <div className="mt-4 flex items-center justify-between pt-2 border-t border-[#ebeef2]/40">
                <span className="text-base md:text-lg font-extrabold text-primary">
                  ₹{product.price}
                </span>
                <button
                  onClick={() => handleProductAdd(product)}
                  className="bg-primary hover:bg-primary-container text-white w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center hover:shadow-md active:scale-90 transition-all cursor-pointer"
                  aria-label={`Add ${product.name} to cart`}
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </section>

      {/* Loyalty & Logistics Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="md:col-span-2 bg-slate-100 rounded-2xl p-6 md:p-8 flex flex-col justify-center border border-[#ebeef2]">
          <h2 className="text-md md:text-lg font-bold text-[#181c1f] mb-2 tracking-tight">
            Seamless Hydration Delivery
          </h2>
          <p className="text-xs md:text-sm text-[#404850] max-w-md mb-6 leading-relaxed font-semibold">
            Configure your delivery parameters on the verification checkout screen. We route daily logistical fleets from central Indore depots directly to you.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-[#ebeef2]"></div>
              <div className="w-8 h-8 rounded-full bg-secondary/20 border-2 border-[#ebeef2]"></div>
              <div className="w-8 h-8 rounded-full bg-primary-fixed border-2 border-[#ebeef2]"></div>
            </div>
            <span className="text-xs font-bold text-[#00677d] flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
              Serving residential and retail grids across MP
            </span>
          </div>
        </div>

        <div className="bg-[#50d9fe]/20 text-primary border border-[#50d9fe] rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
            <Bolt className="w-6 h-6 fill-current" />
          </div>
          <h3 className="text-sm md:text-md font-extrabold mb-1 tracking-tight">Prompt Logistics</h3>
          <p className="text-xs font-semibold">Scheduled delivery within hours across Indore limits.</p>
        </div>
      </section>
    </div>
  );
}
