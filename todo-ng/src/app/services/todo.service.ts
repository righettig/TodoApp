import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';

@Injectable({
    providedIn: 'root'
})
export class TodoService {
    private todos: Todo[] = [
        {
            id: '1',
            title: 'todo1',
            description: 'this is the first todo'
        },
        {
            id: '2',
            title: 'todo2',
            description: 'this is the second todo'
        }
    ];

    getTodos() {
        return this.todos;
    }

    addTodo(todo: Todo) {
        this.todos.push(todo);
    }

    deleteTodo(id: string) {
        this.todos = this.todos.filter(todo => todo.id !== id);
    }

    updateTodo(updatedTodo: Todo) {
        const index = this.todos.findIndex(todo => todo.id === updatedTodo.id);
        if (index !== -1) {
            this.todos[index] = updatedTodo;
        }
    }
}
