import { create } from 'zustand';
import { CartItem, Product } from '../types';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity: number, size: string, color: string) => void;
  removeItem: (id: string, size: string, color: string) => void;
  updateQuantity: (id: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (product, quantity, size, color) => {
    const existingItem = get().items.find(
      (item) => item.id === product.id && item.selectedSize === size && item.selectedColor === color
    );

    if (existingItem) {
      set({
        items: get().items.map((item) =>
          item.id === product.id && item.selectedSize === size && item.selectedColor === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        ),
      });
    } else {
      set({
        items: [...get().items, { ...product, quantity, selectedSize: size, selectedColor: color }],
      });
    }
  },

  removeItem: (id, size, color) => {
    set({
      items: get().items.filter(
        (item) => !(item.id === id && item.selectedSize === size && item.selectedColor === color)
      ),
    });
  },

  updateQuantity: (id, size, color, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id, size, color);
      return;
    }
    set({
      items: get().items.map((item) =>
        item.id === id && item.selectedSize === size && item.selectedColor === color
          ? { ...item, quantity }
          : item
      ),
    });
  },

  clearCart: () => set({ items: [] }),

  getTotal: () => {
    return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
  },
}));
