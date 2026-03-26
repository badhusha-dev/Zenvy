import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Colors, Spacing, Typography } from '../constants/theme';
import { ArrowLeft, Camera, RefreshCw, X, Zap, Download } from 'lucide-react-native';
import { Image } from 'expo-image';

const { width, height } = Dimensions.get('window');

const HIJAB_STYLES = [
  { id: '1', name: 'Al-Amira', img: '✨' },
  { id: '2', name: 'Shayla', img: '🌿' },
  { id: '3', name: 'Khimar', img: '🌸' },
  { id: '4', name: 'Turban', img: '💎' },
];

export const ARTryOnScreen: React.FC<any> = ({ navigation }) => {
  const [activeStyle, setActiveStyle] = useState(HIJAB_STYLES[0].id);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Camera View Placeholder */}
      <View style={styles.cameraView}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600' }} 
          style={styles.modelImg}
          contentFit="cover"
        />
        <View style={styles.arOverlay}>
           <View style={styles.scanLine} />
           <View style={styles.faceGuide} />
        </View>

        <SafeAreaView style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.circleBtn}>
            <X size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.statusBox}>
            <Zap size={14} color="#FFD700" fill="#FFD700" />
            <Text style={styles.statusText}>AR LIVE</Text>
          </View>
        </SafeAreaView>

        {/* Floating Controls */}
        <View style={styles.sideControls}>
           <TouchableOpacity style={styles.controlBtn}>
             <RefreshCw size={24} color="#fff" />
           </TouchableOpacity>
           <TouchableOpacity style={styles.controlBtn}>
             <Download size={24} color="#fff" />
           </TouchableOpacity>
        </View>
      </View>

      {/* Selector Bottom Sheet */}
      <View style={styles.bottomSheet}>
        <Text style={styles.sheetTitle}>Select Style Overlay</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.styleRow}>
          {HIJAB_STYLES.map(style => (
            <TouchableOpacity 
              key={style.id} 
              onPress={() => setActiveStyle(style.id)}
              style={[
                styles.styleItem,
                activeStyle === style.id && styles.activeStyleItem
              ]}
            >
              <View style={styles.styleIcon}>
                <Text style={{ fontSize: 24 }}>{style.img}</Text>
              </View>
              <Text style={[
                styles.styleName,
                activeStyle === style.id && styles.activeStyleName
              ]}>{style.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.captureRow}>
           <TouchableOpacity style={styles.captureBtn}>
             <View style={styles.captureInner} />
           </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

import { ScrollView } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  cameraView: {
    flex: 1,
    position: 'relative',
  },
  modelImg: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.8,
  },
  arOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanLine: {
    width: '80%',
    height: 2,
    backgroundColor: Colors.primary,
    position: 'absolute',
    top: '30%',
    opacity: 0.5,
  },
  faceGuide: {
    width: 200,
    height: 280,
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: '#fff',
    borderStyle: 'dashed',
    opacity: 0.4,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingTop: 10,
  },
  circleBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 12,
    borderRadius: 20,
    gap: 6,
    height: 32,
  },
  statusText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  sideControls: {
    position: 'absolute',
    right: Spacing.lg,
    top: '25%',
    gap: 16,
  },
  controlBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  bottomSheet: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: Spacing.lg,
    paddingBottom: 40,
  },
  sheetTitle: {
    fontFamily: Typography.fonts.headline,
    fontSize: 16,
    color: Colors.onSurface,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  styleRow: {
    marginBottom: 24,
  },
  styleItem: {
    alignItems: 'center',
    marginRight: 20,
    padding: 10,
    borderRadius: 20,
  },
  activeStyleItem: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.primaryContainer,
  },
  styleIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.surfaceVariant,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  styleName: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    fontFamily: Typography.fonts.body,
  },
  activeStyleName: {
    color: Colors.primary,
    fontWeight: '700',
  },
  captureRow: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: Colors.primaryContainer,
    padding: 4,
  },
  captureInner: {
    flex: 1,
    backgroundColor: Colors.primary,
    borderRadius: 30,
  },
});
