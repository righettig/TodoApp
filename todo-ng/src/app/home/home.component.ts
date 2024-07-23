import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditTodoComponent } from '../add-edit-todo/add-edit-todo.component';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../models/todo.model';
import { TodoStoreService } from '../services/todo-store.service';

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
    private todoStoreService: TodoStoreService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(_ => {
      this.loadTodos();
    });
  }

  async loadTodos(): Promise<void> {
    try {
      this.todos = this.todoStoreService.todos();
    } catch (error) {
      console.error('Error fetching todos', error);
    }
  }

  addTodo() {
    this.router.navigate(['add']);
  }
}
