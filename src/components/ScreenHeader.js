import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS } from '../constants/theme';

export default function ScreenHeader({ eyebrow = 'ORGANIZA', title, subtitle }) {
  const router = useRouter();
  const goBack = () => (router.canGoBack() ? router.back() : router.replace('/'));

  return (
    <View style={styles.header}>
      <Pressable onPress={goBack} accessibilityRole="button" accessibilityLabel="Voltar" style={styles.backButton}>
        <Ionicons name="arrow-back" size={22} color={COLORS.ink} />
      </Pressable>
      <View style={styles.copy}>
        <Text style={styles.eyebrow}>{eyebrow}</Text>
        <Text numberOfLines={1} style={styles.title}>{title}</Text>
        {subtitle ? <Text numberOfLines={2} style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 22, paddingVertical: 21, flexDirection: 'row', alignItems: 'center', gap: 14 },
  backButton: { width: 48, height: 48, borderRadius: 15, backgroundColor: COLORS.surface, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: COLORS.line },
  copy: { flex: 1 },
  eyebrow: { color: COLORS.primary, fontSize: 10, fontWeight: '800', letterSpacing: 1.7, marginBottom: 4 },
  title: { color: COLORS.ink, fontSize: 21, fontWeight: '800' },
  subtitle: { color: COLORS.muted, marginTop: 3, fontSize: 12, lineHeight: 18 },
});
