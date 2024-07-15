import { useState, useCallback } from 'react';
import { TodoItemData } from './todo-item';

export const useTodos = () => {
    const [items,   setItems]   = useState<TodoItemData[]>([]);
    const [loading, _]          = useState(false);
    const [error,   setError]   = useState<string | null>(null);

    const addTodo = useCallback((title: string, description: string) => {
        try {
            const newItem: TodoItemData = {
                id: new Date().getTime(), // Using timestamp as a unique ID
                title,
                description,
            };
            setItems((prevItems) => [...prevItems, newItem]);
        } catch (error) {
            setError(error instanceof Error ? error.message : String(error));
        }
    }, []);

    const deleteTodo = useCallback((id: number) => {
        try {
            setItems((prevItems) => prevItems.filter(item => item.id !== id));
        } catch (error) {
            setError(error instanceof Error ? error.message : String(error));
        }
    }, []);

    const editTodo = useCallback((id: number, title: string, description: string) => {
        try {
            setItems((prevItems) => prevItems.map(item => (item.id === id ? { ...item, title, description } : item)));
        } catch (error) {
            setError(error instanceof Error ? error.message : String(error));
        }
    }, []);

    return { items, loading, error, addTodo, deleteTodo, editTodo };
};
