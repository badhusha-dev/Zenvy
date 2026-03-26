export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  slug: string;
}

export interface Designer {
  id: string;
  name: string;
  avatar: string;
  bio: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: string;
  designer: Designer;
  sizes: string[];
  colors: string[];
  fabrics?: string[];
  rating: number;
  reviewsCount: number;
  reviews: Review[];
  isFeatured: boolean;
  isTrending: boolean;
  isRecommended: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface Address {
  id: string;
  title: string;
  address: string;
  city: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED';
  date: string;
}

export interface CustomTailoringOption {
  id: string;
  name: string;
  options: {
    id: string;
    label: string;
    image?: string;
  }[];
}

export interface MeasurementProfile {
  id: string;
  name: string;
  height?: number;
  weight?: number;
  waist?: number;
  chest?: number;
  length?: number;
  sleeveLength?: number;
}
