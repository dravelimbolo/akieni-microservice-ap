// Erreurs métier du domaine (indépendantes de HTTP).
// La couche interface se charge de les traduire en codes HTTP.

export class DomainError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

// Levée quand une règle métier est violée (ex : titre vide).
export class ValidationError extends DomainError {}

// Levée quand une tâche demandée n'existe pas.
export class TodoNotFoundError extends DomainError {
  constructor(id) {
    super(`Tâche introuvable : ${id}`);
  }
}
