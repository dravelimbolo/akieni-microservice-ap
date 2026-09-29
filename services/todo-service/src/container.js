import { InMemoryTodoRepository } from './infrastructure/InMemoryTodoRepository.js';
import { ListTodos, GetTodo, CreateTodo, UpdateTodo, DeleteTodo } from './application/TodoUseCases.js';
import { TodoController } from './interfaces/http/TodoController.js';

// Racine de composition : le SEUL endroit où l'on assemble les dépendances concrètes.
// Pour changer de base de données, il suffit de remplacer le dépôt ici.
export function buildContainer() {
  const todoRepository = new InMemoryTodoRepository();

  const todoController = new TodoController({
    listTodos: new ListTodos(todoRepository),
    getTodo: new GetTodo(todoRepository),
    createTodo: new CreateTodo(todoRepository),
    updateTodo: new UpdateTodo(todoRepository),
    deleteTodo: new DeleteTodo(todoRepository),
  });

  return { todoController };
}
