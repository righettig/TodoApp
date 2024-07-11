"use client";

import React from 'react';

export type TodoItemProps = {
  id: number;
  title: string;
  description: string;
};

const TodoItem: React.FC<TodoItemProps> = ({ title, description }) => {
  return (
    <li className="collection-item">
      <div>
        <div>
          <span style={{ fontWeight: 500 }}>{title}</span>
          <a href="#!" className="secondary-content">
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
