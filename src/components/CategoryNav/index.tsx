// src/components/CategoryNav/index.tsx
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';
import { Category } from '../../types';

interface CategoryNavProps {
  categories: Category[];
  onCategoryPress: (categoryId: string) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({ categories, onCategoryPress }) => {
  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              category.active && styles.categoryButtonActive
            ]}
            onPress={() => onCategoryPress(category.id)}
          >
            <Text style={[
              styles.categoryText,
              category.active && styles.categoryTextActive
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SIZES.md,
  },
  scrollContent: {
    paddingHorizontal: SIZES.lg,
  },
  categoryButton: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.sm,
    borderRadius: SIZES.lg,
    marginRight: SIZES.sm,
    borderWidth: 1,
    borderColor: COLORS.light,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  categoryButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryText: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  categoryTextActive: {
    color: COLORS.white,
  },
});