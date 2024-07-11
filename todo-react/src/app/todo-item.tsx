"use client";

import React from 'react';

// Define a type for the todo item data
export type TodoItemData = {
  id: number;
  title: string;
  description: string;
};

// Define a type for the onDelete function
export type OnDeleteFunction = (id: number) => void;

// Define the combined props type for TodoItem
type TodoItemProps = TodoItemData & {
  onDelete: OnDeleteFunction;
};

const TodoItem: React.FC<TodoItemProps> = ({ id, title, description, onDelete }) => {
  return (
    <li className="collection-item">
      <div>
        <div>
          <span style={{ fontWeight: 500 }}>{title}</span>
          <a href="#!" className="secondary-content" onClick={() => onDelete(id)}>
            <i className="material-icons">delete</i>
          </a>
        </div>
        <div style={{ paddingTop: '10px' }}>
          <span>{description}</span>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
