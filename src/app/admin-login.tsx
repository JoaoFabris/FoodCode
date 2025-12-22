// src/app/admin-login.tsx
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS } from '../constants/theme';
import { useAdmin } from '../context/AdminContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { adminLogin } = useAdmin();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setIsLoading(true);

    try {
      const success = await adminLogin(email, password);

      if (success) {
        router.replace('/admin/orders');
      } else {
        Alert.alert(
          'Erro de Login',
          'Credenciais inválidas.\n\nUse:\nEmail: admin@foodcode.com\nSenha: 123456'
        );
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  // Função para preencher credenciais de demonstração
  const fillDemoCredentials = () => {
    setEmail('admin@foodcode.com');
    setPassword('123456');
  };
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color="#4a5568" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Acesso Administrativo</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.appName}>FoodCode</Text>
          <Text style={styles.adminSubtitle}>Painel Administrativo</Text>
        </View>

        {/* Formulário */}
        <View style={styles.form}>
          <Text style={styles.formTitle}>Faça login para continuar</Text>

          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#9CA3AF" />
            <TextInput
              style={styles.input}
              placeholder="Email do administrador"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isLoading}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              editable={!isLoading}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeButton}
            >
              <Ionicons
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                size={20}
                color="#9CA3AF"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              styles.loginButton,
              isLoading && styles.loginButtonDisabled,
            ]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <>
                <Ionicons name="log-in-outline" size={20} color="#fff" />
                <Text style={styles.loginButtonText}>Entrar</Text>
              </>
            )}
          </TouchableOpacity>

          {/* Credenciais de demonstração */}
          <View style={styles.demoSection}>
            <Text style={styles.demoTitle}>🧪 Demonstração</Text>
            <TouchableOpacity
              style={styles.demoButton}
              onPress={fillDemoCredentials}
            >
              <Text style={styles.demoButtonText}>
                Usar credenciais de teste
              </Text>
            </TouchableOpacity>
            <View style={styles.demoCredentials}>
              <Text style={styles.demoText}>Email: admin@foodcode.com</Text>
              <Text style={styles.demoText}>Senha: 123456</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Acesso restrito aos administradores do sistema
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    fontSize: 64,
    marginBottom: 16,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  adminSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 32,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#1f2937',
  },
  eyeButton: {
    padding: 8,
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  loginButtonDisabled: {
    backgroundColor: '#9ca3af',
    shadowOpacity: 0,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  demoSection: {
    marginTop: 32,
    padding: 20,
    backgroundColor: '#fef3c7',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fbbf24',
  },
  demoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400e',
    textAlign: 'center',
    marginBottom: 12,
  },
  demoButton: {
    backgroundColor: '#f59e0b',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  demoButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  demoCredentials: {
    alignItems: 'center',
  },
  demoText: {
    fontSize: 12,
    color: '#78716c',
    fontFamily: 'monospace',
  },
  footer: {
    marginTop: 32,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
});
