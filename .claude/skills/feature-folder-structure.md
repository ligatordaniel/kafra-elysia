````skill
---
name: feature-folder-structure
description: "Defines and enforces a feature-based folder structure for projects started from scratch. Use this skill when a project has no existing structure or when asked how to organize code. Organizes code by domain/feature (vertical slicing) instead of by technical layer (horizontal slicing). Applies to any stack: React, Node.js, Python, etc."
user-invocable: true
risk: safe
---

# Feature Folder Structure Skill

This skill defines how to organize a project **from scratch** using **feature-based folders** (vertical slicing). Each folder groups all the code related to a single business domain or feature, regardless of its technical role.

## 🧠 Core Philosophy

> "Organize code around what it *does* for the user, not around what *type* of file it is."

### Feature-based vs. Layer-based

| Layer-based (avoid) | Feature-based (prefer) |
|---|---|
| `controllers/`, `services/`, `models/` | `orders/`, `users/`, `payments/` |
| All controllers together | Each feature owns its controller |
| Cross-cutting changes for one feature | One folder touched per feature |
| Hard to find what a feature does | Feature is self-contained |

## When to Use

Apply this skill when:
- Starting a project **from zero** with no existing folder structure.
- The user asks "how should I structure this project?"
- An existing project uses a flat or purely layer-based structure and is becoming hard to navigate.
- The team is growing and features need clear ownership boundaries.

## 1. Universal Template

Regardless of the stack, the top-level structure follows this shape:

```
src/
├── features/               # One folder per business domain
│   ├── <feature-a>/
│   │   ├── index.ts        # Public API of the feature (barrel export)
│   │   ├── <feature-a>.service.ts
│   │   ├── <feature-a>.controller.ts   (if applicable)
│   │   ├── <feature-a>.model.ts        (if applicable)
│   │   ├── <feature-a>.routes.ts       (if applicable)
│   │   ├── <feature-a>.test.ts
│   │   └── <feature-a>.types.ts
│   └── <feature-b>/
│       └── ...
├── shared/                 # Code used by 2+ features
│   ├── utils/
│   ├── hooks/              (frontend)
│   ├── components/         (frontend)
│   ├── middleware/         (backend)
│   └── types/
├── core/                   # App bootstrap, config, DI container
│   ├── config.ts
│   ├── database.ts         (if applicable)
│   └── app.ts
└── main.ts                 # Entry point
```

### Rules for `shared/` and `core/`
- **`shared/`**: Only place code here when it is needed by **2 or more** features. Do not pre-emptively share.
- **`core/`**: App-wide infrastructure only (database connection, config loading, server bootstrap). No business logic.
- **Never import from a sibling feature**: `features/orders/` must not import from `features/users/` directly. Use `shared/` or communicate through events/interfaces.

## 2. Backend — Node.js / Express / NestJS

```
src/
├── features/
│   ├── auth/
│   │   ├── index.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.routes.ts
│   │   ├── auth.middleware.ts
│   │   ├── auth.model.ts
│   │   ├── auth.types.ts
│   │   └── auth.test.ts
│   ├── users/
│   │   ├── index.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   ├── users.repository.ts
│   │   ├── users.model.ts
│   │   ├── users.types.ts
│   │   └── users.test.ts
│   └── orders/
│       ├── index.ts
│       ├── orders.controller.ts
│       ├── orders.service.ts
│       ├── orders.repository.ts
│       ├── orders.types.ts
│       └── orders.test.ts
├── shared/
│   ├── middleware/
│   │   ├── error-handler.ts
│   │   └── logger.ts
│   ├── utils/
│   │   └── paginate.ts
│   └── types/
│       └── pagination.types.ts
├── core/
│   ├── database.ts
│   ├── config.ts
│   └── app.ts
└── main.ts
```

## 3. Frontend — React / Vue / Svelte

```
src/
├── features/
│   ├── auth/
│   │   ├── index.ts
│   │   ├── components/
│   │   │   ├── LoginForm.tsx
│   │   │   └── LogoutButton.tsx
│   │   ├── hooks/
│   │   │   └── useAuth.ts
│   │   ├── store/
│   │   │   └── auth.slice.ts       (Redux / Zustand / Pinia)
│   │   ├── api/
│   │   │   └── auth.api.ts
│   │   ├── types/
│   │   │   └── auth.types.ts
│   │   └── auth.test.tsx
│   ├── products/
│   │   ├── index.ts
│   │   ├── components/
│   │   │   ├── ProductList.tsx
│   │   │   └── ProductCard.tsx
│   │   ├── hooks/
│   │   │   └── useProducts.ts
│   │   ├── api/
│   │   │   └── products.api.ts
│   │   └── types/
│   │       └── product.types.ts
│   └── cart/
│       └── ...
├── shared/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   └── Button.test.tsx
│   │   └── Modal/
│   ├── hooks/
│   │   └── useDebounce.ts
│   ├── utils/
│   │   └── formatCurrency.ts
│   └── types/
│       └── api.types.ts
├── core/
│   ├── router.tsx
│   ├── store.ts
│   └── App.tsx
└── main.tsx
```

## 4. Full-Stack Monorepo

```
apps/
├── web/            # Frontend app (React, Next.js, etc.)
│   └── src/
│       └── features/...
├── api/            # Backend app (Node.js, Fastify, etc.)
│   └── src/
│       └── features/...
packages/
├── shared-types/   # Types shared between web and api
├── ui/             # Shared design system components
└── utils/          # Shared utility functions
```

## 5. Python — FastAPI / Django / Flask

```
src/
├── features/
│   ├── auth/
│   │   ├── __init__.py
│   │   ├── router.py
│   │   ├── service.py
│   │   ├── repository.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   └── test_auth.py
│   ├── users/
│   │   ├── __init__.py
│   │   ├── router.py
│   │   ├── service.py
│   │   ├── repository.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   └── test_users.py
│   └── orders/
│       └── ...
├── shared/
│   ├── dependencies.py
│   ├── exceptions.py
│   └── utils/
│       └── pagination.py
├── core/
│   ├── config.py
│   ├── database.py
│   └── security.py
└── main.py
```

## 6. The `index` Barrel File (Public API)

Every feature folder **must** have an `index` file that explicitly exports only what other parts of the app are allowed to use. This enforces encapsulation.

```typescript
// features/users/index.ts
export { UsersService } from './users.service';
export type { User, CreateUserDto } from './users.types';

// ❌ Do NOT export: UsersRepository, internal helpers, DB models
```

Consumers import from the barrel, never from internal files:
```typescript
// ✅ Correct
import { UsersService } from '@/features/users';

// ❌ Wrong — breaks encapsulation
import { UsersService } from '@/features/users/users.service';
```

## 7. Naming Conventions

| Element | Convention | Example |
|---|---|---|
| Feature folder | `kebab-case`, singular or plural by context | `orders/`, `auth/`, `product-catalog/` |
| Files inside feature | `<feature>.<role>.ts` | `orders.service.ts` |
| React components | `PascalCase.tsx` | `OrderCard.tsx` |
| Test files | Same name, `.test.ts(x)` suffix | `orders.service.test.ts` |
| Barrel file | `index.ts` | `index.ts` |

## 8. Deciding Where Code Lives

Use this decision tree for any new file:

```
Is this code only used by ONE feature?
├── YES → Put it inside that feature's folder
└── NO (used by 2+ features)
    ├── Is it a UI component? → shared/components/
    ├── Is it a utility/helper? → shared/utils/
    ├── Is it a type/interface? → shared/types/
    └── Is it app bootstrap/config? → core/
```

## 9. When to Split a Feature

Split a feature into sub-features when:
- The folder has **more than ~10 files**.
- It contains clearly distinct sub-domains (e.g., `payments/` could split into `payments/billing/` and `payments/invoices/`).

```
features/
└── payments/
    ├── billing/
    │   ├── index.ts
    │   └── billing.service.ts
    ├── invoices/
    │   ├── index.ts
    │   └── invoices.service.ts
    └── index.ts   ← re-exports from sub-features
```

## 🛠️ Setup Checklist (New Project)

- [ ] Create `src/features/`, `src/shared/`, `src/core/` directories.
- [ ] Identify the 3–5 core business domains → create one folder each under `features/`.
- [ ] Create an `index.ts` barrel in each feature folder.
- [ ] Add a path alias (`@/features`, `@/shared`, `@/core`) in `tsconfig.json` / `vite.config.ts` / `pyproject.toml`.
- [ ] Add a linting rule to **forbid cross-feature imports** (e.g., ESLint `import/no-restricted-paths`).
- [ ] Document the structure in `README.md` so the team follows it consistently.

## 📚 References

- Screaming Architecture — Robert C. Martin
- [Feature-Sliced Design](https://feature-sliced.design/) — Methodology for frontend apps
- Bulletproof React — [Folder Structure](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md)
- Domain-Driven Design (DDD) — Bounded Contexts
````
