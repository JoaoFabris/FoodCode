import { COLORS, SIZES } from '@/src/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = "Buscar produtos...", 
  value, 
  onChangeText,
  onClear
}) => {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={SIZES.lg} color={COLORS.textSecondary} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textSecondary}
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
        autoCorrect={false}
        autoCapitalize="none"
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={onClear} style={styles.clearButton}>
          <Ionicons name="close-circle" size={SIZES.lg} color={COLORS.textSecondary} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.cardRadius,
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.sm,
    marginHorizontal: SIZES.lg,
    marginBottom: SIZES.lg,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    flex: 1,
    marginLeft: SIZES.sm,
    fontSize: SIZES.title,
    color: COLORS.textPrimary,
  },
  clearButton: {
    marginLeft: SIZES.sm,
    padding: 2,
  },
});