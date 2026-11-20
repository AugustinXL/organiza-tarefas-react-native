import React, { createContext, useContext, useMemo, useRef, useState } from 'react';
import {
  createTaskId,
  deleteTaskFromList,
  findTask,
  summarizeTasks,
  toggleTaskInList,
  updateTaskInList,
} from '../utils/taskUtils';

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  // Os registros começam vazios e permanecem SOMENTE na memória do aplicativo.
  const [tasks, setTasks] = useState([]);
  const nextId = useRef(0);

  const generateId = () => {
    nextId.current += 1;
    return createTaskId(nextId.current);
  };

  const addTask = (data) => {
    const id = generateId();
    const task = {
      id,
      title: data.title.trim(),
      description: (data.description || '').trim(),
      category: (data.category || 'Pessoal').trim(),
      priority: data.priority || 'media',
      dueDate: data.dueDate || null,
      status: 'pendente',
      createdAt: new Date().toISOString(),
    };
    setTasks((current) => [task, ...current]);
    return id;
  };

  const editTask = (id, data) => {
    const changes = {
      title: data.title.trim(),
      description: (data.description || '').trim(),
      category: (data.category || 'Pessoal').trim(),
      priority: data.priority || 'media',
      dueDate: data.dueDate || null,
    };
    setTasks((current) => updateTaskInList(current, id, changes));
  };

  const toggleTask = (id) => setTasks((current) => toggleTaskInList(current, id));
  const deleteTask = (id) => setTasks((current) => deleteTaskFromList(current, id));
  const getTask = (id) => findTask(tasks, id);

  const addExampleTasks = () => {
    if (tasks.length) return;
    const today = new Date();
    const dateAfter = (days) => {
      const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + days);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    };
    const examples = [
      { title: 'Revisar conteúdo da faculdade', description: 'Rever os conceitos de JavaScript e Hooks para a prova.', category: 'Estudos', priority: 'alta', dueDate: dateAfter(1), status: 'pendente' },
      { title: 'Organizar atividades da semana', description: 'Definir as entregas e prioridades de cada dia.', category: 'Trabalho', priority: 'media', dueDate: dateAfter(3), status: 'pendente' },
      { title: 'Fazer atividade física', description: 'Separar 30 minutos para uma caminhada.', category: 'Saúde', priority: 'baixa', dueDate: dateAfter(0), status: 'pendente' },
    ];
    // map + spread; identificadores novos sem duplicações.
    setTasks(examples.map((item) => ({ ...item, id: generateId(), createdAt: new Date().toISOString() })));
  };

  const stats = useMemo(() => summarizeTasks(tasks), [tasks]);
  const value = {
    tasks,
    stats,
    getTask,
    addTask,
    editTask,
    toggleTask,
    deleteTask,
    addExampleTasks,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks deve ser utilizado dentro de TaskProvider.');
  return context;
}
