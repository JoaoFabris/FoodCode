// src/services/mealApi.ts
import { Category, Product } from "../types";

const MEAL_API_BASE = 'https://www.themealdb.com/api/json/v1/1';

type InternalCategoryId = 'beef' | 'chicken' | 'seafood' | 'vegetarian' | 'dessert';
type ApiCategoryName = 'Beef' | 'Chicken' | 'Seafood' | 'Vegetarian' | 'Dessert';

interface MealApiResponse {
  meals: Meal[] | null;
}

interface CategoriesApiResponse {
  categories: ApiCategory[] | null;
}

interface Meal {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate?: string;
  strCategory: string;
  strArea: string;
  strInstructions: string | null;
  strMealThumb: string;
  strTags?: string | null;
  strYoutube?: string;
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
  strIngredient4?: string;
  strIngredient5?: string;
  strIngredient6?: string;
  strIngredient7?: string;
  strIngredient8?: string;
  strIngredient9?: string;
  strIngredient10?: string;
  strIngredient11?: string;
  strIngredient12?: string;
  strIngredient13?: string;
  strIngredient14?: string;
  strIngredient15?: string;
  strIngredient16?: string;
  strIngredient17?: string;
  strIngredient18?: string;
  strIngredient19?: string;
  strIngredient20?: string;
  strMeasure1?: string;
  strMeasure2?: string;
  strMeasure3?: string;
  strMeasure4?: string;
  strMeasure5?: string;
  strMeasure6?: string;
  strMeasure7?: string;
  strMeasure8?: string;
  strMeasure9?: string;
  strMeasure10?: string;
  strMeasure11?: string;
  strMeasure12?: string;
  strMeasure13?: string;
  strMeasure14?: string;
  strMeasure15?: string;
  strMeasure16?: string;
  strMeasure17?: string;
  strMeasure18?: string;
  strMeasure19?: string;
  strMeasure20?: string;
  strSource?: string;
  strImageSource?: string;
  strCreativeCommonsConfirmed?: string;
  dateModified?: string;
}

interface ApiCategory {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

class MealApiService {
  private readonly CATEGORY_MAPPING: Record<InternalCategoryId, ApiCategoryName> = {
    'beef': 'Beef',
    'chicken': 'Chicken', 
    'seafood': 'Seafood',
    'vegetarian': 'Vegetarian',
    'dessert': 'Dessert'
  } as const;

  private readonly REVERSE_CATEGORY_MAPPING: Record<ApiCategoryName, InternalCategoryId> = {
    'Beef': 'beef',
    'Chicken': 'chicken',
    'Seafood': 'seafood', 
    'Vegetarian': 'vegetarian',
    'Dessert': 'dessert'
  } as const;

  private readonly CATEGORY_DISPLAY_NAMES: Record<InternalCategoryId, string> = {
    'beef': 'Carne',
    'chicken': 'Frango',
    'seafood': 'Frutos do Mar',
    'vegetarian': 'Vegetariano', 
    'dessert': 'Sobremesas'
  } as const;

  getCategoryMapping(): Record<InternalCategoryId, ApiCategoryName> {
    return this.CATEGORY_MAPPING;
  }

  async getByCategory(category: string): Promise<Meal[]> {
    try {
      const response = await fetch(`${MEAL_API_BASE}/filter.php?c=${category}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: MealApiResponse = await response.json();
      return data.meals || [];
    } catch (error) {
      console.error('Erro ao buscar por categoria:', error);
      return [];
    }
  }

  async searchByName(name: string): Promise<Meal[]> {
    try {
      const response = await fetch(`${MEAL_API_BASE}/search.php?s=${encodeURIComponent(name)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: MealApiResponse = await response.json();
      return data.meals || [];
    } catch (error) {
      console.error('Erro ao buscar por nome:', error);
      return [];
    }
  }

  async getMealDetails(id: string): Promise<Meal | null> {
    try {
      const response = await fetch(`${MEAL_API_BASE}/lookup.php?i=${id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: MealApiResponse = await response.json();
      return data.meals?.[0] || null;
    } catch (error) {
      console.error('Erro ao buscar detalhes:', error);
      return null;
    }
  }

  async getRandomMeal(): Promise<Meal | null> {
    try {
      const response = await fetch(`${MEAL_API_BASE}/random.php`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: MealApiResponse = await response.json();
      return data.meals?.[0] || null;
    } catch (error) {
      console.error('Erro ao buscar prato aleatório:', error);
      return null;
    }
  }

  async getApiCategories(): Promise<ApiCategory[]> {
    try {
      const response = await fetch(`${MEAL_API_BASE}/categories.php`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: CategoriesApiResponse = await response.json();
      return data.categories || [];
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      return [];
    }
  }

  async getMultipleCategories(): Promise<Product[]> {
    try {
      const apiCategories = Object.values(this.CATEGORY_MAPPING);
      const allProducts: Product[] = [];

      for (const apiCategory of apiCategories) {
        try {
          console.log(`Buscando categoria: ${apiCategory}`);
          const meals = await this.getByCategory(apiCategory);
          
          const limitedMeals = meals.slice(0, 3);
          
          const categoryProducts = limitedMeals
            .map(meal => this.convertToProduct(meal))
            .filter((product): product is Product => product !== null);
            
          allProducts.push(...categoryProducts);
          
          await new Promise(resolve => setTimeout(resolve, 100));
        } catch (error) {
          console.error(`Erro ao buscar categoria ${apiCategory}:`, error);
        }
      }

      console.log(`Total de produtos carregados: ${allProducts.length}`);
      return allProducts;
    } catch (error) {
      console.error('Erro ao buscar múltiplas categorias:', error);
      return [];
    }
  }

  convertToProduct(meal: Meal): Product | null {
    try {
      if (!meal.idMeal || !meal.strMeal || !meal.strMealThumb) {
        console.warn('Dados do prato incompletos:', meal);
        return null;
      }

      return {
        id: meal.idMeal,
        name: this.sanitizeText(meal.strMeal),
        description: this.createDescription(meal),
        price: this.generateRandomPrice(),
        image: meal.strMealThumb,
        category: this.mapApiCategoryToInternal(meal.strCategory),
      };
    } catch (error) {
      console.error('Erro ao converter produto:', error);
      return null;
    }
  }

  convertToCategories(apiCategories: ApiCategory[]): Category[] {
    const relevantCategories = Object.values(this.CATEGORY_MAPPING);
    
    return apiCategories
      .filter(cat => relevantCategories.includes(cat.strCategory as ApiCategoryName))
      .map((cat) => {
        const internalId = this.mapApiCategoryToInternal(cat.strCategory);
        return {
          id: internalId,
          name: this.CATEGORY_DISPLAY_NAMES[internalId as InternalCategoryId] || cat.strCategory,
          active: false,
        };
      });
  }

  private mapApiCategoryToInternal(apiCategory: string): InternalCategoryId {
    // Verificação segura de tipo
    if (apiCategory in this.REVERSE_CATEGORY_MAPPING) {
      return this.REVERSE_CATEGORY_MAPPING[apiCategory as ApiCategoryName];
    }
    return 'beef'; // fallback padrão
  }

  private sanitizeText(text: string): string {
    if (!text || typeof text !== 'string') {
      return 'Produto sem nome';
    }
    return text.trim();
  }

  private createDescription(meal: Meal): string {
    let description = '';
    
    if (meal.strInstructions && typeof meal.strInstructions === 'string') {
      description = meal.strInstructions;
    } else if (meal.strCategory && meal.strArea) {
      description = `Delicioso prato ${meal.strCategory.toLowerCase()} da culinária ${meal.strArea}`;
    } else {
      description = 'Uma deliciosa especialidade preparada com ingredientes selecionados';
    }

    return this.truncateDescription(description);
  }

  private truncateDescription(text: string): string {
    if (!text || typeof text !== 'string') {
      return 'Descrição não disponível';
    }
    
    const cleaned = text.trim();
    return cleaned.length > 120 ? `${cleaned.substring(0, 120)}...` : cleaned;
  }

  private generateRandomPrice(): number {
    const basePrice = Math.floor(Math.random() * 25) + 18; // R$ 18-43
    return Math.round(basePrice * 100) / 100;
  }
}

export const mealApiService = new MealApiService();