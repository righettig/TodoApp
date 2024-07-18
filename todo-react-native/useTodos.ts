import { useState, useEffect } from 'react';
import { TodoItem } from './App';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const useTodos = () => {
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);

  useEffect(() => {
    fetch(`${apiUrl}/api/TodoItems`)
      .then(response => response.json())
      .then(data => setTodoItems(data))
      .catch(error => console.error('Error fetching todo items:', error));
  }, []);

  return { todoItems, setTodoItems };
};

export default useTodos;
