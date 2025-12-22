// src/context/FavoritesContext.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { Product } from '../types';
import { useAuth } from './AuthContext';

interface FavoritesContextType {
  favorites: Product[];
  isLoading: boolean;
  addToFavorites: (product: Product) => Promise<void>;
  removeFromFavorites: (productId: string) => Promise<void>;
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (product: Product) => Promise<void>;
  clearFavorites: () => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadFavorites();
    } else {
      // Se não há usuário logado, limpar favoritos
      setFavorites([]);
      setIsLoading(false);
    }
  }, [user]);

  const getFavoritesKey = () => {
    return user ? `favorites_${user.id}` : null;
  };

  const loadFavorites = async () => {
    try {
      setIsLoading(true);
      const key = getFavoritesKey();
      if (!key) return;

      const favoritesData = await AsyncStorage.getItem(key);
      if (favoritesData) {
        setFavorites(JSON.parse(favoritesData));
      }
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveFavorites = async (newFavorites: Product[]) => {
    try {
      const key = getFavoritesKey();
      if (!key) return;

      await AsyncStorage.setItem(key, JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Erro ao salvar favoritos:', error);
      throw error;
    }
  };

  const addToFavorites = async (product: Product) => {
    try {
      const isAlreadyFavorite = favorites.some(fav => fav.id === product.id);
      if (isAlreadyFavorite) return;

      const newFavorites = [...favorites, product];
      setFavorites(newFavorites);
      await saveFavorites(newFavorites);
    } catch (error) {
      console.error('Erro ao adicionar aos favoritos:', error);
      throw error;
    }
  };

  const removeFromFavorites = async (productId: string) => {
    try {
      const newFavorites = favorites.filter(fav => fav.id !== productId);
      setFavorites(newFavorites);
      await saveFavorites(newFavorites);
    } catch (error) {
      console.error('Erro ao remover dos favoritos:', error);
      throw error;
    }
  };

  const isFavorite = (productId: string): boolean => {
    return favorites.some(fav => fav.id === productId);
  };

  const toggleFavorite = async (product: Product) => {
    try {
      if (isFavorite(product.id)) {
        await removeFromFavorites(product.id);
      } else {
        await addToFavorites(product);
      }
    } catch (error) {
      console.error('Erro ao alternar favorito:', error);
      throw error;
    }
  };

  const clearFavorites = async () => {
    try {
      setFavorites([]);
      const key = getFavoritesKey();
      if (key) {
        await AsyncStorage.removeItem(key);
      }
    } catch (error) {
      console.error('Erro ao limpar favoritos:', error);
      throw error;
    }
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      isLoading,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      toggleFavorite,
      clearFavorites,
    }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites deve ser usado dentro de um FavoritesProvider');
  }
  return context;
}