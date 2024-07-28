import React, { useState, useEffect } from 'react';
import { Container, CssBaseline, Typography, Box } from '@mui/material';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { getTasks, createTask, updateTask, deleteTask } from './api';
import { Task } from './types';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const handleCreate = async (task: Omit<Task, 'id'>) => {
    const newTask = await createTask(task);
    setTasks([...tasks, newTask]);
  };

  const handleUpdate = async (id: string, updatedTask: Omit<Task, 'id'>) => {
    const task = await updateTask(id, { ...updatedTask, id });
    setTasks(tasks.map(t => (t.id === id ? task : t)));
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h2" align="center" gutterBottom>
          Task Manager
        </Typography>
        <TaskForm onCreate={handleCreate} />
        <TaskList tasks={tasks} onUpdate={handleUpdate} onDelete={handleDelete} />
      </Box>
    </Container>
  );
};

export default App;
