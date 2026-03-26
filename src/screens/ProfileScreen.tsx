import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Colors, Spacing, Typography } from '../constants/theme';
import { useWishlistStore } from '../store/useWishlistStore';
import { Image } from 'expo-image';
import { Settings, CreditCard, MapPin, Package, Heart, Ruler, LogOut, ChevronRight } from 'lucide-react-native';

export const ProfileScreen: React.FC<any> = ({ navigation }) => {
  const { user, logout } = useAuthStore();
  const { items: wishlistItems } = useWishlistStore();

  const menuItems = [
    { id: '1', title: 'My Orders', icon: Package, subtitle: 'Track your deliveries', screen: 'Orders' },
    { id: '2', title: 'Wishlist', icon: Heart, subtitle: `${wishlistItems.length} items saved`, screen: 'Wishlist' },
    { id: '3', title: 'Saved Addresses', icon: MapPin, subtitle: 'Home, Office', screen: 'Addresses' },
    { id: '4', title: 'Size Profile', icon: Ruler, subtitle: 'Custom measurements', screen: 'CustomTailoring' },
    { id: '5', title: 'Payment Methods', icon: CreditCard, subtitle: 'Apple Pay, Card', screen: 'Payment' },
    { id: '6', title: 'Settings', icon: Settings, subtitle: 'Language, Privacy', screen: 'Settings' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.header}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format' }} 
            style={styles.avatar} 
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.name || 'Ahmed Al-Farsi'}</Text>
            <Text style={styles.userEmail}>{user?.email || 'ahmed@example.com'}</Text>
            <TouchableOpacity style={styles.editBtn}>
              <Text style={styles.editBtnText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={item.id} 
              onPress={() => item.screen && navigation.navigate(item.screen)}
              style={[
                styles.menuItem,
                index === 0 && styles.firstItem,
                index === menuItems.length - 1 && styles.lastItem
              ]}
            >
              <View style={styles.menuIconBox}>
                <item.icon size={20} color={Colors.primary} strokeWidth={1.5} />
              </View>
              <View style={styles.menuTextBox}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <ChevronRight size={18} color={Colors.onSurfaceVariant} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <LogOut size={20} color={Colors.error} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={{ height: 120 }} />
      </ScrollView>
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
    padding: Spacing.huge,
    backgroundColor: Colors.surface,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: Colors.primaryContainer,
  },
  userInfo: {
    marginLeft: 20,
    flex: 1,
  },
  userName: {
    fontFamily: Typography.fonts.display,
    fontSize: 22,
    color: Colors.onSurface,
  },
  userEmail: {
    fontFamily: Typography.fonts.body,
    fontSize: 14,
    color: Colors.onSurfaceVariant,
    marginTop: 2,
  },
  editBtn: {
    marginTop: 10,
    backgroundColor: Colors.surfaceVariant,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  editBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.onSurface,
  },
  menuContainer: {
    padding: Spacing.lg,
    marginTop: Spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: 16,
    marginBottom: 2,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceVariant,
  },
  firstItem: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  lastItem: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    borderBottomWidth: 0,
  },
  menuIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surfaceVariant,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTextBox: {
    flex: 1,
    marginLeft: 16,
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: Typography.fonts.title,
  },
  menuSubtitle: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    fontFamily: Typography.fonts.body,
    marginTop: 2,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    gap: 8,
    paddingVertical: 12,
  },
  logoutText: {
    fontFamily: Typography.fonts.headline,
    fontSize: 16,
    color: Colors.error,
    fontWeight: '700',
  },
});
