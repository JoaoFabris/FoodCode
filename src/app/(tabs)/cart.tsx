// src/app/(tabs)/cart.tsx
import { CartItem } from '@/src/components/CartItem';
import { COLORS, SIZES } from '@/src/constants/theme';
import { useAuth } from '@/src/context/AuthContext';
import { useCart } from '@/src/context/CartContext';
import { Header } from '@react-navigation/elements';
import { Stack, router } from 'expo-router';
import React from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';



export default function CartScreen() {
  const { user, logout } = useAuth();
  const { items, updateQuantity, removeFromCart, clearCart, getTotal } = useCart();

  const handleLogout = async () => {
    await logout();
  };

  const handleClearCart = () => {
    Alert.alert(
      'Limpar carrinho',
      'Tem certeza que deseja remover todos os itens?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Limpar', style: 'destructive', onPress: clearCart }
      ]
    );
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      Alert.alert('Carrinho vazio', 'Adicione itens ao carrinho antes de finalizar o pedido');
      return;
    }
    router.push('/checkout');
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const renderCartItem = ({ item }: { item: any }) => (
    <CartItem
      item={item}
      onUpdateQuantity={updateQuantity}
      onRemove={removeFromCart}
    />
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🛒</Text>
      <Text style={styles.emptyTitle}>Carrinho vazio</Text>
      <Text style={styles.emptyDescription}>
        Adicione alguns pratos deliciosos ao seu carrinho
      </Text>
      <TouchableOpacity 
        style={styles.shopButton}
        onPress={() => router.back()}
      >
        <Text style={styles.shopButtonText}>Explorar Pratos</Text>
      </TouchableOpacity>
    </View>
  );

  const renderFooter = () => {
    if (items.length === 0) return null;

    return (
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.clearButton}
          onPress={handleClearCart}
        >
          <Text style={styles.clearButtonText}>Limpar Carrinho</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <Header title="Carrinho" onLogout={handleLogout} />

      <FlatList
        data={items}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
      />

      {items.length > 0 && (
        <View style={styles.checkoutContainer}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalValue}>{formatPrice(getTotal())}</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.checkoutButton}
            onPress={handleCheckout}
          >
            <Text style={styles.checkoutButtonText}>
              Finalizar Pedido ({items.length} item{items.length !== 1 ? 's' : ''})
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContainer: {
    paddingTop: SIZES.md,
    paddingBottom: SIZES.xl,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.lg,
    marginTop: SIZES.xl * 3,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: SIZES.lg,
  },
  emptyTitle: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SIZES.sm,
  },
  emptyDescription: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: SIZES.xl,
  },
  shopButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.md,
    paddingHorizontal: SIZES.xl,
    borderRadius: SIZES.md,
  },
  shopButtonText: {
    color: COLORS.white,
    fontSize: SIZES.body,
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: SIZES.lg,
    paddingTop: SIZES.lg,
  },
  clearButton: {
    backgroundColor: COLORS.light || '#f8f9fa',
    paddingVertical: SIZES.md,
    paddingHorizontal: SIZES.lg,
    borderRadius: SIZES.md,
    alignItems: 'center',
  },
  clearButtonText: {
    color: COLORS.error || '#dc3545',
    fontSize: SIZES.body,
    fontWeight: '600',
  },
  checkoutContainer: {
    backgroundColor: COLORS.white,
    padding: SIZES.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.light || '#f8f9fa',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.md,
  },
  totalLabel: {
    fontSize: SIZES.title,
    color: COLORS.textSecondary,
  },
  totalValue: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  checkoutButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.md,
    borderRadius: SIZES.md,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: COLORS.white,
    fontSize: SIZES.title,
    fontWeight: 'bold',
  },
});