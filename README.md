<h1 align="center">✨ Organiza</h1>

<h3 align="center">Suas tarefas, seu ritmo.</h3>

<p align="center">
  Aplicativo mobile para organizar tarefas pessoais e profissionais, desenvolvido com
  <strong>React Native, JavaScript, Expo e Expo Router</strong>.
</p>

<p align="center">
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&amp;logo=javascript&amp;logoColor=000000" />
  <img alt="React Native" src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&amp;logo=react&amp;logoColor=61DAFB" />
  <img alt="Expo" src="https://img.shields.io/badge/Expo-1B1F3B?style=for-the-badge&amp;logo=expo&amp;logoColor=white" />
  <img alt="Expo Router" src="https://img.shields.io/badge/Expo_Router-6457E8?style=for-the-badge" />
</p>

<p align="center">
  <strong>Organize atividades • Acompanhe o progresso • Priorize o que importa</strong>
</p>

---

## 📱 Conheça o aplicativo

Interface em tons de azul-escuro, violeta e branco, com cartões de tarefas, filtros e indicadores atualizados conforme as ações do usuário.

<table align="center">
  <tr>
    <th align="center">Dashboard e progresso</th>
    <th align="center">Tarefas cadastradas</th>
  </tr>
  <tr>
    <td align="center"><img src="src/assets/screenshots/dashboard.jpeg" alt="Tela inicial do Organiza com indicadores de tarefas" width="290" /></td>
    <td align="center"><img src="src/assets/screenshots/tarefas-cadastradas.jpeg" alt="Lista de tarefas, categorias e prioridades" width="290" /></td>
  </tr>
  <tr>
    <th align="center">Cadastro de tarefa</th>
    <th align="center">Estado vazio</th>
  </tr>
  <tr>
    <td align="center"><img src="src/assets/screenshots/nova-tarefa.jpeg" alt="Formulário para criar uma nova tarefa" width="290" /></td>
    <td align="center"><img src="src/assets/screenshots/estado-vazio.jpeg" alt="Lista vazia com opções para criar ou carregar tarefas de exemplo" width="290" /></td>
  </tr>
</table>

> Capturas reais do aplicativo. A listagem pode utilizar tarefas de demonstração. As telas de detalhes e edição fazem parte do projeto, mas não aparecem nesta galeria.

## ✅ Funcionalidades

- **Dashboard:** quantidade total de tarefas, pendentes e concluídas, com atualização automática.
- **Cadastro:** título obrigatório, descrição opcional, categoria, prioridade e data de vencimento.
- **Listagem:** cartões com título, categoria, prioridade, vencimento e status.
- **Detalhes:** informações completas da tarefa selecionada.
- **Edição:** atualização dos dados de uma tarefa existente.
- **Status:** marcar uma tarefa como concluída ou retorná-la para pendente.
- **Exclusão:** remoção de tarefas mediante confirmação.
- **Filtros:** todas, pendentes, concluídas e por prioridade.
- **Demonstração:** possibilidade de carregar tarefas de exemplo na tela inicial vazia.

## 🧰 Tecnologias e conceitos

| Tecnologia | Aplicação no projeto |
| :-- | :-- |
| **JavaScript** | Objetos, arrow functions, destructuring, spread, métodos de arrays e módulos |
| **React** | Componentes reutilizáveis, props, eventos e renderização condicional |
| **React Native** | Interface mobile, formulários, `Pressable`, `TextInput` e `FlatList` |
| **React Hooks** | `useState`, atualização funcional e estados derivados |
| **Context API** | Compartilhamento de dados entre telas sem bibliotecas externas de estado |
| **Expo Router** | Navegação baseada em arquivos, `Stack` e parâmetros por ID |

## 🚀 Como executar

**Pré-requisitos:** Node.js compatível com a versão do Expo utilizada no projeto, npm e Expo Go atualizado (ou um emulador compatível).

Clone o repositório e entre na pasta que contém o `package.json`:

```bash
git clone https://github.com/AugustinXL/organiza-tarefas-react-native.git
cd organiza-tarefas-react-native
npm install
npx expo start --clear
```

Abra o **Expo Go** no celular e escaneie o QR Code exibido no terminal.

Para executar os testes automatizados:

```bash
npm test
```

> Se você estiver usando o ZIP original, execute os comandos na pasta interna `organiza_tarefas`, onde está o `package.json`.

## 🗂️ Organização do código

```text
app/
├── _layout.js               # Provider e navegação Stack
├── index.js                 # Dashboard e listagem
└── task/
    ├── new.js               # Cadastro
    ├── [id].js              # Detalhes
    └── edit/[id].js         # Edição

src/
├── assets/
│   └── screenshots/         # Capturas usadas neste README
├── components/              # Componentes reutilizáveis
├── constants/               # Tema e opções
├── context/                 # Estado compartilhado em memória
└── utils/                   # Validações, filtros e funções auxiliares

tests/                       # Testes automatizados
```

## 🔍 Decisões de implementação

**Estado sem persistência:** por exigência da atividade acadêmica, as tarefas são mantidas somente em memória. Ao reiniciar o aplicativo, os dados são perdidos intencionalmente. Não são utilizados AsyncStorage, SQLite, backend ou serviços externos para armazenar tarefas.

**Atualizações imutáveis:** cadastro, edição, mudança de status e exclusão são realizados sem modificar diretamente os arrays e objetos anteriores.

**Dados derivados:** indicadores e filtros são calculados a partir da lista atual, sem duplicar desnecessariamente o estado.

## 🎓 Sobre o projeto

Projeto acadêmico de revisão dos fundamentos de **JavaScript, React e desenvolvimento mobile**, apresentado também como parte de um portfólio de aprendizado.
