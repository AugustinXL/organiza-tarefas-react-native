import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { formatDateBR, isOverdue } from '../utils/taskUtils';
import PriorityBadge from './PriorityBadge';
import StatusBadge from './StatusBadge';

export default function TaskCard({ task, onOpen, onToggle }) {
  const completed = task.status === 'concluida';
  const overdue = isOverdue(task.dueDate, task.status);

  return (
    <View style={[styles.card, completed && styles.completedCard]}>
      <Pressable onPress={onOpen} accessibilityRole="button" accessibilityLabel={`Ver detalhes de ${task.title}`} style={styles.content}>
        <View style={styles.heading}>
          <View style={[styles.categorySymbol, completed && styles.categorySymbolCompleted]}>
            <Ionicons name={completed ? 'checkmark-done' : 'layers-outline'} size={18} color={completed ? COLORS.green : COLORS.primary} />
          </View>
          <View style={styles.headingText}>
            <Text style={[styles.title, completed && styles.completedText]} numberOfLines={2}>{task.title}</Text>
            <Text style={styles.category} numberOfLines={1}>{task.category}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#ADB3C5" />
        </View>
        <View style={styles.metadata}>
          <PriorityBadge priority={task.priority} />
          <View style={styles.dateRow}>
            <Ionicons name="calendar-outline" size={14} color={overdue ? COLORS.red : COLORS.muted} />
            <Text style={[styles.date, overdue && styles.overdue]}>{overdue ? 'Atrasada · ' : ''}{formatDateBR(task.dueDate)}</Text>
          </View>
        </View>
      </Pressable>
      <View style={styles.footer}>
        <StatusBadge status={task.status} />
        <Pressable
          onPress={onToggle}
          accessibilityRole="button"
          accessibilityLabel={completed ? `Marcar ${task.title} como pendente` : `Concluir ${task.title}`}
          style={styles.quickAction}
        >
          <Ionicons name={completed ? 'arrow-undo-outline' : 'checkmark-circle-outline'} size={18} color={COLORS.primary} />
          <Text style={styles.quickActionText}>{completed ? 'Reabrir' : 'Concluir'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { marginHorizontal: 22, backgroundColor: COLORS.surface, borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: COLORS.line },
  completedCard: { opacity: 0.87 },
  content: { paddingHorizontal: 17, paddingTop: 16, paddingBottom: 14 },
  heading: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  categorySymbol: { height: 42, width: 42, borderRadius: 13, backgroundColor: COLORS.primarySoft, alignItems: 'center', justifyContent: 'center' },
  categorySymbolCompleted: { backgroundColor: COLORS.greenSoft },
  headingText: { flex: 1 },
  title: { fontSize: 15, fontWeight: '800', color: COLORS.ink, lineHeight: 21 },
  completedText: { textDecorationLine: 'line-through', color: COLORS.muted },
  category: { fontSize: 12, marginTop: 4, color: COLORS.muted },
  metadata: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 11, marginTop: 15 },
  dateRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  date: { color: COLORS.muted, fontSize: 11, fontWeight: '600' },
  overdue: { color: COLORS.red },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 17, paddingVertical: 12, borderTopWidth: 1, borderColor: COLORS.line },
  quickAction: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6, paddingLeft: 8, gap: 5 },
  quickActionText: { color: COLORS.primary, fontWeight: '800', fontSize: 12 },
});
