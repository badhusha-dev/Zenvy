import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Colors, Spacing, Typography } from '../constants/theme';
import { ArrowLeft, Package, Clock, CheckCircle, XCircle } from 'lucide-react-native';
import api from '../services/api';
import { useAuthStore } from '../store/useAuthStore';

export const OrdersScreen: React.FC<any> = ({ navigation }) => {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthStore();

  const fetchOrders = async () => {
    try {
      const res = await api.get(`/orders/user/${user?.id}`);
      setOrders(res.data);
    } catch (e) {
      console.error('Failed to fetch orders', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PAID': return <CheckCircle size={16} color={Colors.primary} />;
      case 'PENDING': return <Clock size={16} color={Colors.warning} />;
      case 'FAILED': return <XCircle size={16} color={Colors.error} />;
      default: return <Package size={16} color={Colors.onSurfaceVariant} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ArrowLeft size={24} color={Colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
      </View>

      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <Text style={styles.orderId}>Order #{item.id}</Text>
                <View style={styles.statusBadge}>
                   {getStatusIcon(item.status)}
                   <Text style={[styles.statusText, { color: item.status === 'PAID' ? Colors.primary : Colors.onSurfaceVariant }]}>
                     {item.status}
                   </Text>
                </View>
              </View>
              
              <View style={styles.orderDetails}>
                 <Text style={styles.detailText}>{item.items?.length || 0} Items</Text>
                 <Text style={styles.orderTotal}>AED {item.totalPrice?.toFixed(2)}</Text>
              </View>
              
              <Text style={styles.dateText}>Placed on {new Date(item.createdAt).toLocaleDateString()}</Text>
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
                <Package size={60} color={Colors.surfaceVariant} />
                <Text style={styles.emptyTitle}>No orders yet</Text>
                <Text style={styles.emptySubtitle}>When you place an order, it will appear here.</Text>
            </View>
          }
        />
      )}
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
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  listContent: {
    padding: Spacing.lg,
  },
  orderCard: {
    backgroundColor: Colors.surface,
    padding: 20,
    borderRadius: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.surfaceVariant,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.background,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: Colors.surfaceVariant,
    paddingTop: 12,
  },
  detailText: {
    fontSize: 14,
    color: Colors.onSurfaceVariant,
  },
  orderTotal: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.primary,
  },
  dateText: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    marginTop: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 20,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.onSurfaceVariant,
    marginTop: 8,
  }
});
