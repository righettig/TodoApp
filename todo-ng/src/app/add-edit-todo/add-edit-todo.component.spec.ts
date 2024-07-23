import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AddEditTodoComponent } from './add-edit-todo.component';
import { TodoStoreService } from '../services/todo-store.service';
import { Todo } from '../models/todo.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('AddEditTodoComponent', () => {
  let component: AddEditTodoComponent;
  let fixture: ComponentFixture<AddEditTodoComponent>;
  let todoStoreService: jasmine.SpyObj<TodoStoreService>;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(waitForAsync(() => {
    const todoStoreServiceSpy = jasmine.createSpyObj('TodoStoreService', ['todos', 'updateTodo', 'addTodo']);

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        RouterTestingModule.withRoutes([]),
        AddEditTodoComponent  // Import standalone component
      ],
      providers: [
        { provide: TodoStoreService, useValue: todoStoreServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(new Map([['id', '1']])),
          },
        },
      ],
    }).compileComponents();

    todoStoreService = TestBed.inject(TodoStoreService) as jasmine.SpyObj<TodoStoreService>;
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadTodo on initialization', () => {
    spyOn(component, 'loadTodo').and.callThrough();
    component.ngOnInit();
    expect(component.loadTodo).toHaveBeenCalled();
  });

  it('should load existing todo if id is provided', async () => {
    const mockTodo: Todo = { id: '1', title: 'Test Todo', description: 'Test Description' };
    todoStoreService.todos.and.returnValue([mockTodo]);

    await component.loadTodo();

    expect(component.todo).toEqual(mockTodo);
    expect(component.isEdit).toBeTrue();
  });

  it('should handle error while loading todo', async () => {
    const consoleSpy = spyOn(console, 'error');
    todoStoreService.todos.and.throwError('Error fetching todos');

    await component.loadTodo();

    expect(consoleSpy).toHaveBeenCalledWith('Error fetching todos', jasmine.any(Error));
    expect(component.todo).toEqual({ id: '', title: '', description: '' });
    expect(component.isEdit).toBeFalse();
  });

  // it('should save a new todo', async () => {
  //   spyOn(Math, 'random').and.returnValue(0.123456);  // Mocking random ID generation
  //   const addTodoSpy = spyOn(todoStoreService, 'addTodo').and.returnValue(Promise.resolve());

  //   component.todo = { id: '', title: 'New Todo', description: 'New Description' };
  //   await component.saveTodo();

  //   expect(addTodoSpy).toHaveBeenCalledWith(component.todo);
  //   expect(router.navigate).toHaveBeenCalledWith(['/']);
  // });

  // it('should update an existing todo', async () => {
  //   const updateTodoSpy = spyOn(todoStoreService, 'updateTodo').and.returnValue(Promise.resolve());

  //   component.isEdit = true;
  //   component.todo = { id: '1', title: 'Updated Todo', description: 'Updated Description' };
  //   await component.saveTodo();

  //   expect(updateTodoSpy).toHaveBeenCalledWith(component.todo);
  //   expect(router.navigate).toHaveBeenCalledWith(['/']);
  // });
});
