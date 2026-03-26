import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Colors, Spacing, Typography } from '../constants/theme';
import { categories as mockCategories, products as mockProducts } from '../services/mockData';
import { ProductCard } from '../components/ProductCard';
import { useProductStore } from '../store/useProductStore';
import { Filter, SortAsc, LayoutGrid, List } from 'lucide-react-native';
import api from '../services/api';
import { ActivityIndicator, Dimensions } from 'react-native';

export const CategoryScreen: React.FC<any> = ({ navigation }) => {
  const [categories, setCategories] = useState<any[]>(mockCategories);
  const [selectedCategory, setSelectedCategory] = useState(mockCategories[0].name);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const { products, fetchProducts, isLoading } = useProductStore();

  useEffect(() => {
    const loadCategories = async () => {
        try {
            const res = await api.get('/categories');
            setCategories(res.data);
            if (res.data.length > 0) setSelectedCategory(res.data[0].name);
        } catch (e) {
            console.error('Failed to load categories', e);
        }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    fetchProducts({ category: selectedCategory });
  }, [selectedCategory]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Tabs */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Collections</Text>
        <View style={styles.filterRow}>
          <TouchableOpacity style={styles.filterBtn}>
            <Filter size={18} color={Colors.onSurface} strokeWidth={1.5} />
            <Text style={styles.filterText}>Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterBtn}>
            <SortAsc size={18} color={Colors.onSurface} strokeWidth={1.5} />
            <Text style={styles.filterText}>Sort</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.viewToggle}
            onPress={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          >
            {viewMode === 'grid' ? (
              <LayoutGrid size={20} color={Colors.onSurface} />
            ) : (
              <List size={20} color={Colors.onSurface} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsScroll}>
          {categories.map((cat) => (
            <TouchableOpacity 
              key={cat.id} 
              onPress={() => setSelectedCategory(cat.name)}
              style={[
                styles.tab,
                selectedCategory === cat.name && styles.activeTab
              ]}
            >
              <Text style={[
                styles.tabText,
                selectedCategory === cat.name && styles.activeTabText
              ]}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Product List */}
      <FlatList
        data={products}
        numColumns={viewMode === 'grid' ? 2 : 1}
        key={viewMode}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard 
            product={item} 
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
            style={viewMode === 'list' ? styles.listProduct : styles.gridProduct}
          />
        )}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={viewMode === 'grid' ? styles.columnWrapper : null}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={isLoading ? <ActivityIndicator size="large" color={Colors.primary} style={{ margin: 20 }} /> : null}
        ListEmptyComponent={
          !isLoading && (
            <View style={styles.emptyList}>
              <Text style={styles.emptyText}>No products found in this category.</Text>
            </View>
          )
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
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  headerTitle: {
    fontFamily: Typography.fonts.display,
    fontSize: 28,
    color: Colors.onSurface,
    marginBottom: Spacing.md,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.surfaceVariant,
    gap: 8,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.onSurface,
  },
  viewToggle: {
    marginLeft: 'auto',
    backgroundColor: Colors.surface,
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.surfaceVariant,
  },
  tabsContainer: {
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceVariant,
  },
  tabsScroll: {
    paddingLeft: Spacing.lg,
  },
  tab: {
    marginRight: 24,
    paddingVertical: 8,
    position: 'relative',
  },
  tabText: {
    fontSize: 16,
    fontFamily: Typography.fonts.title,
    color: Colors.onSurfaceVariant,
  },
  activeTab: {
    // Styling for active tab if needed
  },
  activeTabText: {
    color: Colors.primary,
    fontWeight: '700',
  },
  listContent: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
    paddingBottom: 100,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  gridProduct: {
    width: (Dimensions.get('window').width - Spacing.md * 3) / 2,
  },
  listProduct: {
    width: '100%',
    aspectRatio: 16 / 9, // Wider view for list mode
  },
  emptyList: {
    marginTop: 100,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: Typography.fonts.body,
    color: Colors.onSurfaceVariant,
  },
});
