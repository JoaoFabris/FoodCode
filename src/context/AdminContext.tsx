// src/context/AdminContext.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface Admin {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager';
}

interface AdminContextType {
  admin: Admin | null;
  isLoading: boolean;
  adminLogin: (email: string, password: string) => Promise<boolean>;
  adminLogout: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    try {
      const adminData = await AsyncStorage.getItem('admin');
      if (adminData) {
        setAdmin(JSON.parse(adminData));
      }
    } catch (error) {
      console.error('Erro ao carregar dados do admin:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const adminLogin = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulação de login - em produção seria uma API
      if (email === 'admin@foodcode.com' && password === '123456') {
        const adminData: Admin = {
          id: '1',
          name: 'Administrador',
          email: 'admin@foodcode.com',
          role: 'admin'
        };
        
        await AsyncStorage.setItem('admin', JSON.stringify(adminData));
        setAdmin(adminData);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro no login admin:', error);
      return false;
    }
  };

  const adminLogout = async () => {
    try {
      await AsyncStorage.removeItem('admin');
      setAdmin(null);
    } catch (error) {
      console.error('Erro no logout admin:', error);
    }
  };

  return (
    <AdminContext.Provider value={{
      admin,
      isLoading,
      adminLogin,
      adminLogout,
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin deve ser usado dentro de um AdminProvider');
  }
  return context;
}