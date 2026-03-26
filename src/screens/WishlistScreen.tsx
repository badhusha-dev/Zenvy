import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Colors, Spacing, Typography } from '../constants/theme';
import { useWishlistStore } from '../store/useWishlistStore';
import { ProductCard } from '../components/ProductCard';
import { ArrowLeft, Heart } from 'lucide-react-native';

export const WishlistScreen: React.FC<any> = ({ navigation }) => {
  const { items } = useWishlistStore();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ArrowLeft size={24} color={Colors.onSurface} strokeWidth={1.5} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Wishlist</Text>
      </View>

      <FlatList
        data={items}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard 
            product={item} 
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
            style={styles.productCard}
          />
        )}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.iconCircle}>
                <Heart size={40} color={Colors.primary} strokeWidth={1} />
            </View>
            <Text style={styles.emptyTitle}>Your wishlist is empty</Text>
            <Text style={styles.emptySubtitle}>Save your favorite items here for later.</Text>
            <TouchableOpacity 
                style={styles.browseBtn}
                onPress={() => navigation.navigate('HomeTab')}
            >
                <Text style={styles.browseText}>Start Shopping</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: 16,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.surfaceVariant,
  },
  headerTitle: {
    fontFamily: Typography.fonts.display,
    fontSize: 24,
    color: Colors.onSurface,
  },
  listContent: {
    padding: Spacing.md,
    paddingBottom: 40,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  productCard: {
    width: (Dimensions.get('window').width - Spacing.md * 3) / 2,
    marginBottom: Spacing.md,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
    paddingHorizontal: 40,
  },
  iconCircle: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: Colors.primaryContainer,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 24,
  },
  emptyTitle: {
    fontFamily: Typography.fonts.title,
    fontSize: 20,
    color: Colors.onSurface,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontFamily: Typography.fonts.body,
    fontSize: 14,
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    marginTop: 8,
  },
  browseBtn: {
      marginTop: 32,
      backgroundColor: Colors.primary,
      paddingVertical: 14,
      paddingHorizontal: 32,
      borderRadius: 25,
  },
  browseText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
  }
});
