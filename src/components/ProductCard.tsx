import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ViewStyle,
  Platform,
} from 'react-native';
import { Colors, Spacing, Typography } from '../constants/theme';
import { Product } from '../types';
import { Image } from 'expo-image';
import { Heart } from 'lucide-react-native';
import { useWishlistStore } from '../store/useWishlistStore';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
  style?: ViewStyle;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - Spacing.md * 3) / 2;

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  style,
}) => {
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const isWished = isInWishlist(product.id);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.container, style]}
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.images[0] }}
          style={styles.image}
          contentFit="cover"
          transition={500}
        />
        <TouchableOpacity
          style={styles.wishBtn}
          onPress={() => toggleWishlist(product)}
        >
          <Heart
            size={20}
            color={isWished ? Colors.error : Colors.onSurfaceVariant}
            fill={isWished ? Colors.error : 'transparent'}
          />
        </TouchableOpacity>
        {product.isTrending && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>TRENDING</Text>
          </View>
        )}
      </View>
      <View style={styles.info}>
        <Text style={styles.designer}>{product.designer.name}</Text>
        <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
        <Text style={styles.price}>{product.price.toLocaleString()} AED</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    backgroundColor: Colors.surface,
    marginBottom: Spacing.md,
    borderRadius: 20, // XL roundness as per design
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 3 / 4, // Editorial 3:4 aspect ratio
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: Colors.surfaceVariant,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  wishBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 9999,
    padding: 6,
  },
  badge: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: Colors.primary,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  badgeText: {
    color: Colors.onPrimary,
    fontSize: Typography.sizes.tiny,
    fontFamily: Typography.fonts.label,
    letterSpacing: 1,
  },
  info: {
    padding: Spacing.sm,
  },
  designer: {
    fontFamily: Typography.fonts.label,
    fontSize: 10,
    color: Colors.onSurfaceVariant,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  name: {
    fontFamily: Typography.fonts.title,
    fontSize: Typography.sizes.body,
    color: Colors.onSurface,
    marginTop: 2,
  },
  price: {
    fontFamily: Typography.fonts.headline,
    fontSize: Typography.sizes.small,
    color: Colors.primary,
    fontWeight: '700',
    marginTop: 4,
  },
});
