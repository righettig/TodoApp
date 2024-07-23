import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeComponent } from './home.component';
import { TodoStoreService } from '../services/todo-store.service';
import { Todo } from '../models/todo.model';
import { CommonModule } from '@angular/common';
import { AddEditTodoComponent } from '../add-edit-todo/add-edit-todo.component';
import { TodoItemComponent } from '../todo-item/todo-item.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let todoStoreService: jasmine.SpyObj<TodoStoreService>;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(waitForAsync(() => {
    const todoStoreServiceSpy = jasmine.createSpyObj('TodoStoreService', ['todos']);

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule.withRoutes([]),
        HomeComponent,  // Include HomeComponent as a standalone component
        TodoItemComponent,
        AddEditTodoComponent
      ],
      providers: [
        { provide: TodoStoreService, useValue: todoStoreServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
          },
        },
      ],
    }).compileComponents();

    todoStoreService = TestBed.inject(TodoStoreService) as jasmine.SpyObj<TodoStoreService>;
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);

    // Set up a default return value for the todos method
    todoStoreService.todos.and.returnValue([]);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to route params on initialization', () => {
    spyOn(component, 'loadTodos');
    component.ngOnInit();
    expect(component.loadTodos).toHaveBeenCalled();
  });

  it('should load todos on loadTodos call', async () => {
    const mockTodos: Todo[] = [{ id: '1', title: 'Test Todo', description: 'description' }];
    todoStoreService.todos.and.returnValue(mockTodos);

    await component.loadTodos();

    expect(component.todos).toEqual(mockTodos);
  });

  it('should handle error on loadTodos failure', async () => {
    const consoleSpy = spyOn(console, 'error');
    todoStoreService.todos.and.throwError('Error fetching todos');

    await component.loadTodos();

    expect(consoleSpy).toHaveBeenCalledWith('Error fetching todos', jasmine.any(Error));
    expect(component.todos).toEqual([]);
  });

  it('should navigate to add-todo route on addTodo call', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.addTodo();
    expect(navigateSpy).toHaveBeenCalledWith(['add']);
  });
});
