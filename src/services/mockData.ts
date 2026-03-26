import { Category, Product, Designer, Review, Address, Order } from '../types';

export const designers: Designer[] = [
  { id: '1', name: 'Al-Atelier', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200', bio: 'Modest luxury since 2012' },
  { id: '2', name: 'Zahra Collection', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200', bio: 'Contemporary Abayas' },
  { id: '3', name: 'Noor Designs', avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=200', bio: 'Handcrafted Hijabs' },
];

export const reviews: Review[] = [
  { id: '1', userName: 'Leila K.', rating: 5, comment: 'Exquisite quality and perfect length.', date: '2024-03-24' },
  { id: '2', userName: 'Amina M.', rating: 4, comment: 'Love the fabric, very breathable for summer.', date: '2024-03-22' },
];

export const categories: Category[] = [
  { id: '1', name: 'Abayas', icon: 'shirt', slug: 'abayas' },
  { id: '2', name: 'Hijabs', icon: 'scarf', slug: 'hijabs' },
  { id: '3', name: 'Dresses', icon: 'dresses', slug: 'dresses' },
  { id: '4', name: 'Thobes', icon: 'thobes', slug: 'thobes' },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Midnight Silk Abaya',
    price: 4500,
    description: 'A luxurious flowing Abaya made from the finest Saudi silk. Features intricate gold embroidery on the sleeves.',
    images: ['https://images.unsplash.com/photo-1583391733956-6c70233b5fc3?auto=format&fit=crop&q=80&w=600'],
    category: 'Abayas',
    designer: designers[0],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Deep Blue'],
    rating: 4.8,
    reviewsCount: 124,
    reviews: reviews,
    isFeatured: true,
    isTrending: true,
    isRecommended: false,
  },
  {
    id: '2',
    name: 'Desert Bloom Hijab',
    price: 150,
    description: 'Lightweight chiffon hijab with a subtle floral print inspired by the desert dawn.',
    images: ['https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600'],
    category: 'Hijabs',
    designer: designers[2],
    sizes: ['Standard'],
    colors: ['Sand', 'Dune', 'Rose'],
    rating: 4.5,
    reviewsCount: 89,
    reviews: reviews,
    isFeatured: false,
    isTrending: true,
    isRecommended: true,
  },
  {
    id: '3',
    name: 'Royal Linen Thobe',
    price: 3200,
    description: 'A premium linen thobe for men, offering maximum comfort and a traditional silhouette.',
    images: ['https://images.unsplash.com/photo-1606132007424-4f400780f2d9?auto=format&fit=crop&q=80&w=600'],
    category: 'Thobes',
    designer: designers[0],
    sizes: ['52', '54', '56', '58', '60'],
    colors: ['White', 'Off-White', 'Soft Grey'],
    rating: 4.9,
    reviewsCount: 45,
    reviews: reviews,
    isFeatured: true,
    isTrending: false,
    isRecommended: true,
  },
];

export const addresses: Address[] = [
  { id: '1', title: 'Home', address: 'Villa 12, Street 4, Jumeirah', city: 'Dubai', isDefault: true },
  { id: '2', title: 'Office', address: 'Floor 22, Emirates Towers', city: 'Dubai', isDefault: false },
];

export const orders: Order[] = [
  {
    id: 'ORD-1234',
    items: [
      { ...products[0], quantity: 1, selectedSize: 'M', selectedColor: 'Black' },
    ],
    totalAmount: 4500,
    status: 'DELIVERED',
    date: '2024-03-20',
  },
];
