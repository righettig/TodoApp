import React, { useState } from 'react';

interface AddTodoProps {
    onAdd: (title: string, description: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleAddItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim() && description.trim()) {
            onAdd(title, description);
            setTitle('');
            setDescription('');
        }
    };

    const isAddButtonDisabled = !title || !description;

    return (
        <form onSubmit={handleAddItem} className="add-todo-form">
            <div className="row">
                <div className="input-field col s4 offset-m1">
                    <input
                        id="todoTitle"
                        type="text"
                        className="validate"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <label htmlFor="todoTitle">Title</label>
                </div>
                <div className="input-field col s5">
                    <input
                        id="todoDescription"
                        type="text"
                        className="validate"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <label htmlFor="todoDescription">Description</label>
                </div>
                <div className="input-field col s1">
                    <button
                        type="submit"
                        className={`waves-effect waves-light btn ${isAddButtonDisabled ? 'disabled' : ''}`}
                        onClick={handleAddItem}
                        role="button"
                        aria-disabled={isAddButtonDisabled}
                        tabIndex={isAddButtonDisabled ? -1 : 0}>Add
                    </button>
                </div>
            </div>
        </form>
    );
};

export default AddTodo;
