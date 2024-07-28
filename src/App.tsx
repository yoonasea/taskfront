import React, { useState, useEffect } from 'react';
import { Container, CssBaseline, Typography, Box } from '@mui/material';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { getTasks, createTask, updateTask, deleteTask } from './api';
import { Task } from './types';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

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

  const handleUpdate = async (id: string, updatedTask: Task) => {
    const task = await updateTask(id, updatedTask);
    setTasks(tasks.map(t => (t.id === id ? task : t)));
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleEdit = (task: Task) => {
    setCurrentTask(task);
  };

  const handleCancelEdit = () => {
    setCurrentTask(null);
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box sx={{ marginTop: 4, backgroundColor: 'background.default', padding: 2 }}>
        <Typography variant="h2" align="center" gutterBottom>
          Task Manager
        </Typography>
        <TaskForm 
          onCreate={handleCreate} 
          onUpdate={handleUpdate} 
          currentTask={currentTask} 
          onCancelEdit={handleCancelEdit} 
        />
        <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
      </Box>
    </Container>
  );
};

export default App;
