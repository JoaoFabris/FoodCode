// src/app/login.tsx
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS } from '../constants/theme';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    cpf: '',
    address: '',
    photo: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar sua galeria');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      handleInputChange('photo', result.assets[0].uri);
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      Alert.alert('Erro', 'Nome é obrigatório');
      return false;
    }
    if (!formData.phone.trim()) {
      Alert.alert('Erro', 'Telefone é obrigatório');
      return false;
    }
    if (!formData.cpf.trim()) {
      Alert.alert('Erro', 'CPF é obrigatório');
      return false;
    }
    if (!formData.address.trim()) {
      Alert.alert('Erro', 'Endereço é obrigatório');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await login(formData);
      router.replace('/(tabs)/home');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Login</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.formHeader}>
          <Text style={styles.title}>Faça seu Login</Text>
          <Text style={styles.subtitle}>Preencha seus dados para continuar</Text>
        </View>

        <View style={styles.form}>
          {/* Foto */}
          <View style={styles.photoContainer}>
            <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
              {formData.photo ? (
                <Image source={{ uri: formData.photo }} style={styles.photoImage} />
              ) : (
                <View style={styles.photoPlaceholder}>
                  <Text style={styles.photoText}>📷</Text>
                  <Text style={styles.photoLabel}>Adicionar Foto</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Nome */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Nome Completo</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu nome"
              value={formData.name}
              onChangeText={(value) => handleInputChange('name', value)}
              placeholderTextColor="#999"
            />
          </View>

          {/* Telefone */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Telefone</Text>
            <MaskedTextInput
              mask="(99) 99999-9999"
              style={styles.input}
              placeholder="(00) 00000-0000"
              value={formData.phone}
              onChangeText={(value) => handleInputChange('phone', value)}
              placeholderTextColor="#999"
              keyboardType="numeric"
            />
          </View>

          {/* CPF */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>CPF</Text>
            <MaskedTextInput
              mask="999.999.999-99"
              style={styles.input}
              placeholder="000.000.000-00"
              value={formData.cpf}
              onChangeText={(value) => handleInputChange('cpf', value)}
              placeholderTextColor="#999"
              keyboardType="numeric"
            />
          </View>

          {/* Endereço */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Endereço Completo</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Rua, número, bairro, cidade"
              value={formData.address}
              onChangeText={(value) => handleInputChange('address', value)}
              placeholderTextColor="#999"
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>

          {/* Botão */}
          <TouchableOpacity
            style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={isLoading}
          >
            <Text style={styles.submitButtonText}>
              {isLoading ? 'Entrando...' : 'Entrar'}
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
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    minHeight: 56,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  formHeader: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  form: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  photoButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
  },
  photoImage: {
    width: 116,
    height: 116,
    borderRadius: 58,
  },
  photoPlaceholder: {
    alignItems: 'center',
  },
  photoText: {
    fontSize: 30,
    marginBottom: 5,
  },
  photoLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    minHeight: 80,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});