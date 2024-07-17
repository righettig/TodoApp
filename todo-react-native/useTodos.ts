import { useState, useEffect } from 'react';
import { TodoItem } from './App';

const useTodos = () => {
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);

  useEffect(() => {
    //fetch('https://58d1-146-241-236-59.ngrok-free.app/api/TodoItems')
    fetch('https://localhost:7033/api/TodoItems') // this works only when connecting the web emulator
      .then(response => response.json())
      .then(data => setTodoItems(data))
      .catch(error => console.error('Error fetching todo items:', error));
  }, []);

  return { todoItems, setTodoItems };
};

export default useTodos;
