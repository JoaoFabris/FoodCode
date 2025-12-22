// src/app/(tabs)/perfil/index.tsx
import { COLORS, SIZES } from '@/src/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useAuth } from '../../../context/AuthContext';
import { useFavorites } from '../../../context/FavoritesContext';

export default function PerfilScreen() {
  const { user, logout } = useAuth();
  const { favorites } = useFavorites();

  const handleFavoritesPress = () => {
    router.push('/perfil/favorites' as any);
  };

  const handleLogout = async () => {
    await logout();
    router.replace('/login' as any);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Perfil</Text>
        </View>

        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            {user?.name ? (
              <Text style={styles.avatarText}>
                {user.name.charAt(0).toUpperCase()}
              </Text>
            ) : (
              <Ionicons name="person" size={50} color={COLORS.medium} />
            )}
          </View>
          <Text style={styles.userName}>{user?.name || 'Nome do Usuário'}</Text>
          <Text style={styles.userPhone}>{user?.phone || 'Telefone não informado'}</Text>
        </View>

        {/* Menu Options */}
        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="settings-outline" size={24} color={COLORS.primary} />
            <Text style={styles.menuText}>Configurações</Text>
            <Ionicons name="chevron-forward" size={20} color={COLORS.medium} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleFavoritesPress}>
            <Ionicons name="heart-outline" size={24} color={COLORS.primary} />
            <Text style={styles.menuText}>Favoritos</Text>
            <View style={styles.favoriteBadgeContainer}>
              {favorites.length > 0 && (
                <View style={styles.favoriteBadge}>
                  <Text style={styles.favoriteBadgeText}>{favorites.length}</Text>
                </View>
              )}
              <Ionicons name="chevron-forward" size={20} color={COLORS.medium} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="receipt-outline" size={24} color={COLORS.primary} />
            <Text style={styles.menuText}>Meus Pedidos</Text>
            <Ionicons name="chevron-forward" size={20} color={COLORS.medium} />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color={COLORS.error} />
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: SIZES.lg,
    paddingBottom: 100,
  },
  header: {
    marginTop: 40,
    marginBottom: 30,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  userName: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 5,
  },
  userPhone: {
    fontSize: SIZES.title,
    color: COLORS.textSecondary,
  },
  menuSection: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.cardRadius,
    marginBottom: 30,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light,
  },
  menuText: {
    flex: 1,
    fontSize: SIZES.title,
    color: COLORS.textPrimary,
    marginLeft: 15,
  },
  favoriteBadgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  favoriteBadge: {
    backgroundColor: '#FF4757',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  favoriteBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    padding: SIZES.lg,
    borderRadius: SIZES.cardRadius,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  logoutText: {
    fontSize: SIZES.title,
    color: COLORS.error,
    marginLeft: 10,
    fontWeight: '600',
  },
});