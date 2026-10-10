# React Frontend Starter

A reusable frontend foundation for building modern, responsive web applications using React, TypeScript, Vite, and Tailwind CSS.

Includes application routing, API integration, session-based authentication, server-state management, form validation, and testing tools. Designed to be used as a starting point for new projects.

## Tech Stack

- **Framework:** React
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **Server State:** TanStack Query
- **HTTP Client:** Axios
- **Forms:** React Hook Form
- **Validation:** Zod
- **Client State:** Zustand
- **Icons:** Lucide React
- **Testing:** Vitest, React Testing Library, and jsdom
- **Linting:** Oxlint

## Features

- Reusable application layout and navigation
- Feature-based project structure
- Centralized Axios API client
- Environment variable validation
- Cookie-based session authentication
- Protected and guest-only routes
- Login, logout, and current-user integration
- TanStack Query configuration for server state
- Form handling and schema validation
- Responsive UI foundation
- Unit testing setup
- TypeScript build checks and linting

## Project Structure

```text
src/
├── app/                 # Application setup, router, providers
├── components/
│   ├── common/          # Shared application components
│   └── ui/              # Reusable UI primitives
├── config/              # Environment and application config
├── features/
│   └── auth/            # Authentication feature
├── hooks/               # Shared custom hooks
├── layouts/             # Application layouts
├── lib/                 # API client and utilities
├── pages/               # Route-level pages
├── services/            # Shared service integrations
├── stores/              # Client-side state
├── test/                # Test setup and configuration
├── types/               # Shared TypeScript types
├── main.tsx             # Application entry point
└── index.css            # Global styles
```

Feature-specific code should generally live under `src/features/<feature>`. Keep reusable UI components, application infrastructure, and shared utilities separate from business-specific features.

## Prerequisites

- Node.js version supported by the project
- npm
- Git
- A running backend API for features that require server integration

Check the Node.js version used by your development and deployment environments before starting.

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd <your-project-directory>
```

### 2. Install dependencies

```bash
npm ci
```

### 3. Configure environment variables

Create a local development environment file:

```bash
cp .env.example .env.development
```

Configure the API URL and application name in the environment file. For example:

```dotenv
VITE_APP_NAME=My Application
VITE_API_URL=http://localhost:3000/api
```

Use the actual variables defined in `.env.example` and validated by the application configuration.

**Important:** Variables prefixed with `VITE_` are exposed to browser-side code. Never place passwords, database credentials, session secrets, private API keys, or other confidential values in frontend environment files.

### 4. Start the development server

```bash
npm run dev
```

Vite will display the local development URL in the terminal.

### 5. Build for production

```bash
npm run build
```

The production bundle is generated in the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
```

## Environment Configuration

| Variable        | Purpose                     |
| --------------- | --------------------------- |
| `VITE_APP_NAME` | Application display name    |
| `VITE_API_URL`  | Base URL of the backend API |

The environment configuration is validated when the application loads. Update `.env.example` whenever new environment variables are introduced.

Never commit real environment files. Commit only safe example configuration.

## Authentication

This starter supports cookie-based, server-side session authentication.

### Authentication flow

1. The user submits login credentials through the login page.
2. The backend validates the credentials and sets an HttpOnly session cookie.
3. The frontend restores authentication state using the current-user endpoint.
4. Protected routes are available only when the user is authenticated.
5. Guest-only routes redirect authenticated users away from the login page.
6. Logout requests session revocation from the backend and clears client-side query state.

### Frontend integration

- Axios uses `withCredentials: true` to send cookies with API requests.
- TanStack Query manages the current-user request and other server state.
- Protected and guest-only route components handle navigation.
- Login forms use React Hook Form and Zod validation.
- Authentication credentials are not stored in `localStorage` or `sessionStorage`.

The backend must configure trusted CORS origins, credential support, session validation, cookie security, and CSRF protections correctly. Frontend route guards are for navigation and do not replace backend authorization.

For production deployments, use HTTPS and configure the frontend API URL for the intended environment.

## Development Commands

```bash
npm run dev
npm run build
npm run lint
npm run test
npm run test -- --run
npm run preview
```

- `dev` starts the Vite development server.
- `build` runs TypeScript build checks and creates the production bundle.
- `lint` checks source code.
- `test` starts Vitest in watch mode, if configured that way.
- `test -- --run` executes tests once.
- `preview` serves the production build locally.

Refer to `package.json` for the exact scripts supported by the current repository.

## Testing

Tests use Vitest and React Testing Library, with jsdom providing a browser-like environment.

Example test command:

```bash
npm run test -- --run
```

Recommended test coverage includes:

- Shared UI components
- Form validation and submission
- Authentication route guards
- Loading, success, and error states
- API service behavior
- Important user interactions

Keep tests close to the feature they cover where practical, and use `src/test` for shared test setup.

## Production Guidelines

Before deploying an application based on this starter:

- Configure the correct production API URL.
- Build and test the application in CI.
- Keep dependencies updated.
- Validate user input and display useful API error messages.
- Ensure backend authorization protects all private resources.
- Use HTTPS in production.
- Avoid exposing sensitive data in client-side logs.
- Add accessibility checks and responsive layout testing.
- Configure appropriate security headers and a Content Security Policy on the hosting platform.
- Set up error monitoring and deployment health checks.

## Using This Repository as a Template

To start a new project:

1. Create a new repository from this starter or clone it into a separate directory.
2. Update the application name, metadata, and environment examples.
3. Configure the backend API URL.
4. Replace starter-specific branding and navigation.
5. Add domain-specific features under `src/features`.
6. Create the required pages, API services, types, and tests.
7. Verify the build, lint, and tests before deployment.

Keep this repository focused on reusable frontend infrastructure. Application-specific pages, business entities, and workflows should be implemented in the projects built from it.

## License

Add the license appropriate for your project before distributing this template.
