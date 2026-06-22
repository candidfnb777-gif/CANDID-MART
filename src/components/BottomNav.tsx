import { Home, Truck, History, User } from 'lucide-react';
import { ScreenType } from '../types';

interface BottomNavProps {
  currentScreen: ScreenType;
  setScreen: (screen: ScreenType) => void;
  onHistoryClick: () => void;
}

export default function BottomNav({ currentScreen, setScreen, onHistoryClick }: BottomNavProps) {
  if (currentScreen === 'login') return null;

  return (
    <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center py-2 px-4 bg-white border-t border-outline-variant/30 shadow-[0_-4px_20px_rgba(0,119,182,0.06)] z-40 rounded-t-2xl max-w-7xl mx-auto left-1/2 -translate-x-1/2">
      <button
        onClick={() => setScreen('home')}
        className={`flex flex-col items-center justify-center py-1 px-4 rounded-full transition-transform active:scale-95 duration-200 ${
          currentScreen === 'home'
            ? 'bg-secondary-container text-on-secondary-container font-semibold'
            : 'text-on-surface-variant hover:bg-surface-variant/30'
        }`}
      >
        <Home className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] font-semibold">Home</span>
      </button>

      <button
        onClick={() => setScreen('cart')}
        className={`flex flex-col items-center justify-center py-1 px-4 rounded-full transition-transform active:scale-95 duration-200 ${
          currentScreen === 'cart'
            ? 'bg-secondary-container text-on-secondary-container font-semibold'
            : 'text-on-surface-variant hover:bg-surface-variant/30'
        }`}
      >
        <Truck className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] font-semibold">Orders</span>
      </button>

      <button
        onClick={onHistoryClick}
        className="flex flex-col items-center justify-center py-1 px-4 rounded-full text-on-surface-variant hover:bg-surface-variant/30 transition-transform active:scale-95 duration-200"
      >
        <History className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] font-semibold">History</span>
      </button>

      <button
        onClick={() => setScreen('retailer')}
        className={`flex flex-col items-center justify-center py-1 px-4 rounded-full transition-transform active:scale-95 duration-200 ${
          currentScreen === 'retailer'
            ? 'bg-secondary-container text-on-secondary-container font-semibold'
            : 'text-on-surface-variant hover:bg-surface-variant/30'
        }`}
      >
        <User className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] font-semibold">Profile</span>
      </button>
    </nav>
  );
}
