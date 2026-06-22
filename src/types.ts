export interface Product {
  id: string;
  name: string;
  category: 'mineral' | 'sparkling' | 'distilled' | 'gallon';
  image: string;
  subtext: string;
  price: number;
  isBestValue?: boolean;
  standardPrice?: number; // Retail section standard price
  retailPrice?: number; // Retail section retail price
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type ScreenType = 'login' | 'home' | 'cart' | 'track' | 'retailer';

export interface UserSession {
  isLoggedIn: boolean;
  phone: string;
  name: string;
  email: string;
  deliveryLocation: string;
  deliveryAddress: string;
  distanceKm: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  status: 'Placed' | 'Packaged' | 'Out' | 'Delivered';
  eta: number; // in minutes
  driverName: string;
  driverImage: string;
  driverRating: number;
  driverDeliveries: string;
  address: string;
}
