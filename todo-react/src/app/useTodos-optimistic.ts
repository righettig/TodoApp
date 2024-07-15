import { useState, useEffect, useCallback } from 'react';
import { TodoItemData } from './todo-item';
import { fetchTodoItems, addTodoItem, deleteTodoItem, editTodoItem } from './todos.service';

/*
    Optimistic UI updates can significantly improve the user experience by updating the UI immediately, 
    without waiting for the server response. 
    This technique assumes that the server request will succeed and updates the state accordingly. 
    If the request fails, the UI is reverted to its previous state.
 */
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

    /* 
        A temporary ID is generated for the new item.
        The new item is immediately added to the state.
        If the server request succeeds, the item in the state is updated with the response from the server.
        If the request fails, the item is removed from the state. 
     */
    const addTodo = useCallback(async (title: string, description: string) => {
        const tempId = new Date().getTime(); // Temporary ID for optimistic update
        const newItem: TodoItemData = { id: tempId, title, description };

        setItems((prevItems) => [...prevItems, newItem]);

        try {
            const addedItem = await addTodoItem(newItem);
            setItems((prevItems) => prevItems.map(item => item.id === tempId ? addedItem : item));
        } catch (error) {
            setError(error instanceof Error ? error.message : String(error));
            setItems((prevItems) => prevItems.filter(item => item.id !== tempId));
        }
    }, []);

    /* 
        The item is immediately removed from the state.
        If the server request fails, the state is reverted to its original state.
     */
    const deleteTodo = useCallback(async (id: number) => {
        const originalItems = items;
        setItems((prevItems) => prevItems.filter(item => item.id !== id));

        try {
            await deleteTodoItem(id);
        } catch (error) {
            setError(error instanceof Error ? error.message : String(error));
            setItems(originalItems);
        }
    }, [items]);

    /*
        The item is immediately updated in the state.
        If the server request fails, the state is reverted to its original state.
     */
    const editTodo = useCallback(async (id: number, title: string, description: string) => {
        const originalItems = items;
        setItems((prevItems) => prevItems.map(item => (item.id === id ? { ...item, title, description } : item)));

        try {
            await editTodoItem({ id, title, description });
        } catch (error) {
            setError(error instanceof Error ? error.message : String(error));
            setItems(originalItems);
        }
    }, [items]);

    return { items, loading, error, addTodo, deleteTodo, editTodo };
};
