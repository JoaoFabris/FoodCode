// src/components/Admin/Sidebar.tsx 
import { Ionicons } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';
import React, { useState } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS } from '../../constants/theme';
import { useAdmin } from '../../context/AdminContext';

const { width: screenWidth } = Dimensions.get('window');
const isTablet = screenWidth > 768;

interface MenuItem {
  id: string;
  title: string;
  icon: string;
  route: string;
}

interface AdminSidebarProps {
  isMenuVisible?: boolean;
  onMenuToggle?: () => void;
}

export default function AdminSidebar({ isMenuVisible = false, onMenuToggle }: AdminSidebarProps) {
  const pathname = usePathname();
  const { admin, adminLogout } = useAdmin();
  const [slideAnim] = useState(new Animated.Value(-screenWidth));

  const menuItems: MenuItem[] = [
    { id: 'orders', title: 'Pedidos', icon: 'receipt', route: '/admin/orders' },
    { id: 'products', title: 'Produtos', icon: 'fast-food', route: '/admin/products' },
    { id: 'users', title: 'Usuários', icon: 'people', route: '/admin/users' },
  ];

  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isMenuVisible ? 0 : -screenWidth,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isMenuVisible]);

  const handleMenuItemPress = (route: string) => {
    router.push(route as any);
    onMenuToggle?.();
  };

  const handleLogout = async () => {
    await adminLogout();
    router.replace('/admin-login');
  };

  // Desktop/Tablet - Sidebar fixa
  if (isTablet) {
    return (
      <View style={styles.desktopSidebar}>
        <View style={styles.sidebarHeader}>
          <Text style={styles.logoText}>🍔 FoodCode</Text>
          <Text style={styles.adminText}>Admin Panel</Text>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item) => {
            const isActive = pathname === item.route || pathname.startsWith(item.route + '/');
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.menuItem, isActive && styles.menuItemActive]}
                onPress={() => handleMenuItemPress(item.route)}
              >
                <Ionicons
                  name={item.icon as any}
                  size={20}
                  color={isActive ? COLORS.primary : '#64748b'}
                />
                <Text style={[styles.menuText, isActive && styles.menuTextActive]}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.sidebarFooter}>
          <View style={styles.adminInfo}>
            <Text style={styles.adminName}>{admin?.name}</Text>
            <Text style={styles.adminRole}>{admin?.role}</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out" size={20} color="#ef4444" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Mobile - Menu deslizante
  return (
    <Modal
      visible={isMenuVisible}
      transparent
      animationType="none"
      onRequestClose={onMenuToggle}
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.overlayTouch} onPress={onMenuToggle} />
        <Animated.View 
          style={[
            styles.mobileSidebar,
            { transform: [{ translateX: slideAnim }] }
          ]}
        >
          <SafeAreaView style={styles.sidebarContent} edges={['top', 'bottom']}>
            <View style={styles.mobileHeader}>
              <View>
                <Text style={styles.logoText}>🍔 FoodCode</Text>
                <Text style={styles.adminText}>Admin Panel</Text>
              </View>
              <TouchableOpacity style={styles.closeButton} onPress={onMenuToggle}>
                <Ionicons name="close" size={24} color="#64748b" />
              </TouchableOpacity>
            </View>

            <View style={styles.mobileMenuContainer}>
              {menuItems.map((item) => {
                const isActive = pathname === item.route || pathname.startsWith(item.route + '/');
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[styles.mobileMenuItem, isActive && styles.mobileMenuItemActive]}
                    onPress={() => handleMenuItemPress(item.route)}
                  >
                    <Ionicons
                      name={item.icon as any}
                      size={22}
                      color={isActive ? COLORS.primary : '#64748b'}
                    />
                    <Text style={[styles.mobileMenuText, isActive && styles.mobileMenuTextActive]}>
                      {item.title}
                    </Text>
                    <Ionicons name="chevron-forward" size={16} color="#94a3b8" />
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={styles.mobileFooter}>
              <View style={styles.mobileAdminInfo}>
                <View style={styles.adminAvatar}>
                  <Text style={styles.avatarText}>{admin?.name?.charAt(0)}</Text>
                </View>
                <View style={styles.adminDetails}>
                  <Text style={styles.mobileAdminName}>{admin?.name}</Text>
                  <Text style={styles.mobileAdminRole}>{admin?.role}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.mobileLogoutButton} onPress={handleLogout}>
                <Ionicons name="log-out" size={20} color="#ef4444" />
                <Text style={styles.logoutText}>Sair</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  // Desktop/Tablet Styles
  desktopSidebar: {
    width: 280,
    backgroundColor: '#ffffff',
    borderRightWidth: 1,
    borderRightColor: '#e2e8f0',
    flexDirection: 'column',
  },
  
  // Mobile Styles
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'row',
  },
  overlayTouch: {
    flex: 1,
  },
  mobileSidebar: {
    width: screenWidth * 0.85,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  sidebarContent: {
    flex: 1,
  },
  
  // Header Styles
  sidebarHeader: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  mobileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  adminText: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
  closeButton: {
    padding: 8,
  },
  
  // Menu Styles
  menuContainer: {
    flex: 1,
    paddingTop: 16,
  },
  mobileMenuContainer: {
    flex: 1,
    paddingTop: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginHorizontal: 12,
    borderRadius: 8,
  },
  mobileMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginHorizontal: 12,
    marginVertical: 2,
    borderRadius: 12,
  },
  menuItemActive: {
    backgroundColor: '#f0f9ff',
  },
  mobileMenuItemActive: {
    backgroundColor: '#f0f9ff',
  },
  menuText: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 12,
    fontWeight: '500',
  },
  mobileMenuText: {
    fontSize: 16,
    color: '#64748b',
    marginLeft: 12,
    fontWeight: '500',
    flex: 1,
  },
  menuTextActive: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  mobileMenuTextActive: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  
  // Footer Styles
  sidebarFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  mobileFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  adminInfo: {
    flex: 1,
  },
  mobileAdminInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  adminAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  adminDetails: {
    flex: 1,
  },
  adminName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  mobileAdminName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  adminRole: {
    fontSize: 12,
    color: '#64748b',
  },
  mobileAdminRole: {
    fontSize: 14,
    color: '#64748b',
  },
  logoutButton: {
    padding: 8,
  },
  mobileLogoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fef2f2',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  logoutText: {
    fontSize: 14,
    color: '#ef4444',
    fontWeight: '600',
    marginLeft: 8,
  },
});