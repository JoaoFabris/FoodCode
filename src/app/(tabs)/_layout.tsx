// src/app/(tabs)/_layout.tsx 
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

import { CartProvider, useCart } from '../../context/CartContext';
import { FavoritesProvider } from '../../context/FavoritesContext';

function TabsContent() {
  const { getItemCount } = useCart();
  const cartCount = getItemCount();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FF9800',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#eee',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Carrinho',
          tabBarBadge: cartCount > 0 ? cartCount : undefined,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" size={size} color={color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

export default function TabLayout() {
  return (
    <FavoritesProvider>
      <CartProvider>
        <TabsContent />
      </CartProvider>
    </FavoritesProvider>
  );
}