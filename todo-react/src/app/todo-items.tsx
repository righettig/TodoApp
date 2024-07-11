"use client";

import React from 'react';
import TodoItem, { OnDeleteFunction, TodoItemData } from './todo-item';

type TodoItemsProps = {
  items: TodoItemData[];
  onDelete: OnDeleteFunction;
};

const TodoItems: React.FC<TodoItemsProps> = ({ items, onDelete }) => {
  return (
    <ul id="todoList" className="collection">
      {items.map(item => (
        <TodoItem key={item.id} {...item} onDelete={onDelete} />
      ))}
    </ul>
  );
};

export default TodoItems;
