import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../services/todo.service';
import { AddEditTodoComponent } from '../add-edit-todo/add-edit-todo.component';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TodoItemComponent, AddEditTodoComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(
    public todoService: TodoService,
    private router: Router) { }

  addTodo() {
    this.router.navigate(['add']);
  }
}
