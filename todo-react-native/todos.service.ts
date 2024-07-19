import { TodoItem } from "./TodoItem";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;
const API_BASE_URL = `${apiUrl}/api/todoitems`;

// Define a type for the todo item data
export type TodoItemData = {
    id: string;
    title: string;
    description: string;
};

export const addTodoItem = async (item: TodoItemData): Promise<TodoItemData> => {
    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};

export const deleteTodoItem = async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
};

export const editTodoItem = async (item: TodoItem): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/${item.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
};
