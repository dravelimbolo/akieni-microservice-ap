import { request } from './httpClient.js';

// Service d'accès à l'API des tâches : une seule responsabilité, parler au backend.
export const todoApi = {
  list: () => request('/todos'),
  create: (title) => request('/todos', { method: 'POST', body: { title } }),
  update: (id, changes) => request(`/todos/${id}`, { method: 'PATCH', body: changes }),
  remove: (id) => request(`/todos/${id}`, { method: 'DELETE' }),
};
