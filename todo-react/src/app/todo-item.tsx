"use client";

import React, { useState } from 'react';

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

const TodoItem: React.FC<TodoItemProps> = ({ id, title, description, onDelete, onEdit }) => {
  // State to track whether the item is in edit mode
  const [isEditing, setIsEditing] = useState(false);

  // State to manage the input values
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  // Handlers for input changes
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewDescription(e.target.value);
  };

  // Handler to save the changes
  const handleSave = () => {
    onEdit(id, newTitle, newDescription);
    setIsEditing(false);
  };

  // Handler to cancel editing
  const handleCancel = () => {
    setNewTitle(title);
    setNewDescription(description);
    setIsEditing(false);
  };

  return (
    <li className="collection-item">
      <div>
        {isEditing ? (
          <div>
            <input
              type="text"
              value={newTitle}
              onChange={handleTitleChange}
              style={{ fontWeight: 500 }}
            />
            <textarea
              value={newDescription}
              onChange={handleDescriptionChange}
              style={{ paddingTop: '10px' }}
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <div>
            <div>
              <span style={{ fontWeight: 500 }}>{title}</span>
              <a href="#!" className="secondary-content" onClick={() => onDelete(id)}>
                <i className="material-icons">delete</i>
              </a>
              <a href="#!" className="secondary-content" onClick={() => setIsEditing(true)}>
                <i className="material-icons">edit</i>
              </a>
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
