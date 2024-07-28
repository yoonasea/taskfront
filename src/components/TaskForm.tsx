import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { Task } from "../types";

interface TaskFormProps {
  onCreate: (task: Omit<Task, "id">) => void;
  onUpdate: (id: string, task: Task) => void;
  currentTask: Task | null;
  onCancelEdit: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
  onCreate,
  onUpdate,
  currentTask,
  onCancelEdit,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (currentTask) {
      setTitle(currentTask.title);
      setDescription(currentTask.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [currentTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === "" || description.trim() === "") {
      setError("Title and Description are required.");
      return;
    }
    if (currentTask) {
      onUpdate(currentTask.id, { ...currentTask, title, description });
      onCancelEdit(); // Add this line
    } else {
      onCreate({ title, description, completed: false });
    }
    setTitle("");
    setDescription("");
    setError("");
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setError("");
    onCancelEdit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={!!error}
          helperText={error}
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={!!error}
          helperText={error}
        />
        <Box display="flex" justifyContent="flex-end" gap={1}>
          <Button variant="contained" color="primary" type="submit">
            {currentTask ? "Update Task" : "Add Task"}
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default TaskForm;
