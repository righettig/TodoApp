"use client";

import React from 'react';
import TodoItem, { OnDeleteFunction, OnEditFunction, TodoItemData } from './todo-item';

type TodoItemsProps = {
  items: TodoItemData[];
  onDelete: OnDeleteFunction;
  onEdit: OnEditFunction;
};

const TodoItems: React.FC<TodoItemsProps> = ({ items, onDelete, onEdit }) => {
  return (
    <ul id="todoList" className="collection">
      {items.map(item => (
        <TodoItem key={item.id} {...item} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </ul>
  );
};

export default TodoItems;
