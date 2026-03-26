import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AppNavigator } from './src/navigation/AppNavigator';
import { useAuthStore } from './src/store/useAuthStore';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Colors } from './src/constants/theme';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const { checkAuth } = useAuthStore();
  const [appIsReady, setAppIsReady] = useState(false);
  
  // 1. Load Fonts
  const [fontsLoaded] = useFonts({
    'Manrope-Bold': 'https://fonts.gstatic.com/s/manrope/v15/xn7_tHEm9Xj3jt8N9_P0VVvXhsc.ttf', 
    'Manrope-SemiBold': 'https://fonts.gstatic.com/s/manrope/v15/xn7_tHEm9Xj3jt8N9_P0VVvXhsc.ttf',
    'Manrope-Medium': 'https://fonts.gstatic.com/s/manrope/v15/xn7_tHEm9Xj3jt8N9_P0VVvXhsc.ttf',
    'BeVietnamPro-SemiBold': 'https://fonts.gstatic.com/s/bevietnampro/v11/Vvwh70_s83jOk4XuebO_9mQ4W_R7j6k.ttf',
    'BeVietnamPro-Regular': 'https://fonts.gstatic.com/s/bevietnampro/v11/Vvwh70_s83jOk4XuebO_9mQ4W_R7j6k.ttf',
  });

  // 2. Initialize App Data
  useEffect(() => {
    async function prepare() {
      try {
        console.log('App: checkAuth starting');
        await checkAuth();
        console.log('App: checkAuth finished');
      } catch (e) {
        console.warn('App initialization error:', e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  // 3. Callback to hide splash screen once UI can render
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && fontsLoaded) {
      console.log('App: hiding splash screen');
      await SplashScreen.hideAsync();
    }
  }, [appIsReady, fontsLoaded]);

  // Return a simple view (which will be blank or showing splash) until ready
  if (!appIsReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <StatusBar style="dark" />
        <AppNavigator />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
