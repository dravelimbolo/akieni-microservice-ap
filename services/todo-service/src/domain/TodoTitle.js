import { ValidationError } from './DomainError.js';

// Objet-valeur (Value Object DDD) : un titre est immuable et toujours valide.
// Toute la logique de validation du titre est centralisée ici (DRY).
export class TodoTitle {
  static MAX_LENGTH = 200;

  #value;

  constructor(raw) {
    const value = typeof raw === 'string' ? raw.trim() : '';
    if (!value) {
      throw new ValidationError('Le titre est obligatoire.');
    }
    if (value.length > TodoTitle.MAX_LENGTH) {
      throw new ValidationError(`Le titre ne doit pas dépasser ${TodoTitle.MAX_LENGTH} caractères.`);
    }
    this.#value = value;
    Object.freeze(this);
  }

  get value() {
    return this.#value;
  }
}
