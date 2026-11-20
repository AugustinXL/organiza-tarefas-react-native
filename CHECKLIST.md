# Conferência 

| Requisito do PDF | Implementação |
|---|---|
| RF01 Dashboard: nome, totais, pendentes, concluídas, lista e adicionar | `app/index.js`, `StatCard.js` |
| RF02 Cadastro de título, descrição, categoria, prioridade, data | `app/task/new.js`, `TaskForm.js` |
| RF02 Título obrigatório; descrição opcional; pendente inicial | Validação de `TaskForm.js`; `addTask()` em `TaskContext.js` |
| RF03 Lista via `FlatList`, identificação visual e campos exigidos | `app/index.js`, `TaskCard.js`, `PriorityBadge.js`, `StatusBadge.js` |
| RF04 Detalhes e ações editar, concluir, voltar | `app/task/[id].js` |
| RF05 Edição e atualização dos dados | `app/task/edit/[id].js`, `editTask()` |
| RF06 Concluir e reabrir, com contadores atualizados | `toggleTask()` e `summarizeTasks()` |
| RF07 Exclusão com confirmação | `ConfirmDialog.js`, `deleteTask()` |
| RF08 Filtro de todas, pendentes, concluídas e prioridade | `filterTasks()` e chips do Dashboard |
| JavaScript: objetos, template strings, arrow, spread, destructuring | `TaskContext.js`, `taskUtils.js`, `AppButton.js` |
| JavaScript: map, filter, find, reduce | `taskUtils.js` e `TaskContext.js` |
| React: componentes, props, children, eventos e renderização condicional | Componentes em `src/components/` |
| React Native: views, textos, pressable, input, scroll, FlatList, Safe Area e StatusBar | Rotas e componentes |
| Hooks, estado imutável e sem useEffect desnecessário | `TaskContext.js`, `app/index.js`; sem efeito externo |
| Expo Router: arquivos, _layout, Stack, push/back, parâmetros | `app/` e `app/_layout.js` |
| IDs únicos e edição/exclusão só no alvo | `createTaskId()`, `updateTaskInList()`, `deleteTaskFromList()` |
| Somente memória; sem banco, API ou persistência | `useState([])` em `TaskContext.js` |
| Código-fonte completo e organização | Pasta estruturada do projeto |
| Execução no Expo | `package.json`, `app.json` e instruções no `README.md` |
| Demonstração | `ROTEIRO_DE_DEMONSTRACAO.md` (a gravação é feita ao rodar o aplicativo) |

**Observações:** `Image` e `ActivityIndicator` constam apenas quando necessários, então não foram acrescentados artificialmente. `useEffect` também foi evitado, conforme orientação de não criar efeitos para estatísticas derivadas.
