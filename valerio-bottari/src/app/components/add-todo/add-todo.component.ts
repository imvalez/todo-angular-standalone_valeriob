import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="add-todo-container">
      <h3>✨ Aggiungi una nuova attività</h3>
      <div class="input-group">
        <input 
          type="text" 
          [(ngModel)]="newTodoText" 
          placeholder="Cosa devi fare oggi?"
          class="todo-input"
          (keyup.enter)="addTodo()"
          #todoInput>
        <button 
          (click)="addTodo()" 
          class="add-btn"
          [disabled]="!newTodoText.trim()">
          Aggiungi
        </button>
      </div>
    </div>
  `,
  styles: [`
    .add-todo-container {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 25px;
      border-radius: 15px;
      margin-bottom: 30px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }
    
    h3 {
      color: white;
      margin: 0 0 20px 0;
      font-size: 1.3em;
      text-align: center;
    }
    
    .input-group {
      display: flex;
      gap: 10px;
    }
    
    .todo-input {
      flex: 1;
      padding: 12px 16px;
      border: none;
      border-radius: 25px;
      font-size: 16px;
      outline: none;
      box-shadow: inset 0 2px 10px rgba(0,0,0,0.1);
    }
    
    .add-btn {
      padding: 12px 24px;
      background: #ff6b6b;
      color: white;
      border: none;
      border-radius: 25px;
      cursor: pointer;
      font-weight: bold;
      transition: all 0.3s ease;
    }
    
    .add-btn:hover:not(:disabled) {
      background: #ff5252;
      transform: translateY(-2px);
    }
    
    .add-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `]
})
export class AddTodoComponent {
  @Output() todoAdded = new EventEmitter<string>();
  newTodoText: string = '';

  addTodo(): void {
    if (this.newTodoText.trim()) {
      this.todoAdded.emit(this.newTodoText);
      this.newTodoText = '';
    }
  }
}
