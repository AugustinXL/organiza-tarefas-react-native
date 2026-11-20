# Organiza. — Organizador de Tarefas

Projeto prático desenvolvido em **JavaScript + React Native + Expo SDK 58 + Expo Router**, O aplicativo inclui Dashboard, cadastro, detalhes e edição de tarefas; conclusão/reabertura; exclusão com confirmação; filtros por situação e prioridade; e indicadores atualizados automaticamente.

> Não há banco de dados, API, AsyncStorage, SQLite ou persistência de qualquer tipo. As tarefas ficam no `useState` do `TaskProvider` enquanto o aplicativo estiver em execução. Ao reiniciar, os dados são perdidos intencionalmente.

## Requisitos

- Node.js **22.13 ou superior** (compatível com Expo SDK 58).
- npm.
- **Expo Go** atualizado no celular ou emulador Android/iOS compatível com SDK 58.

## Como executar no Windows (VS Code / terminal)

1. Extraia o ZIP e abra a pasta `organiza_tarefas` no VS Code.
2. Abra o terminal **dentro dessa pasta**, onde está o arquivo `package.json`.
3. Rode:

   ```powershell
   npm install
   npx expo install --check
   npx expo start --clear
   ```

4. Abra o Expo Go e leia o QR Code exibido pelo terminal. Ou digite `a` no terminal caso tenha um emulador Android já configurado.
5. O aplicativo abrirá na tela inicial. Clique em **Nova** para cadastrar uma tarefa. Se desejar demonstrar rapidamente os filtros e indicadores, use **Carregar tarefas de exemplo** quando a lista estiver vazia.

Comandos úteis:

```powershell
npm test              # testes automatizados da lógica e da estrutura
npm run android       # abre o Expo no Android
npm run web           # execução opcional no navegador
```

**Importante:** para executar em Expo, não precisa criar `android/` nem `ios/` nem compilar APK. O projeto é executável no ambiente Expo após instalar suas dependências. O código completo está no ZIP, mas a pasta `node_modules` não está incluída para reduzir o tamanho do envio.

### Se seu projeto antigo apresentou erro `TaskForm.js: Cannot read property 'input' of undefined`

Este projeto inclui um `TaskForm.js` reescrito. O arquivo declara `styles` corretamente antes do uso e não utiliza `styles.input` fora de um componente de maneira inválida. Todas as quatro rotas também possuem `export default`. **Recomenda-se executar este projeto em uma pasta limpa**, sem misturar os arquivos do projeto antigo. Ao mudar de estrutura, execute `npx expo start --clear`.

## Estrutura de pastas

```text
organiza_tarefas/
├── app/
│   ├── _layout.js                  # SafeAreaProvider, TaskProvider e Stack
│   ├── index.js                    # Dashboard e FlatList
│   ├── +not-found.js               # Rota não encontrada
│   └── task/
│       ├── new.js                  # Cadastro
│       ├── [id].js                 # Detalhes
│       └── edit/
│           └── [id].js             # Edição
├── src/
│   ├── components/
│   │   ├── AppButton.js            # Componente de botão reutilizável
│   │   ├── TaskForm.js             # Formulário reutilizado em novo/editar
│   │   ├── TaskCard.js             # Cartão de tarefa
│   │   ├── ScreenHeader.js         # Cabeçalho com retorno
│   │   ├── PriorityBadge.js        # Prioridades
│   │   ├── StatusBadge.js          # Situação
│   │   ├── StatCard.js             # Indicadores
│   │   ├── EmptyState.js           # Estado vazio e exemplos
│   │   └── ConfirmDialog.js        # Confirmação de exclusão
│   ├── constants/theme.js          # Cores e opções
│   ├── context/TaskContext.js      # Estado em memória / CRUD
│   └── utils/taskUtils.js         # Lógica pura, data e filtros
├── tests/                          # Testes com Node sem deps extras
├── ROTEIRO_DE_DEMONSTRACAO.md      # Passo a passo para apresentar
├── CHECKLIST_ENUNCIADO.md         # Mapa requisito → implementação
├── package.json
├── app.json
└── babel.config.js
```

## Campos e regras

| Campo | Regra |
|---|---|
| Título | **Obrigatório**; não aceita espaços em branco como título |
| Descrição | Opcional |
| Categoria | Seleção entre Pessoal, Estudos, Trabalho, Saúde e Outros; categoria personalizada opcional |
| Prioridade | Baixa, Média ou Alta; valor inicial Média |
| Data de vencimento | Opcional; quando informada, exige data real no formato **DD/MM/AAAA** |
| Status | Toda tarefa nova começa como **Pendente**; alterna entre pendente e concluída |
| Identificador | Único, criado com timestamp e contador incremental |


## Conceitos implementados

- **JavaScript:** `const`, `let` (usados nos utilitários de data), template strings, objetos, arrow functions, destructuring, spread, `map`, `filter`, `find`, `reduce`, `import` e `export`.
- **React:** componentes, `children`, props e spread props, handlers de eventos, renderização condicional, chaves (`key`), `useState`, `useRef` e `useMemo`.
- **React Native:** `View`, `Text`, `Pressable`, `TextInput`, `ScrollView`, `FlatList`, `SafeAreaView`, `StatusBar`, `Modal` e `KeyboardAvoidingView`. `Image` e `ActivityIndicator` não são usados porque não se fazem necessários neste aplicativo.
- **Expo Router:** rotas baseadas em arquivos, `_layout.js`, `Stack`, `router.push`, `router.replace`, `router.back` e parâmetros `[id]`.
- **Estados imutáveis:** `setTasks(current => ...)` e operadores spread, sem modificar diretamente as tarefas originais.
- **`useEffect`:** intencionalmente omitido porque não existem sincronizações externas nem efeitos com cleanup. Estatísticas são derivadas de `tasks` com `useMemo`, como o enunciado recomenda.

## Como testar a regra de não persistência

Cadastre uma tarefa, conclua-a e confira os indicadores. Em seguida, feche completamente/reinicie o aplicativo e abra-o novamente. A lista será inicializada vazia — comportamento **exigido** no enunciado.


