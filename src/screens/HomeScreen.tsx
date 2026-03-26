import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Colors, Spacing, Typography } from '../constants/theme';
import { products as mockProducts, categories, designers } from '../services/mockData';
import { ProductCard } from '../components/ProductCard';
import { useAuthStore } from '../store/useAuthStore';
import { useProductStore } from '../store/useProductStore';
import { useWishlistStore } from '../store/useWishlistStore';
import { Image } from 'expo-image';
import { ChevronRight } from 'lucide-react-native';
import { ActivityIndicator } from 'react-native';

const { width } = Dimensions.get('window');

export const HomeScreen: React.FC<any> = ({ navigation }) => {
  const { user } = useAuthStore();
  const { products, fetchProducts, isLoading } = useProductStore();

  React.useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Salaam,</Text>
            <Text style={styles.userName}>{user?.name || 'Musallam'}</Text>
          </View>
          <TouchableOpacity style={styles.notificationBtn}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format' }} 
              style={styles.avatar} 
            />
          </TouchableOpacity>
        </View>

        {/* Banner Carousel */}
        <ScrollView 
          horizontal 
          pagingEnabled 
          showsHorizontalScrollIndicator={false} 
          style={styles.bannerContainer}
        >
          {[1, 2].map((i) => (
            <View key={i} style={styles.banner}>
              <Image 
                source={{ uri: `https://images.unsplash.com/photo-1583391733956-6c70233b5fc3?auto=format` }} 
                style={styles.bannerImg}
              />
              <View style={styles.bannerOverlay}>
                <Text style={styles.bannerTag}>NEW COLLECTION</Text>
                <Text style={styles.bannerTitle}>Ramadan Kareem{'\n'}Special Edit</Text>
                <TouchableOpacity style={styles.bannerBtn}>
                  <Text style={styles.bannerBtnText}>Shop Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Categories */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {categories.map((cat) => (
            <TouchableOpacity key={cat.id} style={styles.catItem}>
              <View style={styles.catIconContainer}>
                <Text style={{ fontSize: 24 }}>✨</Text>
              </View>
              <Text style={styles.catLabel}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Designers */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Designers</Text>
          <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.designerScroll}>
          {designers.map((designer) => (
            <TouchableOpacity key={designer.id} style={styles.designerCard}>
              <Image source={{ uri: designer.avatar }} style={styles.designerAvatar} />
              <Text style={styles.designerName}>{designer.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Trending */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trending Now</Text>
          <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
        </View>
        <View style={styles.productGrid}>
          {isLoading ? (
            <ActivityIndicator size="large" color={Colors.primary} style={{ marginVertical: 20 }} />
          ) : (
            products.filter(p => p.isTrending || products.length < 4).map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onPress={() => navigation.navigate('ProductDetail', { product })} 
              />
            ))
          )}
        </View>

        {/* Add more sections... */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
  },
  greeting: {
    fontFamily: Typography.fonts.body,
    fontSize: Typography.sizes.body,
    color: Colors.onSurfaceVariant,
  },
  userName: {
    fontFamily: Typography.fonts.display,
    fontSize: Typography.sizes.h1,
    color: Colors.onSurface,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: Colors.primaryContainer,
  },
  bannerContainer: {
    marginVertical: Spacing.md,
  },
  banner: {
    width: width - Spacing.lg * 2,
    marginHorizontal: Spacing.lg,
    height: 200,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  bannerImg: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: Spacing.lg,
    justifyContent: 'center',
  },
  bannerTag: {
    color: Colors.onPrimary,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 8,
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  bannerBtn: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  bannerBtnText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontFamily: Typography.fonts.headline,
    fontSize: Typography.sizes.h2,
    color: Colors.onSurface,
  },
  seeAll: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  categoryScroll: {
    paddingLeft: Spacing.lg,
  },
  catItem: {
    alignItems: 'center',
    marginRight: 24,
  },
  catIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.surfaceVariant,
  },
  catLabel: {
    fontSize: Typography.sizes.small,
    color: Colors.onSurface,
    fontWeight: '500',
  },
  designerScroll: {
    paddingLeft: Spacing.lg,
  },
  designerCard: {
    alignItems: 'center',
    marginRight: 20,
    backgroundColor: Colors.surface,
    padding: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.surfaceVariant,
  },
  designerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  designerName: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.onSurface,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.md,
    justifyContent: 'space-between',
  },
});
