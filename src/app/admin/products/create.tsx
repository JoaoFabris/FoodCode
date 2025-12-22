// src/app/admin/products/create.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CreateProduct() {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'right']}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Criar Novo Produto</Text>
        <Text style={styles.pageSubtitle}>Em desenvolvimento...</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.comingSoon}>➕ Em breve</Text>
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
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a202c',
  },
  pageSubtitle: {
    fontSize: 14,
    color: '#718096',
    marginTop: 2,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  comingSoon: {
    fontSize: 48,
  },
});