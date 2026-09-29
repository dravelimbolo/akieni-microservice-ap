import { Todo } from '../domain/Todo.js';
import { TodoNotFoundError } from '../domain/DomainError.js';

// Couche application : chaque classe = un cas d'utilisation (S de SOLID, responsabilité unique).
// Les dépendances (dépôt) sont injectées par le constructeur (D de SOLID).

// Classe de base partagée : évite de dupliquer la recherche + l'erreur 404 (DRY).
class TodoUseCase {
  constructor(todoRepository) {
    this.todoRepository = todoRepository;
  }

  async getExistingTodo(id) {
    const todo = await this.todoRepository.findById(id);
    if (!todo) throw new TodoNotFoundError(id);
    return todo;
  }
}

// Lister toutes les tâches.
export class ListTodos extends TodoUseCase {
  async execute() {
    const todos = await this.todoRepository.findAll();
    return todos.map((todo) => todo.toPrimitives());
  }
}

// Récupérer une tâche par son identifiant.
export class GetTodo extends TodoUseCase {
  async execute(id) {
    const todo = await this.getExistingTodo(id);
    return todo.toPrimitives();
  }
}

// Créer une nouvelle tâche.
export class CreateTodo extends TodoUseCase {
  async execute({ title }) {
    const todo = Todo.create(title);
    await this.todoRepository.save(todo);
    return todo.toPrimitives();
  }
}

// Mettre à jour partiellement une tâche (titre et/ou état).
export class UpdateTodo extends TodoUseCase {
  async execute(id, { title, completed }) {
    const todo = await this.getExistingTodo(id);
    if (title !== undefined) todo.rename(title);
    if (completed !== undefined) todo.setCompleted(completed);
    await this.todoRepository.save(todo);
    return todo.toPrimitives();
  }
}

// Supprimer une tâche.
export class DeleteTodo extends TodoUseCase {
  async execute(id) {
    const deleted = await this.todoRepository.delete(id);
    if (!deleted) throw new TodoNotFoundError(id);
  }
}
