import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { TodoService } from './services/todo.service';
import { Todo } from './models/todo.model';

type TodoFilter = 'all' | 'active' | 'completed';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, TodoListComponent, AddTodoComponent],
  template: `
    <div class="app-container">
      <header class="app-header">
        <h1>Todo Angular Standalone</h1>
        <p>Organize your tasks with a clean Angular standalone architecture.</p>
      </header>
      
      <main class="main-content">
        <app-add-todo (todoAdded)="onTodoAdded($event)"></app-add-todo>

        <section class="toolbar">
          <div class="toolbar-group">
            <label for="search">Search</label>
            <input
              id="search"
              type="search"
              [(ngModel)]="searchTerm"
              (ngModelChange)="refreshVisibleTodos()"
              placeholder="Search task title"
            />
          </div>

          <div class="toolbar-group">
            <label for="filter">Filter</label>
            <select id="filter" [(ngModel)]="filter" (ngModelChange)="refreshVisibleTodos()">
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <button class="clear-btn" type="button" (click)="onClearCompleted()" [disabled]="completedCount === 0">
            Clear completed
          </button>
        </section>

        <app-todo-list 
          [todos]="visibleTodos"
          (todoRemoved)="onTodoRemoved($event)"
          (todoToggled)="onTodoToggled($event)">
        </app-todo-list>
      </main>
      
      <footer class="app-footer">
        <p>{{ activeCount }} active / {{ completedCount }} completed</p>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #2c5364 0%, #203a43 45%, #0f2027 100%);
      padding: 20px;
      font-family: 'Nunito Sans', 'Segoe UI', sans-serif;
    }
    
    .app-header {
      text-align: center;
      color: white;
      margin-bottom: 40px;
    }
    
    .app-header h1 {
      font-size: 2.5em;
      margin: 0 0 10px 0;
      text-shadow: 0 2px 10px rgba(0,0,0,0.3);
    }
    
    .app-header p {
      font-size: 1.1em;
      opacity: 0.9;
      margin: 0;
    }
    
    .main-content {
      max-width: 600px;
      margin: 0 auto;
    }

    .toolbar {
      display: grid;
      gap: 12px;
      grid-template-columns: 1.4fr 1fr auto;
      margin-bottom: 16px;
      background: rgba(255, 255, 255, 0.12);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 14px;
      padding: 12px;
      color: #ecf3ff;
    }

    .toolbar-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .toolbar input,
    .toolbar select {
      border: 1px solid rgba(255, 255, 255, 0.4);
      border-radius: 10px;
      padding: 9px 10px;
      background: rgba(6, 16, 23, 0.4);
      color: #fff;
    }

    .clear-btn {
      border: none;
      border-radius: 10px;
      padding: 0 14px;
      background: #ff6b6b;
      color: #fff;
      font-weight: 600;
      cursor: pointer;
    }

    .clear-btn:disabled {
      opacity: 0.55;
      cursor: not-allowed;
    }
    
    .app-footer {
      text-align: center;
      margin-top: 30px;
      color: white;
      opacity: 0.8;
    }
    
    @media (max-width: 768px) {
      .app-container {
        padding: 15px;
      }

      .toolbar {
        grid-template-columns: 1fr;
      }
      
      .app-header h1 {
        font-size: 2em;
      }
    }
  `]
})
export class AppComponent implements OnInit {
  todos: Todo[] = [];
  visibleTodos: Todo[] = [];
  filter: TodoFilter = 'all';
  searchTerm = '';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todos = this.todoService.getTodos();
    this.refreshVisibleTodos();
  }

  onTodoAdded(text: string): void {
    this.todoService.addTodo(text);
    this.todos = this.todoService.getTodos();
    this.refreshVisibleTodos();
  }

  onTodoRemoved(id: number): void {
    this.todoService.removeTodo(id);
    this.todos = this.todoService.getTodos();
    this.refreshVisibleTodos();
  }

  onTodoToggled(id: number): void {
    this.todoService.toggleTodo(id);
    this.todos = this.todoService.getTodos();
    this.refreshVisibleTodos();
  }

  onClearCompleted(): void {
    this.todoService.clearCompleted();
    this.todos = this.todoService.getTodos();
    this.refreshVisibleTodos();
  }

  get activeCount(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  get completedCount(): number {
    return this.todos.filter(todo => todo.completed).length;
  }

  refreshVisibleTodos(): void {
    const term = this.searchTerm.trim().toLowerCase();
    this.visibleTodos = this.todos.filter(todo => {
      const matchesFilter =
        this.filter === 'all' ||
        (this.filter === 'active' && !todo.completed) ||
        (this.filter === 'completed' && todo.completed);

      const matchesSearch = !term || todo.text.toLowerCase().includes(term);
      return matchesFilter && matchesSearch;
    });
  }
}
