"use client";

import React, { useState } from 'react';
import { TodoItemProps } from './todo-item';
import TodoItems from './todo-items';

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
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddItem = () => {
    const newItem: TodoItemProps = {
      id: items.length + 1,
      title,
      description
    };
    setItems([...items, newItem]);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="container">
      <h1 className="center-align">Todo List</h1>
      <div className="row">
        <div className="input-field col s4 offset-m1">
          <input id="todoTitle" type="text" className="validate"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="todoTitle">Title</label>
        </div>
        <div className="input-field col s5">
          <input id="todoDescription" type="text" className="validate"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label htmlFor="todoDescription">Description</label>
        </div>
        <div className="input-field col s1">
          <a id="addButton" className="waves-effect waves-light btn" onClick={handleAddItem}>Add</a>
        </div>
      </div>
      <TodoItems items={items} />
    </div>
  );
};

export default TodoApp;
