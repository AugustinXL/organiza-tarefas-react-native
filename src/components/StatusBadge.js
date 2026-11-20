import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

export default function StatusBadge({ status }) {
  const completed = status === 'concluida';
  return (
    <View style={[styles.badge, completed ? styles.completed : styles.pending]}>
      <Ionicons name={completed ? 'checkmark-circle' : 'time-outline'} size={13} color={completed ? COLORS.green : COLORS.orange} />
      <Text style={[styles.text, { color: completed ? COLORS.green : COLORS.orange }]}>
        {completed ? 'Concluída' : 'Pendente'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { alignSelf: 'flex-start', paddingVertical: 7, paddingHorizontal: 10, borderRadius: 10, flexDirection: 'row', alignItems: 'center', gap: 5 },
  completed: { backgroundColor: COLORS.greenSoft },
  pending: { backgroundColor: COLORS.orangeSoft },
  text: { fontSize: 11, fontWeight: '700' },
});
