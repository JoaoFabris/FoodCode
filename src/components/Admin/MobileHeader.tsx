// src/components/Admin/MobileHeader.tsx
import { Ionicons } from '@expo/vector-icons';
import { usePathname } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


interface MobileHeaderProps {
  onMenuPress: () => void;
}

export default function MobileHeader({ onMenuPress }: MobileHeaderProps) {
  const pathname = usePathname();

  const getPageTitle = () => {
    if (pathname === '/admin') return 'Dashboard';
    if (pathname.includes('/orders')) return 'Pedidos';
    if (pathname.includes('/products')) return 'Produtos';
    if (pathname.includes('/users')) return 'Usuários';
    if (pathname.includes('/analytics')) return 'Análises';
    return 'Admin';
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={onMenuPress}>
          <Ionicons name="menu" size={24} color="#1e293b" />
        </TouchableOpacity>
        
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{getPageTitle()}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 56,
  },
  menuButton: {
    padding: 8,
    marginRight: 8,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
  },
  notificationButton: {
    padding: 8,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#ef4444',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});