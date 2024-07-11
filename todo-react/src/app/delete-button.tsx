"use client";

import { OnDeleteFunction } from "./todo-item";

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

export default DeleteButton;
