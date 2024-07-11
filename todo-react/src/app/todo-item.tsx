"use client";

import React, { useState } from 'react';
import styles from './todo-item.module.css';
import EditTodoItem from './edit-todo-item';

// Define a type for the todo item data
export type TodoItemData = {
  id: number;
  title: string;
  description: string;
};

// Define a type for the onDelete and onEdit functions
export type OnDeleteFunction = (id: number) => void;
export type OnEditFunction = (id: number, title: string, description: string) => void;

// Define the combined props type for TodoItem
type TodoItemProps = TodoItemData & {
  onDelete: OnDeleteFunction;
  onEdit: OnEditFunction;
};

// Define the DeleteButton component
const DeleteButton: React.FC<{ id: number; onDelete: OnDeleteFunction }> = ({ id, onDelete }) => (
  <a
    href="#!"
    className="secondary-content"
    onClick={() => onDelete(id)}
  >
    <i className="material-icons">delete</i>
  </a>
);

// Define the EditButton component
const EditButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <a
    href="#!"
    className="secondary-content"
    onClick={onClick}
  >
    <i className="material-icons">edit</i>
  </a>
);

// Define the main TodoItem component
const TodoItem: React.FC<TodoItemProps> = ({ id, title, description, onDelete, onEdit }) => {
  // State to track whether the item is in edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Handler to save the changes
  const handleSave = (newTitle: string, newDescription: string) => {
    onEdit(id, newTitle, newDescription);
    setIsEditing(false);
  };

  // Handler to cancel editing
  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <li className="collection-item">
      <div>
        {isEditing ? (
          <EditTodoItem
            title={title}
            description={description}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ) : (
          <div>
            <div className={styles.header}>
              <span style={{ fontWeight: 500 }}>{title}</span>
              <div className={styles.actionButtons}>
                <DeleteButton id={id} onDelete={onDelete} />
                <EditButton onClick={() => setIsEditing(true)} />
              </div>
            </div>
            <div style={{ paddingTop: '10px' }}>
              <span>{description}</span>
            </div>
          </div>
        )}
      </div>
    </li>
  );
};

export default TodoItem;
