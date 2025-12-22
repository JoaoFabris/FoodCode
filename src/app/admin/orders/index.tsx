// src/app/admin/orders/index.tsx
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS } from '../../../constants/theme';

const { width: screenWidth } = Dimensions.get('window');
const isSmallScreen = screenWidth < 380;
const isTablet = screenWidth > 768;

interface Order {
  id: string;
  customer: string;
  product: string;
  status: 'Pendente' | 'Preparando' | 'Pronto' | 'Entregue' | 'Cancelado';
  total: number;
  time: string;
  date: string;
  address: string;
  phone: string;
}

export default function OrdersManagement() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('Todos');

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [searchQuery, statusFilter, orders]);

  const loadOrders = () => {
    const mockOrders: Order[] = [
      {
        id: 'PED001',
        customer: 'João Silva',
        product: 'X-Bacon Clássico',
        status: 'Preparando',
        total: 32.0,
        time: '14:30',
        date: '2024-01-15',
        address: 'Rua das Flores, 123 - Centro',
        phone: '(11) 99999-1234',
      },
      {
        id: 'PED002',
        customer: 'Maria Santos',
        product: 'Veggie Deluxe',
        status: 'Pronto',
        total: 28.5,
        time: '14:25',
        date: '2024-01-15',
        address: 'Av. Paulista, 456 - Bela Vista',
        phone: '(11) 99999-5678',
      },
      {
        id: 'PED003',
        customer: 'Pedro Costa',
        product: 'Chicken Supreme',
        status: 'Pendente',
        total: 35.0,
        time: '14:20',
        date: '2024-01-15',
        address: 'Rua Augusta, 789 - Consolação',
        phone: '(11) 99999-9012',
      },
      {
        id: 'PED004',
        customer: 'Ana Lima',
        product: 'X-Tudo',
        status: 'Entregue',
        total: 42.0,
        time: '14:15',
        date: '2024-01-15',
        address: 'Rua Oscar Freire, 321 - Jardins',
        phone: '(11) 99999-3456',
      },
      {
        id: 'PED005',
        customer: 'Carlos Oliveira',
        product: 'X-Salada',
        status: 'Preparando',
        total: 25.0,
        time: '14:10',
        date: '2024-01-15',
        address: 'Rua da Consolação, 654 - Centro',
        phone: '(11) 99999-7890',
      },
    ];
    setOrders(mockOrders);
  };

  const filterOrders = () => {
    let filtered = orders;

    if (searchQuery) {
      filtered = filtered.filter(
        (order) =>
          order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.product.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== 'Todos') {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
  };

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    Alert.alert(
      'Confirmar Alteração',
      `Deseja alterar o status do pedido ${orderId} para "${newStatus}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: () => {
            setOrders((prevOrders) =>
              prevOrders.map((order) =>
                order.id === orderId ? { ...order, status: newStatus } : order
              )
            );
          },
        },
      ]
    );
  };

  const getStatusColor = (status: Order['status']) => {
    const colors = {
      Pendente: '#F59E0B',
      Preparando: '#3B82F6',
      Pronto: '#10B981',
      Entregue: '#6B7280',
      Cancelado: '#EF4444',
    };
    return colors[status];
  };

  const getStatusBgColor = (status: Order['status']) => {
    const colors = {
      Pendente: '#FEF3C7',
      Preparando: '#DBEAFE',
      Pronto: '#D1FAE5',
      Entregue: '#F3F4F6',
      Cancelado: '#FEE2E2',
    };
    return colors[status];
  };

  const statusOptions = [
    'Todos',
    'Pendente',
    'Preparando',
    'Pronto',
    'Entregue',
    'Cancelado',
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.pageTitle}>Pedidos</Text>
          <Text style={styles.pageSubtitle}>
            {filteredOrders.length} encontrados
          </Text>
        </View>
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar pedidos..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.statusFilters}
          contentContainerStyle={styles.statusFiltersContent}
        >
          {statusOptions.map((status) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.statusFilter,
                statusFilter === status && styles.statusFilterActive,
              ]}
              onPress={() => setStatusFilter(status)}
            >
              <Text
                style={[
                  styles.statusFilterText,
                  statusFilter === status && styles.statusFilterTextActive,
                ]}
              >
                {status}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Orders List */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.ordersContainer}>
          {filteredOrders.map((order) => (
            <View key={order.id} style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <View style={styles.orderHeaderLeft}>
                  <Text style={styles.orderId}>#{order.id}</Text>
                  <Text style={styles.orderTime}>
                    {order.time} - {order.date}
                  </Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor: getStatusBgColor(order.status),
                      borderColor: getStatusColor(order.status),
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      { color: getStatusColor(order.status) },
                    ]}
                  >
                    {order.status}
                  </Text>
                </View>
              </View>

              <View style={styles.orderInfo}>
                <View style={styles.customerInfo}>
                  <Ionicons name="person" size={16} color="#718096" />
                  <Text style={styles.customerName}>{order.customer}</Text>
                </View>
                <View style={styles.customerInfo}>
                  <Ionicons name="call" size={16} color="#718096" />
                  <Text style={styles.customerPhone}>{order.phone}</Text>
                </View>
                <View style={styles.customerInfo}>
                  <Ionicons name="location" size={16} color="#718096" />
                  <Text style={styles.customerAddress} numberOfLines={1}>
                    {order.address}
                  </Text>
                </View>
              </View>

              <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={1}>
                  {order.product}
                </Text>
                <Text style={styles.orderTotal}>
                  R$ {order.total.toFixed(2)}
                </Text>
              </View>

              {/* Status Actions */}
              {order.status !== 'Entregue' && order.status !== 'Cancelado' && (
                <View style={styles.actionsContainer}>
                  {order.status === 'Pendente' && (
                    <View style={styles.actionRow}>
                      <TouchableOpacity
                        style={[styles.actionButton, styles.acceptButton]}
                        onPress={() =>
                          updateOrderStatus(order.id, 'Preparando')
                        }
                      >
                        <Text style={styles.actionButtonText}>Aceitar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.actionButton, styles.cancelButton]}
                        onPress={() => updateOrderStatus(order.id, 'Cancelado')}
                      >
                        <Text style={styles.actionButtonText}>Cancelar</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  {order.status === 'Preparando' && (
                    <TouchableOpacity
                      style={[styles.actionButton, styles.readyButton]}
                      onPress={() => updateOrderStatus(order.id, 'Pronto')}
                    >
                      <Text style={styles.actionButtonText}>
                        Marcar como Pronto
                      </Text>
                    </TouchableOpacity>
                  )}
                  {order.status === 'Pronto' && (
                    <TouchableOpacity
                      style={[styles.actionButton, styles.deliveredButton]}
                      onPress={() => updateOrderStatus(order.id, 'Entregue')}
                    >
                      <Text style={styles.actionButtonText}>
                        Marcar como Entregue
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}

              <TouchableOpacity
                style={styles.viewDetailsButton}
                onPress={() => router.push(`/admin/orders/${order.id}`)}
              >
                <Text style={styles.viewDetailsText}>Ver Detalhes</Text>
                <Ionicons
                  name="chevron-forward"
                  size={16}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: isSmallScreen ? 16 : 20,
    paddingVertical: isSmallScreen ? 16 : 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerContent: {
    flex: 1,
  },
  pageTitle: {
    fontSize: isSmallScreen ? 20 : 24,
    fontWeight: 'bold',
    color: '#1a202c',
    textAlign: 'center',
  },
  pageSubtitle: {
    fontSize: isSmallScreen ? 12 : 14,
    color: '#718096',
    marginTop: 2,
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f7fafc',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  headerButtonText: {
    fontSize: 14,
    color: '#4a5568',
    marginLeft: 6,
    fontWeight: '500',
  },
  filtersContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: isSmallScreen ? 16 : 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7fafc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    minHeight: isSmallScreen ? 44 : 48,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    paddingLeft: 8,
    fontSize: isSmallScreen ? 13 : 14,
    color: '#2d3748',
  },
  statusFilters: {
    flexDirection: 'row',
  },
  statusFiltersContent: {
    paddingRight: 20,
  },
  statusFilter: {
    paddingHorizontal: isSmallScreen ? 12 : 16,
    paddingVertical: isSmallScreen ? 6 : 8,
    borderRadius: 20,
    backgroundColor: '#f7fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginRight: 8,
  },
  statusFilterActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  statusFilterText: {
    fontSize: isSmallScreen ? 12 : 14,
    color: '#4a5568',
    fontWeight: '500',
  },
  statusFilterTextActive: {
    color: '#fff',
  },
  content: {
    padding: isSmallScreen ? 16 : 20,
  },
  ordersContainer: {
    flexDirection: isTablet ? 'row' : 'column',
    flexWrap: isTablet ? 'wrap' : 'nowrap',
    justifyContent: isTablet ? 'space-between' : 'flex-start',
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: isSmallScreen ? 16 : 20,
    marginBottom: 16,
    width: isTablet ? '48%' : '100%',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  orderHeaderLeft: {
    flex: 1,
  },
  orderId: {
    fontSize: isSmallScreen ? 15 : 16,
    fontWeight: 'bold',
    color: '#1a202c',
  },
  orderTime: {
    fontSize: isSmallScreen ? 11 : 12,
    color: '#718096',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: isSmallScreen ? 6 : 8,
    paddingVertical: 4,
    borderRadius: 16,
    borderWidth: 1,
  },
  statusText: {
    fontSize: isSmallScreen ? 10 : 12,
    fontWeight: '600',
  },
  orderInfo: {
    marginBottom: 16,
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  customerName: {
    fontSize: isSmallScreen ? 13 : 14,
    fontWeight: '600',
    color: '#2d3748',
    marginLeft: 8,
    flex: 1,
  },
  customerPhone: {
    fontSize: isSmallScreen ? 11 : 12,
    color: '#718096',
    marginLeft: 8,
    flex: 1,
  },
  customerAddress: {
    fontSize: isSmallScreen ? 11 : 12,
    color: '#718096',
    marginLeft: 8,
    flex: 1,
  },
  productInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  productName: {
    fontSize: isSmallScreen ? 13 : 14,
    color: '#4a5568',
    flex: 1,
    fontWeight: '500',
  },
  orderTotal: {
    fontSize: isSmallScreen ? 15 : 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  actionsContainer: {
    marginBottom: 12,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: isSmallScreen ? 8 : 10,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: isSmallScreen ? 36 : 40,
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
    fontSize: isSmallScreen ? 11 : 12,
    color: '#fff',
    fontWeight: '600',
  },
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    marginTop: 8,
    paddingTop: 12,
  },
  viewDetailsText: {
    fontSize: isSmallScreen ? 13 : 14,
    color: COLORS.primary,
    fontWeight: '600',
    marginRight: 4,
  },
});
