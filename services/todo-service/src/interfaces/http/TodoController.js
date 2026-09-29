// Contrôleur HTTP : traduit les requêtes HTTP en appels de cas d'utilisation.
// Il ne contient aucune logique métier (séparation des responsabilités).
export class TodoController {
  constructor({ listTodos, getTodo, createTodo, updateTodo, deleteTodo }) {
    this.listTodos = listTodos;
    this.getTodo = getTodo;
    this.createTodo = createTodo;
    this.updateTodo = updateTodo;
    this.deleteTodo = deleteTodo;
  }

  list = async (_req, res) => {
    res.json(await this.listTodos.execute());
  };

  get = async (req, res) => {
    res.json(await this.getTodo.execute(req.params.id));
  };

  create = async (req, res) => {
    res.status(201).json(await this.createTodo.execute(req.body ?? {}));
  };

  update = async (req, res) => {
    res.json(await this.updateTodo.execute(req.params.id, req.body ?? {}));
  };

  remove = async (req, res) => {
    await this.deleteTodo.execute(req.params.id);
    res.status(204).end();
  };
}
