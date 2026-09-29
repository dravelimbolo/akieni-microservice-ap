import { useTodos } from './hooks/useTodos.js';
import { TodoForm } from './components/TodoForm.jsx';
import { TodoList } from './components/TodoList.jsx';

// Composant racine : assemble le hook métier et les composants visuels.
export default function App() {
  const { todos, loading, error, addTodo, updateTodo, deleteTodo } = useTodos();
  const remaining = todos.filter((t) => !t.completed).length;

  return (
    <main className="container">
      <h1>📝 Mes tâches</h1>
      <TodoForm onAdd={addTodo} />
      {error && <p className="error">{error}</p>}
      {loading ? (
        <p>Chargement…</p>
      ) : (
        <>
          <TodoList todos={todos} onUpdate={updateTodo} onDelete={deleteTodo} />
          <p className="counter">{remaining} tâche(s) restante(s)</p>
        </>
      )}
    </main>
  );
}
