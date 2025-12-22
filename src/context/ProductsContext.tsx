// src/context/ProductsContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

import { mealApiService } from '../services/mealApi';
import { Category, Product } from '../types';

interface ProductsContextType {
  products: Product[];
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  searchProducts: (query: string) => Promise<Product[]>;
  getProductsByCategory: (categoryId: string) => Promise<Product[]>;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refreshData = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      console.log('[ProductsContext] Iniciando carregamento de dados...');


      const productsData = await mealApiService.getMultipleCategories();
      

      const apiCategories = await mealApiService.getApiCategories();
      const categoriesData = mealApiService.convertToCategories(apiCategories);

      const safeProducts = Array.isArray(productsData) ? productsData : [];
      const safeCategories = Array.isArray(categoriesData) ? categoriesData : [];

      const validatedProducts = safeProducts.map(product => ({
        ...product,
        price: typeof product.price === 'number' ? product.price : 15.90,
      }));

      setProducts(validatedProducts);
      setCategories(safeCategories);

      console.log(`[ProductsContext] Dados carregados: ${validatedProducts.length} produtos, ${safeCategories.length} categorias`);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      console.error('[ProductsContext] Erro ao carregar dados:', errorMessage);
      setError('Erro ao carregar dados da API');
      
      const fallbackProducts: Product[] = [
        {
          id: '1',
          name: 'Produto Exemplo',
          price: 25.90,
          image: 'https://via.placeholder.com/150',
          description: 'Produto de exemplo',
          category: 'beef',
        }
      ];
      
      setProducts(fallbackProducts);
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  };

  const searchProducts = async (query: string): Promise<Product[]> => {
    try {
      if (!query?.trim()) {
        return [];
      }

      const meals = await mealApiService.searchByName(query.trim());

      if (!Array.isArray(meals)) {
        return [];
      }

      const searchResults = meals
        .map(meal => mealApiService.convertToProduct(meal))
        .filter((product): product is Product => product !== null)
        .map(product => ({
          ...product,
          price: typeof product.price === 'number' ? product.price : 15.90,
        }));
      
      return searchResults;
    } catch (err) {
      console.error('Erro ao buscar produtos:', err);
      return [];
    }
  };

  const getProductsByCategory = async (categoryId: string): Promise<Product[]> => {
    try {
      if (!categoryId?.trim()) {
        return [];
      }

      if (categoryId === 'all') {
        return Array.isArray(products) ? [...products] : [];
      }

      const categoryToApiMap = mealApiService.getCategoryMapping();
      const apiCategory = categoryToApiMap[categoryId as keyof typeof categoryToApiMap];
      
      if (!apiCategory) {
        console.warn(`[ProductsContext] Categoria não encontrada: ${categoryId}`);
        return [];
      }

      console.log(`[ProductsContext] Buscando produtos da categoria: ${categoryId} -> API: ${apiCategory}`);
      
      const meals = await mealApiService.getByCategory(apiCategory);
      
      if (!Array.isArray(meals)) {
        return [];
      }

      const limitedMeals = meals.slice(0, 8);
      
      const categoryProducts = limitedMeals
        .map(meal => mealApiService.convertToProduct(meal))
        .filter((product): product is Product => product !== null)
        .map(product => ({
          ...product,
          price: typeof product.price === 'number' ? product.price : 15.90,
        }));
      
      return categoryProducts;
    } catch (err) {
      console.error('[ProductsContext] Erro ao buscar por categoria:', err);
      return [];
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const contextValue: ProductsContextType = React.useMemo(() => ({
    products: products ?? [],
    categories: categories ?? [],
    isLoading: Boolean(isLoading),
    error,
    refreshData,
    searchProducts,
    getProductsByCategory,
  }), [products, categories, isLoading, error]);

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts(): ProductsContextType {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts deve ser usado dentro de ProductsProvider');
  }
  return context;
}