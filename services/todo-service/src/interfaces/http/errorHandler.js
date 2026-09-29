import { ValidationError, TodoNotFoundError } from '../../domain/DomainError.js';

// Correspondance erreur métier -> code HTTP.
// Pour ajouter un nouveau type d'erreur, on étend cette table sans modifier la logique (O de SOLID).
const STATUS_BY_ERROR = new Map([
  [ValidationError, 400],
  [TodoNotFoundError, 404],
]);

// Middleware Express centralisé de gestion des erreurs.
export function errorHandler(err, _req, res, _next) {
  for (const [ErrorType, status] of STATUS_BY_ERROR) {
    if (err instanceof ErrorType) {
      return res.status(status).json({ error: err.message });
    }
  }
  console.error(err);
  res.status(500).json({ error: 'Erreur interne du serveur.' });
}
