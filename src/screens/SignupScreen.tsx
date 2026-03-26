import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { Colors, Spacing, Typography } from '../constants/theme';
import { CustomButton } from '../components/CustomButton';
import { InputField } from '../components/InputField';
import { useAuthStore } from '../store/useAuthStore';
import { ArrowLeft, User, ShieldCheck } from 'lucide-react-native';

export const SignupScreen: React.FC<any> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signup } = useAuthStore();

  const handleSignup = async () => {
    if (!name || !email || !password) {
        Alert.alert('Error', 'Please fill all fields');
        return;
    }
    setLoading(true);
    try {
        await signup(name, email, password);
    } catch (e: any) {
        Alert.alert('Signup Failed', e.response?.data?.message || 'Check your internet or try another email.');
    } finally {
        setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.content}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <ArrowLeft size={24} color={Colors.onSurface} />
          </TouchableOpacity>

          <View style={styles.welcomeBox}>
            <Text style={styles.title}>Join the Atelier</Text>
            <Text style={styles.subtitle}>Create your profile to access exclusive modular designs and custom tailoring services.</Text>
          </View>
          
          <View style={styles.formBox}>
            <InputField
              label="Full name"
              placeholder="Amira Al-Maktoum"
              value={name}
              onChangeText={setName}
            />
            <InputField
              label="Email Address"
              placeholder="amira@me.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <InputField
              label="Password"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            
            <View style={styles.termsBox}>
               <ShieldCheck size={16} color={Colors.onSurfaceVariant} />
               <Text style={styles.termsText}>
                 I agree to the Terms of Service and Privacy Policy of The Ethereal Atelier.
               </Text>
            </View>

            <CustomButton
              title="Create Account"
              onPress={handleSignup}
              loading={loading}
              style={styles.btn}
            />

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginText}>Sign In</Text>
              </TouchableOpacity>
            </View>
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
  keyboardView: {
    flex: 1,
  },
  content: {
    padding: Spacing.lg,
    paddingTop: 20,
    paddingBottom: 40,
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
    marginBottom: 20,
  },
  welcomeBox: {
    marginBottom: 40,
  },
  title: {
    fontFamily: Typography.fonts.display,
    fontSize: 32,
    color: Colors.onSurface,
    lineHeight: 40,
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: Typography.fonts.body,
    fontSize: 15,
    color: Colors.onSurfaceVariant,
    lineHeight: 24,
  },
  formBox: {
    backgroundColor: Colors.glass,
    padding: 24,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.surfaceVariant,
  },
  btn: {
    marginTop: 32,
  },
  termsBox: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
    paddingHorizontal: 4,
  },
  termsText: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    lineHeight: 18,
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
    gap: 8,
  },
  footerText: {
    color: Colors.onSurfaceVariant,
    fontSize: 14,
  },
  loginText: {
    color: Colors.primary,
    fontWeight: '700',
    fontSize: 14,
  },
});
