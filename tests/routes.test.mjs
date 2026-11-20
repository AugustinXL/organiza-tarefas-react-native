import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

test('Quatro rotas obrigatórias possuem exportação default válida', async () => {
  for (const path of ['app/index.js', 'app/task/new.js', 'app/task/[id].js', 'app/task/edit/[id].js']) {
    assert.match(await read(path), /export default function [A-Za-z]+\(/, `Exportação ausente em ${path}`);
  }
});

test('Expo Router usa Stack e provider de memória no layout raiz', async () => {
  const layout = await read('app/_layout.js');
  assert.match(layout, /<Stack/);
  assert.match(layout, /<TaskProvider>/);
  assert.match(layout, /<SafeAreaProvider>/);
});

test('Dashboard utiliza FlatList com keyExtractor', async () => {
  const dashboard = await read('app/index.js');
  assert.match(dashboard, /<FlatList/);
  assert.match(dashboard, /keyExtractor=/);
});

test('Não há persistência ou backend no gerenciamento de tarefas', async () => {
  const provider = await read('src/context/TaskContext.js');
  assert.doesNotMatch(provider, /AsyncStorage|SQLite|fetch\(|axios|localStorage|redux|zustand/i);
  assert.match(provider, /useState\(\[\]\)/);
});
