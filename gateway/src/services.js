// Registre des microservices exposés par la passerelle.
// Pour ajouter un service : ajouter une entrée ici, sans modifier server.js (O de SOLID).
export const services = [
  {
    route: '/api/todos',
    target: process.env.TODO_SERVICE_URL || 'http://localhost:4001',
    pathPrefix: '/todos',
  },
];
