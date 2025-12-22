// src/context/AuthContext.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export interface User {
  id: string;
  name: string;
  phone: string;
  cpf: string;
  address: string;
  photo?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (userData: Omit<User, 'id'>) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (userData: Omit<User, 'id'>) => {
    try {
      const newUser: User = {
        ...userData,
        id: Date.now().toString(),
      };

      await AsyncStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const updateProfile = async (userData: Partial<User>) => {
    try {
      if (!user) return;

      const updatedUser = { ...user, ...userData };
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      logout,
      updateProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}