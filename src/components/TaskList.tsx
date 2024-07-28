import React from 'react';
import { List, ListItem, ListItemText, IconButton, Checkbox } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  onUpdate: (id: string, updatedTask: Omit<Task, 'id'>) => void;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onUpdate, onDelete }) => {
  const handleToggle = (task: Task) => {
    onUpdate(task.id, { ...task, completed: !task.completed });
  };

  return (
    <List>
      {tasks.map((task) => (
        <ListItem key={task.id} dense button>
          <Checkbox
            edge="start"
            checked={task.completed}
            tabIndex={-1}
            disableRipple
            onClick={() => handleToggle(task)}
          />
          <ListItemText primary={task.title} secondary={task.description} />
          <IconButton edge="end" aria-label="edit">
            <EditIcon />
          </IconButton>
          <IconButton edge="end" aria-label="delete" onClick={() => onDelete(task.id)}>
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
