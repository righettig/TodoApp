import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from '../models/todo.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'https://todoapp-gr.azurewebsites.net/api/todoitems';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  async getTodos(): Promise<Todo[]> {
    try {
      return await firstValueFrom(this.http.get<Todo[]>(this.apiUrl));
    } catch (error) {
      console.error('Error fetching todos', error);
      throw error;
    }
  }

  async addTodo(todo: Todo): Promise<Todo> {
    try {
      return await firstValueFrom(this.http.post<Todo>(this.apiUrl, todo, { headers: this.headers }));
    } catch (error) {
      console.error('Error adding todo', error);
      throw error;
    }
  }

  async deleteTodo(id: string): Promise<void> {
    const url = `${this.apiUrl}/${id}`;
    try {
      return await firstValueFrom(this.http.delete<void>(url, { headers: this.headers }));
    } catch (error) {
      console.error('Error deleting todo', error);
      throw error;
    }
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    const url = `${this.apiUrl}/${updatedTodo.id}`;
    try {
      return await firstValueFrom(this.http.put<Todo>(url, updatedTodo, { headers: this.headers }));
    } catch (error) {
      console.error('Error updating todo', error);
      throw error;
    }
  }
}
