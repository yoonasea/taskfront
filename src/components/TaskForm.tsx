import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Alert } from '@mui/material';
import { Task } from '../types';

interface TaskFormProps {
  onCreate: (task: Omit<Task, 'id'>) => void;
  onUpdate: (id: string, task: Task) => void;
  currentTask: Task | null;
  onCancelEdit: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onCreate, onUpdate, currentTask, onCancelEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (currentTask) {
      setTitle(currentTask.title);
      setDescription(currentTask.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [currentTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === '' || description.trim() === '') {
      setError('Title and Description are required.');
      return;
    }
    if (currentTask) {
      onUpdate(currentTask.id, { ...currentTask, title, description });
      onCancelEdit();
    } else {
      onCreate({ title, description, completed: false });
    }
    setTitle('');
    setDescription('');
    setError('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 2 }}>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label="Title"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        required
      />
      <TextField
        label="Description"
        variant="outlined"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        required
      />
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button type="submit" variant="contained" color="primary">
          {currentTask ? 'Update Task' : 'Add Task'}
        </Button>
        {currentTask && (
          <Button variant="outlined" color="secondary" onClick={onCancelEdit}>
            Cancel
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default TaskForm;
