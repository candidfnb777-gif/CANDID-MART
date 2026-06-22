import { useState } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import CartScreen from './components/CartScreen';
import TrackOrderScreen from './components/TrackOrderScreen';
import RetailerScreen from './components/RetailerScreen';
import { ScreenType, UserSession, CartItem, Product } from './types';
import { IMAGES } from './data';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, Clock, MapPin, CheckSquare, X } from 'lucide-react';

export default function App() {
  const [currentScreen, setScreen] = useState<ScreenType>('login');
  
  const [session, setSession] = useState<UserSession>({
    isLoggedIn: false,
    phone: '',
    name: 'Candid Client',
    email: '',
    deliveryLocation: 'Vijay Nagar, Indore',
    deliveryAddress: 'Vijay Nagar, Indore, Madhya Pradesh',
    distanceKm: 6
  });

  // Default Cart contents matching the Cart screenshot exactly on first load in Rupees
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: {
        id: 'prod-20l-jar',
        name: '20L Jar',
        category: 'gallon',
        image: IMAGES.cartJarProduct,
        subtext: 'Packaged Drinking Water',
        price: 50
      },
      quantity: 2
    },
    {
      product: {
        id: 'prod-1l-case',
        name: '1L Bottle Case (Pack of 12)',
        category: 'mineral',
        image: IMAGES.cartCaseProduct,
        subtext: 'Packaged Drinking Water',
        price: 90
      },
      quantity: 1
    }
  ]);

  // Active placed order tracker details
  const [activePlacedOrder, setActivePlacedOrder] = useState<{
    id: string;
    total: number;
    subtotal: number;
    itemsCount: number;
  } | undefined>(undefined);

  // History slide-over modal state
  const [showHistory, setShowHistory] = useState(false);

  // Simulated previous orders list
  const historyOrders = [
    { id: 'CM-88102', date: 'June 18, 2026', items: '2x 20L Premium Jar', amount: 100, status: 'Delivered' },
    { id: 'CM-87941', date: 'June 10, 2026', items: '1x 500ml Bottle Case', amount: 120, status: 'Delivered' },
    { id: 'CM-87123', date: 'May 28, 2026', items: '1x 1L Bottle Case', amount: 90, status: 'Delivered' }
  ];

  const handleLoginSuccess = (phoneNumber: string, email: string, address: string, distanceKm: number) => {
    setSession(prev => ({
      ...prev,
      isLoggedIn: true,
      phone: phoneNumber,
      email: email,
      deliveryLocation: address,
      deliveryAddress: address,
      distanceKm: distanceKm
    }));
    setScreen('home');
  };

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems(prev => {
      if (quantity <= 0) {
        return prev.filter(item => item.product.id !== id);
      }
      return prev.map(item =>
        item.product.id === id ? { ...item, quantity } : item
      );
    });
  };

  const handlePlaceOrder = (address: string) => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const tax = Math.round(subtotal * 0.05);
    const deliveryFee = session.distanceKm > 10 ? (session.distanceKm - 10) * 20 : 0;
    const finalTotal = subtotal + deliveryFee + tax;
    
    // Seed the placed order details
    const orderNum = Math.floor(10000 + Math.random() * 90000).toString();
    setActivePlacedOrder({
      id: orderNum,
      subtotal: subtotal,
      total: finalTotal,
      itemsCount: totalCount
    });

    setCartItems([]); // Clear cart items
    setScreen('track'); // Transition to track order status page
  };

  const handleAddBulkToCart = (itemName: string, count: number, pricePerUnit: number) => {
    const bulkProduct: Product = {
      id: `bulk-${Date.now()}`,
      name: itemName,
      category: 'gallon',
      image: IMAGES.retailWaterJarProduct,
      subtext: 'Business Tier',
      price: pricePerUnit
    };
    
    setCartItems(prev => {
      const existing = prev.find(item => item.product.name === itemName);
      if (existing) {
        return prev.map(item =>
          item.product.name === itemName ? { ...item, quantity: item.quantity + count } : item
        );
      }
      return [...prev, { product: bulkProduct, quantity: count }];
    });
  };

  const handleUpdateAddress = (newAddress: string, distanceKm?: number) => {
    setSession(prev => ({
      ...prev,
      deliveryLocation: newAddress,
      deliveryAddress: newAddress,
      distanceKm: distanceKm !== undefined ? distanceKm : prev.distanceKm
    }));
  };

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
      case 'home':
        return <HomeScreen onAddToCart={handleAddToCart} setScreen={setScreen} />;
      case 'cart':
        return (
          <CartScreen
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onClearCart={() => setCartItems([])}
            onPlaceOrder={handlePlaceOrder}
            deliveryAddress={session.deliveryAddress}
            distanceKm={session.distanceKm}
            onUpdateAddress={handleUpdateAddress}
          />
        );
      case 'track':
        return <TrackOrderScreen orderData={activePlacedOrder} />;
      case 'retailer':
        return <RetailerScreen onAddBulkToCart={handleAddBulkToCart} session={session} />;
      default:
        return <HomeScreen onAddToCart={handleAddToCart} setScreen={setScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f7fafe] flex flex-col font-sans select-none antialiased">
      {/* Dynamic Header */}
      <Header
        currentScreen={currentScreen}
        setScreen={setScreen}
        session={session}
        cartCount={cartItems.reduce((acc, c) => acc + c.quantity, 0)}
      />

      {/* Main Container screen elements with transition */}
      <main className="flex-grow pt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            {renderActiveScreen()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Reusable Bottom flow menu tab layout options */}
      <BottomNav
        currentScreen={currentScreen}
        setScreen={setScreen}
        onHistoryClick={() => setShowHistory(true)}
      />

      {/* Interactive slide-over / Bottom popup modal representing history log */}
      <AnimatePresence>
        {showHistory && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-3xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl relative border border-surface-container"
            >
              <div className="flex items-center justify-between pb-3 border-b border-surface-container mb-4">
                <div className="flex items-center gap-2 text-primary font-bold">
                  <RefreshCw className="w-5 h-5 animate-spin duration-1000" />
                  <span className="text-md uppercase tracking-wide">Delivery History</span>
                </div>
                <button
                  onClick={() => setShowHistory(false)}
                  className="p-1.5 hover:bg-surface-container-low rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5 text-on-surface-variant" />
                </button>
              </div>

              {/* historic list items logs */}
              <div className="space-y-3.5 max-h-[350px] overflow-y-auto pr-1">
                {historyOrders.map((ord) => (
                  <div key={ord.id} className="p-3.5 bg-surface-container-lowest rounded-xl border border-surface-container shadow-2xs flex justify-between items-center text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-[#1c1d1f]">{ord.id}</span>
                        <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                          {ord.status}
                        </span>
                      </div>
                      <p className="text-[#404850] font-bold mt-0.5">{ord.items}</p>
                      <p className="text-[10px] text-[#404850]/60 font-medium">{ord.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-extrabold text-[#181c1f]">₹{ord.amount}</p>
                      <p className="text-[9px] font-bold text-secondary uppercase mt-1">Free Delivery</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowHistory(false)}
                className="w-full mt-6 bg-[#ebeef2] hover:bg-[#e0e3e7] text-[#404850] font-bold py-3 rounded-xl transition-all text-xs cursor-pointer"
              >
                Close History
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
