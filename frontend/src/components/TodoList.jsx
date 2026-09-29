import { TodoItem } from './TodoItem.jsx';

// Liste des tâches (composant de présentation).
export function TodoList({ todos, onUpdate, onDelete }) {
  if (todos.length === 0) return <p className="empty">Aucune tâche pour le moment.</p>;

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </ul>
  );
}
