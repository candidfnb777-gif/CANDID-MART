import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IMAGES } from '../data';
import { ArrowRight, ShieldCheck, Mail, MapPin, KeyRound, Smartphone, Info } from 'lucide-react';

export const INDORE_LOCATIONS = [
  { name: 'Vijay Nagar, Indore', distance: 6 },
  { name: 'Rajwada Palace, Indore', distance: 2 },
  { name: 'Palasia, Indore', distance: 4 },
  { name: 'Bhanwarkuan, Indore', distance: 8 },
  { name: 'Rau, Indore', distance: 14 },
  { name: 'Khajrana, Indore', distance: 7 },
  { name: 'Dewas Naka, Indore', distance: 11 },
  { name: 'Pithampur area, Indore', distance: 24 },
  { name: 'Nipania, Indore', distance: 9 },
];

interface LoginScreenProps {
  onLoginSuccess: (phone: string, email: string, address: string, distance: number) => void;
}

export default function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedLocIndex, setSelectedLocIndex] = useState(0);
  const [customAddress, setCustomAddress] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGetOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length !== 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setIsLoading(true);

    // Simulate clean OTP sending
    setTimeout(() => {
      setIsLoading(false);
      setIsOtpSent(true);
    }, 1200);
  };

  const handleVerifyAndLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 4) {
      setError('Please enter the 4-digit verification OTP code.');
      return;
    }
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const loc = INDORE_LOCATIONS[selectedLocIndex];
      const address = customAddress ? `${customAddress}, Indore, MP` : loc.name;
      const finalDistance = customAddress ? 12 : loc.distance;
      onLoginSuccess(phone, email, address, finalDistance);
    }, 1200);
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 overflow-hidden bg-[#f7fafe] bg-[radial-gradient(#0077b608_2px,transparent_2px)] bg-[size:32px_32px]">
      
      {/* Background ambient blurs */}
      <div className="absolute top-[-10%] right-[-5%] w-64 h-64 bg-primary-container opacity-[0.03] rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[10%] left-[-5%] w-96 h-96 bg-secondary-container opacity-[0.05] rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Wave bottom decoration */}
      <div className="absolute bottom-0 left-0 w-full h-[120px] pointer-events-none opacity-20">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full object-cover">
          <path fill="#0077b6" fillOpacity="0.15" d="M0,192L48,197.3C96,203,192,213,288,192C384,171,480,117,576,112C672,107,768,155,864,181.3C960,208,1056,213,1152,192C1248,171,1344,123,1392,96L1440,68.3L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,119,182,0.08)] border border-[#ebeef2] overflow-hidden"
      >
        <div className="px-8 pt-10 pb-8 flex flex-col items-center">
          
          {/* Logo */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="mb-6 animate-pulse-soft"
          >
            <img 
              alt="Candid Mart Logo" 
              className="w-20 h-20 object-contain" 
              src={IMAGES.logo} 
            />
          </motion.div>

          {/* Heading */}
          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#181c1f] tracking-tight mb-2">
              Candid Mart
            </h1>
            <p className="text-xs font-bold text-primary uppercase tracking-widest bg-primary-fixed px-3 py-1 rounded-full inline-block">
              🇮🇳 Indore Delivery Hub
            </p>
          </div>

          {/* Demo Mode Notice Banner */}
          <div className="w-full bg-blue-50 border border-blue-200 rounded-xl p-3.5 text-xs text-primary font-medium flex gap-2.5 items-start mb-5">
            <Info className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-extrabold text-[#113A5C]">Demonstration Mode Active</p>
              <p className="text-[11px] text-[#404850] mt-0.5 leading-relaxed">
                Since this is an offline demo, no actual SMS is sent. Use any 4-digit number (e.g., <span className="font-bold text-primary bg-blue-100/50 px-1 rounded">1234</span>) as your OTP to verify instantly!
              </p>
            </div>
          </div>

          {error && (
            <div className="w-full bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded-r-lg text-xs mb-4 font-medium">
              {error}
            </div>
          )}

          {/* Login + Profile Setup Form */}
          {!isOtpSent ? (
            <form className="w-full space-y-4" onSubmit={handleGetOtp}>
              
              {/* Mobile Number */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#404850] flex items-center gap-1.5 uppercase tracking-wider" htmlFor="phone">
                  <Smartphone className="w-3.5 h-3.5 text-primary" />
                  <span>Mobile Number *</span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center border-r border-[#bfc7d1] pr-3 gap-1.5">
                    <span className="text-sm">🇮🇳</span>
                    <span className="text-sm font-bold text-[#181c1f]">+91</span>
                  </div>
                  <input 
                    className="w-full pl-22 pr-4 py-3 bg-[#f1f4f8] focus:bg-white border-2 border-transparent focus:border-primary-container rounded-xl text-md text-[#181c1f] font-semibold transition-all placeholder-[#bfc7d1] outline-none" 
                    id="phone" 
                    placeholder="98765 43210" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    required 
                    type="tel"
                  />
                </div>
              </div>

              {/* Email ID */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#404850] flex items-center gap-1.5 uppercase tracking-wider" htmlFor="email">
                  <Mail className="w-3.5 h-3.5 text-primary" />
                  <span>Email ID *</span>
                </label>
                <input 
                  className="w-full px-4 py-3 bg-[#f1f4f8] focus:bg-white border-2 border-transparent focus:border-primary-container rounded-xl text-sm text-[#181c1f] font-semibold transition-all placeholder-[#bfc7d1] outline-none" 
                  id="email" 
                  placeholder="name@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                  type="email"
                />
              </div>

              {/* Customer Location in Indore */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#404850] flex items-center gap-1.5 uppercase tracking-wider" htmlFor="location">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  <span>Your Indore Location *</span>
                </label>
                <select
                  value={selectedLocIndex}
                  onChange={(e) => setSelectedLocIndex(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-[#f1f4f8] focus:bg-white border-2 border-transparent focus:border-primary-container rounded-xl text-xs text-[#181c1f] font-semibold transition-all outline-none"
                >
                  {INDORE_LOCATIONS.map((loc, idx) => (
                    <option key={idx} value={idx}>
                      {loc.name} ({idx === 0 ? 'Home Base' : `${loc.distance} Km away`})
                    </option>
                  ))}
                  <option value={99}>Custom Indore Address (Enter below)</option>
                </select>
              </div>

              {selectedLocIndex === 99 && (
                <div className="space-y-1">
                  <input 
                    className="w-full px-4 py-3 bg-[#f1f4f8] focus:bg-white border-2 border-transparent focus:border-primary-container rounded-xl text-xs text-[#181c1f] font-semibold transition-all placeholder-[#bfc7d1] outline-none" 
                    placeholder="Enter locality / building name in Indore" 
                    value={customAddress}
                    onChange={(e) => setCustomAddress(e.target.value)}
                    required
                  />
                </div>
              )}

              {/* Submit / Get OTP Button */}
              <motion.button 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full py-3.5 bg-primary hover:bg-primary-container text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer mt-4" 
                type="submit"
              >
                <span>Request Verification OTP</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </form>
          ) : (
            <form className="w-full space-y-4" onSubmit={handleVerifyAndLogin}>
              <div className="bg-amber-50 text-amber-900 border-l-4 border-amber-500 text-xs font-semibold p-4 rounded-xl mb-4 space-y-1">
                <p className="font-extrabold flex items-center gap-1.5 uppercase text-[9px] tracking-wider text-amber-800">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                  Demo Verification Mode Active
                </p>
                <p className="text-[11px] font-medium leading-relaxed opacity-95">
                  We simulated sending an OTP to +91 {phone}. Simply enter <span className="font-extrabold text-primary bg-amber-200/60 px-1.5 py-0.5 rounded border border-amber-300">1234</span> or any 4 digit code below to login instantly!
                </p>
              </div>

              {/* OTP Field */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#404850] flex items-center gap-1.5 uppercase tracking-wider" htmlFor="otp">
                  <KeyRound className="w-3.5 h-3.5 text-primary" />
                  <span>Enter 4-Digit OTP *</span>
                </label>
                <input 
                  className="w-full px-4 py-3 bg-[#f1f4f8] tracking-[1rem] text-center focus:bg-white border-2 border-transparent focus:border-primary-container rounded-xl text-lg text-primary font-bold transition-all placeholder-[#bfc7d1] outline-none" 
                  id="otp" 
                  placeholder="••••" 
                  maxLength={4}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  required 
                  type="text"
                />
                <p className="text-[10px] text-center text-on-surface-variant font-medium mt-1">
                  Tip: Enter <span className="font-bold text-primary">1234</span> or any 4 digit code to bypass
                </p>
              </div>

              {/* Verify and Create Profile Button */}
              <motion.button 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full py-3.5 bg-secondary hover:bg-secondary-container text-on-secondary-container font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer" 
                type="submit"
              >
                <span>Verify & Create Profile</span>
                <ShieldCheck className="w-5 h-5" />
              </motion.button>

              <button
                type="button"
                onClick={() => setIsOtpSent(false)}
                className="w-full text-center text-xs text-primary font-bold hover:underline py-1"
              >
                Go back & edit details
              </button>
            </form>
          )}

          {/* Terms & Footer */}
          <div className="mt-6 text-center space-y-4 w-full border-t border-[#ebeef2] pt-4">
            <p className="text-[10px] text-[#404850] font-medium leading-normal">
              By continuous profile creation, you specify that all hydration logistics will be processed within Indore limit.
            </p>
          </div>
        </div>

        {/* Loading Spinner Screen Overlay */}
        <AnimatePresence>
          {isLoading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center z-20"
            >
              <div className="w-10 h-10 border-4 border-[#ebeef2] border-t-primary rounded-full animate-spin"></div>
              <p className="mt-3 text-xs font-bold text-primary animate-pulse">Processing details...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>
    </div>
  );
}
