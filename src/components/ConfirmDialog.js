import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import AppButton from './AppButton';

export default function ConfirmDialog({ visible, onCancel, onConfirm, taskTitle }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.backdrop}>
        <Pressable style={StyleSheet.absoluteFillObject} onPress={onCancel} accessibilityLabel="Cancelar exclusão" />
        <View style={styles.dialog}>
          <View style={styles.iconWrap}><Ionicons name="trash-outline" size={29} color={COLORS.red} /></View>
          <Text style={styles.title}>Excluir tarefa?</Text>
          <Text style={styles.description}>
            A tarefa <Text style={styles.emphasis}>{taskTitle}</Text> será removida da lista. Esta ação não poderá ser desfeita.
          </Text>
          <View style={styles.buttons}>
            <AppButton variant="secondary" style={styles.button} onPress={onCancel}>Cancelar</AppButton>
            <AppButton variant="danger" icon="trash-outline" style={styles.button} onPress={onConfirm}>Excluir</AppButton>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(18,24,48,0.54)', justifyContent: 'center', paddingHorizontal: 23 },
  dialog: { backgroundColor: COLORS.surface, borderRadius: 25, padding: 24, alignItems: 'center' },
  iconWrap: { width: 64, height: 64, borderRadius: 22, backgroundColor: COLORS.redSoft, justifyContent: 'center', alignItems: 'center', marginBottom: 18 },
  title: { fontSize: 20, fontWeight: '800', color: COLORS.ink },
  description: { color: COLORS.muted, fontSize: 13, lineHeight: 20, textAlign: 'center', marginTop: 10, marginBottom: 23 },
  emphasis: { color: COLORS.ink, fontWeight: '800' },
  buttons: { flexDirection: 'row', gap: 10, width: '100%' },
  button: { flex: 1 },
});
