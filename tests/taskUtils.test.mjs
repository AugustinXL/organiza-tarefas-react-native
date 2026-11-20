import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

// O módulo de lógica é JavaScript puro; importação por data URL para testes Node
// sem Babel, Metro, bibliotecas extras ou alterar a configuração do Expo.
const moduleSource = await readFile(new URL('../src/utils/taskUtils.js', import.meta.url), 'utf8');
const {
  createTaskId,
  summarizeTasks,
  filterTasks,
  findTask,
  updateTaskInList,
  deleteTaskFromList,
  toggleTaskInList,
  parseDateInput,
  formatDateBR,
  formatDateTyping,
  isOverdue,
} = await import(`data:text/javascript;charset=utf-8,${encodeURIComponent(moduleSource)}`);

const original = [
  { id: 'a', title: 'Trabalho', status: 'pendente', priority: 'alta', description: 'original' },
  { id: 'b', title: 'Estudos', status: 'concluida', priority: 'baixa', description: 'segunda' },
  { id: 'c', title: 'Lazer', status: 'pendente', priority: 'media', description: 'terceira' },
];

test('IDs gerados têm identificador único para a mesma marca de tempo', () => {
  const ids = [1, 2, 3].map((sequence) => createTaskId(sequence, 12345));
  assert.equal(new Set(ids).size, 3);
});

test('Resumo calcula total, pendentes e concluídas com reduce', () => {
  assert.deepEqual(summarizeTasks(original), { total: 3, pending: 2, completed: 1 });
  assert.deepEqual(summarizeTasks([]), { total: 0, pending: 0, completed: 0 });
});

test('Filtros por status e prioridade não modificam o array original', () => {
  const statusOnly = filterTasks(original, 'pendente', 'todas');
  assert.deepEqual(statusOnly.map((task) => task.id), ['a', 'c']);
  const priorityOnly = filterTasks(original, 'todas', 'baixa');
  assert.deepEqual(priorityOnly.map((task) => task.id), ['b']);
  const both = filterTasks(original, 'pendente', 'alta');
  assert.deepEqual(both.map((task) => task.id), ['a']);
  assert.equal(original.length, 3);
});

test('Busca, edição e exclusão atingem somente a tarefa selecionada', () => {
  assert.equal(findTask(original, 'b')?.title, 'Estudos');
  assert.equal(findTask(original, 'inexistente'), undefined);
  const modified = updateTaskInList(original, 'b', { title: 'Estudos atualizados' });
  assert.equal(modified[1].title, 'Estudos atualizados');
  assert.equal(modified[0], original[0]);
  assert.equal(original[1].title, 'Estudos');
  const deleted = deleteTaskFromList(original, 'b');
  assert.deepEqual(deleted.map((task) => task.id), ['a', 'c']);
  assert.equal(original.length, 3);
});

test('Conclusão pode ser revertida sem mutar a lista original', () => {
  const first = toggleTaskInList(original, 'a');
  assert.equal(first[0].status, 'concluida');
  assert.equal(original[0].status, 'pendente');
  const second = toggleTaskInList(first, 'a');
  assert.equal(second[0].status, 'pendente');
});

test('Data é opcional, validada e convertida ao formato ISO', () => {
  assert.deepEqual(parseDateInput(''), { valid: true, date: null });
  assert.deepEqual(parseDateInput('29/02/2028'), { valid: true, date: '2028-02-29' });
  assert.equal(parseDateInput('29/02/2027').valid, false);
  assert.equal(parseDateInput('31/04/2027').valid, false);
  assert.equal(parseDateInput('31/13/2027').valid, false);
  assert.equal(parseDateInput('00/12/2027').valid, false);
  assert.equal(parseDateInput('12/3/2027').valid, false);
  assert.equal(formatDateBR('2027-12-05'), '05/12/2027');
  assert.equal(formatDateBR(null), 'Sem prazo');
  assert.equal(formatDateTyping('05072027'), '05/07/2027');
});

test('Tarefa concluída não aparece como atrasada', () => {
  const now = new Date(2027, 1, 10);
  assert.equal(isOverdue('2027-02-09', 'pendente', now), true);
  assert.equal(isOverdue('2027-02-09', 'concluida', now), false);
  assert.equal(isOverdue('2027-02-10', 'pendente', now), false);
});
