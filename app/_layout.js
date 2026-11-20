import React from 'react';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { TaskProvider } from '../src/context/TaskContext';
import { COLORS } from '../src/constants/theme';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <TaskProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right', contentStyle: { backgroundColor: COLORS.background } }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="task/new" />
          <Stack.Screen name="task/[id]" />
          <Stack.Screen name="task/edit/[id]" />
          <Stack.Screen name="+not-found" />
        </Stack>
      </TaskProvider>
    </SafeAreaProvider>
  );
}
