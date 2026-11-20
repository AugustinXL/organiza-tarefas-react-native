import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { COLORS } from '../../src/constants/theme';
import { useTasks } from '../../src/context/TaskContext';
import { formatDateBR, isOverdue, PRIORITY_LABELS } from '../../src/utils/taskUtils';
import ScreenHeader from '../../src/components/ScreenHeader';
import AppButton from '../../src/components/AppButton';
import StatusBadge from '../../src/components/StatusBadge';
import PriorityBadge from '../../src/components/PriorityBadge';
import ConfirmDialog from '../../src/components/ConfirmDialog';

function InformationRow({ icon, label, children }) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoIcon}><Ionicons name={icon} size={19} color={COLORS.primary} /></View>
      <View style={styles.infoCopy}>
        <Text style={styles.infoLabel}>{label}</Text>
        <View style={styles.infoValueWrap}>{typeof children === 'string' ? <Text style={styles.infoValue}>{children}</Text> : children}</View>
      </View>
    </View>
  );
}

export default function TaskDetailsScreen() {
  const params = useLocalSearchParams();
  const taskId = Array.isArray(params.id) ? params.id[0] : params.id;
  const router = useRouter();
  const { getTask, toggleTask, deleteTask } = useTasks();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const task = getTask(taskId);

  const confirmDelete = () => {
    if (!task) return;
    setShowDeleteConfirmation(false);
    deleteTask(task.id);
    router.replace('/');
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.screen}>
      <StatusBar style="dark" />
      <ScreenHeader title="Detalhes da tarefa" subtitle="Veja e gerencie sua atividade." />
      {task ? (
        <>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.heroCard}>
              <View style={styles.heroTop}>
                <View style={styles.heroIcon}><Ionicons name="document-text-outline" size={26} color={COLORS.primary} /></View>
                <StatusBadge status={task.status} />
              </View>
              <Text style={styles.heroTitle}>{task.title}</Text>
              <Text style={styles.heroCaption}>Criada em {new Date(task.createdAt).toLocaleDateString('pt-BR')}</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Sobre a tarefa</Text>
              <Text style={styles.description}>{task.description || 'Nenhuma descrição foi adicionada a esta tarefa.'}</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Informações</Text>
              <InformationRow icon="grid-outline" label="Categoria">{task.category}</InformationRow>
              <View style={styles.rowDivider} />
              <InformationRow icon="flag-outline" label="Prioridade">
                <PriorityBadge priority={task.priority} />
              </InformationRow>
              <View style={styles.rowDivider} />
              <InformationRow icon="calendar-outline" label="Data de vencimento">
                <Text style={[styles.infoValue, isOverdue(task.dueDate, task.status) && styles.overdue]}>
                  {formatDateBR(task.dueDate)}{isOverdue(task.dueDate, task.status) ? ' · Atrasada' : ''}
                </Text>
              </InformationRow>
              <View style={styles.rowDivider} />
              <InformationRow icon="checkmark-circle-outline" label="Situação">
                <StatusBadge status={task.status} />
              </InformationRow>
            </View>

            <Text style={styles.idText}>Identificador único: {task.id}</Text>

            <View style={styles.buttons}>
              <AppButton
                icon={task.status === 'concluida' ? 'arrow-undo-outline' : 'checkmark-done-outline'}
                onPress={() => toggleTask(task.id)}
              >
                {task.status === 'concluida' ? 'Voltar para pendente' : 'Marcar como concluída'}
              </AppButton>
              <AppButton
                icon="create-outline"
                variant="secondary"
                onPress={() => router.push({ pathname: '/task/edit/[id]', params: { id: task.id } })}
              >
                Editar tarefa
              </AppButton>
              <AppButton icon="trash-outline" variant="danger" onPress={() => setShowDeleteConfirmation(true)}>
                Excluir tarefa
              </AppButton>
              <AppButton icon="arrow-back" variant="ghost" onPress={() => router.canGoBack() ? router.back() : router.replace('/')}>
                Voltar à listagem
              </AppButton>
            </View>
          </ScrollView>
          <ConfirmDialog
            visible={showDeleteConfirmation}
            taskTitle={task.title}
            onCancel={() => setShowDeleteConfirmation(false)}
            onConfirm={confirmDelete}
          />
        </>
      ) : (
        <View style={styles.notFound}>
          <View style={styles.notFoundIcon}><Ionicons name="alert-circle-outline" size={40} color={COLORS.primary} /></View>
          <Text style={styles.notFoundTitle}>Tarefa não encontrada</Text>
          <Text style={styles.notFoundMessage}>Ela pode ter sido excluída ou o endereço está incorreto.</Text>
          <AppButton onPress={() => router.replace('/')}>Ir para o início</AppButton>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { paddingHorizontal: 22, paddingBottom: 34 },
  heroCard: { backgroundColor: COLORS.navy, borderRadius: 22, padding: 22, marginBottom: 14 },
  heroTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 },
  heroIcon: { width: 51, height: 51, borderRadius: 16, backgroundColor: '#343A70', alignItems: 'center', justifyContent: 'center' },
  heroTitle: { color: '#FFFFFF', fontSize: 24, lineHeight: 31, fontWeight: '900' },
  heroCaption: { fontSize: 12, color: '#B9BDD6', marginTop: 11 },
  card: { backgroundColor: COLORS.surface, borderColor: COLORS.line, borderWidth: 1, borderRadius: 20, padding: 20, marginBottom: 14 },
  cardTitle: { fontSize: 16, fontWeight: '800', color: COLORS.ink, marginBottom: 17 },
  description: { fontSize: 13, color: COLORS.muted, lineHeight: 22 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 5 },
  infoIcon: { backgroundColor: COLORS.primarySoft, width: 42, height: 42, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  infoCopy: { flex: 1 },
  infoLabel: { color: COLORS.muted, fontSize: 11, marginBottom: 6 },
  infoValueWrap: { alignItems: 'flex-start' },
  infoValue: { color: COLORS.ink, fontWeight: '800', fontSize: 13 },
  overdue: { color: COLORS.red },
  rowDivider: { height: 1, backgroundColor: COLORS.line, marginVertical: 12 },
  idText: { fontSize: 10, textAlign: 'center', color: COLORS.muted, marginVertical: 10 },
  buttons: { gap: 10, marginTop: 12 },
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 25, gap: 15 },
  notFoundIcon: { width: 76, height: 76, borderRadius: 25, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.primarySoft },
  notFoundTitle: { fontWeight: '900', fontSize: 20, color: COLORS.ink },
  notFoundMessage: { textAlign: 'center', color: COLORS.muted, lineHeight: 21, fontSize: 13, marginBottom: 9 },
});
