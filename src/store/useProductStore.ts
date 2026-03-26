import { create } from 'zustand';
import { Product } from '../types';
import api from '../services/api';

interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  fetchProducts: (params?: { category?: string; search?: string }) => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  isLoading: false,
  error: null,

  fetchProducts: async (params) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get('/products', { params });
      // The backend returns a Page object; we extract and normalize the content
      const data = response.data.content || response.data;
      
      const normalizedData: Product[] = data.map((p: any) => ({
        ...p,
        id: String(p.id),
        isFeatured: p.featured || false,
        isTrending: p.trending || false,
        isRecommended: p.isRecommended || false,
        rating: p.rating || 4.8,
        reviewsCount: p.reviewsCount || 0,
        reviews: p.reviews || [],
        sizes: p.sizes || ['S', 'M', 'L', 'XL'],
        colors: p.colors || ['Classic Black', 'Sand', 'Dusty Rose'],
      }));

      set({ products: normalizedData, isLoading: false });
    } catch (e: any) {
      console.error('Fetch products failed:', e);
      set({ error: e.message, isLoading: false });
    }
  },
}));
