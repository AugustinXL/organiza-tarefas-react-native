// Regras independentes da interface: fáceis de testar e reutilizar.
export const PRIORITY_LABELS = { baixa: 'Baixa', media: 'Média', alta: 'Alta' };

export function createTaskId(sequence, timestamp = Date.now()) {
  return `tarefa-${timestamp}-${sequence}`;
}

export function summarizeTasks(tasks) {
  return tasks.reduce(
    (summary, task) => ({
      total: summary.total + 1,
      pending: summary.pending + (task.status === 'pendente' ? 1 : 0),
      completed: summary.completed + (task.status === 'concluida' ? 1 : 0),
    }),
    { total: 0, pending: 0, completed: 0 }
  );
}

export function filterTasks(tasks, statusFilter = 'todas', priorityFilter = 'todas') {
  return tasks.filter((task) => {
    const matchesStatus = statusFilter === 'todas' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'todas' || task.priority === priorityFilter;
    return matchesStatus && matchesPriority;
  });
}

export function findTask(tasks, id) {
  return tasks.find((task) => task.id === id);
}

export function updateTaskInList(tasks, id, changes) {
  return tasks.map((task) => (task.id === id ? { ...task, ...changes } : task));
}

export function deleteTaskFromList(tasks, id) {
  return tasks.filter((task) => task.id !== id);
}

export function toggleTaskInList(tasks, id) {
  return tasks.map((task) =>
    task.id === id
      ? { ...task, status: task.status === 'pendente' ? 'concluida' : 'pendente' }
      : task
  );
}

export function parseDateInput(value) {
  const trimmed = String(value || '').trim();
  if (!trimmed) return { valid: true, date: null };
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(trimmed);
  if (!match) return { valid: false, date: null };

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  if (year < 1900 || year > 2100) return { valid: false, date: null };
  const actual = new Date(Date.UTC(year, month - 1, day));
  if (
    actual.getUTCFullYear() !== year ||
    actual.getUTCMonth() !== month - 1 ||
    actual.getUTCDate() !== day
  ) {
    return { valid: false, date: null };
  }
  return { valid: true, date: `${year}-${match[2]}-${match[1]}` };
}

export function formatDateBR(isoDate) {
  if (!isoDate) return 'Sem prazo';
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  return match ? `${match[3]}/${match[2]}/${match[1]}` : 'Data não informada';
}

export function isOverdue(isoDate, status, reference = new Date()) {
  if (!isoDate || status === 'concluida') return false;
  const today = `${reference.getFullYear()}-${String(reference.getMonth() + 1).padStart(2, '0')}-${String(reference.getDate()).padStart(2, '0')}`;
  return isoDate < today;
}

export function formatInputDate(isoDate) {
  return isoDate ? formatDateBR(isoDate) : '';
}

export function formatDateTyping(raw) {
  const numbers = String(raw).replace(/\D/g, '').slice(0, 8);
  let formatted = numbers.slice(0, 2);
  if (numbers.length > 2) formatted += `/${numbers.slice(2, 4)}`;
  if (numbers.length > 4) formatted += `/${numbers.slice(4)}`;
  return formatted;
}
