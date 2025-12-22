// src/app/(tabs)/perfil/favorites.tsx
import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import React from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { ProductCard } from '../../../components/ProductCard';
import { COLORS, SIZES } from '../../../constants/theme';
import { useAuth } from '../../../context/AuthContext';
import { useFavorites } from '../../../context/FavoritesContext';

export default function FavoritesScreen() {
  const { user } = useAuth();
  const { favorites, isLoading, clearFavorites } = useFavorites();

  const handleClearFavorites = () => {
    if (favorites.length === 0) return;
    clearFavorites();
  };

  const handleBackToHome = () => {
    router.push('/(tabs)/home' as any);
  };

  const handleProductPress = (productId: string) => {
    // ✅ Navegação corrigida
    router.push({
      pathname: '/home/product-detail' as any,
      params: { id: productId },
    });
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Stack.Screen 
          options={{
            headerShown: true,
            title: 'Favoritos',
            headerStyle: { backgroundColor: COLORS.white },
            headerTintColor: COLORS.primary,
            headerTitleStyle: { fontWeight: 'bold' },
          }} 
        />
        <View style={styles.notLoggedIn}>
          <Ionicons name="heart-outline" size={64} color={COLORS.medium} />
          <Text style={styles.notLoggedInTitle}>Login Necessário</Text>
          <Text style={styles.notLoggedInText}>
            Você precisa estar logado para ver seus produtos favoritos.
          </Text>
        </View>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Stack.Screen 
          options={{
            headerShown: true,
            title: 'Favoritos',
            headerStyle: { backgroundColor: COLORS.white },
            headerTintColor: COLORS.primary,
            headerTitleStyle: { fontWeight: 'bold' },
          }} 
        />
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Carregando favoritos...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          headerShown: true,
          title: 'Favoritos',
          headerStyle: { backgroundColor: COLORS.white },
          headerTintColor: COLORS.primary,
          headerTitleStyle: { fontWeight: 'bold' },
          headerRight: () => (
            favorites.length > 0 ? (
              <TouchableOpacity
                onPress={handleClearFavorites}
                style={styles.clearButton}
              >
                <Text style={styles.clearButtonText}>Limpar</Text>
              </TouchableOpacity>
            ) : null
          ),
        }} 
      />

      {favorites.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="heart-outline" size={64} color={COLORS.medium} />
          <Text style={styles.emptyTitle}>Nenhum favorito ainda</Text>
          <Text style={styles.emptyText}>
            Adicione produtos aos seus favoritos para vê-los aqui!
          </Text>
          <TouchableOpacity
            style={styles.browseButton}
            onPress={handleBackToHome}
          >
            <Text style={styles.browseButtonText}>Explorar Produtos</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              {favorites.length} produto{favorites.length !== 1 ? 's' : ''} favorito{favorites.length !== 1 ? 's' : ''}
            </Text>
          </View>

          <View style={styles.productList}>
            {favorites.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
                onPress={() => handleProductPress(product.id)}
              />
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
  },
  notLoggedIn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.xl,
  },
  notLoggedInTitle: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginTop: 16,
    marginBottom: 8,
  },
  notLoggedInText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light,
    backgroundColor: COLORS.white,
  },
  headerText: {
    fontSize: SIZES.title,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  clearButtonText: {
    fontSize: SIZES.body,
    color: COLORS.error,
    fontWeight: '600',
  },
  productList: {
    paddingTop: SIZES.md,
    paddingBottom: SIZES.xl,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.xl,
  },
  emptyTitle: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  browseButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.xl,
    paddingVertical: SIZES.md,
    borderRadius: SIZES.cardRadius,
  },
  browseButtonText: {
    fontSize: SIZES.title,
    color: COLORS.white,
    fontWeight: '600',
  },
});