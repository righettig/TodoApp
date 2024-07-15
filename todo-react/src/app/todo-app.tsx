"use client";

import React, { useEffect, useState } from 'react';
import { TodoItemData } from './todo-item';
import TodoItems from './todo-items';
import AddTodo from './add-todo';

const TodoApp: React.FC = () => {
  const [items, setItems] = useState<TodoItemData[]>([
    // {
    //   id: 1,
    //   title: "item 1",
    //   description: "description for item1"
    // },
    // {
    //   id: 2,
    //   title: "item 2",
    //   description: "description for item2"
    // },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodoItems = async () => {
      try {
        const response = await fetch('https://localhost:7033/api/todoitems');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: TodoItemData[] = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching todo items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodoItems();
  }, []);

  const handleAddTodo = (title: string, description: string) => {
    const newItem: TodoItemData = {
      id: items.length + 1,
      title,
      description
    };
    setItems([...items, newItem]);
  };

  const handleDeleteTodo = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleEditTodo = (id: number, title: string, description: string) => {
    setItems(
      items.map(item =>
        (item.id === id ?
          { ...item, title, description } : item)));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1 className="center-align">Todo List</h1>
      <AddTodo onAdd={handleAddTodo} />
      {items.length === 0 ? (
        <div className="row">
          <div className="col s12 center-align">
            <p className="flow-text">No todos left. Add a new one!</p>
          </div>
        </div>
      ) : (
        <TodoItems items={items} onDelete={handleDeleteTodo} onEdit={handleEditTodo} />
      )}
    </div>
  );
};

export default TodoApp;
