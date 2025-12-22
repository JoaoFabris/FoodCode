// src/app/(tabs)/home/product-detail.tsx
import { COLORS, SIZES } from '@/src/constants/theme';
import { useAuth } from '@/src/context/AuthContext';
import { useCart } from '@/src/context/CartContext';
import { useFavorites } from '@/src/context/FavoritesContext';
import { mealApiService } from '@/src/services/mealApi';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

interface MealDetail {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags?: string;
  strYoutube?: string;
  ingredients: string[];
  price: number;
}

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToCart, isInCart, getItemCount } = useCart();
  
  const [product, setProduct] = useState<MealDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      loadProductDetails(id as string);
    }
  }, [id]);

  const loadProductDetails = async (productId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log(' Buscando detalhes do produto:', productId);
      
      const mealData = await mealApiService.getMealDetails(productId);
      
      if (!mealData) {
        throw new Error('Produto não encontrado');
      }

      const productDetails: MealDetail = {
        idMeal: mealData.idMeal,
        strMeal: mealData.strMeal,
        strCategory: mealData.strCategory,
        strArea: mealData.strArea,
        strInstructions: mealData.strInstructions || 'Instruções não disponíveis',
          strMealThumb: getHighResImage(mealData.strMealThumb),
        strYoutube: mealData.strYoutube,
        ingredients: extractIngredients(mealData),
        price: generateRandomPrice(),
      };

      setProduct(productDetails);
      console.log(' Produto carregado:', productDetails.strMeal);
      
    } catch (error) {
      console.error(' Erro ao carregar produto:', error);
      setError('Não foi possível carregar os detalhes do produto');
    } finally {
      setIsLoading(false);
    }
  };

  const getHighResImage = (originalUrl: string): string => {
  // Tentar diferentes variações de alta resolução
  if (originalUrl) {
    // Remover '/preview' se existir e tentar versão maior
    const highResUrl = originalUrl.replace('/preview', '');
    return highResUrl;
  }
  return originalUrl;
};

  const extractIngredients = (meal: any): string[] => {
    const ingredients: string[] = [];
    
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      
      if (ingredient && ingredient.trim() !== '') {
        const fullIngredient = measure ? `${measure} ${ingredient}` : ingredient;
        ingredients.push(fullIngredient.trim());
      }
    }
    
    return ingredients;
  };

  const generateRandomPrice = (): number => {
    return Math.floor(Math.random() * 30) + 15;
  };

  const handleFavoritePress = async () => {
    if (!user || !product) return;

    const productToFavorite = {
      id: product.idMeal,
      name: product.strMeal,
      description: product.strInstructions.substring(0, 100) + '...',
      price: product.price,
      image: product.strMealThumb,
      category: product.strCategory.toLowerCase(),
    };

    try {
      await toggleFavorite(productToFavorite);
    } catch (error) {
      console.error('Erro ao favoritar:', error);
    }
  };

  const handleWatchVideo = () => {
    if (product?.strYoutube) {
      Linking.openURL(product.strYoutube);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    const cartProduct = {
      id: product.idMeal,
      name: product.strMeal,
      description: product.strInstructions.substring(0, 100) + '...',
      price: product.price,
      image: product.strMealThumb,
      category: product.strCategory.toLowerCase(),
    };

    // Adicionar quantidade especificada
    for (let i = 0; i < quantity; i++) {
      addToCart(cartProduct);
    }

    Alert.alert(
      ' Adicionado ao Carrinho!',
      `${quantity}x ${product.strMeal} foi adicionado ao carrinho`,
      [
        { text: 'Continuar comprando', style: 'cancel' },
        { 
          text: 'Ver carrinho', 
          onPress: () => router.push('/(tabs)/cart') 
        }
      ]
    );

    console.log(` Adicionado ao carrinho: ${quantity}x ${product.strMeal}`);
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  const totalPrice = product ? product.price * quantity : 0;
  const isFav = product ? isFavorite(product.idMeal) : false;
  const cartItemCount = getItemCount();
  const productInCart = product ? isInCart(product.idMeal) : false;

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen 
          options={{
            headerShown: true,
            title: 'Carregando...',
            headerStyle: { backgroundColor: COLORS.white },
            headerTintColor: COLORS.primary,
          }} 
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Carregando detalhes...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !product) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen 
          options={{
            headerShown: true,
            title: 'Erro',
            headerStyle: { backgroundColor: COLORS.white },
            headerTintColor: COLORS.primary,
          }} 
        />
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>😔</Text>
          <Text style={styles.errorTitle}>Ops!</Text>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => id && loadProductDetails(id as string)}
          >
            <Text style={styles.retryButtonText}>Tentar Novamente</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          headerShown: true,
          title: product.strMeal,
          headerStyle: { backgroundColor: COLORS.white },
          headerTintColor: COLORS.primary,
          headerTitleStyle: { fontSize: 16 },
          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <TouchableOpacity
                onPress={() => router.push('/(tabs)/cart')}
                style={styles.cartHeaderButton}
              >
                <Ionicons name="cart" size={24} color={COLORS.primary} />
                {cartItemCount > 0 && (
                  <View style={styles.cartBadge}>
                    <Text style={styles.cartBadgeText}>
                      {cartItemCount > 9 ? '9+' : cartItemCount}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
              
              {user && (
                <TouchableOpacity
                  onPress={handleFavoritePress}
                  style={styles.favoriteHeaderButton}
                >
                  <Ionicons
                    name={isFav ? 'heart' : 'heart-outline'}
                    size={24}
                    color={isFav ? '#FF4757' : COLORS.primary}
                  />
                </TouchableOpacity>
              )}
            </View>
          ),
        }} 
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Imagem do produto */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.strMealThumb }} style={styles.productImage} />
          
          {/* Tags overlay */}
          <View style={styles.tagsOverlay}>
            <View style={styles.categoryTag}>
              <Text style={styles.categoryTagText}>{product.strCategory}</Text>
            </View>
            <View style={styles.areaTag}>
              <Text style={styles.areaTagText}>🌍{product.strArea}</Text>
            </View>
          </View>
        </View>

        {/* Informações principais */}
        <View style={styles.contentContainer}>
          <View style={styles.headerInfo}>
            <View style={styles.titleSection}>
              <Text style={styles.productTitle}>{product.strMeal}</Text>
              <Text style={styles.productPrice}>R$ {product.price.toFixed(2)}</Text>
            </View>
          </View>

          {/* Status do produto no carrinho */}
          {productInCart && (
            <View style={styles.inCartNotice}>
              <Ionicons name="checkmark-circle" size={20} color="#28a745" />
              <Text style={styles.inCartText}>Este produto já está no seu carrinho</Text>
            </View>
          )}

          {/* Tags */}
          {product.strTags && (
            <View style={styles.tagsContainer}>
              {product.strTags.split(',').map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag.trim()}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Vídeo no YouTube */}
          {product.strYoutube && (
            <TouchableOpacity style={styles.videoButton} onPress={handleWatchVideo}>
              <Ionicons name="play-circle" size={24} color="#FF0000" />
              <Text style={styles.videoButtonText}>Ver Receita no YouTube</Text>
            </TouchableOpacity>
          )}

          {/* Ingredientes */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🧄 Ingredientes</Text>
            <View style={styles.ingredientsContainer}>
              {product.ingredients.map((ingredient, index) => (
                <View key={index} style={styles.ingredientItem}>
                  <View style={styles.ingredientBullet} />
                  <Text style={styles.ingredientText}>{ingredient}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Instruções */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>👨‍🍳 Como Preparar</Text>
            <Text style={styles.instructionsText}>{product.strInstructions}</Text>
          </View>

          {/* Controles de quantidade */}
          <View style={styles.quantitySection}>
            <Text style={styles.quantityLabel}>Quantidade:</Text>
            <View style={styles.quantityControls}>
              <TouchableOpacity 
                style={styles.quantityButton}
                onPress={decreaseQuantity}
              >
                <Ionicons name="remove" size={20} color={COLORS.primary} />
              </TouchableOpacity>
              
              <Text style={styles.quantityValue}>{quantity}</Text>
              
              <TouchableOpacity 
                style={styles.quantityButton}
                onPress={increaseQuantity}
              >
                <Ionicons name="add" size={20} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Total */}
          <View style={styles.totalSection}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalValue}>R$ {totalPrice.toFixed(2)}</Text>
          </View>

          {/*  Botão adicionar ao carrinho - atualizado */}
          <TouchableOpacity 
            style={[
              styles.addToCartButton, 
              productInCart && styles.addToCartButtonActive
            ]} 
            onPress={handleAddToCart}
          >
            <Ionicons 
              name={productInCart ? "checkmark-circle" : "bag-add"} 
              size={24} 
              color={COLORS.white} 
            />
            <Text style={styles.addToCartText}>
              {productInCart ? 'Adicionar Mais ao Carrinho' : 'Adicionar ao Carrinho'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  errorIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  errorText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: COLORS.white,
    fontSize: SIZES.body,
    fontWeight: '600',
  },
  cartHeaderButton: {
    padding: 8,
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  inCartNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fff8',
    borderColor: '#28a745',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    gap: 8,
  },
  inCartText: {
    fontSize: SIZES.body,
    color: '#28a745',
    fontWeight: '600',
  },
  addToCartButtonActive: {
    backgroundColor: '#28a745',
  },
  favoriteHeaderButton: {
    padding: 8,
    marginRight: 8,
  },
  imageContainer: {
  position: 'relative',
  ...(Platform.OS === 'web' && {
    alignItems: 'center',
  }),
},

 productImage: {
  width: Platform.select({
    web: Math.min(width, 600),
    default: width, 
  }),
  height: Platform.select({
    web: Math.min(width, 600) * 0.6, 
    default: width * 0.75,
  }),
  resizeMode: 'cover',
  ...(Platform.OS === 'web' && {
    borderRadius: 12, 
  }),
},
  tagsOverlay: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryTag: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  categoryTagText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
  },
  areaTag: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  areaTagText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
  },
  contentContainer: {
    padding: 20,
  },
  headerInfo: {
    marginBottom: 16,
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  productTitle: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    flex: 1,
    marginRight: 16,
  },
  productPrice: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    gap: 8,
  },
  tag: {
    backgroundColor: COLORS.light,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  videoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    gap: 8,
  },
  videoButtonText: {
    fontSize: SIZES.body,
    color: '#FF0000',
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  ingredientsContainer: {
    gap: 8,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  ingredientBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
  },
  ingredientText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    flex: 1,
  },
  instructionsText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  quantitySection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    padding: 16,
    backgroundColor: COLORS.white,
    borderRadius: 8,
  },
  quantityLabel: {
    fontSize: SIZES.title,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.light,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityValue: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    minWidth: 24,
    textAlign: 'center',
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    padding: 16,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  totalLabel: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  totalValue: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  addToCartText: {
    fontSize: SIZES.title,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});