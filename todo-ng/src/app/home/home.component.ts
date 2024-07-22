import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../services/todo.service';
import { AddEditTodoComponent } from '../add-edit-todo/add-edit-todo.component';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { Router } from '@angular/router';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TodoItemComponent, AddEditTodoComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public todos: Todo[] = [];

  constructor(
    public todoService: TodoService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadTodos();
  }

  private async loadTodos(): Promise<void> {
    try {
      this.todos = await this.todoService.getTodos();
    } catch (error) {
      console.error('Error fetching todos', error);
    }
  }

  addTodo() {
    this.router.navigate(['add']);
  }
}
