"use client";

import React, { useCallback } from 'react';
import TodoItems from './todo-items';
import AddTodo from './add-todo';

import { useTodos } from './useTodos-optimistic';

const TodoApp: React.FC = () => {
  const { items, loading, error, addTodo, deleteTodo, editTodo } = useTodos();

  const handleAddTodo = useCallback((title: string, description: string) => {
    addTodo(title, description);
  }, [addTodo]);

  const handleDeleteTodo = useCallback((id: number) => {
    deleteTodo(id);
  }, [deleteTodo]);

  const handleEditTodo = useCallback((id: number, title: string, description: string) => {
    editTodo(id, title, description);
  }, [editTodo]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <h1 className="center-align">Todo List</h1>
      <AddTodo onAdd={handleAddTodo} />
      {items.length === 0 ? (
        <div className="row">
          <div className="col s12 center-align">
            <p className="flow-text">No todos left. Add a new one!</p>
          </div>
        </div>
      ) : (
        <TodoItems items={items} onDelete={handleDeleteTodo} onEdit={handleEditTodo} />
      )}
    </div>
  );
};

export default TodoApp;
