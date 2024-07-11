"use client";

import React from 'react';

export type TodoItemProps = {
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

export default TodoItem;
