# AGENT INSTRUCTIONS: reformas-web-agency

This document provides a comprehensive set of guidelines and commands for autonomous agents working on the 'reformas-web-agency' project. Strict adherence to these rules is mandatory to maintain code consistency and quality.

## 1. Project Overview and Technology Stack

The project is built on the **Astro** framework, utilizing **React** for interactive islands and components. Styling is managed with **Tailwind CSS**. Core dependencies include:
*   **@astrojs/react**: Integration of React components.
*   **@astrojs/sitemap, @astrojs/partytown, @astrojs/mdx**: Astro-specific integrations.
*   **tailwindcss**: Utility-first CSS framework.
*   **@formspree/react, resend**: Form submission and email handling.
*   **TypeScript**: Enforced via `tsconfig.json`.

## 2. Essential Commands

All commands are executed via npm scripts.

### Build & Serve

| Action | Command | Notes |
| :--- | :--- | :--- |
| **Development Server** | `npm run dev` | Runs Astro server for local development. |
| **Build Project** | `npm run build` | Generates a production-ready static site in the `dist/` directory. **Must be run after any code change.** |
| **Preview Build** | `npm run preview` | Serves the production build locally. |
| **Astro CLI** | `npm run astro` | Direct access to the Astro CLI. |

### Linting & Formatting

| Action | Command | Notes |
| :--- | :--- | :--- |
| **Status** | **PENDING** | No dedicated ESLint or Prettier configuration was found in the repository root. |
| **Guidance** | Agents must adhere to the style guidelines in Section 3 until dedicated tools are configured. |

### Testing Strategy

| Action | Command | Notes |
| :--- | :--- | :--- |
| **Status** | **NOT ESTABLISHED** | No dedicated testing framework (e.g., Jest, Vitest, Playwright) is currently installed, and no test files were found. |
| **Run All Tests** | **N/A** | Testing suite is not established. |
| **Run Single Test** | **N/A** | Testing suite is not established. |
| **Verification** | Any new or modified feature must be manually verified in the browser using `npm run dev` before being considered complete. |

## 3. Code Style Guidelines

### A. General Language Usage

*   **TypeScript (Strictness):** The project uses a strict TypeScript configuration (`"extends": "astro/tsconfigs/strict"`). Agents must utilize explicit types for function parameters, return values, and component props. Avoid the `any` type.
*   **React Components:** Prefer functional components and React Hooks. Class components are forbidden.
*   **Astro vs. React:** Use Astro components (`.astro`) for pages, layouts, and static content. Use React components (`.tsx`) only for interactive islands.

### B. Naming Conventions

| Entity | Convention | Example |
| :--- | :--- | :--- |
| **Components** | PascalCase | `HeroSection.tsx`, `PrimaryButton.astro` |
| **Variables/Functions** | camelCase | `calculateTotal`, `isUserLoggedIn` |
| **Interfaces/Types** | PascalCase | `UserProps`, `FormState` |
| **Astro File Names** | kebab-case | `about-us.astro`, `card-layout.astro` |

### C. Imports and Ordering

1.  **Grouping:** Imports must be sorted and grouped with a blank line separating each group.
    1.  External libraries/packages (e.g., `react`, `astro`, `lucide-react`).
    2.  Project-wide absolute imports (e.g., imports starting with `@/`).
    3.  Relative imports.
    4.  Side-effect imports (if any).
2.  **Paths:** Prefer absolute paths over deep relative paths (e.g., `import { Button } from '~/components/ui/Button'`).
3.  **Destructuring:** Only import specific named exports. Avoid importing the entire module when only a few exports are needed.

### D. Formatting (Inferred Standards)

*   **Indentation:** 2 spaces (soft tabs).
*   **Quotes:** Use double quotes (`""`) for JSX attributes. Use single quotes (`''`) for all other JavaScript/TypeScript strings.
*   **Semicolons:** Semicolons (`;`) are required at the end of statements.
*   **Trailing Commas:** Required for multiline array and object literals.

### E. JSX/TSX and Tailwind

*   **Props:** Destructure props immediately in the component signature.
*   **Styling:** **Do not use inline style objects** (`style={{...}}`). All styling must be applied using Tailwind CSS utility classes.
*   **Conditionals:** Prefer short-circuiting (`&&`) or ternary operators for simple conditional rendering within JSX.
*   **Tailwind Grouping:** Group related Tailwind classes logically (e.g., `flex items-center justify-between p-4 bg-white shadow-md`).

## 4. Error Handling and Resilience

*   **Asynchronous Code:** All asynchronous operations (form submissions, API calls, data fetches) must be wrapped in `try...catch` blocks.
*   **External Services:** Provide clean, user-friendly error messages when services like `Resend` or `Formspree` fail. Log the detailed error on the server/build side.
*   **TypeScript Errors:** Ensure proper type-checking for errors caught in `catch` blocks (e.g., `if (error instanceof Error)`).

## 5. Agent-Specific Rules (The Ultimate Source of Truth)

*   **Explicit Rules:** No external agent configuration files were found (`.cursor/rules/`, `.cursorrules`, `.github/copilot-instructions.md`).
*   **The Precedent Principle:** **The existing code is the ultimate source of truth.** If a general guideline in this document contradicts a widely adopted convention in the existing codebase (e.g., existing code uses double quotes for JS strings despite the guideline), the agent must follow the existing convention of the closest surrounding code to maintain consistency.
*   **Verification Mandate:** After *any* code change, the agent's final step before reporting completion must be to successfully execute `npm run build` and ensure no compilation or build errors are introduced.