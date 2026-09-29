import { useState } from 'react';

// Formulaire d'ajout d'une tâche.
export function TodoForm({ onAdd }) {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await onAdd(title);
    setTitle('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nouvelle tâche…"
        maxLength={200}
      />
      <button type="submit">Ajouter</button>
    </form>
  );
}
