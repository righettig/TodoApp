import React, { createContext, useState, ReactNode, useEffect } from 'react';

import { TodoItem } from '../models/todo-item';
import { fetchTodoItems, TodoItemData, addTodoItem, deleteTodoItem, editTodoItem } from '../services/todos.service';

export interface TodoContextType {
  items: TodoItem[];
  addTodo: (title: string, description: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, title: string, description: string) => void;
}

// Create a Context for the Todo
const TodoContext = createContext<TodoContextType | undefined>(undefined);

// Create a Provider component
const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items,   setItems]   = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  useEffect(() => {
      const loadTodoItems = async () => {
          try {
              const data = await fetchTodoItems();
              setItems(data);
          } catch (error) {
              setError(error instanceof Error ? error.message : String(error));
          } finally {
              setLoading(false);
          }
      };

      loadTodoItems();
  }, []);

  const addTodo = async (title: string, description: string) => {
      try {
          const newItem: TodoItemData = { id: '', title, description }; // id will be replaced by server
          const addedItem = await addTodoItem(newItem);
          setItems([...items, addedItem]);
      } catch (error) {
          setError(error instanceof Error ? error.message : String(error));
      }
  };

  const deleteTodo = async (id: string) => {
      try {
          await deleteTodoItem(id);
          setItems(items.filter(item => item.id !== id));
      } catch (error) {
          setError(error instanceof Error ? error.message : String(error));
      }
  };

  const editTodo = async (id: string, title: string, description: string) => {
      try {
          await editTodoItem({ id, title, description });
          setItems(items.map(item => (item.id === id ? { ...item, title, description } : item)));
      } catch (error) {
          setError(error instanceof Error ? error.message : String(error));
      }
  };

  return (
    <TodoContext.Provider value={{ items, addTodo, deleteTodo, editTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export { TodoContext, TodoProvider };
