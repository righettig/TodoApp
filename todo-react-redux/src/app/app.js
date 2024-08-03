"use client";

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo } from './features/todos/todoSlice';

function App() {
    const [text, setText] = useState('');
    const todos = useSelector(state => state.todos.todos);
    const dispatch = useDispatch();

    const handleAddTodo = () => {
        if (text.trim()) {
            dispatch(addTodo(text));
            setText('');
        }
    };

    return (
        <div className="App">
            <h1>Todo List</h1>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add a new todo"
            />
            <button onClick={handleAddTodo}>Add Todo</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <span
                            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                            onClick={() => dispatch(toggleTodo(todo.id))}
                        >
                            {todo.text}
                        </span>
                        <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
