import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

// Um único componente reutilizável com props, spread props, children e eventos.
export default function AppButton({ children, icon, variant = 'primary', style, disabled = false, ...rest }) {
  const ghost = variant === 'ghost';
  const danger = variant === 'danger';
  const secondary = variant === 'secondary';
  const contentColor = ghost ? COLORS.muted : danger ? COLORS.red : secondary ? COLORS.primary : '#FFFFFF';

  return (
    <Pressable
      {...rest}
      disabled={disabled}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.base,
        ghost && styles.ghost,
        secondary && styles.secondary,
        danger && styles.danger,
        disabled && styles.disabled,
        pressed && styles.pressed,
        style,
      ]}
    >
      <View style={styles.inner}>
        {icon ? <Ionicons name={icon} size={19} color={contentColor} /> : null}
        <Text style={[styles.label, { color: contentColor }]}>{children}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { minHeight: 54, borderRadius: 16, paddingHorizontal: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.primary },
  inner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9 },
  label: { fontSize: 15, fontWeight: '700' },
  ghost: { backgroundColor: 'transparent', minHeight: 46 },
  secondary: { backgroundColor: COLORS.primarySoft },
  danger: { backgroundColor: COLORS.redSoft },
  disabled: { opacity: 0.55 },
  pressed: { opacity: 0.82, transform: [{ scale: 0.99 }] },
});
