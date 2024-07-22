import { Component, Input } from '@angular/core';
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

  constructor(
    private todoService: TodoService, 
    private router: Router) { }

  deleteTodo() {
    this.todoService.deleteTodo(this.todo.id);
  }

  editTodo() {
    this.router.navigate(['/edit', this.todo.id]);
  }
}
