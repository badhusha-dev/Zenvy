import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import { Colors, Spacing, Typography } from '../constants/theme';
import { CustomButton } from '../components/CustomButton';
import { InputField } from '../components/InputField';
import { useAuthStore } from '../store/useAuthStore';
import { Image } from 'expo-image';

const { height } = Dimensions.get('window');

export const LoginScreen: React.FC<any> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuthStore();

  const handleSendOtp = () => {
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowOtp(true);
    }, 1500);
  };

  const handleVerify = async () => {
    if (!otp) return;
    setLoading(true);
    await login(email, otp);
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1583391733956-6c70233b5fc3?auto=format' }} 
            style={styles.heroImg}
          />
          
          <View style={styles.formCard}>
            <Text style={styles.title}>Welcome to{'\n'}The Ethereal Atelier</Text>
            <Text style={styles.subtitle}>Enter your details to explore luxury modest fashion.</Text>

            {!showOtp ? (
              <>
                <InputField
                  label="Email or Mobile Number"
                  placeholder="name@email.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />
                <CustomButton
                  title="Send One-Time Code"
                  onPress={handleSendOtp}
                  loading={loading}
                  style={styles.btn}
                />
              </>
            ) : (
              <>
                <InputField
                  label="Verification Code"
                  placeholder="0000"
                  value={otp}
                  onChangeText={setOtp}
                  keyboardType="numeric"
                />
                <CustomButton
                  title="Verify & Enter"
                  onPress={handleVerify}
                  loading={loading}
                  style={styles.btn}
                />
                <TouchableOpacity onPress={() => setShowOtp(false)} style={styles.resendBtn}>
                  <Text style={styles.resendText}>Didn't receive code? Resend</Text>
                </TouchableOpacity>
              </>
            )}

            <View style={styles.footer}>
              <Text style={styles.footerText}>New here?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.signupText}>Join the Atelier</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
    flex: 1,
    paddingHorizontal: Spacing.lg,
    justifyContent: 'center',
  },
  heroImg: {
    width: '100%',
    height: height * 0.3,
    borderRadius: 30,
    marginBottom: Spacing.xl,
  },
  formCard: {
    backgroundColor: Colors.surface,
    padding: Spacing.xl,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.surfaceVariant,
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  title: {
    fontFamily: Typography.fonts.display,
    fontSize: 28,
    color: Colors.onSurface,
    lineHeight: 34,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: Typography.fonts.body,
    fontSize: 14,
    color: Colors.onSurfaceVariant,
    marginBottom: Spacing.xl,
    textAlign: 'center',
  },
  btn: {
    marginTop: Spacing.md,
  },
  resendBtn: {
    marginTop: Spacing.md,
    alignItems: 'center',
  },
  resendText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing.xl,
    gap: 8,
  },
  footerText: {
    color: Colors.onSurfaceVariant,
    fontSize: 14,
  },
  signupText: {
    color: Colors.primary,
    fontWeight: '700',
    fontSize: 14,
  },
});
