import { Task } from './types';

const API_URL = 'http://localhost:5000/api/tasks';

export const getTasks = async (): Promise<Task[]> => {
  const response = await fetch(API_URL);
  return response.json();
};

export const createTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  return response.json();
};

export const updateTask = async (id: string, task: Task): Promise<Task> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  return response.json();
};

export const deleteTask = async (id: string): Promise<void> => {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
};
