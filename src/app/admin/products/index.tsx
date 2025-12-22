// src/app/admin/products/index.tsx
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS } from '../../../constants/theme';
import { PRODUCTS } from '../../../data/products';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  active: boolean;
  stock?: number;
}

export default function ProductsManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('Todos');

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchQuery, categoryFilter, products]);

  const loadProducts = () => {
    // Converter produtos existentes para formato admin
    const adminProducts: Product[] = PRODUCTS.map(product => ({
      ...product,
      active: true,
      stock: Math.floor(Math.random() * 50) + 10, // Stock simulado
    }));
    setProducts(adminProducts);
  };

  const filterProducts = () => {
    let filtered = products;

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (categoryFilter !== 'Todos') {
      filtered = filtered.filter(product => product.category === categoryFilter);
    }

    setFilteredProducts(filtered);
  };

  const toggleProductStatus = (productId: string) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId ? { ...product, active: !product.active } : product
      )
    );
  };

  const deleteProduct = (productId: string, productName: string) => {
    Alert.alert(
      'Confirmar Exclusão',
      `Deseja excluir o produto "${productName}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            setProducts(prevProducts =>
              prevProducts.filter(product => product.id !== productId)
            );
          }
        }
      ]
    );
  };

  const handleEditProduct = (productId: string) => {
    console.log('Editando produto:', productId);
    Alert.alert(
      'Editar Produto',
      `Funcionalidade em desenvolvimento.\nID do produto: ${productId}`,
      [{ text: 'OK' }]
    );
  };

  const categories = ['Todos', 'burgers', 'drinks', 'sides', 'desserts'];

  return (
    <SafeAreaView style={styles.container} edges={['top', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.pageTitle}>Gerenciar Produtos</Text>
          <Text style={styles.pageSubtitle}>{filteredProducts.length} produtos encontrados</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={[styles.headerButton, { backgroundColor: COLORS.primary }]}
            onPress={() => router.push('/admin/products/create' as any)} // ✅ CORREÇÃO
          >
            <Ionicons name="add" size={20} color="#fff" />
            <Text style={[styles.headerButtonText, { color: '#fff' }]}>Novo Produto</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar produtos..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryFilters}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryFilter,
                categoryFilter === category && styles.categoryFilterActive
              ]}
              onPress={() => setCategoryFilter(category)}
            >
              <Text style={[
                styles.categoryFilterText,
                categoryFilter === category && styles.categoryFilterTextActive
              ]}>
                {category === 'Todos' ? 'Todos' : category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Products Grid */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.productsGrid}>
          {filteredProducts.map((product) => (
            <View key={product.id} style={styles.productCard}>
              <View style={styles.productImageContainer}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <View style={styles.productActions}>
                  <TouchableOpacity
                    style={[styles.actionIcon, { backgroundColor: product.active ? '#10B981' : '#EF4444' }]}
                    onPress={() => toggleProductStatus(product.id)}
                  >
                    <Ionicons 
                      name={product.active ? 'checkmark' : 'close'} 
                      size={16} 
                      color="#fff" 
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionIcon, { backgroundColor: '#3B82F6' }]}
                    onPress={() => handleEditProduct(product.id)} 
                  >
                    <Ionicons name="pencil" size={16} color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionIcon, { backgroundColor: '#EF4444' }]}
                    onPress={() => deleteProduct(product.id, product.name)}
                  >
                    <Ionicons name="trash" size={16} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.productInfo}>
                <View style={styles.productHeader}>
                  <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
                  <View style={[
                    styles.statusIndicator,
                    { backgroundColor: product.active ? '#D1FAE5' : '#FEE2E2' }
                  ]}>
                    <Text style={[
                      styles.statusText,
                      { color: product.active ? '#10B981' : '#EF4444' }
                    ]}>
                      {product.active ? 'Ativo' : 'Inativo'}
                    </Text>
                  </View>
                </View>

                <Text style={styles.productDescription} numberOfLines={2}>
                  {product.description}
                </Text>

                <View style={styles.productDetails}>
                  <View style={styles.priceContainer}>
                    <Text style={styles.productPrice}>R$ {product.price.toFixed(2)}</Text>
                    <Text style={styles.productCategory}>{product.category}</Text>
                  </View>
                  {product.stock !== undefined && (
                    <View style={styles.stockContainer}>
                      <Text style={styles.stockLabel}>Estoque:</Text>
                      <Text style={[
                        styles.stockValue,
                        { color: product.stock < 10 ? '#EF4444' : '#10B981' }
                      ]}>
                        {product.stock}
                      </Text>
                    </View>
                  )}
                </View>

                <TouchableOpacity 
                  style={styles.viewDetailsButton}
                  onPress={() => handleEditProduct(product.id)}
                >
                  <Text style={styles.viewDetailsText}>Ver Detalhes</Text>
                  <Ionicons name="chevron-forward" size={16} color={COLORS.primary} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {filteredProducts.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="fast-food-outline" size={64} color="#cbd5e0" />
            <Text style={styles.emptyTitle}>Nenhum produto encontrado</Text>
            <Text style={styles.emptySubtitle}>
              {searchQuery || categoryFilter !== 'Todos' 
                ? 'Tente ajustar os filtros de busca' 
                : 'Comece adicionando seu primeiro produto'
              }
            </Text>
            {!searchQuery && categoryFilter === 'Todos' && (
              <TouchableOpacity
                style={styles.addFirstButton}
                onPress={() => router.push('/admin/products/create' as any)}
              >
                <Text style={styles.addFirstButtonText}>Adicionar Primeiro Produto</Text>
              </TouchableOpacity>
            )}
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
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a202c',
  },
  pageSubtitle: {
    fontSize: 14,
    color: '#718096',
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
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
    paddingHorizontal: 24,
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
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    paddingLeft: 8,
    fontSize: 14,
    color: '#2d3748',
  },
  categoryFilters: {
    flexDirection: 'row',
  },
  categoryFilter: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f7fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginRight: 8,
  },
  categoryFilterActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryFilterText: {
    fontSize: 14,
    color: '#4a5568',
    fontWeight: '500',
  },
  categoryFilterTextActive: {
    color: '#fff',
  },
  content: {
    padding: 24,
    minHeight: 400,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    width: '48%',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  productImageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  productActions: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    gap: 4,
  },
  actionIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInfo: {
    padding: 16,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a202c',
    flex: 1,
    marginRight: 8,
  },
  statusIndicator: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  productDescription: {
    fontSize: 12,
    color: '#718096',
    marginBottom: 12,
    lineHeight: 16,
  },
  productDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  priceContainer: {
    flex: 1,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  productCategory: {
    fontSize: 12,
    color: '#718096',
    marginTop: 2,
    textTransform: 'capitalize',
  },
  stockContainer: {
    alignItems: 'flex-end',
  },
  stockLabel: {
    fontSize: 10,
    color: '#718096',
  },
  stockValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#f7fafc',
  },
  viewDetailsText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
    marginRight: 4,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4a5568',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
    marginBottom: 24,
  },
  addFirstButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addFirstButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});