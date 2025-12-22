// src/app/(tabs)/perfil/_layout.tsx
import { Stack } from 'expo-router';

export default function PerfilStack() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}