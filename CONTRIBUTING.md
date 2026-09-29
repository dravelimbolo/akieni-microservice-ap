# Guide de contribution

Merci de t'interesser a **Akieni Todo** ! Ce guide explique comment proposer une modification.

---

## Branches (Git Flow)

| Branche | Role | Protegee |
|---|---|---|
| `main` | Code en production, uniquement des versions stables | Oui |
| `develop` | Branche d'integration, base de toutes les nouvelles branches | Oui |
| `feature/<nom>` | Nouvelle fonctionnalite, creee depuis `develop` | Non |
| `fix/<nom>` | Correction de bug, creee depuis `develop` | Non |
| `hotfix/<nom>` | Correction urgente, creee depuis `main` puis fusionnee dans `main` et `develop` | Non |
| `release/<version>` | Preparation d'une version, creee depuis `develop` puis fusionnee dans `main` | Non |
| `docs/<nom>` · `chore/<nom>` · `ci/<nom>` | Documentation, maintenance, integration continue | Non |

Aucun push direct n'est possible sur `main` et `develop` : tout passe par une pull request.

---

## Etapes (GitHub Flow)

1. **Fork** le depot puis clone ton fork.
2. Pars de `develop` a jour :
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/ma-fonctionnalite
   ```
3. Code, en respectant l'architecture existante (voir plus bas).
4. Verifie que tout fonctionne :
   ```bash
   cd frontend && yarn build
   ```
5. Commit avec la convention ci dessous, puis pousse ta branche.
6. Ouvre une **pull request vers `develop`** en remplissant le modele.
7. Apres revue et CI verte, la PR est fusionnee par le mainteneur.

---

## Convention de commits

Format [Conventional Commits](https://www.conventionalcommits.org/fr/) :

```
<type>(<portee>): <description courte a l'imperatif>
```

| Type | Usage |
|---|---|
| `feat` | Nouvelle fonctionnalite |
| `fix` | Correction de bug |
| `docs` | Documentation |
| `refactor` | Refactorisation sans changement de comportement |
| `test` | Ajout ou modification de tests |
| `chore` | Maintenance, dependances, configuration |
| `ci` | Integration continue |
| `style` | Mise en forme, sans impact sur le code |

Portees courantes : `todo-service`, `gateway`, `frontend`, `docker`, `ci`.

Exemples :

```
feat(todo-service): ajouter une date d'echeance aux taches
fix(frontend): corriger l'edition d'un titre vide
docs(readme): completer la section API
```

---

## Regles d'architecture

- **DDD** : la logique metier vit dans `domain/`, jamais dans les controleurs ni les routes.
- **SOLID** : une responsabilite par classe ou module, dependances injectees via `container.js`.
- **DRY** : reutilise les utilitaires existants (`asyncHandler`, `httpClient`, `useTodos`) avant d'en creer.
- Nouveau microservice : cree le dossier dans `services/`, declare le dans `gateway/src/services.js` et dans `docker-compose.yml`.
- Commentaires du code **en francais**.

---

## Signaler un bug ou proposer une idee

Ouvre une [issue](https://github.com/dravelimbolo/akieni-microservice-ap/issues) en choisissant le modele adapte. Decris le contexte, les etapes pour reproduire et le resultat attendu.

---

## Licence

En contribuant, tu acceptes que ton code soit distribue sous la licence [MIT](LICENSE) du projet.
