import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { Colors, Spacing, Typography } from '../constants/theme';
import { Product } from '../types';
import { Image } from 'expo-image';
import { Heart, Star, ShoppingBag, Ruler, ArrowLeft } from 'lucide-react-native';
import { CustomButton } from '../components/CustomButton';
import { useCartStore } from '../store/useCartStore';
import { useWishlistStore } from '../store/useWishlistStore';

const { width } = Dimensions.get('window');

export const ProductDetailScreen: React.FC<any> = ({ route, navigation }) => {
  const { product } = route.params as { product: Product };
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  
  const { addItem } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const isWished = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem(product, 1, selectedSize, selectedColor);
    navigation.navigate('CartTab');
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        {/* Header / Image Carousel */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: product.images[0] }} 
            style={styles.image} 
            contentFit="cover"
          />
          <SafeAreaView style={styles.headerBtns}>
            <TouchableOpacity 
              onPress={() => navigation.goBack()} 
              style={styles.circleBtn}
            >
              <ArrowLeft size={24} color={Colors.onSurface} />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => toggleWishlist(product)} 
              style={styles.circleBtn}
            >
              <Heart 
                size={24} 
                color={isWished ? Colors.error : Colors.onSurface} 
                fill={isWished ? Colors.error : 'transparent'} 
              />
            </TouchableOpacity>
          </SafeAreaView>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.mainInfo}>
            <Text style={styles.designer}>{product.designer.name}</Text>
            <View style={styles.titleRow}>
              <Text style={styles.title}>{product.name}</Text>
              <Text style={styles.price}>{product.price.toLocaleString()} AED</Text>
            </View>
            <View style={styles.ratingRow}>
              <Star size={16} color={Colors.primary} fill={Colors.primary} />
              <Text style={styles.ratingText}>{product.rating} ({product.reviewsCount} reviews)</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Color Selector */}
          <Text style={styles.sectionTitle}>Select Color</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.colorRow}>
            {product.colors.map(color => (
              <TouchableOpacity 
                key={color} 
                onPress={() => setSelectedColor(color)}
                style={[
                  styles.colorChip,
                  selectedColor === color && styles.selectedAttrChip
                ]}
              >
                <Text style={[
                  styles.attrText,
                  selectedColor === color && styles.selectedAttrText
                ]}>{color}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Size Selector */}
          <View style={[styles.titleRow, { marginTop: Spacing.lg }]}>
            <Text style={styles.sectionTitle}>Select Size</Text>
            <TouchableOpacity style={styles.sizeGuideBtn}>
              <Ruler size={16} color={Colors.primary} />
              <Text style={styles.sizeGuideText}>Size Guide</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sizeRow}>
            {product.sizes.map(size => (
              <TouchableOpacity 
                key={size} 
                onPress={() => setSelectedSize(size)}
                style={[
                  styles.sizeChip,
                  selectedSize === size && styles.selectedAttrChip
                ]}
              >
                <Text style={[
                  styles.attrText,
                  selectedSize === size && styles.selectedAttrText
                ]}>{size}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Description */}
          <Text style={styles.sectionTitle}>The Designer's Vision</Text>
          <Text style={styles.description}>{product.description}</Text>

          {/* Customization Promo */}
          <View style={styles.customCard}>
             <View style={{ flex: 1 }}>
               <Text style={styles.customTitle}>Tailored for You</Text>
               <Text style={styles.customSubtitle}>Need adjustment? Choose Custom Tailoring for a perfect fit.</Text>
             </View>
             <TouchableOpacity 
               style={styles.customBtn}
               onPress={() => navigation.navigate('CustomTailoring', { product })}
             >
               <Text style={styles.customBtnText}>Customize</Text>
             </TouchableOpacity>
          </View>

          {/* AR Try On */}
          <TouchableOpacity 
            style={styles.arBtn}
            onPress={() => navigation.navigate('ARTryOn')}
          >
            <Text style={styles.arBtnText}>View in AR Mode</Text>
          </TouchableOpacity>

          <View style={{ height: 120 }} />
        </View>
      </ScrollView>

      {/* Floating Action Bar */}
      <View style={styles.actionBar}>
        <CustomButton 
          title="Add to Bag" 
          onPress={handleAddToCart}
          style={styles.addBtn}
          icon={<ShoppingBag size={20} color={Colors.onPrimary} style={{ marginRight: 8 }} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  imageContainer: {
    width: width,
    height: width * 1.3,
    backgroundColor: Colors.surfaceVariant,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  headerBtns: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  circleBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    padding: Spacing.lg,
  },
  mainInfo: {
    marginBottom: Spacing.md,
  },
  designer: {
    fontFamily: Typography.fonts.label,
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: 8,
  },
  title: {
    fontFamily: Typography.fonts.display,
    fontSize: 24,
    color: Colors.onSurface,
    flex: 1,
    marginRight: 8,
  },
  price: {
    fontFamily: Typography.fonts.headline,
    fontSize: 20,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    color: Colors.onSurfaceVariant,
    fontFamily: Typography.fonts.body,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.surfaceVariant,
    marginVertical: Spacing.lg,
  },
  sectionTitle: {
    fontFamily: Typography.fonts.headline,
    fontSize: 16,
    color: Colors.onSurface,
    marginBottom: Spacing.md,
  },
  colorRow: {
    marginBottom: Spacing.sm,
  },
  colorChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.surfaceVariant,
    marginRight: 10,
  },
  sizeRow: {
    marginBottom: Spacing.lg,
  },
  sizeChip: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.surfaceVariant,
    marginRight: 12,
  },
  selectedAttrChip: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  attrText: {
    fontFamily: Typography.fonts.body,
    color: Colors.onSurface,
    fontWeight: '600',
  },
  selectedAttrText: {
    color: Colors.onPrimary,
  },
  sizeGuideBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sizeGuideText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '600',
  },
  description: {
    fontFamily: Typography.fonts.body,
    fontSize: 15,
    color: Colors.onSurfaceVariant,
    lineHeight: 24,
    marginBottom: Spacing.xl,
  },
  customCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceVariant,
    padding: Spacing.lg,
    borderRadius: 24,
    marginBottom: Spacing.md,
  },
  customTitle: {
    fontFamily: Typography.fonts.headline,
    fontSize: 18,
    color: Colors.onSurface,
    marginBottom: 4,
  },
  customSubtitle: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    lineHeight: 18,
  },
  customBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  customBtnText: {
    color: Colors.onPrimary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  arBtn: {
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderStyle: 'dashed',
  },
  arBtnText: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.glass,
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    paddingHorizontal: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.surfaceVariant,
  },
  addBtn: {
    width: '100%',
  },
});
