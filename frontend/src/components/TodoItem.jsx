import { useState } from 'react';

// Affiche une tâche : cocher, renommer (double-clic) et supprimer.
export function TodoItem({ todo, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.title);

  // Valide la modification du titre.
  const commit = () => {
    setEditing(false);
    const title = draft.trim();
    if (title && title !== todo.title) onUpdate(todo.id, { title });
    else setDraft(todo.title);
  };

  return (
    <li className={`todo-item ${todo.completed ? 'done' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onUpdate(todo.id, { completed: !todo.completed })}
      />
      {editing ? (
        <input
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => e.key === 'Enter' && commit()}
        />
      ) : (
        <span onDoubleClick={() => setEditing(true)} title="Double-cliquer pour modifier">
          {todo.title}
        </span>
      )}
      <button className="delete" onClick={() => onDelete(todo.id)} aria-label="Supprimer">
        ✕
      </button>
    </li>
  );
}
