import { Router } from 'express';

// Enveloppe générique pour les handlers async : transmet les erreurs au middleware (DRY,
// évite un try/catch dans chaque méthode du contrôleur).
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// Déclare les routes CRUD et les relie au contrôleur.
export function createTodoRouter(controller) {
  const router = Router();
  router.get('/', asyncHandler(controller.list));
  router.get('/:id', asyncHandler(controller.get));
  router.post('/', asyncHandler(controller.create));
  router.patch('/:id', asyncHandler(controller.update));
  router.delete('/:id', asyncHandler(controller.remove));
  return router;
}
