import { useCallback, useEffect, useState } from 'react';
import { todoApi } from '../api/todoApi.js';

// Hook personnalisé : encapsule l'état et la logique des tâches.
// Les composants restent purement visuels (séparation des responsabilités).
export function useTodos(api = todoApi) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Exécute une action en gérant l'erreur de façon uniforme (DRY).
  const run = useCallback(async (action) => {
    setError(null);
    try {
      return await action();
    } catch (err) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    run(async () => setTodos(await api.list())).finally(() => setLoading(false));
  }, [api, run]);

  const addTodo = (title) =>
    run(async () => {
      const created = await api.create(title);
      setTodos((prev) => [...prev, created]);
    });

  const updateTodo = (id, changes) =>
    run(async () => {
      const updated = await api.update(id, changes);
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    });

  const deleteTodo = (id) =>
    run(async () => {
      await api.remove(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    });

  return { todos, loading, error, addTodo, updateTodo, deleteTodo };
}
