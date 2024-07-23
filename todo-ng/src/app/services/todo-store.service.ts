import { Injectable, Signal, signal } from '@angular/core';
import { TodoService } from './todo.service';
import { Todo } from '../models/todo.model';

@Injectable({
    providedIn: 'root'
})
export class TodoStoreService {
    private readonly _todos = signal<Todo[]>([]);

    constructor(private todoService: TodoService) {
        this.loadTodos();
    }

    get todos(): Signal<Todo[]> {
        return this._todos.asReadonly();
    }

    private async loadTodos() {
        try {
            const todos = await this.todoService.getTodos();
            this._todos.set(todos);
        } catch (error) {
            console.error('Error loading todos', error);
        }
    }

    async addTodo(todo: Todo) {
        try {
            const newTodo = await this.todoService.addTodo(todo);
            this._todos.update(todos => [...todos, newTodo]);
        } catch (error) {
            console.error('Error adding todo', error);
        }
    }

    async deleteTodo(id: string) {
        try {
            await this.todoService.deleteTodo(id);
            this._todos.update(todos => todos.filter(todo => todo.id !== id));
        } catch (error) {
            console.error('Error deleting todo', error);
        }
    }

    async updateTodo(updatedTodo: Todo) {
        try {
            const todo = await this.todoService.updateTodo(updatedTodo);
            this._todos.update(todos => todos.map(t => t.id === todo.id ? todo : t));
        } catch (error) {
            console.error('Error updating todo', error);
        }
    }
}
