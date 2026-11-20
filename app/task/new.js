import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { COLORS } from '../../src/constants/theme';
import { useTasks } from '../../src/context/TaskContext';
import ScreenHeader from '../../src/components/ScreenHeader';
import TaskForm from '../../src/components/TaskForm';

export default function NewTaskScreen() {
  const router = useRouter();
  const { addTask } = useTasks();

  const save = (data) => {
    const id = addTask(data);
    router.replace({ pathname: '/task/[id]', params: { id } });
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.screen}>
      <StatusBar style="dark" />
      <ScreenHeader title="Nova tarefa" subtitle="Um passo de cada vez." />
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
          <TaskForm onSubmit={save} submitLabel="Criar tarefa" />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  flex: { flex: 1 },
  content: { paddingHorizontal: 22, paddingBottom: 20 },
});
