import { ArrowLeft, MapPin, ShoppingCart, Info } from 'lucide-react';
import { ScreenType, UserSession } from '../types';
import { IMAGES } from '../data';

interface HeaderProps {
  currentScreen: ScreenType;
  setScreen: (screen: ScreenType) => void;
  session: UserSession;
  cartCount: number;
}

export default function Header({ currentScreen, setScreen, session, cartCount }: HeaderProps) {
  const getHeaderTitle = () => {
    switch (currentScreen) {
      case 'cart':
        return 'Cart';
      case 'track':
        return 'Track Order';
      case 'retailer':
        return 'My Profile';
      default:
        return 'Candid Mart';
    }
  };

  return (
    <header className="bg-white sticky top-0 z-40 border-b border-surface-container shadow-[0_4px_20px_rgba(0,119,182,0.06)] h-16 w-full">
      <div className="flex items-center justify-between px-4 h-full max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          {currentScreen !== 'home' && currentScreen !== 'login' ? (
            <button
              onClick={() => setScreen('home')}
              className="text-primary hover:bg-surface-container-low transition-all duration-200 p-2 rounded-full active:scale-95"
              aria-label="Back to home"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          ) : currentScreen === 'home' ? (
            <div className="flex items-center gap-2">
              <div className="text-primary hover:bg-surface-container-low transition-colors p-2 rounded-full cursor-pointer scale-95 active:opacity-80">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-on-surface-variant font-semibold uppercase tracking-wider">Deliver to</p>
                <p className="text-xs md:text-sm font-bold text-on-surface truncate max-w-[160px] md:max-w-[240px]">
                  {session.deliveryAddress.split(',')[0]}
                </p>
              </div>
            </div>
          ) : null}

          {currentScreen !== 'home' && currentScreen !== 'login' && (
            <h1 className="text-lg md:text-xl font-bold text-primary">
              {getHeaderTitle()}
            </h1>
          )}
        </div>

        {/* Brand visual center for Desktop on home screen */}
        {currentScreen === 'home' && (
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl font-extrabold text-primary tracking-tight">
              Candid Mart
            </h1>
          </div>
        )}

        {/* Right action slots */}
        <div className="flex items-center gap-3">
          {currentScreen === 'home' && (
            <button
              onClick={() => setScreen('cart')}
              className="relative hover:bg-surface-container-low p-2 rounded-full transition-colors cursor-pointer text-on-surface-variant"
              aria-label="View Cart"
            >
              <ShoppingCart className="w-6 h-6 text-primary" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary-container text-on-secondary-container text-[10px] font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>
          )}

          {currentScreen !== 'login' && (
            <div 
              onClick={() => setScreen('retailer')}
              className="w-10 h-10 rounded-full bg-primary-fixed overflow-hidden border-2 border-surface-container cursor-pointer hover:border-primary-container transition-all"
              title="View Profile / Retailer Benefits"
            >
              <img
                className="w-full h-full object-cover"
                alt="User Profile"
                src={currentScreen === 'retailer' ? IMAGES.retailUserFace : IMAGES.userFace}
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
