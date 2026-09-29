<div align="center">

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Inter&weight=900&size=48&duration=2800&pause=1200&color=001F5B&center=true&vCenter=true&width=600&height=90&lines=Akieni+Todo;Microservices+CRUD)](https://github.com/dravelimbolo/akieni-microservice-ap)

**`Application Todo · React · Vite · Node.js · Microservices`**

_Un CRUD de taches concu comme vitrine d'architecture : microservices, DDD, SOLID et DRY._

<br/>

[![Portfolio](https://img.shields.io/badge/-dravelimbolo.com-111111?style=for-the-badge&logo=safari&logoColor=white)](https://dravelimbolo.com)
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-111111?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/dravel-imbolo)
[![GitHub](https://img.shields.io/badge/-GitHub-111111?style=for-the-badge&logo=github&logoColor=white)](https://github.com/dravelimbolo)
[![Email](https://img.shields.io/badge/-contact@dravelimbolo.com-111111?style=for-the-badge&logo=gmail&logoColor=white)](mailto:contact@dravelimbolo.com)

<br/>

[![CI](https://github.com/dravelimbolo/akieni-microservice-ap/actions/workflows/ci.yml/badge.svg)](https://github.com/dravelimbolo/akieni-microservice-ap/actions/workflows/ci.yml)
[![Licence MIT](https://img.shields.io/badge/licence-MIT-001F5B.svg)](LICENSE)
[![PRs bienvenues](https://img.shields.io/badge/PRs-bienvenues-001F5B.svg)](CONTRIBUTING.md)

</div>

---

<div align="center">

```
Frontend React + Vite   ·   API Gateway   ·   Todo Service DDD   ·   Docker Compose
```

_Creer, lister, modifier, cocher et supprimer des taches a travers une passerelle API unique._

</div>

---

## Stack technique

<table align="center">
<tr>
  <td align="center">
    <strong>Backend</strong><br/>
    <img src="https://skillicons.dev/icons?i=nodejs,express,js" />
  </td>
  <td align="center">
    <strong>Frontend</strong><br/>
    <img src="https://skillicons.dev/icons?i=react,vite,css" />
  </td>
  <td align="center">
    <strong>DevOps & Outils</strong><br/>
    <img src="https://skillicons.dev/icons?i=docker,yarn,git,github,githubactions,linux" />
  </td>
</tr>
</table>

---

## Architecture

```
frontend (:5173)  ──>  gateway (:4000)  ──>  todo-service (:4001)
```

```
akieni-microservice-ap/
├── services/
│   └── todo-service/         :4001    # Microservice CRUD des taches (DDD)
│       └── src/
│           ├── domain/                # Entite Todo · objet-valeur TodoTitle · port TodoRepository · erreurs
│           ├── application/           # Cas d'utilisation : List · Get · Create · Update · Delete
│           ├── infrastructure/        # Depot en memoire (remplacable par une vraie base)
│           ├── interfaces/http/       # Controleur · routes · gestion centralisee des erreurs
│           ├── container.js           # Racine de composition (injection des dependances)
│           └── server.js              # Point d'entree Express
│
├── gateway/                  :4000    # Passerelle API · proxy vers les microservices
│   └── src/
│       ├── services.js                # Registre des services exposes
│       └── server.js                  # Creation generique des proxys
│
├── frontend/                 :5173    # React 18 + Vite
│   └── src/
│       ├── api/                       # Client HTTP generique · API des taches
│       ├── hooks/                     # useTodos : etat et logique metier
│       └── components/                # TodoForm · TodoList · TodoItem
│
├── .github/                           # CI · modeles de PR et d'issues
├── docker-compose.yml                 # Stack complete en une commande
├── CONTRIBUTING.md                    # Guide de contribution
├── LICENSE                            # Licence MIT
└── README.md
```

### Principes appliques

| Principe | Mise en oeuvre |
|---|---|
| **DDD** | Couches `domain` · `application` · `infrastructure` · `interfaces`, entite et objet-valeur qui protegent leurs invariants |
| **S** (responsabilite unique) | Un cas d'utilisation par classe, controleur sans logique metier, composants React purement visuels |
| **O** (ouvert / ferme) | Nouveau service = une entree dans `gateway/src/services.js`, nouvelle erreur = une ligne dans la table HTTP |
| **L** (Liskov) | Tout depot qui respecte `TodoRepository` remplace `InMemoryTodoRepository` sans rien casser |
| **I** (segregation) | Contrat de depot minimal : `findAll` · `findById` · `save` · `delete` |
| **D** (inversion) | Le domaine definit le port, les dependances sont injectees dans `container.js` |
| **DRY** | Validation du titre centralisee, `asyncHandler` unique, client HTTP unique, gestion d'erreurs commune dans `useTodos` |

---

## Demarrage avec Docker

> **Prerequis :** Docker Desktop (ou Docker Engine + Compose Plugin)

```bash
git clone https://github.com/dravelimbolo/akieni-microservice-ap.git
cd akieni-microservice-ap
docker compose up --build
```

L'application est disponible sur **[http://localhost:5173](http://localhost:5173)**

## Demarrage en local

> **Prerequis :** Node.js 20+ et Yarn 1.x

```bash
cd services/todo-service && yarn && yarn dev   # port 4001
cd gateway && yarn && yarn dev                 # port 4000
cd frontend && yarn && yarn dev                # port 5173
```

### Ports exposes

| Service | Port local |
|---|---|
| Frontend (Vite) | **5173** |
| Gateway | 4000 |
| Todo service | 4001 |

---

## API

> Toutes les routes passent par la passerelle : `http://localhost:4000`

| Methode | Route | Corps | Reponse |
|---|---|---|---|
| `GET` | `/api/todos` | | `200` liste des taches |
| `GET` | `/api/todos/:id` | | `200` tache · `404` |
| `POST` | `/api/todos` | `{ "title": "..." }` | `201` tache · `400` |
| `PATCH` | `/api/todos/:id` | `{ "title"?, "completed"? }` | `200` tache · `400` · `404` |
| `DELETE` | `/api/todos/:id` | | `204` · `404` |
| `GET` | `/health` | | `200` etat du service |

> Les donnees sont stockees en memoire : elles sont reinitialisees au redemarrage du service.

---

## CI

| Workflow | Declencheur | Description |
|---|---|---|
| `ci.yml` | PR + push sur `main` et `develop` | Installation · verification du todo-service et de la gateway · build du frontend |

---

## Contributions

<table style="border-spacing:0; font-size:13px; width:100%;">
<tr>
  <th style="padding:8px 12px;">Role</th>
  <th style="padding:8px 12px;">Personne</th>
  <th style="padding:8px 12px;">Contribution</th>
</tr>
<tr>
  <td style="padding:8px 12px;"><strong>Auteur & mainteneur</strong></td>
  <td style="padding:8px 12px;"><a href="https://github.com/dravelimbolo">Dravel IMBOLO</a></td>
  <td style="padding:8px 12px;">Architecture · developpement · DevOps · CI · design</td>
</tr>
</table>

Les contributions sont les bienvenues. Avant d'ouvrir une pull request, lis le **[guide de contribution](CONTRIBUTING.md)** : branches Git Flow, commits conventionnels et revue obligatoire sur `develop` et `main`.

---

## Licence

Distribue sous licence **MIT**. Voir le fichier [LICENSE](LICENSE).

Copyright (c) 2026 **Dravel IMBOLO**.

---

<div align="center">

<br/>

_"Transformer des idees en applications fonctionnelles, robustes et scalables."_

<br/>

</div>
