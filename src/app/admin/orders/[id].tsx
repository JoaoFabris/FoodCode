// src/app/admin/orders/[id].tsx
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS } from '../../../constants/theme';

const { width: screenWidth } = Dimensions.get('window');
const isSmallScreen = screenWidth < 380;
const isTablet = screenWidth > 768;

interface OrderDetails {
  id: string;
  customer: string;
  product: string;
  status: 'Pendente' | 'Preparando' | 'Pronto' | 'Entregue' | 'Cancelado';
  total: number;
  time: string;
  date: string;
  address: string;
  phone: string;
  email?: string;
  observations?: string;
}

export default function OrderDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadOrderDetails();
  }, [id]);

  const loadOrderDetails = async () => {
    setIsLoading(true);
    
    // Simular delay de carregamento
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simulação de busca do pedido - em produção viria de uma API
    const mockOrder: OrderDetails = {
      id: id || 'PED001',
      customer: 'João Silva',
      product: 'X-Bacon Clássico',
      status: 'Preparando',
      total: 32.00,
      time: '14:30',
      date: '2024-01-15',
      address: 'Rua das Flores, 123 - Centro, São Paulo - SP',
      phone: '(11) 99999-1234',
      email: 'joao.silva@email.com',
      observations: 'Sem cebola, por favor. Entrega no portão principal.',
    };
    
    setOrder(mockOrder);
    setIsLoading(false);
  };

  const getStatusColor = (status: OrderDetails['status']) => {
    const colors = {
      'Pendente': '#F59E0B',
      'Preparando': '#3B82F6',
      'Pronto': '#10B981',
      'Entregue': '#6B7280',
      'Cancelado': '#EF4444'
    };
    return colors[status];
  };

  const getStatusBgColor = (status: OrderDetails['status']) => {
    const colors = {
      'Pendente': '#FEF3C7',
      'Preparando': '#DBEAFE',
      'Pronto': '#D1FAE5',
      'Entregue': '#F3F4F6',
      'Cancelado': '#FEE2E2'
    };
    return colors[status];
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'right']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Carregando pedido...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!order) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'right']}>
        <View style={styles.loadingContainer}>
          <Text style={styles.errorText}>Pedido não encontrado</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#4a5568" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.pageTitle}>#{order.id}</Text>
          <Text style={styles.pageSubtitle}>{order.date} às {order.time}</Text>
        </View>
        <View style={[
          styles.statusBadge,
          { 
            backgroundColor: getStatusBgColor(order.status),
            borderColor: getStatusColor(order.status)
          }
        ]}>
          <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>
            {order.status}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Informações do Cliente */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>👤 Cliente</Text>
          <View style={styles.card}>
            <View style={styles.infoRow}>
              <Ionicons name="person" size={20} color="#6B7280" />
              <Text style={styles.infoText}>{order.customer}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="call" size={20} color="#6B7280" />
              <Text style={styles.infoText}>{order.phone}</Text>
            </View>
            {order.email && (
              <View style={styles.infoRow}>
                <Ionicons name="mail" size={20} color="#6B7280" />
                <Text style={styles.infoText}>{order.email}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Endereço de Entrega */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📍 Endereço</Text>
          <View style={styles.card}>
            <View style={styles.infoRow}>
              <Ionicons name="location" size={20} color="#6B7280" />
              <Text style={styles.addressText}>{order.address}</Text>
            </View>
          </View>
        </View>

        {/* Produto */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🍔 Produto</Text>
          <View style={styles.card}>
            <View style={styles.productRow}>
              <Text style={styles.productName}>{order.product}</Text>
              <Text style={styles.productPrice}>R$ {order.total.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Observações */}
        {order.observations && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📝 Observações</Text>
            <View style={styles.card}>
              <Text style={styles.observationsText}>{order.observations}</Text>
            </View>
          </View>
        )}

        {/* Total */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💰 Resumo</Text>
          <View style={styles.card}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalValue}>R$ {order.total.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Ações */}
        {order.status !== 'Entregue' && order.status !== 'Cancelado' && (
          <View style={styles.actionsSection}>
            <Text style={styles.sectionTitle}>⚡ Ações</Text>
            <View style={styles.actionsContainer}>
              {order.status === 'Pendente' && (
                <>
                  <TouchableOpacity style={[styles.actionButton, styles.acceptButton]}>
                    <Ionicons name="checkmark-circle" size={20} color="#fff" />
                    <Text style={styles.actionButtonText}>Aceitar Pedido</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.actionButton, styles.cancelButton]}>
                    <Ionicons name="close-circle" size={20} color="#fff" />
                    <Text style={styles.actionButtonText}>Cancelar Pedido</Text>
                  </TouchableOpacity>
                </>
              )}
              {order.status === 'Preparando' && (
                <TouchableOpacity style={[styles.actionButton, styles.readyButton]}>
                  <Ionicons name="restaurant" size={20} color="#fff" />
                  <Text style={styles.actionButtonText}>Marcar como Pronto</Text>
                </TouchableOpacity>
              )}
              {order.status === 'Pronto' && (
                <TouchableOpacity style={[styles.actionButton, styles.deliveredButton]}>
                  <Ionicons name="checkmark-done" size={20} color="#fff" />
                  <Text style={styles.actionButtonText}>Marcar como Entregue</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#718096',
    fontWeight: '500',
  },
  errorText: {
    fontSize: 18,
    color: '#EF4444',
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: isSmallScreen ? 16 : 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    minHeight: isSmallScreen ? 70 : 80,
  },
  backButton: {
    marginRight: isSmallScreen ? 12 : 16,
    padding: 8,
    borderRadius: 8,
  },
  headerContent: {
    flex: 1,
  },
  pageTitle: {
    fontSize: isSmallScreen ? 18 : 20,
    fontWeight: 'bold',
    color: '#1a202c',
  },
  pageSubtitle: {
    fontSize: isSmallScreen ? 12 : 14,
    color: '#718096',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: isSmallScreen ? 8 : 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  statusText: {
    fontSize: isSmallScreen ? 10 : 12,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: isSmallScreen ? 16 : 20,
  },
  section: {
    marginBottom: isSmallScreen ? 20 : 24,
  },
  sectionTitle: {
    fontSize: isSmallScreen ? 14 : 16,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: isSmallScreen ? 14 : 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  infoText: {
    fontSize: isSmallScreen ? 13 : 14,
    color: '#4a5568',
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  addressText: {
    fontSize: isSmallScreen ? 13 : 14,
    color: '#4a5568',
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productName: {
    fontSize: isSmallScreen ? 15 : 16,
    fontWeight: '600',
    color: '#2d3748',
    flex: 1,
  },
  productPrice: {
    fontSize: isSmallScreen ? 16 : 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  observationsText: {
    fontSize: isSmallScreen ? 13 : 14,
    color: '#4a5568',
    lineHeight: 20,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: isSmallScreen ? 15 : 16,
    fontWeight: '600',
    color: '#2d3748',
  },
  totalValue: {
    fontSize: isSmallScreen ? 20 : 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  actionsSection: {
    marginBottom: 32,
  },
  actionsContainer: {
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: isSmallScreen ? 14 : 16,
    borderRadius: 12,
    gap: 8,
    minHeight: isSmallScreen ? 48 : 52,
  },
  acceptButton: {
    backgroundColor: '#3B82F6',
  },
  cancelButton: {
    backgroundColor: '#EF4444',
  },
  readyButton: {
    backgroundColor: '#10B981',
  },
  deliveredButton: {
    backgroundColor: '#6B7280',
  },
  actionButtonText: {
    fontSize: isSmallScreen ? 14 : 16,
    color: '#fff',
    fontWeight: '600',
  },
});