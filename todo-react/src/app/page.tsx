"use client";

import React, { useState } from 'react';

type TodoItemProps = {
  id: number;
  title: string;
  description: string;
};

const TodoItem: React.FC<TodoItemProps> = ({ title, description }) => {
  return (
    <li>
      <div>{title}</div>
      <div>{description}</div>
    </li>
  );
};

type TodoItemsProps = {
  items: TodoItemProps[];
};

const TodoItems: React.FC<TodoItemsProps> = ({ items }) => {
  return (
    <ul>
      {items.map(item => (
        <TodoItem key={item.id} {...item} />
      ))}
    </ul>
  );
};

// rename to TodoApp, move to a separate component
const Home: React.FC = () => {
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
    <div>
      <div>
        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          value={description}
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleAddItem}>Add Item</button>
      </div>
      <TodoItems items={items} />
    </div>
  );
};

export default Home;
