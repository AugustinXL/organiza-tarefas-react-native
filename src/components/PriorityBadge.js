import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants/theme';
import { PRIORITY_LABELS } from '../utils/taskUtils';

const palette = {
  baixa: { foreground: COLORS.green, background: COLORS.greenSoft },
  media: { foreground: COLORS.orange, background: COLORS.orangeSoft },
  alta: { foreground: COLORS.red, background: COLORS.redSoft },
};

export default function PriorityBadge({ priority }) {
  const color = palette[priority] || palette.media;
  return (
    <View style={[styles.badge, { backgroundColor: color.background }]}>
      <View style={[styles.dot, { backgroundColor: color.foreground }]} />
      <Text style={[styles.label, { color: color.foreground }]}>{PRIORITY_LABELS[priority] || 'Média'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { flexDirection: 'row', alignItems: 'center', gap: 5, borderRadius: 8, paddingHorizontal: 9, paddingVertical: 6 },
  dot: { width: 6, height: 6, borderRadius: 3 },
  label: { fontWeight: '700', fontSize: 11 },
});
