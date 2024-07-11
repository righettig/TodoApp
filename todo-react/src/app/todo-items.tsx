"use client";

import React from 'react';
import TodoItem, { TodoItemProps } from './todo-item';

export type TodoItemsProps = {
  items: TodoItemProps[];
};

const TodoItems: React.FC<TodoItemsProps> = ({ items }) => {
  return (
    <ul id="todoList" className="collection">
      {items.map(item => (
        <TodoItem key={item.id} {...item} />
      ))}
    </ul>
  );
};

export default TodoItems;
