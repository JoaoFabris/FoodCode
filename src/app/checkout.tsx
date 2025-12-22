// src/app/checkout.tsx
import { Header } from '@react-navigation/elements';
import { Stack, router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';


export default function CheckoutScreen() {
  const { user, logout } = useAuth();
  const { items, getTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  const handlePayment = async () => {
    setIsProcessing(true);

    // Simular processamento do pagamento
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      
      Alert.alert(
        ' Pedido realizado!',
        'Seu pedido foi confirmado e será preparado em breve.',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/order-confirmation')
          }
        ]
      );
    }, 2000);
  };

  // ... resto do código permanece igual
  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const deliveryFee = 5.00;
  const subtotal = getTotal();
  const total = subtotal + deliveryFee;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <Header title="Finalizar Pedido" onLogout={handleLogout} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Resumo do Pedido */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumo do Pedido</Text>
          
          {items.map((item) => (
            <View key={item.id} style={styles.orderItem}>
              <Text style={styles.itemName} numberOfLines={1}>
                {item.quantity}x {item.name}
              </Text>
              <Text style={styles.itemPrice}>
                {formatPrice(item.price * item.quantity)}
              </Text>
            </View>
          ))}
        </View>

        {/* Endereço de Entrega */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Endereço de Entrega</Text>
          <View style={styles.addressContainer}>
            <Text style={styles.addressText}>📍 Rua das Flores, 123</Text>
            <Text style={styles.addressText}>Bairro Centro - São Paulo, SP</Text>
            <Text style={styles.addressText}>CEP: 01234-567</Text>
          </View>
        </View>

        {/* Método de Pagamento */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Método de Pagamento</Text>
          <View style={styles.paymentContainer}>
            <Text style={styles.paymentText}>💳 Cartão de Crédito</Text>
            <Text style={styles.paymentSubText}>**** 1234</Text>
          </View>
        </View>

        {/* Total */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumo de Valores</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal:</Text>
            <Text style={styles.summaryValue}>{formatPrice(subtotal)}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Taxa de entrega:</Text>
            <Text style={styles.summaryValue}>{formatPrice(deliveryFee)}</Text>
          </View>
          
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalValue}>{formatPrice(total)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Botão de Pagamento */}
      <View style={styles.paymentButtonContainer}>
        <TouchableOpacity 
          style={[styles.paymentButton, isProcessing && styles.paymentButtonDisabled]}
          onPress={handlePayment}
          disabled={isProcessing}
        >
          <Text style={styles.paymentButtonText}>
            {isProcessing ? '⏳ Processando...' : `💳 Pagar ${formatPrice(total)}`}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ... estilos permanecem iguais
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: COLORS.white,
    margin: SIZES.lg,
    padding: SIZES.lg,
    borderRadius: SIZES.md,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: SIZES.title,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SIZES.md,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SIZES.xs,
  },
  itemName: {
    flex: 1,
    fontSize: SIZES.body,
    color: COLORS.textPrimary,
  },
  itemPrice: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.primary,
  },
  addressContainer: {
    padding: SIZES.md,
    backgroundColor: COLORS.light || '#f8f9fa',
    borderRadius: SIZES.sm,
  },
  addressText: {
    fontSize: SIZES.body,
    color: COLORS.textPrimary,
    marginBottom: SIZES.xs,
  },
  paymentContainer: {
    padding: SIZES.md,
    backgroundColor: COLORS.light || '#f8f9fa',
    borderRadius: SIZES.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentText: {
    fontSize: SIZES.body,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  paymentSubText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SIZES.xs,
  },
  summaryLabel: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
  },
  summaryValue: {
    fontSize: SIZES.body,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: COLORS.light || '#f8f9fa',
    marginTop: SIZES.sm,
    paddingTop: SIZES.md,
  },
  totalLabel: {
    fontSize: SIZES.title,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  totalValue: {
    fontSize: SIZES.title,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  paymentButtonContainer: {
    backgroundColor: COLORS.white,
    padding: SIZES.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.light || '#f8f9fa',
  },
  paymentButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.md,
    borderRadius: SIZES.md,
    alignItems: 'center',
  },
  paymentButtonDisabled: {
    backgroundColor: COLORS.textSecondary,
  },
  paymentButtonText: {
    color: COLORS.white,
    fontSize: SIZES.title,
    fontWeight: 'bold',
  },
});