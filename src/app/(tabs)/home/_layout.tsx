// src/app/(tabs)/(home)/_layout.tsx
import { Stack } from 'expo-router';

export default function HomeStack() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen 
        name="product-detail"
        options={{
          presentation: 'card',
          animation: 'slide_from_right',
        }}
      />
    </Stack>
  );
}