import { TodoItemData } from './todo-item';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const API_BASE_URL = `${apiUrl}/api/todoitems`;

export const fetchTodoItems = async (): Promise<TodoItemData[]> => {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
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

export const deleteTodoItem = async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
};

export const editTodoItem = async (item: TodoItemData): Promise<void> => {
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
