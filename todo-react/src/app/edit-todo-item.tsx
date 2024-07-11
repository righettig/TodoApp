"use client";

import React, { useState } from 'react';

interface EditTodoItemProps {
    title: string;
    description: string;
    onSave: (title: string, description: string) => void;
    onCancel: () => void;
}

const EditTodoItem: React.FC<EditTodoItemProps> = ({ title, description, onSave, onCancel }) => {
    // State to manage the input values
    const [newTitle, setNewTitle] = useState(title);
    const [newDescription, setNewDescription] = useState(description);

    // Handlers for input changes
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.target.value);
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewDescription(e.target.value);
    };

    const handleSave = () => {
        onSave(newTitle, newDescription);
    }

    return (
        <div>
            <input
                type="text"
                value={newTitle}
                onChange={handleTitleChange}
                style={{ fontWeight: 500, marginBottom: '10px' }}
            />
            <textarea
                value={newDescription}
                onChange={handleDescriptionChange}
                style={{ paddingTop: '10px', width: '100%', minHeight: '100px' }}
            />
            <div style={{ marginTop: '4px' }}>
                <button onClick={handleSave} style={{ marginRight: '10px' }}>Save</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default EditTodoItem;
