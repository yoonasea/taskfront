import { Task } from './types';

const API_URL = 'http://localhost:5000/api/tasks';

export const getTasks = async (): Promise<Task[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    alert('Failed to fetch tasks. Server is down.');
    return [];
  }
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
