// src/components/Header/index.tsx
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '../../context/AuthContext';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();

  const handleAuthAction = async () => {
    if (user) {
      await logout();
    } else {
      router.push('/login');
    }
  };

  const handleAdminAccess = () => {
    router.push('/admin-login' as any);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.leftSection}>
          <Text style={styles.greeting}>
            {user ? `Olá, ${user.name.split(' ')[0]}!` : 'Olá!'}
          </Text>
          <Text style={styles.subtitle}>
            {user ? 'Bem-vindo de volta!' : 'Faça login para continuar'}
          </Text>
        </View>

        <View style={styles.rightSection}>
          <TouchableOpacity style={styles.adminButton} onPress={handleAdminAccess}>
            <Text style={styles.adminButtonText}>⚙️</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.authButton} onPress={handleAuthAction}>
            <Text style={styles.authButtonText}>
              {user ? 'Logout' : 'Login'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#fff',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  leftSection: {
    flex: 1,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  adminButton: {
    backgroundColor: '#6B7280',
    padding: 8,
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  adminButtonText: {
    fontSize: 16,
  },
  authButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  authButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});