import { TodoRepository } from '../domain/TodoRepository.js';
import { Todo } from '../domain/Todo.js';

// Adaptateur de persistance en mémoire.
// Substituable par n'importe quelle autre implémentation (L de SOLID, Liskov),
// par exemple un MongoTodoRepository, sans toucher au domaine ni aux cas d'utilisation.
export class InMemoryTodoRepository extends TodoRepository {
  // On stocke des primitives pour éviter toute fuite de référence vers l'entité.
  #store = new Map();

  async findAll() {
    return [...this.#store.values()].map((data) => new Todo(data));
  }

  async findById(id) {
    const data = this.#store.get(id);
    return data ? new Todo(data) : null;
  }

  async save(todo) {
    const data = todo.toPrimitives();
    this.#store.set(data.id, data);
  }

  async delete(id) {
    return this.#store.delete(id);
  }
}
