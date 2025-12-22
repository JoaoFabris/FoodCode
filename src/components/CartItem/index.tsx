// src/components/CartItem/index.tsx
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';
import { CartItem as CartItemType } from '../../context/CartContext';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export const CartItem: React.FC<CartItemProps> = ({ 
  item, 
  onUpdateQuantity, 
  onRemove 
}) => {
  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const totalPrice = item.price * item.quantity;

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={2}>
            {item.name}
          </Text>
          
          <TouchableOpacity 
            onPress={() => onRemove(item.id)}
            style={styles.removeButton}
          >
            <Text style={styles.removeText}>✕</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
        
        <View style={styles.footer}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity 
              onPress={() => onUpdateQuantity(item.id, item.quantity - 1)}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            
            <Text style={styles.quantity}>{item.quantity}</Text>
            
            <TouchableOpacity 
              onPress={() => onUpdateQuantity(item.id, item.quantity + 1)}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.total}>{formatPrice(totalPrice)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.md,
    marginHorizontal: SIZES.lg,
    marginBottom: SIZES.md,
    padding: SIZES.md,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: SIZES.sm,
  },
  content: {
    flex: 1,
    marginLeft: SIZES.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SIZES.xs,
  },
  name: {
    flex: 1,
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  removeButton: {
    padding: SIZES.xs,
  },
  removeText: {
    color: COLORS.error || '#dc3545',
    fontSize: SIZES.body,
    fontWeight: 'bold',
  },
  price: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    marginBottom: SIZES.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.light || '#f8f9fa',
    borderRadius: SIZES.sm,
    paddingHorizontal: SIZES.xs,
  },
  quantityButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: SIZES.title,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  quantity: {
    fontSize: SIZES.body,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginHorizontal: SIZES.md,
    minWidth: 20,
    textAlign: 'center',
  },
  total: {
    fontSize: SIZES.title,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});