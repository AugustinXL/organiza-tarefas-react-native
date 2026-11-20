<div align="center">

# ✨ Organiza.

### Suas tarefas, seu ritmo.

Aplicativo mobile de gerenciamento de tarefas pessoais e profissionais desenvolvido com **React Native, JavaScript, Expo e Expo Router**.

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=000000)
![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-1B1F3B?style=for-the-badge&logo=expo&logoColor=white)
![Expo Router](https://img.shields.io/badge/Expo_Router-6457E8?style=for-the-badge)

**Organize atividades • Acompanhe o progresso • Priorize o que importa**

</div>

---

## 📱 Conheça o aplicativo

Interface com identidade visual em tons de azul-escuro, violeta e branco, cartões de tarefas e indicadores atualizados conforme as ações do usuário.

<table align="center">
  <tr>
    <th align="center">Dashboard e progresso</th>
    <th align="center">Tarefas cadastradas</th>
  </tr>
  <tr>
    <td align="center"><img src="assets/screenshots/dashboard.jpeg" alt="Tela inicial do Organiza, com cabeçalho e indicadores de tarefas" width="290" /></td>
    <td align="center"><img src="assets/screenshots/tarefas-cadastradas.jpeg" alt="Listagem de tarefas com categorias, prioridades, datas e ações" width="290" /></td>
  </tr>
  <tr>
    <th align="center">Cadastro de tarefa</th>
    <th align="center">Estado vazio</th>
  </tr>
  <tr>
    <td align="center"><img src="assets/screenshots/nova-tarefa.jpeg" alt="Formulário de criação de tarefa com título, descrição, categoria e prioridade" width="290" /></td>
    <td align="center"><img src="assets/screenshots/estado-vazio.jpeg" alt="Lista vazia com opção de criar a primeira tarefa ou carregar exemplos" width="290" /></td>
  </tr>
</table>

> As capturas foram feitas no aplicativo real. A tela de tarefas cadastradas utiliza dados de demonstração. Outras telas, como detalhes e edição, estão implementadas, mas não são mostradas nessas capturas.

## ✅ Funcionalidades

- **Dashboard:** indicadores de tarefas totais, pendentes e concluídas, com atualização automática.
- **Cadastro:** título obrigatório, descrição opcional, categoria, prioridade e data de vencimento.
- **Listagem:** cartões com título, categoria, prioridade, vencimento e status.
- **Detalhes:** visualização das informações da tarefa selecionada.
- **Edição:** atualização dos campos de uma tarefa existente.
- **Status:** marcar como concluída ou retornar para pendente.
- **Exclusão:** remoção de tarefa com confirmação.
- **Filtros:** todas, pendentes, concluídas e prioridades alta, média ou baixa.
- **Exemplos:** carregamento de tarefas de demonstração na tela inicial vazia.

## 🧰 Tecnologias e conceitos

| Tecnologia | Aplicação |
| :-- | :-- |
| **JavaScript** | Objetos, arrow functions, destructuring, spread, métodos de array e módulos |
| **React** | Componentes reutilizáveis, props, eventos e renderização condicional |
| **React Native** | Interface mobile, formulários, `Pressable`, `TextInput` e `FlatList` |
| **React Hooks** | `useState`, atualização funcional e estados derivados |
| **Context API** | Compartilhamento dos dados entre telas sem bibliotecas externas de estado |
| **Expo Router** | Navegação com rotas baseadas em arquivos, `Stack` e parâmetros por ID |

## 🚀 Como executar

**Pré-requisitos:** Node.js compatível com Expo SDK 58, npm e Expo Go atualizado (ou emulador compatível).

Clone o repositório e execute os comandos **dentro da pasta que contém `package.json`**:

```bash
# Depois de clonar seu repositório, entre na pasta do projeto.
# Substitua o diretório abaixo pelo nome usado no seu clone:
cd organiza-tarefas-react-native

npm install
npx expo start --clear
```

Abra o **Expo Go** e leia o QR Code exibido no terminal. Para rodar os testes de regras de negócio:

```bash
npm test
```

> Se você extraiu o ZIP original (em vez de clonar o repositório), o caminho da pasta do aplicativo é `organiza_tarefas_projeto_completo/organiza_tarefas`. Rode os comandos nessa pasta, não na pasta externa do ZIP.

## 🗂️ Organização do código

```text
app/
├── _layout.js             # Provider e navegação Stack
├── index.js               # Dashboard e listagem
└── task/
    ├── new.js             # Cadastro
    ├── [id].js            # Detalhes
    └── edit/[id].js       # Edição

src/
├── components/            # Componentes de interface reutilizáveis
├── constants/             # Tema e opções
├── context/               # Estado global em memória (Context API)
└── utils/                 # Validações, filtros e funções utilitárias

tests/                     # Testes automatizados
assets/screenshots/        # Capturas reais para este README
```

## 🔍 Decisões de implementação

**Estado sem persistência:** por exigência do enunciado acadêmico, as tarefas ficam apenas em memória durante a execução. Ao reiniciar o aplicativo, elas são perdidas intencionalmente. Não são utilizados AsyncStorage, SQLite, backend ou serviços externos.

**Atualizações imutáveis:** operações de cadastro, edição, conclusão e exclusão usam atualizações de estado que preservam os objetos e arrays anteriores.

**Dados derivados:** totalizadores e filtros são obtidos a partir da lista atual de tarefas, sem duplicar desnecessariamente o estado.

## 🎓 Sobre o projeto

Projeto acadêmico de revisão de fundamentos de JavaScript, React e desenvolvimento mobile, preparado também como parte de um portfólio de aprendizado.
