// src/context/CartContext.tsx
import React from 'react';
import { Product } from '../types';

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
  isInCart: (productId: string) => boolean;
}

const CartContext = React.createContext<CartContextType | null>(null);

export function CartProvider(props: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>([]);

  function addToCart(product: Product) {
    setItems(function(currentItems) {
      const existingItem = currentItems.find(function(item) {
        return item.id === product.id;
      });
      
      if (existingItem) {
        return currentItems.map(function(item) {
          if (item.id === product.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      } else {
        return [...currentItems, { ...product, quantity: 1 }];
      }
    });
  }

  function removeFromCart(productId: string) {
    setItems(function(currentItems) {
      return currentItems.filter(function(item) {
        return item.id !== productId;
      });
    });
  }

  function updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems(function(currentItems) {
      return currentItems.map(function(item) {
        if (item.id === productId) {
          return { ...item, quantity };
        }
        return item;
      });
    });
  }

  function clearCart() {
    setItems([]);
  }

  function getTotal() {
    return items.reduce(function(total, item) {
      return total + (item.price * item.quantity);
    }, 0);
  }

  function getItemCount() {
    return items.reduce(function(count, item) {
      return count + item.quantity;
    }, 0);
  }

  function isInCart(productId: string) {
    return items.some(function(item) {
      return item.id === productId;
    });
  }

  const value = {
    items: items,
    addToCart: addToCart,
    removeFromCart: removeFromCart,
    updateQuantity: updateQuantity,
    clearCart: clearCart,
    getTotal: getTotal,
    getItemCount: getItemCount,
    isInCart: isInCart,
  };

  return React.createElement(
    CartContext.Provider,
    { value: value },
    props.children
  );
}

export function useCart() {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de CartProvider');
  }
  return context;
}