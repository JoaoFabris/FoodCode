// src/app/admin/users/index.tsx
import { Ionicons } from '@expo/vector-icons';
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

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  createdAt: string;
  totalOrders: number;
  totalSpent: number;
}

export default function UsersManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('Todos');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [searchQuery, roleFilter, users]);

  const loadUsers = async () => {
    setIsLoading(true);
    
    // Dados simplificados sem status
    const mockUsers: User[] = [
      {
        id: 'USR001',
        name: 'João Silva',
        email: 'joao.silva@email.com',
        phone: '(11) 99999-1234',
        role: 'customer',
        createdAt: '15/01/2024',
        totalOrders: 15,
        totalSpent: 450.00
      },
      {
        id: 'USR002',
        name: 'Maria Santos',
        email: 'maria.santos@email.com',
        phone: '(11) 99999-5678',
        role: 'customer',
        createdAt: '10/01/2024',
        totalOrders: 8,
        totalSpent: 240.50
      },
      {
        id: 'USR003',
        name: 'Pedro Costa',
        email: 'pedro.costa@email.com',
        phone: '(11) 99999-9012',
        role: 'customer',
        createdAt: '05/01/2024',
        totalOrders: 3,
        totalSpent: 89.90
      },
      {
        id: 'USR004',
        name: 'Ana Lima',
        email: 'ana.lima@email.com',
        phone: '(11) 99999-3456',
        role: 'customer',
        createdAt: '01/01/2024',
        totalOrders: 12,
        totalSpent: 385.75
      },
      {
        id: 'ADM001',
        name: 'Carlos Admin',
        email: 'carlos.admin@foodcode.com',
        phone: '(11) 99999-7890',
        role: 'admin',
        createdAt: '01/12/2023',
        totalOrders: 0,
        totalSpent: 0
      },
      {
        id: 'USR005',
        name: 'Fernanda Oliveira',
        email: 'fernanda.oliveira@email.com',
        phone: '(11) 99999-2468',
        role: 'customer',
        createdAt: '20/01/2024',
        totalOrders: 5,
        totalSpent: 147.30
      },
    ];

    setUsers(mockUsers);
    setIsLoading(false);
  };

  const filterUsers = () => {
    let filtered = users;

    if (searchQuery) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (roleFilter !== 'Todos') {
      filtered = filtered.filter(user => {
        if (roleFilter === 'Admin') return user.role === 'admin';
        if (roleFilter === 'Cliente') return user.role === 'customer';
        return true;
      });
    }

    setFilteredUsers(filtered);
  };

  const getRoleColor = (role: User['role']) => {
    return role === 'admin' ? '#8B5CF6' : '#3B82F6';
  };

  const getRoleBgColor = (role: User['role']) => {
    return role === 'admin' ? '#F3E8FF' : '#EBF4FF';
  };

  const getRoleText = (role: User['role']) => {
    return role === 'admin' ? 'Admin' : 'Cliente';
  };

  const deleteUser = (userId: string, userName: string) => {
    Alert.alert(
      'Confirmar Exclusão',
      `Tem certeza que deseja excluir o usuário "${userName}"? Esta ação não pode ser desfeita.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
          }
        }
      ]
    );
  };

  const editUser = (user: User) => {
    // Implementar modal de edição
    Alert.alert('Editar Usuário', `Funcionalidade de edição para ${user.name} será implementada em breve.`);
  };

  const roleOptions = ['Todos', 'Cliente', 'Admin'];

  const UserCard = ({ user }: { user: User }) => (
    <View style={styles.userCard}>
      <View style={styles.userHeader}>
        <View style={styles.userAvatar}>
          <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          <Text style={styles.userPhone}>{user.phone}</Text>
          <Text style={styles.userId}>ID: {user.id}</Text>
        </View>
        <View style={styles.userBadge}>
          <View style={[
            styles.roleBadge,
            { 
              backgroundColor: getRoleBgColor(user.role),
              borderColor: getRoleColor(user.role)
            }
          ]}>
            <Text style={[styles.badgeText, { color: getRoleColor(user.role) }]}>
              {getRoleText(user.role)}
            </Text>
          </View>
        </View>
      </View>

      {user.role === 'customer' && (
        <View style={styles.userStats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.totalOrders}</Text>
            <Text style={styles.statLabel}>Pedidos</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>R$ {user.totalSpent.toFixed(2)}</Text>
            <Text style={styles.statLabel}>Total Gasto</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.createdAt}</Text>
            <Text style={styles.statLabel}>Cadastro</Text>
          </View>
        </View>
      )}

      {user.role === 'admin' && (
        <View style={styles.adminInfo}>
          <View style={styles.adminItem}>
            <Ionicons name="shield-checkmark" size={16} color="#8B5CF6" />
            <Text style={styles.adminText}>Administrador do sistema</Text>
          </View>
          <View style={styles.adminItem}>
            <Ionicons name="calendar" size={16} color="#6B7280" />
            <Text style={styles.adminDate}>Cadastro: {user.createdAt}</Text>
          </View>
        </View>
      )}

      <View style={styles.userActions}>
        {user.role !== 'admin' && (
          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => deleteUser(user.id, user.name)}
          >
            <Ionicons name="trash-outline" size={16} color="#EF4444" />
            <Text style={[styles.actionButtonText, { color: '#EF4444' }]}>
              Excluir
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.pageTitle}>Usuários</Text>
          <Text style={styles.pageSubtitle}>{filteredUsers.length} usuários encontrados</Text>
        </View>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => Alert.alert('Novo Usuário', 'Modal de criação será implementado em breve.')}
        >
          <Ionicons name="add" size={20} color="#fff" />
          {!isSmallScreen && <Text style={styles.addButtonText}>Novo</Text>}
        </TouchableOpacity>
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar usuários..."
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
          {roleOptions.map((role) => (
            <TouchableOpacity
              key={role}
              style={[
                styles.statusFilter,
                roleFilter === role && styles.statusFilterActive
              ]}
              onPress={() => setRoleFilter(role)}
            >
              <Text style={[
                styles.statusFilterText,
                roleFilter === role && styles.statusFilterTextActive
              ]}>
                {role}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Users List */}
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.usersContainer}>
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </View>

        {filteredUsers.length === 0 && !isLoading && (
          <View style={styles.emptyState}>
            <Ionicons name="people-outline" size={64} color="#94a3b8" />
            <Text style={styles.emptyTitle}>Nenhum usuário encontrado</Text>
            <Text style={styles.emptyDescription}>
              {searchQuery ? 'Tente ajustar sua busca' : 'Adicione o primeiro usuário'}
            </Text>
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
  },
  pageSubtitle: {
    fontSize: isSmallScreen ? 12 : 14,
    color: '#718096',
    marginTop: 2,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: isSmallScreen ? 12 : 16,
    paddingVertical: isSmallScreen ? 8 : 10,
    borderRadius: 8,
    gap: 6,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
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
    paddingBottom: 32,
  },
  usersContainer: {
    gap: 16,
  },
  userCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: isSmallScreen ? 16 : 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  userAvatar: {
    width: isSmallScreen ? 50 : 56,
    height: isSmallScreen ? 50 : 56,
    borderRadius: isSmallScreen ? 25 : 28,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: '#fff',
    fontSize: isSmallScreen ? 18 : 20,
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: isSmallScreen ? 16 : 17,
    fontWeight: '600',
    color: '#1a202c',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: isSmallScreen ? 13 : 14,
    color: '#718096',
    marginBottom: 2,
  },
  userPhone: {
    fontSize: isSmallScreen ? 13 : 14,
    color: '#718096',
    marginBottom: 2,
  },
  userId: {
    fontSize: isSmallScreen ? 11 : 12,
    color: '#94a3b8',
    fontFamily: 'monospace',
  },
  userBadge: {
    alignItems: 'flex-end',
  },
  roleBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: isSmallScreen ? 11 : 12,
    fontWeight: '600',
  },
  userStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: isSmallScreen ? 15 : 16,
    fontWeight: 'bold',
    color: '#1a202c',
  },
  statLabel: {
    fontSize: isSmallScreen ? 11 : 12,
    color: '#718096',
    marginTop: 2,
  },
  adminInfo: {
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    marginBottom: 16,
    gap: 8,
  },
  adminItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  adminText: {
    fontSize: isSmallScreen ? 13 : 14,
    color: '#8B5CF6',
    fontWeight: '500',
  },
  adminDate: {
    fontSize: isSmallScreen ? 12 : 13,
    color: '#6B7280',
  },
  userActions: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    gap: 4,
    flex: isSmallScreen ? 1 : 0,
    minWidth: isSmallScreen ? 0 : 90,
    justifyContent: 'center',
  },
  editButton: {
    backgroundColor: '#f0f9ff',
    borderColor: '#bfdbfe',
  },
  deleteButton: {
    backgroundColor: '#fef2f2',
    borderColor: '#fecaca',
  },
  viewButton: {
    backgroundColor: '#f8fafc',
    borderColor: '#e2e8f0',
  },
  actionButtonText: {
    fontSize: isSmallScreen ? 11 : 12,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
});