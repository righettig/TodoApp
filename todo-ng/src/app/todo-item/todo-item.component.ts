import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TodoStoreService } from '../services/todo-store.service';

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
    private todoStoreService: TodoStoreService,
    private router: Router) { }

  async deleteTodo() {
    await this.todoStoreService.deleteTodo(this.todo.id);
    this.onDelete.emit();
  }

  editTodo() {
    this.router.navigate(['/edit', this.todo.id]);
  }
}
