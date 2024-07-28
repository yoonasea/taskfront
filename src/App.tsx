import React, { useState, useEffect } from "react";
import {
  Container,
  CssBaseline,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import { getTasks, createTask, updateTask, deleteTask } from "./api";
import { Task } from "./types";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [isTaskFormOpen, setTaskFormOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const handleCreate = async (task: Omit<Task, "id">) => {
    const newTask = await createTask(task);
    setTasks([...tasks, newTask]);
    setTaskFormOpen(false);
  };

  const handleUpdate = async (id: string, updatedTask: Task) => {
    const task = await updateTask(id, updatedTask);
    setTasks(tasks.map((t) => (t.id === id ? task : t)));
    setTaskFormOpen(false);
  };

  const handleDelete = async () => {
    if (taskToDelete) {
      await deleteTask(taskToDelete);
      setTasks(tasks.filter((t) => t.id !== taskToDelete));
      setDeleteDialogOpen(false);
    }
  };

  const handleEdit = (task: Task) => {
    setCurrentTask(task);
    setTaskFormOpen(true);
  };

  const handleAddNew = () => {
    setCurrentTask(null);
    setTaskFormOpen(true);
  };

  const handleCancelEdit = () => {
    setCurrentTask(null);
    setTaskFormOpen(false);
  };

  const handleToggle = async (id: string, task: Task) => {
    const updatedTask = await updateTask(id, task);
    setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));
  };

  const handleDeleteClick = (id: string) => {
    setTaskToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setTaskToDelete(null);
    setDeleteDialogOpen(false);
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        sx={{ marginTop: 4, backgroundColor: "background.default", padding: 2 }}
      >
        <Typography variant="h2" align="center" gutterBottom>
          Task Manager
        </Typography>
        <Button variant="contained" color="primary" onClick={handleAddNew}>
          Add Task
        </Button>
        <TaskList
          tasks={tasks}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
          onToggle={handleToggle}
        />
      </Box>

      <Dialog open={isTaskFormOpen} onClose={handleCancelEdit}>
        <DialogTitle>{currentTask ? "Edit Task" : "Add Task"}</DialogTitle>
        <DialogContent>
          <TaskForm
            onCreate={handleCreate}
            onUpdate={handleUpdate}
            currentTask={currentTask}
            onCancelEdit={handleCancelEdit}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDeleteCancel}
            variant="outlined"
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="contained" color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default App;
