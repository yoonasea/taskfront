import React from 'react';
import { List, ListItem, ListItemText, IconButton, Checkbox } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete }) => {
  return (
    <List>
      {tasks.map((task) => (
        <ListItem key={task.id} dense button>
          <Checkbox
            edge="start"
            checked={task.completed}
            tabIndex={-1}
            disableRipple
            onClick={() => onEdit({ ...task, completed: !task.completed })}
          />
          <ListItemText primary={task.title} secondary={task.description} />
          <IconButton edge="end" aria-label="edit" onClick={() => onEdit(task)}>
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
