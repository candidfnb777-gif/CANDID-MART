import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IMAGES } from '../data';
import { 
  PhoneCall, 
  MessageSquare, 
  Check, 
  Droplet, 
  Truck, 
  Home, 
  Star, 
  PhoneOff, 
  Send,
  X 
} from 'lucide-react';

interface TrackOrderScreenProps {
  orderData?: {
    id: string;
    total: number;
    subtotal: number;
    itemsCount: number;
  };
}

export default function TrackOrderScreen({ orderData }: TrackOrderScreenProps) {
  const [eta, setEta] = useState(15);
  const [isCalling, setIsCalling] = useState(false);
  const [isChatting, setIsChatting] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [invoiceSent, setInvoiceSent] = useState(false);
  const [chatLog, setChatLog] = useState<Array<{ sender: 'user' | 'driver'; text: string; time: string }>>([
    { sender: 'driver', text: "Hello! I'm David, your delivery partner. I'm currently loading your pure water bottles and will be there in 15 minutes.", time: '12:16 PM' }
  ]);

  // Handle countdown simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setEta((prev) => (prev > 1 ? prev - 1 : 15));
    }, 45000); // countdown simulation
    return () => clearInterval(timer);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userMsg = chatMessage;
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setChatLog((prev) => [...prev, { sender: 'user', text: userMsg, time: nowStr }]);
    setChatMessage('');

    // Simulate auto driver response
    setTimeout(() => {
      setChatLog((prev) => [
        ...prev,
        { sender: 'driver', text: "Thanks for the message! I'm navigating through traffic safely, will update you when I arrive.", time: nowStr }
      ]);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto md:p-6 lg:p-10 pb-28">
      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Left column: Map and Floating partner info */}
        <div className="flex-grow flex flex-col gap-6 w-full md:w-3/5">
          
          {/* Map Section */}
          <section className="relative w-full h-[350px] md:h-[500px] bg-[#ebeef2] rounded-none md:rounded-2xl overflow-hidden shadow-xs border border-outline-variant/10">
            {/* Map image from fallback */}
            <div 
              className="absolute inset-0 bg-[#d7dade] bg-cover bg-center transition-all duration-300"
              style={{ backgroundImage: `url('${IMAGES.mapFallback}')` }}
            ></div>

            {/* Pulsing delivery pin */}
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-20 h-20 bg-primary/20 rounded-full animate-ping"></div>
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg border-2 border-white relative">
                  <Truck className="w-5 h-5 text-white fill-current" />
                </div>
              </div>
            </div>

            {/* Float HUD Information overlay card with pulse effect */}
            <div className="absolute bottom-4 left-4 right-4 md:left-6 md:right-6 z-20 glass-card p-5 rounded-2xl shadow-xl border border-white/40 flex items-center justify-between animate-pulse-soft">
              <div>
                <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">
                  Estimated Arrival
                </p>
                <p className="text-2xl md:text-3xl font-extrabold text-primary">
                  {eta} mins
                </p>
              </div>
              <div className="h-10 w-px bg-[#bfc7d1]/50"></div>
              <div className="text-right">
                <p className="text-xs font-semibold text-[#404850] uppercase tracking-wider">
                  Arriving at
                </p>
                <p className="text-sm font-bold text-[#181c1f]">
                  12:45 PM
                </p>
              </div>
            </div>
          </section>

          {/* Delivery Partner Profile Card */}
          <section className="mx-4 md:mx-0 p-5 bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,119,182,0.06)] flex items-center justify-between border border-[#ebeef2]">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/20 bg-slate-100">
                <img
                  className="w-full h-full object-cover"
                  alt="David Miller profile"
                  src={IMAGES.driver}
                />
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#404850] uppercase tracking-wide">
                  Your Delivery Partner
                </p>
                <h3 className="text-md md:text-lg font-bold text-[#181c1f]">
                  David Miller
                </h3>
                <div className="flex items-center gap-1 text-primary">
                  <Star className="w-4 h-4 fill-current text-amber-400 border-none" />
                  <span className="text-xs font-bold text-[#404850]">4.9 (2k+ deliveries)</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2.5">
              <button
                onClick={() => setIsCalling(true)}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-secondary-container text-on-secondary-container hover:bg-[#4cd6fb] transition-all active:scale-90 cursor-pointer"
                title="Call Driver"
              >
                <PhoneCall className="w-5 h-5 text-[#005c70]" />
              </button>
              <button
                onClick={() => setIsChatting(true)}
                className="w-12 h-12 flex items-center justify-center rounded-full border border-[#bfc7d1] text-primary hover:bg-[#ebeef2]/50 transition-all active:scale-95 cursor-pointer"
                title="Chat with Driver"
              >
                <MessageSquare className="w-5 h-5" />
              </button>
            </div>
          </section>
        </div>

        {/* Right column: Delivery statuses & summary list */}
        <aside className="w-full md:w-2/5 flex flex-col gap-6 px-4 md:px-0">
          
          {/* Status Tracker Line HUD */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-[#ebeef2]">
            <h2 className="text-md md:text-lg font-extrabold text-[#181c1f] mb-6">
              Delivery Status
            </h2>
            
            <div className="relative">
              {/* Central vertical pipeline lines */}
              <div className="absolute left-[15px] top-4 bottom-4 w-1 bg-[#e5e8ec] rounded-full"></div>
              <div className="absolute left-[15px] top-4 h-[65%] w-1 bg-primary rounded-full"></div>

              {/* Steps item 1 */}
              <div className="flex items-start gap-4 pb-8 relative z-10">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-md">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-bold text-sm text-[#181c1f]">Order Placed</p>
                  <p className="text-xs text-[#404850] font-medium">We've received your order at 12:15 PM</p>
                </div>
              </div>

              {/* Steps item 2 */}
              <div className="flex items-start gap-4 pb-8 relative z-10">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-md">
                  <Droplet className="w-4 h-4 text-white fill-current" />
                </div>
                <div>
                  <p className="font-bold text-sm text-[#181c1f]">Packaged & Sealed</p>
                  <p className="text-xs text-[#404850] font-medium">Freshness quality check completed</p>
                </div>
              </div>

              {/* Steps item 3 (Active) */}
              <div className="flex items-start gap-4 pb-8 relative z-10">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg border-4 border-primary-fixed">
                  <Truck className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-bold text-sm text-primary animate-pulse">Out for Delivery</p>
                  <p className="text-xs text-[#404850] font-medium">David is on his way to your location</p>
                </div>
              </div>

              {/* Steps item 4 */}
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-8 h-8 rounded-full bg-[#e5e8ec] flex items-center justify-center text-on-surface-variant">
                  <Home className="w-4 h-4 text-[#bfc7d1]" />
                </div>
                <div>
                  <p className="font-bold text-sm text-on-surface-variant opacity-60">Delivered</p>
                  <p className="text-xs text-[#bfc7d1] font-medium">Expected by 12:45 PM</p>
                </div>
              </div>
            </div>
          </section>

          {/* Checkout Item Summary details */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-[#ebeef2]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-extrabold text-[#181c1f]">Order Summary</h2>
              <span className="text-[10px] font-bold px-3 py-1 bg-secondary-container text-[#005c70] rounded-full uppercase tracking-wider">
                {orderData ? `#CM-${orderData.id}` : '#CM-88219'}
              </span>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-[#f7fafe] rounded-xl overflow-hidden flex-shrink-0 border border-[#ebeef2] flex items-center justify-center p-2">
                  <img
                    className="max-h-full max-w-full object-contain mix-blend-multiply"
                    alt="Premium Water bottle summary"
                    referrerPolicy="no-referrer"
                    src={IMAGES.trackOrderMineralWater}
                  />
                </div>
                <div className="flex-grow flex flex-col justify-center">
                  <p className="text-xs md:text-sm font-bold text-[#181c1f]">Premium Mineral Water</p>
                  <p className="text-[11px] text-[#404850] font-bold">
                    {orderData ? `${orderData.itemsCount}x Jars / Cases` : '2 x 5 Gallon Bottles'}
                  </p>
                  <p className="text-xs font-extrabold text-primary mt-0.5">
                    ₹{orderData ? orderData.subtotal : '120'}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-[#bfc7d1]/50 pt-4 space-y-2 text-sm text-[#404850] font-medium">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-[#181c1f] font-semibold">
                  ₹{orderData ? orderData.subtotal : '120'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Delivery Fee</span>
                <span className="text-secondary font-extrabold text-xs">
                  {orderData && (orderData.total - orderData.subtotal - Math.round(orderData.subtotal * 0.05)) > 0
                    ? `₹${orderData.total - orderData.subtotal - Math.round(orderData.subtotal * 0.05)}`
                    : 'FREE'}
                </span>
              </div>
              <div className="flex justify-between items-center text-[#404850]">
                <span>CGST & SGST (5%)</span>
                <span className="text-[#181c1f] font-semibold">
                  ₹{orderData ? Math.round(orderData.subtotal * 0.05) : '6'}
                </span>
              </div>
              <div className="flex justify-between text-[#181c1f] pt-2 border-t border-[#ebeef2]">
                <span className="font-extrabold">Total Amount</span>
                <span className="font-extrabold text-primary text-md">
                  ₹{orderData ? orderData.total : '126'}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setInvoiceSent(true);
                setTimeout(() => setInvoiceSent(false), 4000);
              }}
              className={`w-full mt-6 py-3 font-bold rounded-xl transition-all cursor-pointer text-xs ${
                invoiceSent 
                  ? 'bg-emerald-600 text-white shadow-md' 
                  : 'bg-primary text-white hover:bg-primary-container'
              }`}
            >
              {invoiceSent ? `Invoice sent to your email! ✅` : 'Send Invoice to Email'}
            </button>
          </section>
        </aside>

      </div>

      {/* Interactive Mockup Driver Callback calling view overlay modal */}
      <AnimatePresence>
        {isCalling && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#001d32]/95 backdrop-blur-sm flex flex-col items-center justify-center text-white"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="flex flex-col items-center space-y-8"
            >
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#50d9fe] shadow-2xl relative animate-pulse-soft">
                <img className="w-full h-full object-cover" alt="driver pic" src={IMAGES.driver} />
              </div>
              <div className="text-center">
                <h3 className="text-xl md:text-2xl font-bold">Calling David Miller</h3>
                <p className="text-sm font-medium opacity-70 mt-1 animate-pulse">Connecting securely...</p>
              </div>

              <button
                onClick={() => setIsCalling(false)}
                className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-500 shadow-lg active:scale-90 transition-all cursor-pointer"
                title="End Call"
              >
                <PhoneOff className="w-6 h-6 text-white" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Chat overlay Drawer Modal */}
      <AnimatePresence>
        {isChatting && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-end justify-center">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-lg bg-white rounded-t-2xl shadow-2xl flex flex-col h-[500px]"
            >
              <div className="flex items-center justify-between p-4 border-b border-[#ebeef2]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img className="object-cover w-full h-full" src={IMAGES.driver} alt="driver face" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#181c1f]">David Miller</h4>
                    <p className="text-[10px] text-emerald-500 font-bold uppercase">Online Now</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsChatting(false)}
                  className="p-1.5 hover:bg-[#f1f4f8] rounded-full text-[#404850]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Log lists */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#f7fafe]">
                {chatLog.map((chat, idx) => {
                  const isUser = chat.sender === 'user';
                  return (
                    <div key={idx} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[75%] rounded-2xl p-3.5 shadow-2xs ${isUser ? 'bg-primary text-white rounded-tr-none' : 'bg-white text-[#181c1f] rounded-tl-none border border-[#ebeef2]'}`}>
                        <p className="text-xs md:text-sm font-medium leading-relaxed">{chat.text}</p>
                        <p className={`text-[9px] mt-1 text-right font-semibold ${isUser ? 'text-white/70' : 'text-[#404850]/50'}`}>{chat.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick reply recommendation chips */}
              <div className="p-2 gap-2 flex overflow-x-auto border-t border-[#ebeef2] bg-[#f7fafe] hide-scrollbar">
                {['Leave at door please', 'Call me when you arrive', 'Thanks David!'].map((chipText) => (
                  <button
                    key={chipText}
                    onClick={() => {
                      const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                      setChatLog((prev) => [...prev, { sender: 'user', text: chipText, time: nowStr }]);
                      setTimeout(() => {
                        setChatLog((prev) => [
                          ...prev,
                          { sender: 'driver', text: "Understood, will do!", time: nowStr }
                        ]);
                      }, 1000);
                    }}
                    className="flex-none bg-white hover:bg-[#e0e3e7]/50 border border-[#bfc7d1] text-[#404850] px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer"
                  >
                    {chipText}
                  </button>
                ))}
              </div>

              {/* Input section form */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-[#ebeef2] bg-white flex gap-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 py-3 px-4 bg-[#f1f4f8] focus:bg-white border focus:border-primary border-transparent rounded-xl text-xs outline-none"
                />
                <button
                  type="submit"
                  className="bg-primary text-white w-10 h-10 rounded-xl flex items-center justify-center active:scale-95 transition-all text-xs cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
