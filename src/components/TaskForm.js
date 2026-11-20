import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CATEGORIES, COLORS, PRIORITIES } from '../constants/theme';
import { formatDateTyping, formatInputDate, parseDateInput } from '../utils/taskUtils';
import AppButton from './AppButton';

function FieldLabel({ children, required = false, hint }) {
  return (
    <View style={styles.labelRow}>
      <Text style={styles.fieldLabel}>{children}{required ? <Text style={styles.required}> *</Text> : null}</Text>
      {hint ? <Text style={styles.fieldHint}>{hint}</Text> : null}
    </View>
  );
}

export default function TaskForm({ initialTask, onSubmit, submitLabel = 'Salvar tarefa' }) {
  const isEditing = Boolean(initialTask);
  const storedCategory = initialTask?.category || 'Pessoal';
  const categoryIsPreset = CATEGORIES.includes(storedCategory);

  const [title, setTitle] = useState(initialTask?.title || '');
  const [description, setDescription] = useState(initialTask?.description || '');
  const [category, setCategory] = useState(categoryIsPreset ? storedCategory : 'Outros');
  const [customCategory, setCustomCategory] = useState(categoryIsPreset ? '' : storedCategory);
  const [priority, setPriority] = useState(initialTask?.priority || 'media');
  const [dueDate, setDueDate] = useState(formatInputDate(initialTask?.dueDate));
  const [errors, setErrors] = useState({});

  const submit = () => {
    const nextErrors = {};
    const trimmedTitle = title.trim();
    const parsedDate = parseDateInput(dueDate);

    if (!trimmedTitle) nextErrors.title = 'Informe o título da tarefa.';
    if (!parsedDate.valid) nextErrors.dueDate = 'Informe uma data válida em DD/MM/AAAA.';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onSubmit({
      title: trimmedTitle,
      description: description.trim(),
      category: category === 'Outros' ? customCategory.trim() || 'Outros' : category,
      priority,
      dueDate: parsedDate.date,
    });
  };

  return (
    <View>
      <View style={styles.intro}>
        <View style={styles.introIcon}><Ionicons name={isEditing ? 'create-outline' : 'sparkles-outline'} size={23} color={COLORS.primary} /></View>
        <View style={styles.introContent}>
          <Text style={styles.introTitle}>{isEditing ? 'Atualize suas informações' : 'Vamos criar uma tarefa!'}</Text>
          <Text style={styles.introSubtitle}>Preencha os campos abaixo e organize suas próximas atividades.</Text>
        </View>
      </View>

      <View style={styles.panel}>
        <FieldLabel required>Título da tarefa</FieldLabel>
        <TextInput
          value={title}
          onChangeText={(value) => { setTitle(value); if (errors.title) setErrors((old) => ({ ...old, title: undefined })); }}
          placeholder="Ex.: Estudar para a prova"
          placeholderTextColor="#A4ABBE"
          autoCapitalize="sentences"
          maxLength={100}
          style={[styles.input, errors.title && styles.invalidInput]}
          accessibilityLabel="Título da tarefa"
        />
        {errors.title ? <Text style={styles.error}>{errors.title}</Text> : null}

        <View style={styles.fieldGap} />
        <FieldLabel hint="Opcional">Descrição</FieldLabel>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Adicione mais detalhes sobre a atividade..."
          placeholderTextColor="#A4ABBE"
          multiline
          numberOfLines={4}
          maxLength={700}
          style={[styles.input, styles.multiline]}
          textAlignVertical="top"
          accessibilityLabel="Descrição da tarefa"
        />

        <View style={styles.fieldGap} />
        <FieldLabel>Categoria</FieldLabel>
        <View style={styles.choiceWrap}>
          {CATEGORIES.map((option) => (
            <Pressable
              key={option}
              onPress={() => setCategory(option)}
              accessibilityRole="button"
              accessibilityState={{ selected: category === option }}
              style={[styles.choice, category === option && styles.selectedChoice]}
            >
              <Text style={[styles.choiceText, category === option && styles.selectedChoiceText]}>{option}</Text>
            </Pressable>
          ))}
        </View>
        {category === 'Outros' ? (
          <TextInput
            value={customCategory}
            onChangeText={setCustomCategory}
            placeholder="Nome da categoria (opcional)"
            placeholderTextColor="#A4ABBE"
            maxLength={35}
            style={[styles.input, styles.customCategory]}
            accessibilityLabel="Categoria personalizada"
          />
        ) : null}

        <View style={styles.fieldGap} />
        <FieldLabel>Prioridade</FieldLabel>
        <View style={styles.priorityRow}>
          {PRIORITIES.map((option) => {
            const selected = priority === option.value;
            const circleColor = option.value === 'alta' ? COLORS.red : option.value === 'media' ? COLORS.orange : COLORS.green;
            return (
              <Pressable
                key={option.value}
                onPress={() => setPriority(option.value)}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                style={[styles.priorityChoice, selected && styles.priorityChoiceActive]}
              >
                <View style={[styles.priorityDot, { backgroundColor: circleColor }]} />
                <Text style={[styles.priorityLabel, selected && styles.priorityLabelActive]}>{option.label}</Text>
                {selected ? <Ionicons name="checkmark" size={14} color={COLORS.primary} /> : null}
              </Pressable>
            );
          })}
        </View>

        <View style={styles.fieldGap} />
        <FieldLabel hint="Opcional">Data de vencimento</FieldLabel>
        <View style={[styles.dateInputWrap, errors.dueDate && styles.invalidInput]}>
          <Ionicons name="calendar-outline" size={19} color={COLORS.muted} />
          <TextInput
            value={dueDate}
            onChangeText={(value) => { setDueDate(formatDateTyping(value)); if (errors.dueDate) setErrors((old) => ({ ...old, dueDate: undefined })); }}
            placeholder="DD/MM/AAAA"
            placeholderTextColor="#A4ABBE"
            keyboardType="number-pad"
            maxLength={10}
            style={styles.dateInput}
            accessibilityLabel="Data de vencimento no formato dia mês ano"
          />
        </View>
        {errors.dueDate ? <Text style={styles.error}>{errors.dueDate}</Text> : null}
        <Text style={styles.helper}>Deixe em branco se a tarefa não tiver prazo definido.</Text>
      </View>

      <View style={styles.submitArea}>
        <AppButton icon={isEditing ? 'save-outline' : 'add-circle-outline'} onPress={submit}>{submitLabel}</AppButton>
        <Text style={styles.note}>Apenas o título é obrigatório. Os dados ficam salvos durante esta sessão.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  intro: { flexDirection: 'row', backgroundColor: COLORS.primarySoft, borderRadius: 18, padding: 16, marginBottom: 20, gap: 12, alignItems: 'center' },
  introIcon: { backgroundColor: 'white', height: 42, width: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  introContent: { flex: 1 },
  introTitle: { color: COLORS.ink, fontWeight: '800', fontSize: 14 },
  introSubtitle: { color: COLORS.muted, fontSize: 12, lineHeight: 18, marginTop: 4 },
  panel: { backgroundColor: COLORS.surface, borderRadius: 22, borderWidth: 1, borderColor: COLORS.line, padding: 19 },
  labelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  fieldLabel: { color: COLORS.ink, fontSize: 13, fontWeight: '800' },
  required: { color: COLORS.red },
  fieldHint: { color: COLORS.muted, fontSize: 11 },
  input: { borderWidth: 1.5, borderColor: COLORS.line, borderRadius: 13, backgroundColor: '#FBFBFE', color: COLORS.ink, fontSize: 14, paddingHorizontal: 14, minHeight: 49 },
  invalidInput: { borderColor: COLORS.red },
  fieldGap: { height: 24 },
  multiline: { minHeight: 111, paddingTop: 13, paddingBottom: 12 },
  choiceWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  choice: { borderWidth: 1.5, borderColor: COLORS.line, paddingVertical: 10, paddingHorizontal: 12, borderRadius: 11, backgroundColor: '#FBFBFE' },
  selectedChoice: { backgroundColor: COLORS.primarySoft, borderColor: COLORS.primary },
  choiceText: { fontSize: 12, fontWeight: '700', color: COLORS.muted },
  selectedChoiceText: { color: COLORS.primary },
  customCategory: { marginTop: 11 },
  priorityRow: { flexDirection: 'row', gap: 7 },
  priorityChoice: { flex: 1, minWidth: 0, paddingHorizontal: 8, height: 45, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, borderRadius: 11, borderWidth: 1.5, borderColor: COLORS.line, backgroundColor: '#FBFBFE' },
  priorityChoiceActive: { borderColor: COLORS.primary, backgroundColor: COLORS.primarySoft },
  priorityDot: { height: 7, width: 7, borderRadius: 4 },
  priorityLabel: { fontSize: 12, fontWeight: '700', color: COLORS.muted },
  priorityLabelActive: { color: COLORS.primary },
  dateInputWrap: { borderWidth: 1.5, borderColor: COLORS.line, borderRadius: 13, backgroundColor: '#FBFBFE', minHeight: 49, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, gap: 9 },
  dateInput: { flex: 1, color: COLORS.ink, minHeight: 46, fontSize: 14 },
  helper: { marginTop: 9, color: COLORS.muted, fontSize: 11, lineHeight: 16 },
  error: { marginTop: 8, color: COLORS.red, fontSize: 11, fontWeight: '700' },
  submitArea: { marginTop: 20, marginBottom: 30 },
  note: { fontSize: 11, lineHeight: 16, color: COLORS.muted, marginTop: 13, textAlign: 'center' },
});
