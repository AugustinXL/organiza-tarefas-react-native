import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import AppButton from '../src/components/AppButton';
import { COLORS } from '../src/constants/theme';

export default function NotFoundScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        <Text style={styles.title}>Página não encontrada</Text>
        <Text style={styles.description}>Essa rota não existe no Organiza.</Text>
        <AppButton onPress={() => router.replace('/')}>Voltar para o Dashboard</AppButton>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1, paddingHorizontal: 24, justifyContent: 'center', gap: 15 },
  title: { textAlign: 'center', color: COLORS.ink, fontSize: 24, fontWeight: '900' },
  description: { textAlign: 'center', color: COLORS.muted, marginBottom: 10 },
});
