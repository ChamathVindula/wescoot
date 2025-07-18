# Wescoot - Electric Scooter Store

This document outlines the architecture, technologies, and best practices for the Wescoot project.

## Project Overview

Wescoot is an online store for electric scooters. The project is divided into a frontend application and a backend service, located in the `frontend` and `backend` directories, respectively.

## Frontend

The frontend is a single-page application (SPA) built with React and TypeScript.

### Tech Stack

- **Framework:** React
- **Language:** TypeScript
- **Build Tool:** Vite
- **State Management:** Redux Toolkit (including RTK Query)
- **Routing:** React Router
- **Styling:** Tailwind CSS
- **Testing:** Jest + React Testing Library
- **Forms:** React Hook Form with Zod for schema validation.

### Best Practices

#### Component Design & Structure
- **Do:** Write components as pure, functional components using React Hooks.
- **Do:** Keep components small and focused on a single responsibility (Single Responsibility Principle). A component should either be for presentation (displaying data) or for logic (fetching data, managing state), but not both.
- **Do:** Use composition to build complex UIs from smaller, reusable components.
- **Do:** Destructure props and define their types clearly using TypeScript interfaces or types.
- **Do:** Use `React.memo` to wrap components that re-render often with the same props to optimize performance.
- **Don't:** Create large, monolithic components that do too many things.
- **Don't:** Mutate props directly. Treat them as immutable.

#### Folder Structure
- **`src/pages`**: Top-level components for each route (e.g., `HomePage.tsx`, `ProductDetailsPage.tsx`). These are "smart" components that fetch data and manage high-level state.
- **`src/components`**: "Dumb", reusable UI components (e.g., `Button.tsx`, `Card.tsx`, `Input.tsx`). These components receive data and callbacks via props and should not have their own business logic.
- **`src/features`**: Contains all logic related to a specific business feature (e.g., `products`, `cart`, `auth`). A typical feature folder might contain:
  - `ProductList.tsx`: A "smart" feature component.
  - `productSlice.ts`: Redux Toolkit slice for the feature's state.
  - `productAPI.ts`: RTK Query API definition for fetching product data.
  - `productTypes.ts`: TypeScript types specific to the feature.
- **`src/app`**: Redux store configuration (`store.ts`).
- **`src/services`**: If not using RTK Query, this is where API communication logic (e.g., Axios instances) would go. With RTK Query, this is less needed.
- **`src/hooks`**: Custom hooks that encapsulate reusable logic (e.g., `useDebounce.ts`, `useAuth.ts`).
- **`src/utils`**: Pure utility functions that can be used anywhere (e.g., `formatDate.ts`, `validators.ts`).
- **`src/layouts`**: Components that define the overall structure of pages (e.g., `MainLayout.tsx` with header and footer).

#### State Management (Redux Toolkit)
- **Do:** Use Redux Toolkit for all global application state.
- **Do:** Use **RTK Query** for all data fetching, caching, and server state management. It handles loading states, error states, and re-fetching automatically.
- **Do:** Use `createSlice` to generate reducers and actions, which drastically reduces boilerplate.
- **Do:** Use `createSelector` from `reselect` to create memoized selectors for deriving data from the store, preventing unnecessary re-renders.
- **Don't:** Put all state into Redux. Use React's `useState` or `useReducer` for state that is local to a single component (e.g., form input values, toggling a modal).
- **Don't:** Mutate state directly in your components or reducers. Redux Toolkit uses Immer, which allows "mutative" syntax inside `createSlice`, but it's still producing immutable updates under the hood.

#### Styling (Tailwind CSS)
- **Do:** Embrace the utility-first approach. Style components by applying utility classes directly in the JSX.
- **Do:** Use the `@apply` directive in a global CSS file to create small, reusable component classes (e.g., `.btn-primary`) when a pattern of utilities is repeated frequently.
- **Do:** Customize and extend the default theme via `tailwind.config.js`. Add your application's color palette, fonts, and spacing to create a consistent design system.
- **Don't:** Write traditional, separate CSS files for components (`MyComponent.css`). This defeats the purpose of Tailwind.
- **Don't:** Use inline styles (`style={{}}`) for anything that can be achieved with Tailwind classes.

#### Routing (React Router)
- **Do:** Centralize route definitions in a single file (e.g., `App.tsx` or `src/routes.tsx`).
- **Do:** Use Layout Routes to share UI elements (like sidebars or headers) across multiple pages.
- **Do:** Use React Router in Data Mode strategy when defining routes in the application  
- **Do:** Use hooks like `useNavigate`, `useParams`, and `useLocation` for programmatic navigation and accessing route data.
- **Do:** Implement route-based code splitting using `React.lazy()` and `<Suspense>` to improve initial load time.

#### Testing (Jest + React Testing Library)
- **Do:** Focus on testing user behavior, not implementation details. Ask "What does the user see?" and "How do they interact with it?".
- **Do:** Use `user-event` for simulating user interactions (typing, clicking) as it more closely resembles how a user interacts with the application.
- **Do:** Use Mock Service Worker (`msw`) to mock API requests at the network level. This makes your tests more robust and realistic.
- **Do:** Write unit tests for all critical components, custom hooks, and utility functions.
- **Don't:** Test the internal state of a component. Test the rendered output and its behavior.

## Backend

The backend is a Node.js application built with Express.js and TypeScript.

### Tech Stack

- **Framework:** Express.js
- **Language:** TypeScript
- **ORM:** Sequelize
- **Authentication:** Passport.js (Local Strategy)
- **API Documentation:** Swagger (OpenAPI)
- **Logging:** Winston
- **Environment Configuration:** `dotenv`
- **Caching:** Redis
- **Validation:** Joi

### Best Practices

#### Architecture & Data Flow (Layered Architecture)
- **Data Flow:** Request -> Middleware -> Route -> Controller -> Service -> Repository (optional) -> Model -> Database.
- **1. Routes (`src/routes`):** Defines API endpoints and maps them to controller functions. Should contain no business logic.
- **2. Controllers (`src/controllers`):** The entry point for a request after routing.
  - **Do:** Parse request data (`req.body`, `req.params`, `req.query`).
  - **Do:** Call one or more service methods to execute business logic.
  - **Do:** Format the response and send it back to the client (e.g., `res.status(200).json(...)`).
  - **Don't:** Place business logic or database queries here.
- **3. Services (`src/services`):** The core of the application.
  - **Do:** Contain all business logic (e.g., calculating a total, achecking permissions, orchestrating calls to multiple models).
  - **Do:** Interact with the database via models or repositories.
  - **Do:** Throw custom, specific errors (e.g., `NotFoundError`, `UnauthorizedError`) to be caught by the error handling middleware.
- **4. Models (`src/models`):** Defines the database schema using Sequelize. Represents a single database table.
- **5. Repositories (`src/repositories`):** (Optional but recommended for complex apps) Abstract complex database queries. A service would call a repository method instead of building a complex Sequelize query itself. This improves separation of concerns and testability.
- **6. Middleware (`src/middleware`):** Functions that run before the controller. Used for cross-cutting concerns like authentication (`auth.ts`), logging (`logger.ts`), and error handling (`errorHandler.ts`).

#### Database (Sequelize)
- **Do:** Use Sequelize migrations for all schema changes. This ensures a reproducible and version-controlled database structure.
- **Do:** Define associations (`hasMany`, `belongsTo`) within your models to represent table relationships.
- **Don't:** Use `sequelize.sync({ force: true })` in any environment other than for temporary, local development testing. It will wipe your data.

#### Authentication & Authorization
- **Do:** Use Passport.js with a local strategy for handling username/password authentication.
- **Do:** Hash passwords using a strong, slow hashing algorithm like **bcrypt**.
- **Do:** Implement authorization middleware that checks user roles or permissions after they are authenticated. Protect routes by applying this middleware (e.g., `router.post('/', authMiddleware, adminMiddleware, createProduct)`).

#### Validation (Joi)
- **Do:** Validate all incoming data from the client (`body`, `params`, `query`).
- **Do:** Perform validation in a middleware that runs before your controller. This keeps controllers clean and ensures they only receive valid data.
- **Do:** Define validation schemas in a separate file (e.g., `src/validators/productSchemas.ts`) for reusability.

#### API Documentation (Swagger)
- **Do:** Use a library like `swagger-jsdoc` and `swagger-ui-express` to generate interactive API documentation from JSDoc comments in your route files.
- **Do:** Keep the documentation in sync with every API change. Document all endpoints, parameters, request bodies, and response codes.

#### Logging (Winston)
- **Do:** Configure Winston with multiple "transports" (e.g., a console transport for development and a file/cloud transport for production).
- **Do:** Log all critical errors, application startup events, and important business transactions including encountered issues while performing tasks, unauthorized feature access attempts, login attempts, capturing client requests and server responses, application shutdowns, authentication success or failure verification, operations involving higher risks like deletion, addition, status changes, payments, and network connections.
- **Do:** Use structured logging (JSON format) in production to make logs easily searchable and parsable.

#### Error Handling
- **Do:** Create a centralized error handling middleware that is the last middleware added to your Express app.
- **Do:** This middleware should catch all errors (including async ones), log them, and send a standardized, user-friendly JSON error response.
- **Don't:** Let the client see raw stack traces or database error messages.

#### Security
- **Do:** Use the `helmet` middleware to set essential security-related HTTP headers.
- **Do:** Configure the `cors` middleware to only allow requests from your frontend's domain.
- **Do:** Sanitize user-generated content before storing or rendering it to prevent XSS attacks.
- **Do:** Use parameterized queries (which Sequelize does by default) to prevent SQL injection.

#### Caching (Redis)
- **Do:** Use Redis to cache data that is frequently read but infrequently updated (e.g., a list of all products, a user's profile).
- **Do:** Implement a clear cache invalidation strategy. When data is updated (e.g., a product's price changes), ensure the corresponding cache key is deleted.

#### Environment Variables (`dotenv`)
- **Do:** Use `dotenv` to load environment variables from a `.env` file during development.
- **Do:** Access all environment-dependent values (database credentials, secret keys, etc.) via `process.env`.
- **Do:** Create a `.env.example` file that lists all required variables, but with placeholder or no values.
- **Don't:** Ever commit the `.env` file to version control.

#### Configuration
- **Do:** Create a seperate config directory in the backend root to host all service config files (e.g. database, redis, passport) 
- **Do:** Expose the configured instances to 
- **Do:** Middleware, Controllers, services and all other application layers should use these exposed instances to perform required actions
