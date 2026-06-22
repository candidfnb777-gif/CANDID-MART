import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IMAGES } from '../data';
import { UserSession } from '../types';
import { INDORE_LOCATIONS } from './LoginScreen';
import { 
  Info, 
  Award, 
  Sparkles, 
  Check, 
  User, 
  Mail, 
  Smartphone, 
  MapPin, 
  BadgePercent, 
  AlertCircle,
  ShieldCheck,
  Map,
  X 
} from 'lucide-react';

interface RetailerScreenProps {
  onAddBulkToCart: (itemName: string, count: number, pricePerUnit: number) => void;
  session?: UserSession; // Pass session details
}

export default function RetailerScreen({ onAddBulkToCart, session }: RetailerScreenProps) {
  // Use mock or passed properties with defaults
  const userPhone = session?.phone || '98765-43210';
  const userEmail = session?.email || 'candidfnb777@gmail.com';
  const userLoc = session?.deliveryAddress || 'Vijay Nagar, Indore, Madhya Pradesh';
  const userDistance = session?.distanceKm || 6;

  const [activeTab, setActiveTab] = useState<'details' | 'faq'>('details');
  const [copied, setCopied] = useState(false);

  const handleCopyId = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 pb-28 space-y-8 animate-fade-in">
      
      {/* Profile Overview HUD card */}
      <section className="mt-2">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-[#005c70] text-white p-6 md:p-8 shadow-md">
          {/* Subtle water-grain background overlays */}
          <div className="water-grain absolute inset-0 pointer-events-none opacity-5 bg-[size:32px_32px]"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider opacity-90">
                  VERIFIED CUSTOMER PROFILE
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                {session?.name || 'Candid Hydrated Client'}
              </h2>
              <p className="text-xs text-blue-100 font-medium">
                Indore Logistics Grid Member • Standard Uniform Pricing
              </p>
            </div>

            <div 
              onClick={handleCopyId}
              className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-xl border border-white/20 cursor-pointer hover:bg-white/20 transition-all select-none text-left"
            >
              <p className="text-[9px] font-bold text-white/80 mb-0.5 uppercase tracking-wider">
                LOGISTICS UID (TAP TO COPY)
              </p>
              <p className="font-mono font-bold tracking-widest text-xs md:text-sm text-white flex items-center gap-2">
                <span>CM-IND-{userPhone.slice(-4)}-OK</span>
                {copied ? <span className="text-[10px] text-emerald-400 font-sans">Copied!</span> : null}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Grid: Profile attributes on Left, Transparent Terms/FAQ on Right */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Profile details block */}
        <section className="md:col-span-7 bg-white p-6 rounded-2xl border border-[#ebeef2] space-y-6">
          <div className="border-b border-[#ebeef2] pb-3 flex items-center justify-between">
            <h3 className="text-md md:text-lg font-bold text-primary flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>Mandatory Profile Parameters</span>
            </h3>
            <span className="text-[9px] font-bold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full uppercase tracking-wider">
              Verification Active
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 text-xs md:text-sm">
            {/* Phone row */}
            <div className="p-4 bg-slate-50 rounded-xl flex items-center justify-between border border-[#ebeef2]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-[#404850] uppercase">Mobile Number</p>
                  <p className="text-sm font-bold text-[#181c1f]">+91 {userPhone}</p>
                </div>
              </div>
              <span className="text-[10px] text-emerald-600 font-extrabold flex items-center gap-1">
                <Check className="w-3.5 h-3.5 fill-current" />
                <span>Verified OTP</span>
              </span>
            </div>

            {/* Email row */}
            <div className="p-4 bg-slate-50 rounded-xl flex items-center justify-between border border-[#ebeef2]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-[#404850] uppercase">Verified Email ID</p>
                  <p className="text-sm font-bold text-[#181c1f]">{userEmail}</p>
                </div>
              </div>
              <span className="text-[10px] text-emerald-600 font-extrabold flex items-center gap-1">
                <Check className="w-3.5 h-3.5 fill-current" />
                <span>Active Link</span>
              </span>
            </div>

            {/* Location row */}
            <div className="p-4 bg-slate-50 rounded-xl flex items-center justify-between border border-[#ebeef2]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="max-w-[180px] md:max-w-xs">
                  <p className="text-[9px] font-bold text-[#404850] uppercase">Primary Indore Address</p>
                  <p className="text-xs font-bold text-[#181c1f] truncate">{userLoc}</p>
                </div>
              </div>
              <span className="text-[10px] text-primary font-extrabold">
                {userDistance} Km Away
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-[#ebeef2] flex items-center gap-2.5 text-[11px] text-[#404850] font-semibold">
            <Info className="w-4 h-4 text-primary" />
            <span>To update your location or change numbers, please initiate standard re-verification from the Cart panel.</span>
          </div>
        </section>

        {/* Clear transparent logistics rates & no-sub terms panel */}
        <section className="md:col-span-5 bg-white p-6 rounded-2xl border border-[#ebeef2] space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="border-b border-[#ebeef2] pb-3">
              <h3 className="text-md md:text-lg font-bold text-primary flex items-center gap-2">
                <Map className="w-5 h-5" />
                <span>Logistics & Pricing Transparency</span>
              </h3>
            </div>

            {/* Details blocks */}
            <div className="space-y-4 text-xs">
              <div className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 flex-shrink-0 text-[10px] font-bold">1</div>
                <div>
                  <h4 className="font-extrabold text-[#181c1f] mb-0.5">Equal Rates for All Customers</h4>
                  <p className="text-[#404850] font-medium leading-relaxed">
                    We believe in full transparency. There are no secret premium discounts or markups. End consumers and retailers purchase at the same precise prices listed in our catalog.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 flex-shrink-0 text-[10px] font-bold">2</div>
                <div>
                  <h4 className="font-extrabold text-[#181c1f] mb-0.5">Strictly No Subscriptions</h4>
                  <p className="text-[#404850] font-medium leading-relaxed">
                    There are no dynamic recurring plans or forced locked billing schedules in Candid Mart. You order on-demand exactly when you need it, and pay flat fees upon physical drop-off.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 flex-shrink-0 text-[10px] font-bold">3</div>
                <div>
                  <h4 className="font-extrabold text-[#181c1f] mb-0.5">Delivery Limits & Fees</h4>
                  <p className="text-[#404850] font-medium leading-relaxed">
                    Deliveries within a 10 KM radius from our nearest Indore warehouse are fully free. Deliveries beyond this limit attract a prompt charge of ₹20 per excess KM.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border-l-4 border-primary text-[11.5px] font-semibold text-[#404850] leading-relaxed">
            Need high-volume water supply for Indore weddings, summits, or construction phases? Order directly from our catalog at standard uniform flat rates.
          </div>
        </section>

      </div>

      {/* Corporate Footprint watermark branding */}
      <footer className="pt-8 pb-4 flex flex-col items-center gap-3 border-t border-[#ebeef2] opacity-40 hover:opacity-100 transition-opacity">
        <img
          alt="Candid Mart logo watermark"
          className="h-10 w-auto object-contain grayscale"
          src={IMAGES.logo}
        />
        <p className="text-[9px] font-bold uppercase tracking-widest text-[#404850]">
          Verified Packaged Drinking Water • Indore, MP
        </p>
      </footer>
    </div>
  );
}
