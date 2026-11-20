import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { COLORS } from '../../../src/constants/theme';
import { useTasks } from '../../../src/context/TaskContext';
import ScreenHeader from '../../../src/components/ScreenHeader';
import TaskForm from '../../../src/components/TaskForm';
import AppButton from '../../../src/components/AppButton';

export default function EditTaskScreen() {
  const { id } = useLocalSearchParams();
  const taskId = Array.isArray(id) ? id[0] : id;
  const router = useRouter();
  const { getTask, editTask } = useTasks();
  const task = getTask(taskId);

  const save = (data) => {
    editTask(taskId, data);
    if (router.canGoBack()) router.back();
    else router.replace({ pathname: '/task/[id]', params: { id: taskId } });
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.screen}>
      <StatusBar style="dark" />
      <ScreenHeader title="Editar tarefa" subtitle="Atualize o que for necessário." />
      {task ? (
        <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
            <TaskForm initialTask={task} onSubmit={save} submitLabel="Salvar alterações" />
          </ScrollView>
        </KeyboardAvoidingView>
      ) : (
        <View style={styles.notFound}>
          <Text style={styles.message}>Essa tarefa não está mais disponível.</Text>
          <AppButton onPress={() => router.replace('/')}>Ir para o início</AppButton>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  flex: { flex: 1 },
  content: { paddingHorizontal: 22, paddingBottom: 20 },
  notFound: { flex: 1, paddingHorizontal: 25, justifyContent: 'center', gap: 20 },
  message: { color: COLORS.ink, textAlign: 'center', fontSize: 17, fontWeight: '800' },
});
