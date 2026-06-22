import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CartItem } from '../types';
import { IMAGES } from '../data';
import { INDORE_LOCATIONS } from './LoginScreen';
import { Plus, Minus, Truck, Pencil, Landmark, Check, ShieldCheck, ChevronRight, MapPin, BadgePercent } from 'lucide-react';

interface CartScreenProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onClearCart: () => void;
  onPlaceOrder: (address: string) => void;
  deliveryAddress: string;
  distanceKm: number;
  onUpdateAddress: (address: string, distanceKm: number) => void;
}

export default function CartScreen({
  cartItems,
  onUpdateQuantity,
  onClearCart,
  onPlaceOrder,
  deliveryAddress,
  distanceKm,
  onUpdateAddress
}: CartScreenProps) {
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [selectedLocIndex, setSelectedLocIndex] = useState(0);
  const [customAddress, setCustomAddress] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  
  // 10 Km delivery free, beyond that 20 Rs per Km
  const deliveryFee = distanceKm > 10 ? (distanceKm - 10) * 20 : 0;
  const tax = Math.round(subtotal * 0.05); // 5% CGST/SGST
  const total = subtotal > 0 ? (subtotal + deliveryFee + tax) : 0;

  const handleSaveAddress = () => {
    if (selectedLocIndex === 99) {
      if (customAddress.trim()) {
        onUpdateAddress(`${customAddress}, Indore, MP`, 12); // Custom sets 12km default
      }
    } else {
      const loc = INDORE_LOCATIONS[selectedLocIndex];
      onUpdateAddress(loc.name, loc.distance);
    }
    setIsEditingAddress(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 pb-28">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column: Items, Address, Details */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Header & Item Count Badge */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-extrabold text-[#181c1f] tracking-tight">
              Order Basket
            </h2>
            <span className="text-xs font-bold bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full">
              {cartItems.reduce((acc, current) => acc + current.quantity, 0)} Items
            </span>
          </div>

          {/* Cart Items list */}
          {cartItems.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 border border-[#ebeef2] text-center space-y-4 shadow-xs">
              <p className="text-[#404850] font-semibold text-sm">Your basket is currently empty.</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-primary hover:bg-primary-container text-white font-bold px-6 py-2.5 rounded-full text-xs transition-all cursor-pointer"
              >
                Go to Catalog
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {cartItems.map((item) => {
                const itemTotalPrice = item.product.price * item.quantity;
                return (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="soft-blue-container p-4 flex items-center gap-4 border border-[#ebeef2]/40"
                  >
                    <div className="w-16 h-16 bg-white rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center p-2 shadow-xs border border-outline-variant/10">
                      <img
                        className="max-h-full max-w-full object-contain mix-blend-multiply"
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        src={item.product.image}
                      />
                    </div>

                    <div className="flex-1">
                      <p className="text-[10px] font-bold text-primary mb-0.5 uppercase tracking-wide">
                        {item.product.subtext}
                      </p>
                      <h3 className="text-sm md:text-md font-extrabold text-[#181c1f]">
                        {item.product.name}
                      </h3>
                      <p className="text-xs text-[#404850] font-bold mt-0.5">
                        {item.quantity} x ₹{item.product.price}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2.5">
                      <span className="text-md sm:text-lg font-extrabold text-primary">
                        ₹{itemTotalPrice}
                      </span>
                      <div className="flex items-center bg-white rounded-full border border-[#bfc7d1] px-2 py-1 gap-3 shadow-2xs">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="text-primary hover:bg-[#f1f4f8] w-6 h-6 rounded-full flex items-center justify-center transition-all cursor-pointer"
                          aria-label="Decrement quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold text-[#181c1f]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="text-primary hover:bg-[#f1f4f8] w-6 h-6 rounded-full flex items-center justify-center transition-all cursor-pointer"
                          aria-label="Increment quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Delivery Configuration Block */}
          <div className="soft-blue-container p-5 space-y-4 border border-[#ebeef2]/40 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-primary font-bold text-xs">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="uppercase tracking-wider">DELIVERY LOCATION (INDORE)</span>
              </div>
              <button
                onClick={() => setIsEditingAddress(!isEditingAddress)}
                className="text-primary font-bold text-xs flex items-center gap-1 hover:underline cursor-pointer"
              >
                <span>Change Locality</span>
                <Pencil className="w-3 h-3" />
              </button>
            </div>

            {isEditingAddress ? (
              <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-dashed border-[#bfc7d1]">
                <p className="text-[10px] font-bold text-[#404850] uppercase">Select Indore Locality</p>
                <select
                  value={selectedLocIndex}
                  onChange={(e) => setSelectedLocIndex(Number(e.target.value))}
                  className="w-full bg-white border border-[#bfc7d1] rounded-xl py-2.5 px-3 text-xs text-[#181c1f] font-semibold"
                >
                  {INDORE_LOCATIONS.map((loc, idx) => (
                    <option key={idx} value={idx}>
                      {loc.name} ({loc.distance} Km away)
                    </option>
                  ))}
                  <option value={99}>Custom Indore locality (Enter below)</option>
                </select>

                {selectedLocIndex === 99 && (
                  <input
                    type="text"
                    value={customAddress}
                    onChange={(e) => setCustomAddress(e.target.value)}
                    placeholder="locality / landmark name in Indore"
                    className="w-full bg-white border border-[#bfc7d1] rounded-xl py-2.5 px-3 text-xs"
                  />
                )}

                <div className="flex gap-2">
                  <button
                    onClick={handleSaveAddress}
                    className="bg-primary text-white text-xs font-bold py-2 px-4 rounded-full hover:bg-primary-container cursor-pointer"
                  >
                    Apply Distance Rate
                  </button>
                  <button
                    onClick={() => {
                      setIsEditingAddress(false);
                    }}
                    className="bg-transparent border border-outline-variant text-[#404850] text-xs font-bold py-2 px-4 rounded-full"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-xl bg-[#0077b6]/5 border border-[#0077b6]/20 flex items-center justify-center flex-shrink-0">
                  <Truck className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-grow">
                  <h4 className="font-extrabold text-xs md:text-sm text-[#181c1f]">Indore Suburb Location</h4>
                  <p className="text-xs text-[#404850] font-semibold mt-0.5">
                    {deliveryAddress}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                      Distance: {distanceKm} Km
                    </span>
                    {distanceKm <= 10 ? (
                      <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                        10 Km Limit: FREE DELIVERY
                      </span>
                    ) : (
                      <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">
                        {distanceKm - 10} Km Extra (₹20/Km applies)
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Payment Method Block */}
          <div className="soft-blue-container p-5 space-y-4 border border-[#ebeef2]/40 bg-white">
            <div className="flex items-center gap-2 text-primary font-bold text-xs">
              <Landmark className="w-5 h-5 text-primary" />
              <span className="uppercase tracking-wider">PAYMENT OPTION</span>
            </div>
            
            <div className="flex items-center justify-between bg-white border border-secondary p-4 rounded-xl shadow-2xs">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary-container/10 flex items-center justify-center text-secondary">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-extrabold text-sm text-[#181c1f]">Cash on Delivery (COD) / UPI at door</p>
                  <p className="text-xs text-[#404850] font-medium mt-0.5">Pay securely when we drop off the sealed water jars</p>
                </div>
              </div>
              <div className="w-6 h-6 rounded-full border-4 border-primary flex items-center justify-center flex-shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-primary relative"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Sticky Payment Summary checkout box */}
        <div className="lg:col-span-4">
          <div className="bg-white p-6 rounded-2xl shadow-[0_4px_24px_rgba(0,119,182,0.06)] border border-[#ebeef2] sticky top-24">
            <h3 className="text-md md:text-lg font-extrabold text-[#181c1f] mb-6 tracking-tight">
              Payment Summary
            </h3>
            
            <div className="flex flex-col gap-4 border-b border-[#bfc7d1]/50 pb-6 mb-6 text-xs">
              <div className="flex justify-between items-center text-[#404850] font-medium">
                <span>Subtotal Items cost</span>
                <span className="font-bold text-[#181c1f]">₹{subtotal}</span>
              </div>
              <div className="flex justify-between items-center text-[#404850] font-medium">
                <span>Delivery Fee ({distanceKm} km)</span>
                {deliveryFee === 0 ? (
                  <span className="font-extrabold text-emerald-600 uppercase text-[10px]">FREE</span>
                ) : (
                  <span className="font-bold text-[#181c1f]">₹{deliveryFee}</span>
                )}
              </div>
              <div className="flex justify-between items-center text-[#404850] font-medium">
                <span>CGST & SGST (5%)</span>
                <span className="font-bold text-[#181c1f]">₹{tax}</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-8">
              <span className="text-md font-bold text-[#181c1f]">Total Amount</span>
              <span className="text-xl md:text-2xl font-extrabold text-primary">
                ₹{total}
              </span>
            </div>

            <button
              disabled={cartItems.length === 0}
              onClick={() => onPlaceOrder(deliveryAddress)}
              className="w-full bg-primary hover:bg-primary-container disabled:bg-[#bfc7d1] text-white py-4 rounded-xl font-bold text-sm shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
            >
              <span>Place Order (COD)</span>
              <ChevronRight className="w-5 h-5" />
            </button>

            <p className="text-center text-[10px] text-[#404850] font-semibold mt-4 flex items-center justify-center gap-1 bg-slate-50 py-2 rounded-lg">
              <ShieldCheck className="w-4 h-4 text-emerald-500 fill-emerald-500/20" />
              <span>Certified Packaged Water • Indore</span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
