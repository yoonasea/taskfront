import React, { useState } from 'react';
import { TextField, Button, Box, Alert } from '@mui/material';
import { Task } from '../types';

interface TaskFormProps {
  onCreate: (task: Omit<Task, 'id'>) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === '' || description.trim() === '') {
      setError('Title and Description are required.');
      return;
    }
    onCreate({ title, description, completed: false });
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
      <Button type="submit" variant="contained" color="primary">
        Add Task
      </Button>
    </Box>
  );
};

export default TaskForm;
