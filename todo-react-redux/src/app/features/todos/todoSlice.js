import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    todos: [],
    status: 'idle',
    error: null,
};

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
    return response.json();
});

export const deleteTodoAsync = createAsyncThunk('todos/deleteTodo', async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE',
    });
    return id;
});

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos.push({ id: Date.now(), text: action.payload, completed: false });
        },
        toggleTodo: (state, action) => {
            const todo = state.todos.find(todo => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.todos = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteTodoAsync.fulfilled, (state, action) => {
                state.todos = state.todos.filter(todo => todo.id !== action.payload);
            });
    },
});

export const { addTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;
