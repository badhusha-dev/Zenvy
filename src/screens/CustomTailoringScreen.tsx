import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Colors, Spacing, Typography } from '../constants/theme';
import { Product } from '../types';
import { ArrowLeft, Ruler, Scissors, CheckCircle } from 'lucide-react-native';
import { InputField } from '../components/InputField';
import { CustomButton } from '../components/CustomButton';
import { useCartStore } from '../store/useCartStore';

export const CustomTailoringScreen: React.FC<any> = ({ route, navigation }) => {
  const { product } = route.params as { product: Product };
  
  const [chest, setChest] = useState('');
  const [waist, setWaist] = useState('');
  const [hips, setHips] = useState('');
  const [length, setLength] = useState('');
  const [notes, setNotes] = useState('');
  
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    if (!chest || !waist || !hips) {
        Alert.alert('Incomplete Measurements', 'Please provide at least Chest, Waist, and Hips for basic tailoring.');
        return;
    }
    
    const customConfig = `Custom: C:${chest} W:${waist} H:${hips} L:${length} | Notes: ${notes}`;
    addItem(product, 1, 'Custom', customConfig);
    
    Alert.alert(
        'Success', 
        'Your bespoke design has been added to the bag.',
        [{ text: 'View Bag', onPress: () => navigation.navigate('CartTab') }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.content}>
           <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                <ArrowLeft size={24} color={Colors.onSurface} strokeWidth={1.5} />
              </TouchableOpacity>
              <View>
                <Text style={styles.headerTitle}>Bespoke Tailoring</Text>
                <Text style={styles.headerSubtitle}>{product.name}</Text>
              </View>
           </View>

           <View style={styles.infoCard}>
              <Scissors size={24} color={Colors.primary} />
              <Text style={styles.infoText}>
                Our master tailors will hand-cut your garment according to these specific measurements for a flawless silhouette.
              </Text>
           </View>

           <View style={styles.form}>
              <Text style={styles.sectionTitle}>Required Measurements (cm)</Text>
              <View style={styles.inputRow}>
                 <InputField 
                    label="Chest" 
                    placeholder="92" 
                    value={chest} 
                    onChangeText={setChest} 
                    keyboardType="numeric"
                    style={{ flex: 1 }}
                 />
                 <InputField 
                    label="Waist" 
                    placeholder="74" 
                    value={waist} 
                    onChangeText={setWaist} 
                    keyboardType="numeric"
                    style={{ flex: 1 }}
                 />
              </View>
              <View style={styles.inputRow}>
                 <InputField 
                    label="Hips" 
                    placeholder="98" 
                    value={hips} 
                    onChangeText={setHips} 
                    keyboardType="numeric"
                    style={{ flex: 1 }}
                 />
                 <InputField 
                    label="Length" 
                    placeholder="145" 
                    value={length} 
                    onChangeText={setLength} 
                    keyboardType="numeric"
                    style={{ flex: 1 }}
                 />
              </View>

              <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Additional Instructions</Text>
              <InputField 
                 label="Notes for Tailor" 
                 placeholder="e.g. Add extra coverage for sleeves, hide zippers..." 
                 value={notes} 
                 onChangeText={setNotes} 
                 multiline
                 style={{ minHeight: 100 }}
              />

              <View style={styles.assuranceBox}>
                 <CheckCircle size={16} color={Colors.primary} />
                 <Text style={styles.assuranceText}>Free alterations included in your first measurement profile.</Text>
              </View>

              <CustomButton 
                title="Add Bespoke Order" 
                onPress={handleAddToCart}
                style={styles.submitBtn}
              />
           </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.lg,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 32,
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
  headerSubtitle: {
    fontSize: 14,
    color: Colors.onSurfaceVariant,
    fontFamily: Typography.fonts.body,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: Colors.primaryContainer,
    padding: 20,
    borderRadius: 24,
    gap: 16,
    alignItems: 'center',
    marginBottom: 32,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: Colors.onPrimaryContainer,
    lineHeight: 20,
    fontFamily: Typography.fonts.body,
  },
  form: {
    backgroundColor: Colors.glass,
    padding: 24,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.surfaceVariant,
  },
  sectionTitle: {
    fontFamily: Typography.fonts.headline,
    fontSize: 16,
    color: Colors.onSurface,
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 16,
  },
  assuranceBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 20,
    paddingHorizontal: 4,
  },
  assuranceText: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    fontFamily: Typography.fonts.body,
  },
  submitBtn: {
    marginTop: 32,
  }
});
