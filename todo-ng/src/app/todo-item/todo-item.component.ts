import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../services/todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {
  @Input() todo!: { id: string, title: string, description: string };
  @Output() onDelete = new EventEmitter<void>();

  constructor(
    private todoService: TodoService, 
    private router: Router) { }

  async deleteTodo() {
    await this.todoService.deleteTodo(this.todo.id);
    this.onDelete.emit();
  }

  editTodo() {
    this.router.navigate(['/edit', this.todo.id]);
  }
}
