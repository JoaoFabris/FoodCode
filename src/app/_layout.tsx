// src/app/_layout.tsx
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { AdminProvider } from '../context/AdminContext';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import { ProductsProvider } from '../context/ProductsContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <CartProvider> 
          <AdminProvider>
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            >
              {/* Tabs principais */}
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              
              {/* Tela de login */}
              <Stack.Screen 
                name="login" 
                options={{ 
                  presentation: 'card',
                  animation: 'slide_from_bottom',
                }} 
              />

              {/* Tela de checkout */}
              <Stack.Screen 
                name="checkout" 
                options={{ 
                  presentation: 'card',
                  animation: 'slide_from_right',
                }} 
              />

              {/* Tela de confirmação do pedido */}
              <Stack.Screen 
                name="order-confirmation" 
                options={{ 
                  presentation: 'card',
                  animation: 'slide_from_right',
                }} 
              />

              {/* Rotas admin */}
              <Stack.Screen 
                name="admin-login" 
                options={{ 
                  presentation: 'card',
                  animation: 'slide_from_bottom',
                }} 
              />

              <Stack.Screen 
                name="admin" 
                options={{ 
                  headerShown: false,
                }} 
              />
            </Stack>
            
            <StatusBar style="dark" />
          </AdminProvider>
        </CartProvider> 
      </ProductsProvider> 
    </AuthProvider>
  );
}