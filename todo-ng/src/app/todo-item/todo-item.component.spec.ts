import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { TodoItemComponent } from './todo-item.component';
import { TodoStoreService } from '../services/todo-store.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;
  let todoStoreService: jasmine.SpyObj<TodoStoreService>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    const todoStoreServiceSpy = jasmine.createSpyObj('TodoStoreService', ['deleteTodo']);

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        TodoItemComponent  // Import standalone component here
      ],
      providers: [
        { provide: TodoStoreService, useValue: todoStoreServiceSpy },
      ],
    }).compileComponents();

    todoStoreService = TestBed.inject(TodoStoreService) as jasmine.SpyObj<TodoStoreService>;
    router = TestBed.inject(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    component.todo = { id: '1', title: 'Test Todo', description: 'Test Description' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call deleteTodo on TodoStoreService and emit onDelete event', async () => {
    const deleteTodoSpy = todoStoreService.deleteTodo.and.returnValue(Promise.resolve());
    spyOn(component.onDelete, 'emit');

    await component.deleteTodo();

    expect(deleteTodoSpy).toHaveBeenCalledWith('1');
    expect(component.onDelete.emit).toHaveBeenCalled();
  });

  it('should navigate to the edit page when editTodo is called', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.editTodo();

    expect(navigateSpy).toHaveBeenCalledWith(['/edit', '1']);
  });
});
