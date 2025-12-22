// src/app/order-confirmation.tsx
import { Stack, router } from 'expo-router';
import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, SIZES } from '../constants/theme';


export default function OrderConfirmationScreen() {
  const orderNumber = Math.floor(Math.random() * 10000) + 1000;
  const estimatedTime = 25 + Math.floor(Math.random() * 15);

  const handleTrackOrder = () => {
    Alert.alert('Em breve!', 'Funcionalidade de rastreamento será implementada em breve');
  };

  const handleGoHome = () => {
    router.replace('/(tabs)/home');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.content}>
        <Text style={styles.successIcon}>🎉</Text>
        
        <Text style={styles.title}>Pedido Confirmado!</Text>
        
        <Text style={styles.subtitle}>
          Seu pedido foi realizado com sucesso
        </Text>
        
        <View style={styles.orderInfo}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Número do pedido:</Text>
            <Text style={styles.infoValue}>#{orderNumber}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Tempo estimado:</Text>
            <Text style={styles.infoValue}>{estimatedTime} minutos</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Status:</Text>
            <Text style={[styles.infoValue, styles.statusText]}>
              🔥 Preparando
            </Text>
          </View>
        </View>
        
        <Text style={styles.message}>
          Seu pedido está sendo preparado com carinho.{'\n'}
          Você receberá uma notificação quando estiver pronto para entrega.
        </Text>
      </View>
      
      <View style={styles.buttons}>
        <TouchableOpacity 
          style={styles.trackButton}
          onPress={handleTrackOrder}
        >
          <Text style={styles.trackButtonText}>📍 Rastrear Pedido</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.homeButton}
          onPress={handleGoHome} // ✅ Usar função corrigida
        >
          <Text style={styles.homeButtonText}>🏠 Voltar ao Início</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.lg,
  },
  successIcon: {
    fontSize: 80,
    marginBottom: SIZES.xl,
  },
  title: {
    fontSize: SIZES.h1,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: SIZES.md,
  },
  subtitle: {
    fontSize: SIZES.title,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SIZES.xl,
  },
  orderInfo: {
    backgroundColor: COLORS.white,
    padding: SIZES.lg,
    borderRadius: SIZES.md,
    width: '100%',
    marginBottom: SIZES.xl,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SIZES.sm,
  },
  infoLabel: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
  },
  infoValue: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  statusText: {
    color: COLORS.primary,
  },
  message: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  buttons: {
    padding: SIZES.lg,
    gap: SIZES.md,
  },
  trackButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.md,
    borderRadius: SIZES.md,
    alignItems: 'center',
  },
  trackButtonText: {
    color: COLORS.white,
    fontSize: SIZES.title,
    fontWeight: 'bold',
  },
  homeButton: {
    backgroundColor: COLORS.light || '#f8f9fa',
    paddingVertical: SIZES.md,
    borderRadius: SIZES.md,
    alignItems: 'center',
  },
  homeButtonText: {
    color: COLORS.primary,
    fontSize: SIZES.title,
    fontWeight: '600',
  },
});