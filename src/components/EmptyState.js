import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import AppButton from './AppButton';

export default function EmptyState({ filtered = false, onAdd, onExamples }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <Ionicons name={filtered ? 'options-outline' : 'clipboard-outline'} size={35} color={COLORS.primary} />
      </View>
      <Text style={styles.title}>{filtered ? 'Nenhuma tarefa encontrada' : 'Sua lista começa aqui'}</Text>
      <Text style={styles.subtitle}>
        {filtered ? 'Tente selecionar outros filtros para encontrar suas atividades.' : 'Adicione sua primeira atividade para começar a organizar o dia.'}
      </Text>
      {!filtered ? (
        <View style={styles.actions}>
          <AppButton icon="add" onPress={onAdd}>Criar primeira tarefa</AppButton>
          <AppButton variant="ghost" onPress={onExamples}>Carregar tarefas de exemplo</AppButton>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginHorizontal: 22, marginBottom: 30, marginTop: 4, padding: 26, backgroundColor: COLORS.surface, borderRadius: 22, borderWidth: 1, borderColor: COLORS.line, alignItems: 'center' },
  iconWrap: { width: 74, height: 74, borderRadius: 24, backgroundColor: COLORS.primarySoft, alignItems: 'center', justifyContent: 'center', marginBottom: 18 },
  title: { textAlign: 'center', fontSize: 17, color: COLORS.ink, fontWeight: '800' },
  subtitle: { textAlign: 'center', color: COLORS.muted, lineHeight: 21, fontSize: 13, marginTop: 9 },
  actions: { alignSelf: 'stretch', marginTop: 20, gap: 4 },
});
