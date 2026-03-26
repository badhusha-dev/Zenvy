import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { products, categories, designers, orders } from './mockData';

// Simulated API Service Layer
const useMock = false;

const api = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000,
});

// Configure Axios to include the JWT token in all requests
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('auth-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const productService = {
  getProducts: async () => {
    if (useMock) return new Promise((r) => setTimeout(() => r({ data: products }), 1000));
    return api.get('/products');
  },
  getProduct: async (id: string) => {
    if (useMock) return new Promise((r) => setTimeout(() => r({ data: products.find(p => p.id === id) }), 500));
    return api.get(`/products/${id}`);
  },
  getCategories: async () => {
    if (useMock) return new Promise((r) => setTimeout(() => r({ data: categories }), 300));
    return api.get('/categories');
  },
};

export const orderService = {
  getOrders: async () => {
    if (useMock) return new Promise((r) => setTimeout(() => r({ data: orders }), 800));
    return api.get('/orders');
  },
  placeOrder: async (orderData: any) => {
    if (useMock) return new Promise((r) => setTimeout(() => r({ data: { success: true, orderId: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase() } }), 1500));
    return api.post('/orders', orderData);
  },
};

export default api;
