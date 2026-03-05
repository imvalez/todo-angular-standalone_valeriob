import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';

const STORAGE_KEY = 'todo-angular-standalone.todos';

const DEFAULT_TODOS: Todo[] = [
  { id: 1, text: 'Study Angular standalone architecture', completed: false, createdAt: new Date() },
  { id: 2, text: 'Prepare project README improvements', completed: false, createdAt: new Date() }
];

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: Todo[] = [];
  private nextId = 1;

  constructor() {
    this.loadTodos();
  }

  getTodos(): Todo[] {
    return [...this.todos].sort((a, b) => b.id - a.id);
  }

  addTodo(text: string): void {
    if (text.trim()) {
      const newTodo: Todo = {
        id: this.nextId++,
        text: text.trim(),
        completed: false,
        createdAt: new Date()
      };
      this.todos.push(newTodo);
      this.saveTodos();
    }
  }

  removeTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.saveTodos();
  }

  toggleTodo(id: number): void {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.saveTodos();
    }
  }

  clearCompleted(): void {
    this.todos = this.todos.filter(todo => !todo.completed);
    this.saveTodos();
  }

  private loadTodos(): void {
    const storage = this.getStorage();
    if (!storage) {
      this.todos = DEFAULT_TODOS;
      this.nextId = DEFAULT_TODOS.length + 1;
      return;
    }

    const stored = storage.getItem(STORAGE_KEY);
    if (!stored) {
      this.todos = DEFAULT_TODOS;
      this.nextId = DEFAULT_TODOS.length + 1;
      this.saveTodos();
      return;
    }

    try {
      const parsed = JSON.parse(stored) as Todo[];
      this.todos = parsed.map(todo => ({
        ...todo,
        createdAt: new Date(todo.createdAt)
      }));
      this.nextId = this.todos.reduce((max, todo) => Math.max(max, todo.id), 0) + 1;
    } catch {
      this.todos = DEFAULT_TODOS;
      this.nextId = DEFAULT_TODOS.length + 1;
      storage.removeItem(STORAGE_KEY);
    }
  }

  private saveTodos(): void {
    const storage = this.getStorage();
    if (!storage) {
      return;
    }

    storage.setItem(STORAGE_KEY, JSON.stringify(this.todos));
  }

  private getStorage(): Storage | null {
    const maybeStorage =
      typeof globalThis !== 'undefined'
        ? (globalThis as { localStorage?: Storage }).localStorage
        : undefined;

    if (!maybeStorage || typeof maybeStorage.getItem !== 'function') {
      return null;
    }

    return maybeStorage;
  }
}
