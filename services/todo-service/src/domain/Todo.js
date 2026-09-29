import { randomUUID } from 'node:crypto';
import { TodoTitle } from './TodoTitle.js';
import { ValidationError } from './DomainError.js';

// Entité (Aggregate Root DDD) : une tâche avec une identité propre.
// Elle protège ses invariants : on ne modifie son état que via ses méthodes métier.
export class Todo {
  #id;
  #title;
  #completed;
  #createdAt;
  #updatedAt;

  constructor({ id, title, completed, createdAt, updatedAt }) {
    this.#id = id;
    this.#title = title instanceof TodoTitle ? title : new TodoTitle(title);
    this.#completed = Boolean(completed);
    this.#createdAt = createdAt;
    this.#updatedAt = updatedAt;
  }

  // Fabrique : point d'entrée unique pour créer une nouvelle tâche.
  static create(title) {
    const now = new Date().toISOString();
    return new Todo({ id: randomUUID(), title, completed: false, createdAt: now, updatedAt: now });
  }

  get id() {
    return this.#id;
  }

  // Renomme la tâche (la validation est déléguée à l'objet-valeur).
  rename(title) {
    this.#title = new TodoTitle(title);
    this.#touch();
  }

  // Change l'état d'achèvement de la tâche.
  setCompleted(completed) {
    if (typeof completed !== 'boolean') {
      throw new ValidationError('Le champ "completed" doit être un booléen.');
    }
    this.#completed = completed;
    this.#touch();
  }

  // Met à jour la date de modification (DRY : utilisé par toutes les mutations).
  #touch() {
    this.#updatedAt = new Date().toISOString();
  }

  // Représentation sérialisable (utilisée par la persistance et l'API).
  toPrimitives() {
    return {
      id: this.#id,
      title: this.#title.value,
      completed: this.#completed,
      createdAt: this.#createdAt,
      updatedAt: this.#updatedAt,
    };
  }
}
