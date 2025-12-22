// src/app/admin/_layout.tsx
import { Slot } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

import MobileHeader from '../../components/Admin/MobileHeader';
import AdminSidebar from '../../components/Admin/Sidebar';

const { width: screenWidth } = Dimensions.get('window');
const isTablet = screenWidth > 768;

export default function AdminLayout() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  if (isTablet) {
    // Layout Desktop/Tablet
    return (
      <View style={styles.desktopContainer}>
        <AdminSidebar />
        <View style={styles.desktopContent}>
          <Slot />
        </View>
      </View>
    );
  }

  // Layout Mobile
  return (
    <View style={styles.mobileContainer}>
      <MobileHeader onMenuPress={toggleMenu} />
      <View style={styles.mobileContent}>
        <Slot />
      </View>
      <AdminSidebar 
        isMenuVisible={isMenuVisible} 
        onMenuToggle={toggleMenu} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  desktopContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
  },
  desktopContent: {
    flex: 1,
  },
  mobileContainer: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  mobileContent: {
    flex: 1,
  },
});