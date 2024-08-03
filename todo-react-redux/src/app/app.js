"use client";

import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo, fetchTodos  } from './features/todos/todoSlice';

function App() {
    const [text, setText] = useState('');

    const dispatch = useDispatch();

    const todos = useSelector(state => state.todos.todos);
    const status = useSelector(state => state.todos.status);
    const error = useSelector(state => state.todos.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchTodos());
        }
    }, [status, dispatch]);

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

            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p>{error}</p>}

            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <span
                            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                            onClick={() => dispatch(toggleTodo(todo.id))}
                        >
                            {todo.title}
                        </span>
                        <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
