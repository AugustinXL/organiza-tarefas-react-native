import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

export default function StatCard({ label, value, icon, iconColor, iconBackground }) {
  return (
    <View style={styles.card}>
      <View style={[styles.iconContainer, { backgroundColor: iconBackground }]}>
        <Ionicons name={icon} size={17} color={iconColor} />
      </View>
      <Text style={styles.number}>{value}</Text>
      <Text numberOfLines={1} style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: COLORS.surface, borderRadius: 19, paddingVertical: 17, paddingHorizontal: 13, flex: 1, minWidth: 0, borderWidth: 1, borderColor: COLORS.line },
  iconContainer: { borderRadius: 10, width: 34, height: 34, alignItems: 'center', justifyContent: 'center', marginBottom: 11 },
  number: { fontSize: 29, fontWeight: '800', color: COLORS.ink, lineHeight: 35 },
  label: { fontSize: 12, fontWeight: '600', color: COLORS.muted, marginTop: 3 },
});
