import { useState, useEffect } from 'react';
import { TodoItemData } from './todo-item';
import { fetchTodoItems, addTodoItem, deleteTodoItem, editTodoItem } from './todos.service';

export const useTodos = () => {
    const [items,   setItems]   = useState<TodoItemData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error,   setError]   = useState<string | null>(null);

    useEffect(() => {
        const loadTodoItems = async () => {
            try {
                const data = await fetchTodoItems();
                setItems(data);
            } catch (error) {
                setError(error instanceof Error ? error.message : String(error));
            } finally {
                setLoading(false);
            }
        };

        loadTodoItems();
    }, []);

    const addTodo = async (title: string, description: string) => {
        try {
            const newItem: TodoItemData = { id: 0, title, description }; // id will be replaced by server
            const addedItem = await addTodoItem(newItem);
            setItems([...items, addedItem]);
        } catch (error) {
            setError(error instanceof Error ? error.message : String(error));
        }
    };

    const deleteTodo = async (id: number) => {
        try {
            await deleteTodoItem(id);
            setItems(items.filter(item => item.id !== id));
        } catch (error) {
            setError(error instanceof Error ? error.message : String(error));
        }
    };

    const editTodo = async (id: number, title: string, description: string) => {
        try {
            await editTodoItem({ id, title, description });
            setItems(items.map(item => (item.id === id ? { ...item, title, description } : item)));
        } catch (error) {
            setError(error instanceof Error ? error.message : String(error));
        }
    };

    return { items, loading, error, addTodo, deleteTodo, editTodo };
};
