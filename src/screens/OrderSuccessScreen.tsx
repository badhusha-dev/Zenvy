import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Colors, Spacing, Typography } from '../constants/theme';
import { CustomButton } from '../components/CustomButton';
import { CheckCircle, Package, ArrowRight } from 'lucide-react-native';
import { Image } from 'expo-image';

const { width } = Dimensions.get('window');

export const OrderSuccessScreen: React.FC<any> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <CheckCircle size={80} color={Colors.primary} fill={Colors.primaryContainer} strokeWidth={1} />
        </View>
        
        <Text style={styles.title}>Alhamdulillah,{'\n'}Your Order is Confirmed!</Text>
        <Text style={styles.subtitle}>Order ID: #ORD-123498</Text>
        <Text style={styles.desc}>Our master tailors are already preparing your selected pieces. You'll receive an update once they are dispatched.</Text>

        <View style={styles.card}>
           <Package size={24} color={Colors.primary} />
           <View style={styles.cardInner}>
             <Text style={styles.cardTitle}>Estimated Delivery</Text>
             <Text style={styles.cardVal}>3 - 5 Business Days</Text>
           </View>
        </View>

        <View style={styles.footer}>
          <CustomButton 
            title="Track My Order" 
            onPress={() => navigation.navigate('MainTabs', { screen: 'ProfileTab' })}
            style={styles.trackBtn}
          />
          <TouchableOpacity 
            style={styles.continueBtn}
            onPress={() => navigation.navigate('MainTabs', { screen: 'HomeTab' })}
          >
            <Text style={styles.continueText}>Continue Shopping</Text>
            <ArrowRight size={18} color={Colors.onSurfaceVariant} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    padding: Spacing.huge,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: Colors.surfaceVariant,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
  },
  title: {
    fontFamily: Typography.fonts.display,
    fontSize: 26,
    color: Colors.onSurface,
    textAlign: 'center',
    lineHeight: 34,
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: Typography.fonts.headline,
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '700',
    marginBottom: Spacing.lg,
  },
  desc: {
    fontFamily: Typography.fonts.body,
    fontSize: 15,
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: Spacing.xl,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.surfaceVariant,
    width: '100%',
    gap: 16,
  },
  cardInner: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 13,
    color: Colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  cardVal: {
    fontSize: 16,
    color: Colors.onSurface,
    fontWeight: '700',
    marginTop: 4,
  },
  footer: {
    marginTop: 40,
    width: '100%',
    gap: 20,
  },
  trackBtn: {
    width: '100%',
  },
  continueBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  continueText: {
    fontSize: 14,
    color: Colors.onSurfaceVariant,
    fontWeight: '600',
  },
});
