import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  Box,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { Task } from "../types";

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string, task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onEdit,
  onDelete,
  onToggle,
}) => {
  const handleToggle = (task: Task) => {
    onToggle(task.id, { ...task, completed: !task.completed });
  };

  return (
    <List>
      {tasks.map((task) => (
        <ListItem
          key={task.id}
          dense
          button
          style={{
            backgroundColor: "#e0e0e0",
            marginBottom: "8px",
            borderRadius: "4px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Checkbox
            edge="start"
            checked={task.completed}
            tabIndex={-1}
            disableRipple
            onClick={() => handleToggle(task)}
          />
          <ListItemText primary={task.title} secondary={task.description} />
          <IconButton edge="end" aria-label="edit" onClick={() => onEdit(task)}>
            <EditIcon />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => onDelete(task.id)}
          >
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
