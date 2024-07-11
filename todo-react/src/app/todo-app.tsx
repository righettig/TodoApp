"use client";

import React, { useState } from 'react';
import { TodoItemProps } from './todo-item';
import TodoItems from './todo-items';
import AddTodo from './add-todo';

const TodoApp: React.FC = () => {
  const [items, setItems] = useState<TodoItemProps[]>([
    {
      id: 1,
      title: "item 1",
      description: "description for item1"
    },
    {
      id: 2,
      title: "item 2",
      description: "description for item2"
    },
  ]);

  const handleAddTodo = (title: string, description: string) => {
    const newItem: TodoItemProps = {
      id: items.length + 1,
      title,
      description
    };
    setItems([...items, newItem]);
  };

  return (
    <div className="container">
      <h1 className="center-align">Todo List</h1>
      <AddTodo onAdd={handleAddTodo} />
      <TodoItems items={items} />
    </div>
  );
};

export default TodoApp;
