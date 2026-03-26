import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Colors, Spacing, Typography } from '../constants/theme';
import { useCartStore } from '../store/useCartStore';
import { Image } from 'expo-image';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react-native';
import { CustomButton } from '../components/CustomButton';

export const CartScreen: React.FC<any> = ({ navigation }) => {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();
  const total = getTotal();

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <View style={styles.emptyIcon}>
          <ShoppingBag size={64} color={Colors.outlineVariant} />
        </View>
        <Text style={styles.emptyTitle}>Your Bag is Empty</Text>
        <Text style={styles.emptySubtitle}>Explore our latest collections and find your signature style.</Text>
        <CustomButton 
          title="Start Shopping" 
          onPress={() => navigation.navigate('HomeTab')} 
          style={styles.exploreBtn}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Shopping Bag</Text>
        <Text style={styles.itemCount}>{items.length} Items</Text>
      </View>

      <ScrollView style={styles.itemList} showsVerticalScrollIndicator={false}>
        {items.map((item, index) => (
          <View key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} style={styles.cartItem}>
            <Image source={{ uri: item.images[0] }} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                <TouchableOpacity onPress={() => removeItem(item.id, item.selectedSize, item.selectedColor)}>
                  <Trash2 size={18} color={Colors.error} />
                </TouchableOpacity>
              </View>
              <Text style={styles.itemDetails}>
                Size: {item.selectedSize}  |  Color: {item.selectedColor}
              </Text>
              <View style={styles.itemFooter}>
                <Text style={styles.itemPrice}>{item.price.toLocaleString()} AED</Text>
                <View style={styles.quantityControl}>
                  <TouchableOpacity 
                    style={styles.qtyBtn}
                    onPress={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                  >
                    <Minus size={14} color={Colors.onSurface} />
                  </TouchableOpacity>
                  <Text style={styles.qtyText}>{item.quantity}</Text>
                  <TouchableOpacity 
                    style={styles.qtyBtn}
                    onPress={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                  >
                    <Plus size={14} color={Colors.onSurface} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}
        <View style={{ height: 150 }} />
      </ScrollView>

      {/* Summary Footer */}
      <View style={styles.summaryFooter}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>{total.toLocaleString()} AED</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Shipping</Text>
          <Text style={styles.summaryValue}>Calculated at checkout</Text>
        </View>
        <View style={[styles.summaryRow, { marginTop: 12 }]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>{total.toLocaleString()} AED</Text>
        </View>
        <CustomButton 
          title="Proceed to Checkout" 
          onPress={() => navigation.navigate('Checkout')}
          style={styles.checkoutBtn}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceVariant,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  headerTitle: {
    fontFamily: Typography.fonts.display,
    fontSize: 24,
    color: Colors.onSurface,
  },
  itemCount: {
    fontSize: 14,
    color: Colors.onSurfaceVariant,
    fontFamily: Typography.fonts.body,
  },
  itemList: {
    padding: Spacing.lg,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 12,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.surfaceVariant,
  },
  itemImage: {
    width: 90,
    height: 110,
    borderRadius: 12,
    backgroundColor: Colors.surfaceVariant,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'space-between',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontFamily: Typography.fonts.title,
    fontSize: 16,
    color: Colors.onSurface,
    maxWidth: '85%',
  },
  itemDetails: {
    fontFamily: Typography.fonts.body,
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    marginTop: 4,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  itemPrice: {
    fontFamily: Typography.fonts.headline,
    fontSize: 15,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceVariant,
    borderRadius: 20,
    padding: 2,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    marginHorizontal: 12,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.onSurface,
  },
  summaryFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.glass,
    padding: Spacing.lg,
    paddingBottom: Platform.OS === 'ios' ? 100 : 80, // Space for tab bar
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.05,
        shadowRadius: 20,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: Colors.onSurfaceVariant,
    fontFamily: Typography.fonts.body,
  },
  summaryValue: {
    fontSize: 14,
    color: Colors.onSurface,
    fontWeight: '600',
  },
  totalLabel: {
    fontSize: 18,
    fontFamily: Typography.fonts.headline,
    color: Colors.onSurface,
  },
  totalValue: {
    fontSize: 22,
    fontFamily: Typography.fonts.headline,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  checkoutBtn: {
    marginTop: Spacing.lg,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.huge,
  },
  emptyIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.surfaceVariant,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
  },
  emptyTitle: {
    fontFamily: Typography.fonts.display,
    fontSize: 24,
    color: Colors.onSurface,
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontFamily: Typography.fonts.body,
    fontSize: 14,
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: Spacing.xl,
  },
  exploreBtn: {
    paddingHorizontal: 40,
  },
});
