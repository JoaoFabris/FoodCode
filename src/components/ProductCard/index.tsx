// src/components/ProductCard/index.tsx
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { COLORS, SIZES } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';
import { useFavorites } from '../../context/FavoritesContext';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onPress?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
}) => {
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [heartScale] = useState(new Animated.Value(1));
  const [isAnimating, setIsAnimating] = useState(false);

  const isFav = isFavorite(product.id);

  const handlePress = () => {
    router.push({
      pathname: '/home/product-detail',
      params: { id: product.id },
    });

    onPress?.(product);
  };
  const handleFavoritePress = async () => {
    if (!user) {
      Alert.alert(
        'Login Necessário',
        'Você precisa estar logado para favoritar produtos.',
        [{ text: 'OK' }]
      );
      return;
    }

    if (isAnimating) return;

    setIsAnimating(true);


    Animated.sequence([
      Animated.timing(heartScale, {
        toValue: 1.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(heartScale, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsAnimating(false);
    });

    try {
      await toggleFavorite(product);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível alterar o favorito. Tente novamente.');
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {product.description}
        </Text>
      </View>
      <View style={styles.priceAndFavorite}>
        <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={handleFavoritePress}
          activeOpacity={0.7}
        >
          <Animated.View style={[styles.heartContainer, { transform: [{ scale: heartScale }] }]}>
            <Ionicons
              name={isFav ? 'heart' : 'heart-outline'}
              size={24}
              color={isFav ? '#FF4757' : '#BDC3C7'}
            />
          </Animated.View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.cardRadius,
    padding: SIZES.md,
    marginHorizontal: SIZES.lg,
    marginBottom: SIZES.md,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: 90,
    height: 80,
    borderRadius: SIZES.radius,
    marginRight: SIZES.md,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: SIZES.title,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SIZES.xs,
  },
  description: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  priceAndFavorite: {
    alignItems: 'center',
    marginLeft: SIZES.sm,
  },
  price: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
  },
  favoriteButton: {
    padding: 4,
  },
  heartContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});