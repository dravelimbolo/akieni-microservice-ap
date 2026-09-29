// Port (interface) du dépôt de tâches.
// Principe d'inversion des dépendances (D de SOLID) : le domaine définit le contrat,
// l'infrastructure fournit l'implémentation (mémoire, base de données, etc.).
export class TodoRepository {
  /** @returns {Promise<import('./Todo.js').Todo[]>} */
  async findAll() {
    throw new Error('Méthode non implémentée : findAll');
  }

  /** @returns {Promise<import('./Todo.js').Todo | null>} */
  async findById(_id) {
    throw new Error('Méthode non implémentée : findById');
  }

  /** Crée ou met à jour une tâche. */
  async save(_todo) {
    throw new Error('Méthode non implémentée : save');
  }

  /** @returns {Promise<boolean>} true si la tâche a été supprimée */
  async delete(_id) {
    throw new Error('Méthode non implémentée : delete');
  }
}
