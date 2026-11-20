import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../src/constants/theme';
import { useTasks } from '../src/context/TaskContext';
import { filterTasks } from '../src/utils/taskUtils';
import StatCard from '../src/components/StatCard';
import TaskCard from '../src/components/TaskCard';
import EmptyState from '../src/components/EmptyState';

const STATUS_FILTERS = [
  { value: 'todas', label: 'Todas' },
  { value: 'pendente', label: 'Pendentes' },
  { value: 'concluida', label: 'Concluídas' },
];
const PRIORITY_FILTERS = [
  { value: 'todas', label: 'Qualquer' },
  { value: 'alta', label: 'Alta' },
  { value: 'media', label: 'Média' },
  { value: 'baixa', label: 'Baixa' },
];

function FilterChip({ title, selected, onPress, small = false }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      style={[styles.filterChip, selected && styles.selectedFilter, small && styles.smallFilter]}
    >
      <Text style={[styles.filterChipText, selected && styles.selectedFilterText, small && styles.smallFilterText]}>{title}</Text>
    </Pressable>
  );
}

export default function DashboardScreen() {
  const router = useRouter();
  const { tasks, stats, toggleTask, addExampleTasks } = useTasks();
  const [statusFilter, setStatusFilter] = useState('todas');
  const [priorityFilter, setPriorityFilter] = useState('todas');

  const visibleTasks = useMemo(() => filterTasks(tasks, statusFilter, priorityFilter), [tasks, statusFilter, priorityFilter]);
  const completion = stats.total ? Math.round((stats.completed / stats.total) * 100) : 0;
  const createTask = () => router.push('/task/new');

  const header = (
    <View>
      <View style={styles.hero}>
        <View style={styles.decorationOne} />
        <View style={styles.decorationTwo} />
        <View style={styles.brandRow}>
          <View style={styles.brandMark}><Ionicons name="checkmark-done" size={20} color="#FFFFFF" /></View>
          <Text style={styles.brand}>organiza<Text style={styles.brandDot}>.</Text></Text>
          <View style={styles.brandRight}><Ionicons name="sparkles" size={14} color="#DED8FF" /><Text style={styles.brandRightText}>MEU ESPAÇO</Text></View>
        </View>
        <Text style={styles.heroEyebrow}>SEU DIA, DO SEU JEITO</Text>
        <Text style={styles.heroTitle}>Tudo em ordem,{"\n"}no seu ritmo.</Text>
        <Text style={styles.heroCaption}>Transforme planos em tarefas concluídas.</Text>
        <View style={styles.progressBox}>
          <View style={styles.progressHead}><Text style={styles.progressLabel}>Seu progresso</Text><Text style={styles.progressValue}>{completion}% concluído</Text></View>
          <View style={styles.progressTrack}><View style={[styles.progressFill, { width: `${completion}%` }]} /></View>
        </View>
      </View>

      <View style={styles.mainContent}>
        <View style={styles.sectionLine}><Text style={styles.sectionTitle}>Visão geral</Text><Text style={styles.sectionHint}>Atualizado em tempo real</Text></View>
        <View style={styles.statsRow}>
          <StatCard label="Total" value={stats.total} icon="albums-outline" iconColor={COLORS.primary} iconBackground={COLORS.primarySoft} />
          <StatCard label="Pendentes" value={stats.pending} icon="time-outline" iconColor={COLORS.orange} iconBackground={COLORS.orangeSoft} />
          <StatCard label="Concluídas" value={stats.completed} icon="checkmark-circle-outline" iconColor={COLORS.green} iconBackground={COLORS.greenSoft} />
        </View>

        <View style={styles.tasksHeading}>
          <View><Text style={styles.sectionTitle}>Minhas tarefas</Text><Text style={styles.subheading}>Escolha no que focar agora</Text></View>
          <Pressable style={styles.addButton} onPress={createTask} accessibilityRole="button" accessibilityLabel="Adicionar nova tarefa">
            <Ionicons name="add" size={22} color="#FFFFFF" /><Text style={styles.addButtonLabel}>Nova</Text>
          </Pressable>
        </View>

        <Text style={styles.filterLabel}>STATUS</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          {STATUS_FILTERS.map((item) => <FilterChip key={item.value} title={item.label} selected={statusFilter === item.value} onPress={() => setStatusFilter(item.value)} />)}
        </ScrollView>

        <Text style={[styles.filterLabel, styles.priorityFilterLabel]}>PRIORIDADE</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          {PRIORITY_FILTERS.map((item) => <FilterChip key={item.value} title={item.label} selected={priorityFilter === item.value} onPress={() => setPriorityFilter(item.value)} small />)}
        </ScrollView>

        <View style={styles.resultRow}>
          <Text style={styles.resultLabel}>{visibleTasks.length} {visibleTasks.length === 1 ? 'tarefa encontrada' : 'tarefas encontradas'}</Text>
          {(statusFilter !== 'todas' || priorityFilter !== 'todas') ? (
            <Pressable onPress={() => { setStatusFilter('todas'); setPriorityFilter('todas'); }} accessibilityRole="button">
              <Text style={styles.clearFilter}>Limpar filtros</Text>
            </Pressable>
          ) : null}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <StatusBar style="light" />
      <FlatList
        style={styles.list}
        data={visibleTasks}
        keyExtractor={(task) => task.id}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onOpen={() => router.push({ pathname: '/task/[id]', params: { id: item.id } })}
            onToggle={() => toggleTask(item.id)}
          />
        )}
        ListHeaderComponent={header}
        ListEmptyComponent={<EmptyState filtered={tasks.length > 0} onAdd={createTask} onExamples={addExampleTasks} />}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListFooterComponent={<Text style={styles.footer}>Organiza · As tarefas ficam disponíveis apenas nesta sessão.</Text>}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.navy },
  list: { flex: 1, backgroundColor: COLORS.background },
  listContent: { paddingBottom: 22 },
  hero: { paddingTop: 22, paddingBottom: 29, paddingHorizontal: 24, backgroundColor: COLORS.navy, borderBottomLeftRadius: 28, borderBottomRightRadius: 28, overflow: 'hidden' },
  decorationOne: { width: 220, height: 220, position: 'absolute', borderRadius: 110, backgroundColor: '#2D3568', top: -95, right: -94, opacity: 0.48 },
  decorationTwo: { width: 170, height: 170, position: 'absolute', borderRadius: 90, backgroundColor: '#4F46BA', bottom: -120, right: 25, opacity: 0.18 },
  brandRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 39 },
  brandMark: { height: 33, width: 33, borderRadius: 11, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center' },
  brand: { color: '#FFFFFF', marginLeft: 9, fontSize: 20, fontWeight: '900', letterSpacing: -0.7 },
  brandDot: { color: '#9E98FF' },
  brandRight: { marginLeft: 'auto', flexDirection: 'row', alignItems: 'center', gap: 5 },
  brandRightText: { color: '#CBCBE1', fontWeight: '800', fontSize: 9, letterSpacing: 1 },
  heroEyebrow: { color: '#AAA6EF', fontSize: 10, letterSpacing: 1.6, fontWeight: '800', marginBottom: 10 },
  heroTitle: { fontSize: 32, lineHeight: 39, fontWeight: '900', color: '#FFFFFF', letterSpacing: -1.1 },
  heroCaption: { color: '#C3C6DE', marginTop: 12, fontSize: 13 },
  progressBox: { borderRadius: 15, backgroundColor: 'rgba(255,255,255,0.085)', marginTop: 27, padding: 15 },
  progressHead: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  progressLabel: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  progressValue: { color: '#CFCBFF', fontSize: 12, fontWeight: '700' },
  progressTrack: { height: 6, borderRadius: 3, overflow: 'hidden', backgroundColor: 'rgba(255,255,255,0.19)' },
  progressFill: { backgroundColor: '#A79CFF', height: '100%', borderRadius: 3 },
  mainContent: { paddingTop: 24 },
  sectionLine: { paddingHorizontal: 22, flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' },
  sectionTitle: { color: COLORS.ink, fontSize: 19, fontWeight: '900', letterSpacing: -0.4 },
  sectionHint: { color: COLORS.muted, fontSize: 10 },
  statsRow: { flexDirection: 'row', paddingHorizontal: 22, marginTop: 14, gap: 9 },
  tasksHeading: { marginTop: 33, marginBottom: 22, paddingHorizontal: 22, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  subheading: { color: COLORS.muted, fontSize: 12, marginTop: 5 },
  addButton: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 10, gap: 4, borderRadius: 13, backgroundColor: COLORS.primary },
  addButtonLabel: { color: '#FFFFFF', fontSize: 12, fontWeight: '800' },
  filterLabel: { marginHorizontal: 22, fontSize: 10, letterSpacing: 1.4, fontWeight: '800', color: COLORS.muted, marginBottom: 11 },
  priorityFilterLabel: { marginTop: 20 },
  filterRow: { paddingHorizontal: 22, flexDirection: 'row', gap: 8 },
  filterChip: { borderRadius: 12, borderWidth: 1, borderColor: COLORS.line, paddingHorizontal: 18, paddingVertical: 10, backgroundColor: COLORS.surface },
  selectedFilter: { borderColor: COLORS.primary, backgroundColor: COLORS.primary },
  filterChipText: { fontSize: 12, fontWeight: '700', color: COLORS.muted },
  selectedFilterText: { color: '#FFFFFF' },
  smallFilter: { paddingVertical: 9, paddingHorizontal: 15 },
  smallFilterText: { fontSize: 11 },
  resultRow: { marginHorizontal: 22, marginTop: 24, marginBottom: 13, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  resultLabel: { color: COLORS.muted, fontSize: 12, fontWeight: '700' },
  clearFilter: { color: COLORS.primary, fontSize: 12, fontWeight: '700' },
  footer: { textAlign: 'center', fontSize: 10, lineHeight: 15, color: COLORS.muted, marginTop: 25, paddingHorizontal: 25 },
});
