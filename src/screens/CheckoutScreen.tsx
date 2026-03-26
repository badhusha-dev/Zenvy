import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { Colors, Spacing, Typography } from '../constants/theme';
import { CustomButton } from '../components/CustomButton';
import { ArrowLeft, CreditCard, Wallet, Banknote, ShieldCheck, MapPin } from 'lucide-react-native';
import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';
import { addresses } from '../services/mockData';
import api from '../services/api';

export const CheckoutScreen: React.FC<any> = ({ navigation }) => {
  const [selectedAddress, setSelectedAddress] = useState(addresses[0].id);
  const [paymentMethod, setPaymentMethod] = useState<'CARD' | 'COD' | 'WALLET'>('CARD');
  
  const { user } = useAuthStore();
  const { items, getTotal, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  
  const total = getTotal();

  useEffect(() => {
    if (items.length === 0) {
      Alert.alert('Empty Cart', 'Your cart is empty. Please add items before checking out.', [
        { text: 'Browse Products', onPress: () => navigation.navigate('HomeTab') },
      ]);
    }
  }, [items]);

  const handlePlaceOrder = async () => {
    if (!user) {
        Alert.alert('Error', 'User not authenticated.');
        return;
    }
    
    setLoading(true);
    try {
      const orderItems = items.map(item => ({
        productId: Number(item.id),
        quantity: item.quantity,
        price: item.price
      }));

      await api.post(`/orders?userId=${user.id}`, orderItems);
      
      clearCart();
      navigation.navigate('OrderSuccess');
    } catch (e: any) {
      console.error('Order placement failed:', e);
      Alert.alert('Error', 'Unable to place order. ' + (e.response?.data?.message || e.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color={Colors.onSurface} strokeWidth={1.5} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Review & Pay</Text>
        <ShieldCheck size={24} color={Colors.primary} strokeWidth={1.5} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Address Selection */}
        <View style={styles.sectionHeader}>
           <Text style={styles.sectionTitle}>Delivery Address</Text>
           <TouchableOpacity><Text style={styles.changeBtn}>Change</Text></TouchableOpacity>
        </View>
        <View style={styles.addressCard}>
          <MapPin size={20} color={Colors.primary} />
          <View style={styles.addressInfo}>
            <Text style={styles.addressTitle}>{addresses[0].title}</Text>
            <Text style={styles.addressText}>{addresses[0].address}, {addresses[0].city}</Text>
          </View>
        </View>

        {/* Payment Methods */}
        <Text style={[styles.sectionTitle, { marginTop: Spacing.xl, marginLeft: Spacing.lg }]}>Payment Method</Text>
        <View style={styles.paymentList}>
          <TouchableOpacity 
            onPress={() => setPaymentMethod('CARD')}
            style={[styles.payItem, paymentMethod === 'CARD' && styles.activePayItem]}
          >
            <CreditCard size={20} color={paymentMethod === 'CARD' ? Colors.primary : Colors.onSurfaceVariant} />
            <Text style={[styles.payText, paymentMethod === 'CARD' && styles.activePayText]}>Credit / Debit Card</Text>
            <View style={[styles.radio, paymentMethod === 'CARD' && styles.radioActive]} />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setPaymentMethod('WALLET')}
            style={[styles.payItem, paymentMethod === 'WALLET' && styles.activePayItem]}
          >
            <Wallet size={20} color={paymentMethod === 'WALLET' ? Colors.primary : Colors.onSurfaceVariant} />
            <Text style={[styles.payText, paymentMethod === 'WALLET' && styles.activePayText]}>Apple / Google Pay</Text>
            <View style={[styles.radio, paymentMethod === 'WALLET' && styles.radioActive]} />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setPaymentMethod('COD')}
            style={[styles.payItem, paymentMethod === 'COD' && styles.activePayItem]}
          >
            <Banknote size={20} color={paymentMethod === 'COD' ? Colors.primary : Colors.onSurfaceVariant} />
            <Text style={[styles.payText, paymentMethod === 'COD' && styles.activePayText]}>Cash on Delivery</Text>
            <View style={[styles.radio, paymentMethod === 'COD' && styles.radioActive]} />
          </TouchableOpacity>
        </View>

        {/* Price Breakdown */}
        <View style={styles.summaryCard}>
          <Text style={styles.sumTitle}>Order Summary</Text>
          <View style={styles.sumRow}>
            <Text style={styles.sumLabel}>Order Subtotal</Text>
            <Text style={styles.sumVal}>{total.toLocaleString()} AED</Text>
          </View>
          <View style={styles.sumRow}>
            <Text style={styles.sumLabel}>Local VAT (5%)</Text>
            <Text style={styles.sumVal}>{(total * 0.05).toLocaleString()} AED</Text>
          </View>
          <View style={styles.sumRow}>
            <Text style={styles.sumLabel}>Delivery Charge</Text>
            <Text style={[styles.sumVal, { color: Colors.primary }]}>Free</Text>
          </View>
          <View style={[styles.sumRow, { marginTop: 16, borderTopWidth: 1, borderTopColor: Colors.surfaceVariant, paddingTop: 16 }]}>
            <Text style={styles.totalLabel}>Total Payable</Text>
            <Text style={styles.totalVal}>{(total * 1.05).toLocaleString()} AED</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <CustomButton 
          title={`Pay ${ (total * 1.05).toLocaleString() } AED`} 
          onPress={handlePlaceOrder}
          loading={loading}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceVariant,
  },
  headerTitle: {
    fontFamily: Typography.fonts.headline,
    fontSize: 20,
    color: Colors.onSurface,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  changeBtn: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
  addressCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing.lg,
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.surfaceVariant,
    gap: 16,
  },
  addressInfo: {
    flex: 1,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  addressText: {
    fontSize: 14,
    color: Colors.onSurfaceVariant,
    marginTop: 4,
    lineHeight: 20,
  },
  paymentList: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.md,
    gap: 12,
  },
  payItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.surfaceVariant,
    gap: 12,
  },
  activePayItem: {
    borderColor: Colors.primaryContainer,
    backgroundColor: Colors.surface,
  },
  payText: {
    fontSize: 15,
    color: Colors.onSurface,
    flex: 1,
    fontFamily: Typography.fonts.body,
  },
  activePayText: {
    fontWeight: '700',
    color: Colors.primary,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.surfaceVariant,
  },
  radioActive: {
    borderColor: Colors.primary,
    backgroundColor: '#fff',
    borderWidth: 6,
  },
  summaryCard: {
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
    padding: 24,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.surfaceVariant,
  },
  sumTitle: {
    fontFamily: Typography.fonts.headline,
    fontSize: 18,
    color: Colors.onSurface,
    marginBottom: 20,
  },
  sumRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sumLabel: {
    fontSize: 14,
    color: Colors.onSurfaceVariant,
    fontFamily: Typography.fonts.body,
  },
  sumVal: {
    fontSize: 14,
    color: Colors.onSurface,
    fontWeight: '600',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.onSurface,
  },
  totalVal: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  footer: {
    padding: Spacing.lg,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.surfaceVariant,
  },
});
