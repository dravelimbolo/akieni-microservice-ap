import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { services } from './services.js';

// Passerelle API : point d'entrée unique pour le frontend,
// elle redirige chaque préfixe de route vers le microservice concerné.
const PORT = process.env.PORT || 4000;
const app = express();
app.use(cors());

app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'gateway' }));

// Création générique d'un proxy par service (DRY).
for (const { route, target, pathPrefix } of services) {
  app.use(
    route,
    createProxyMiddleware({
      target,
      changeOrigin: true,
      // Express retire le préfixe "route" : on remet le chemin attendu par le service.
      pathRewrite: (path) => `${pathPrefix}${path === '/' ? '' : path}`,
    }),
  );
  console.log(`Route ${route} -> ${target}${pathPrefix}`);
}

app.listen(PORT, () => console.log(`gateway démarrée sur le port ${PORT}`));
