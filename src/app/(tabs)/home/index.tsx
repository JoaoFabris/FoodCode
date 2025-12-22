// src/app/(tabs)/index.tsx
import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { CategoryNav } from '../../../components/CategoryNav';
import { Header } from '../../../components/Header';
import { ProductCard } from '../../../components/ProductCard';
import { SearchBar } from '../../../components/SearchBar';
import { COLORS, SIZES } from '../../../constants/theme';
import { useAuth } from '../../../context/AuthContext';
import { useProducts } from '../../../context/ProductsContext';

export default function HomeScreen() {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  //  Estados para filtro por categoria
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
  const [isLoadingCategory, setIsLoadingCategory] = useState(false);

  const { user, logout } = useAuth();
  const { 
    products, 
    categories, 
    isLoading, 
    error, 
    refreshData, 
    searchProducts,
    getProductsByCategory 
  } = useProducts();

  const [activeCategories, setActiveCategories] = useState(categories);

  //  Atualizar categorias quando chegarem da API
  useEffect(() => {
    if (categories.length > 0) {
      // Adicionar categoria "Todos" no início
      const allCategory = { id: 'all', name: 'Prato do dia', active: true };
      const categoriesWithAll = [allCategory, ...categories.map(cat => ({ ...cat, active: false }))];
      setActiveCategories(categoriesWithAll);
    }
  }, [categories]);

  // Carregar produtos iniciais (todos os produtos)
  useEffect(() => {
    if (products.length > 0 && selectedCategoryId === 'all') {
      setFilteredProducts(products);
    }
  }, [products, selectedCategoryId]);

  //  Função principal para filtrar por categoria
  const handleCategoryPress = async (categoryId: string) => {
    setIsLoadingCategory(true);
    
    try {
      // Atualizar estado visual das categorias
      const updatedCategories = activeCategories.map(cat => ({
        ...cat,
        active: cat.id === categoryId
      }));
      setActiveCategories(updatedCategories);
      setSelectedCategoryId(categoryId);

      console.log(`Categoria selecionada: ${categoryId}`);

      // Filtrar produtos
      if (categoryId === 'all') {
        // Mostrar todos os produtos
        setFilteredProducts(products);
      } else {
        // Buscar produtos da categoria específica
        const categoryProducts = await getProductsByCategory(categoryId);
        console.log(`Produtos encontrados: ${categoryProducts.length}`);
        setFilteredProducts(categoryProducts);
      }
    } catch (error) {
      console.error('Erro ao carregar produtos da categoria:', error);
      setFilteredProducts([]);
    } finally {
      setIsLoadingCategory(false);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchText(query);
    
    if (query.trim()) {
      setIsSearching(true);
      try {
        const results = await searchProducts(query);
        setSearchResults(results);
      } catch (error) {
        console.error('Erro na busca:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleProductPress = (product: any) => {
    console.log('Produto selecionado:', product.name);
  };

  const handleLogout = async () => {
    await logout();
    console.log('Logout realizado');
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refreshData();
    // Recarregar produtos da categoria atual após refresh
    if (selectedCategoryId !== 'all') {
      await handleCategoryPress(selectedCategoryId);
    }
    setRefreshing(false);
  };

  const clearSearch = () => {
    setSearchText('');
    setSearchResults([]);
  };

  const hasSearch = searchText.trim().length > 0;
  
  const displayProducts = hasSearch ? searchResults : filteredProducts;
  
  const activeCategoryName = activeCategories.find(cat => cat.active)?.name || 'Pratos Especiais';

  // Loading inicial
  if (isLoading && !refreshing) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        <Header title="Home" onLogout={handleLogout} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Carregando delícias...</Text>
        </View>
      </View>
    );
  }

  // Erro
  if (error) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        <Header title="Home" onLogout={handleLogout} />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>😔 Ops!</Text>
          <Text style={styles.errorDescription}>
            Não conseguimos carregar os pratos no momento.{'\n'}
            Tente novamente mais tarde.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <Header title="Home" onLogout={handleLogout} />

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
          />
        }
      >
        {/* Seção de boas-vindas */}
        <View style={styles.welcomeSection}>
          <Text style={styles.appTitle}>Food Code</Text>
          <Text style={styles.welcomeText}>
            {user ? `Bem-vindo, ${user.name}!` : 'Bem-vindo!'}
          </Text>
          <Text style={styles.subtitle}>Pratos do mundo todo 🌍</Text>
        </View>

        {/* Barra de pesquisa */}
        <SearchBar 
          placeholder="Buscar pratos..." 
          value={searchText}
          onChangeText={handleSearch}
          onClear={clearSearch}
        />

        {/* Loading da busca */}
        {isSearching && (
          <View style={styles.searchingContainer}>
            <ActivityIndicator size="small" color={COLORS.primary} />
            <Text style={styles.searchingText}>Buscando...</Text>
          </View>
        )}

        {/* Resultados da busca */}
        {hasSearch && !isSearching && (
          <View style={styles.searchResults}>
            <Text style={styles.searchResultsText}>
              {searchResults.length > 0 
                ? `${searchResults.length} resultado${searchResults.length !== 1 ? 's' : ''} para "${searchText}"`
                : `Nenhum prato encontrado para "${searchText}"`
              }
            </Text>
          </View>
        )}

        {/* Categorias */}
        {!hasSearch && activeCategories.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Categorias</Text>
            <CategoryNav 
              categories={activeCategories}
              onCategoryPress={handleCategoryPress}
            />
          </>
        )}

        {/* Loading da categoria */}
        {isLoadingCategory && !hasSearch && (
          <View style={styles.searchingContainer}>
            <ActivityIndicator size="small" color={COLORS.primary} />
            <Text style={styles.searchingText}>Carregando categoria...</Text>
          </View>
        )}

        {/* Produtos */}
        <Text style={styles.sectionTitle}>
          {hasSearch ? 'Resultados da busca' : activeCategoryName}
        </Text>
        
        <View style={styles.productList}>
          {displayProducts.length > 0 ? (
            displayProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
                onPress={handleProductPress}
              />
            ))
          ) : (
            !hasSearch && !isLoading && !isLoadingCategory && (
              <View style={styles.emptyState}>
                <Text style={styles.emptyIcon}>🍽️</Text>
                <Text style={styles.emptyTitle}>
                  {selectedCategoryId === 'all' ? 'Em breve!' : 'Nenhum prato encontrado'}
                </Text>
                <Text style={styles.emptyDescription}>
                  {selectedCategoryId === 'all' 
                    ? 'Estamos preparando pratos deliciosos para você.' 
                    : 'Não há pratos disponíveis nesta categoria no momento.'
                  }
                </Text>
              </View>
            )
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.lg,
  },
  loadingText: {
    marginTop: SIZES.md,
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.lg,
  },
  errorText: {
    fontSize: 48,
    marginBottom: SIZES.lg,
  },
  errorDescription: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  welcomeSection: {
    alignItems: 'center',
    paddingVertical: SIZES.xl,
    paddingHorizontal: SIZES.lg,
  },
  appTitle: {
    fontSize: SIZES.h1,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: SIZES.sm,
  },
  welcomeText: {
    fontSize: SIZES.title,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SIZES.xs,
    fontStyle: 'italic',
  },
  sectionTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginHorizontal: SIZES.lg,
    marginBottom: SIZES.md,
    marginTop: SIZES.lg,
  },
  productList: {
    paddingBottom: SIZES.xl,
  },
  searchingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SIZES.md,
    gap: SIZES.sm,
  },
  searchingText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
  },
  searchResults: {
    paddingHorizontal: SIZES.lg,
    paddingBottom: SIZES.md,
  },
  searchResultsText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: SIZES.xl * 2,
    paddingHorizontal: SIZES.lg,
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
  },
});