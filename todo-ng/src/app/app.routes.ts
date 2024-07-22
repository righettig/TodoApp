import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddEditTodoComponent } from './add-edit-todo/add-edit-todo.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add', component: AddEditTodoComponent },
  { path: 'edit/:id', component: AddEditTodoComponent }
];
