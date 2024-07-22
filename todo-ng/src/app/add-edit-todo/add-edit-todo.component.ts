import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../services/todo.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-edit-todo.component.html',
  styleUrls: ['./add-edit-todo.component.scss']
})
export class AddEditTodoComponent implements OnInit {
  @Input() todo: { id: string, title: string, description: string } = { id: '', title: '', description: '' };
  
  public isEdit: boolean = false;

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        const existingTodo = this.todoService.getTodos().find(todo => todo.id === id);
        if (existingTodo) {
          this.todo = { ...existingTodo };
          this.isEdit = true;
        }
      }
    });
  }

  saveTodo() {
    if (this.isEdit) {
      this.todoService.updateTodo(this.todo);
    } else {
      this.todo.id = Math.random().toString(36).substr(2, 9); // Generate a simple id
      this.todoService.addTodo(this.todo);
    }
    this.router.navigate(['/']);
  }
}
