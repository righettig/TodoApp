"use client";

import React, { useState } from 'react';
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
        <TodoItems items={items} onDelete={handleDeleteTodo} />
      )}
    </div>
  );
};

export default TodoApp;
