# Codebase Explanation: data-access, lib, and hooks

This document provides a detailed explanation of the files and directories located within `src/data-access`, `src/lib`, and `src/hooks`.

## 1. `src/data-access`
This directory contains the **Data Access Layer (DAL)**. It is responsible for all direct interactions with the database and server-side logic related to fetching, creating, or updating data. By separating this logic from UI components, the code becomes more reusable, secure, and easier to test.

### **Root Files**
- **`checkSlugExists.ts`**:
  - **Purpose**: Checks if a specific organization "slug" (a unique URL-friendly identifier) already exists in the system.
  - **Usage**: Used during organization or competition creation to ensure unique URLs.
  - **Dependencies**: `auth` (Better Auth) API.

- **`forms.ts`**:
  - **Purpose**: Manages dynamic forms that are associated with competitions.
  - **Key Functions**:
    - `getFormsByCompetition`: Fetches all forms linked to a specific competition.
    - `getFormById`: Retrieves a single form by its ID.
    - `createForm`: Creates a new form for the currently active organization. Checks if the user has an active organization session.
    - `updateForm`: Updates a form's details (name, description, published state).
    - `deleteForm`: Removes a form.
    - `setFormFields`: Replaces all fields in a form with a new set (using a transaction to ensure data integrity). This supports a "builder" pattern where the entire form state is saved at once.

- **`getCurrentUser.ts`**:
  - **Purpose**: Helper functions to safely retrieve the current user's session and details on the server side.
  - **Key Functions**:
    - `getUserSession`: Gets the full session object. Redirects to `/login` if no session exists (protecting routes).
    - `getUser`: Returns just the `user` object from the session. Uses React `cache` to avoid duplicate DB calls in a single request.

- **`rate-limit.ts`**:
  - **Purpose**: Implements rate limiting to prevent abuse (e.g., brute-force attacks).
  - **Logic**: Uses a PostgreSQL table (`rateLimits`) to track request counts by IP or User ID.
  - **Key Components**:
    - `checkRateLimit`: Low-level function handling atomic DB updates to track usage windows.
    - `rateLimit`: Wrapper that identifies the requester (IP or User ID) and checks limits.
    - `withRateLimit`: A Higher-Order Function (HOC) for wrapping Server Actions to automatically apply rate limits.

- **`save-interests.ts`**:
  - **Purpose**: Manages user interests (e.g., tags or categories a user follows).
  - **Logic**: Performs a "delete then insert" transaction to overwrite previous interests with the new selection.

### **Subdirectories**
- **`competitions/`**:
  - **`createCompetition.ts`**: Handles the logic for creating a new competition. It auto-generates a slug, creates an organization via Better Auth, and then inserts the competition record into the database.
  - **`getUserCompetitions.ts`**: Fetches a list of competitions that the current user is a member of.
  - **`setActiveCompetition.ts`**: Context-switching logic. Used to set which "Competition" (Organization) the user is currently acting within.

---

## 2. `src/hooks`
This directory contains **Custom React Hooks**. These are reusable logic units used across client-side components to manage state, UI interactions, and browser events.

- **`use-counter.ts`**:
  - **Purpose**: A simple hook for managing a numeric counter.
  - **Features**: `increment`, `decrement`, `reset`, `setCount`.

- **`use-debounced-state.ts`**:
  - **Purpose**: Manages state that updates only after a delay (debounce).
  - **Usage**: Essential for search inputs or expensive operations where you don't want to trigger a re-render or API call on every single keystroke.

- **`use-mobile.ts`**:
  - **Purpose**: Detects if the user is viewing the app on a mobile device (width < 768px).
  - **Usage**: Used for responsive UI updates (e.g., switching between sidebar and drawer navigation).

- **`use-path-with-searchparams.ts`**:
  - **Purpose**: Returns the full current URL path including the query string (e.g., `/dashboard?tab=analytics`).
  - **Usage**: Useful for preserving navigation state or redirection logic.

- **`use-toggle.tsx`**:
  - **Purpose**: Manages boolean state (true/false) with a simple helper to toggle it.
  - **Usage**: Perfect for modals, dropdowns, or collapsible sections.

---

## 3. `src/lib`
This directory contains **core utilities, configurations, and shared libraries**. It acts as the backbone of the application, handling authentication, validation, logging, and helper functions.

### **Authentication & Access Control**
- **`auth.ts`**:
  - **Purpose**: The main configuration file for **Better Auth**.
  - **Details**: Configures database storage (Drizzle), social providers (Google, Facebook), email/password login, plugins (Admin, Organization), and email sending hooks.
- **`auth-client.ts`**: checks
  - **Purpose**: The client-side instance of Better Auth. Used in React components to check sessions, login/logout, etc.
- **`access-control/`**:
  - **Purpose**: Defines system-wide permissions (Role-Based Access Control).
  - **Files**:
    - `ac-system.ts`: Initializes the Better Auth access control plugin.
    - `roles.ts`: Defines system roles (`admin`, `user`).
    - `all-permissions.ts`: Lists all available permissions (e.g., `user:create`, `files:read_own`).
    - `permissions.server.ts`: Server-side utilities (`hasPermissionServer`) to check user rights.
    - `resolveWhere.ts`: Helper to generate database `WHERE` clauses based on permissions (e.g., admins see all, users see only their own).
- **`organization-access-control/`**:
  - **Purpose**: Similar to `access-control`, but specifically for **Organization** level permissions.
  - **Roles**: `owner`, `delegate`, `judge`, `oc_member`.
  - **Files**:
    - `org-ac-system.ts`: Initializes organization-level access control and defines permission sets for roles (e.g., Owners can delete, Judges can list).
    - `org-all-permissions.ts`: Dictionary of all valid permissions (e.g., `invitation:create`) to prevent typos.
    - `org-roles.ts`: Defines valid roles within an organization (`owner`, `oc_member`, etc.).
    - `org-permissions.client.ts`: Client-side permission checks for conditional UI rendering (e.g., hiding buttons).
    - `org-permissions.server.ts`: Secure server-side permission checks to protect backend logic and DB queries.

### **Schemas (Validation)**
located in `src/lib/schemas`. These files define **Zod** schemas used for validating data on both client (forms) and server (API requests).
- **`auth.schema.ts`**: Validation for login/signup (email format, password complexity).
- **`common.schema.ts`**: Reusable schemas like phone numbers.
- **`competition.schema.ts`**: Validation for creating competitions (dates, names, categories). Includes custom refinement to ensure end dates are after start dates.

### **Utilities & Helpers**
- **`storage.ts`**:
  - **Purpose**: Handles file uploads and retrieval.
  - **Features**: Wraps logic for saving files locally (in dev) or to AWS S3 (in production). Records file metadata in the database.
- **`logger.ts`**:
  - **Purpose**: Centralized logging system using **Winston**.
  - **Features**: JSON formatting for production, pretty-printing for development.
- **`email.ts`**:
  - **Purpose**: A wrapper for sending emails. currently logs email data to the console (development mode).
- **`isDev.ts`**: Simple helper to check `process.env.NODE_ENV`.
- **`utils.ts`**:
  - `cn`: Merges Tailwind classes (using `clsx` and `tailwind-merge`).
  - `slugify`: Converts text into URL-friendly slugs.
  - `mergeRefs`: Merges multiple React refs.
- **`format-file-size.ts`**: Human-readable file size strings (e.g., "1.5 MB").
- **`getAbsoluteUrl.ts`**: Constructs absolute URLs using the environment's base URL.
- **`toNodeFile.ts`**: Converts Web API `File`/`Blob` objects to Node.js buffers (useful for server actions).
- **`getRandomAvatar.ts`**: Generates a default avatar URL using a seed.

---

## 4. `src/db`
This directory holds the **Database Layer** configuration and schema definitions. It uses **Drizzle ORM** to interact with a PostgreSQL database.

### **Core Files**
- **`client.ts`**:
  - **Purpose**: Initializes the Drizzle ORM client.
  - **Usage**: Exports the `db` instance used throughout the app (e.g., in `data-access` queries). It loads all schemas and views so they are available for query building.
- **`enums.ts`**:
  - **Purpose**: Defines PostgreSQL ENUM types used in the database.
  - **Key Enums**:
    - `form_field_type`: Input types for dynamic forms (text, checkbox, file, etc.).
    - `competition_status`: State of a competition (draft, published, archived).
    - `competition_category`: Categories like tech, business, etc.
    - `file_category`: Categories for uploaded files.
- **`schema.ts`**:
  - **Purpose**: A central barrel file that exports all individual schema files. This allows the Drizzle client to register all tables at once.
- **`views.ts`**:
  - **Purpose**: Placeholder for database views (currently empty).

### **Schemas (`src/db/schemas/`)**
These files define the structure of database tables.

- **`auth-schema.ts`** (Authentication & User Management):
  - **Tables**:
    - `users`: Core user data (name, email, role, ban status).
    - `sessions`: Active login sessions (managed by Better Auth).
    - `accounts`: Linked social accounts (Google/Facebook OAuth data).
    - `verifications`: Tokens for email verification.
    - `organizations`: Groups/Communities (the core entity for competitions).
    - `members`: Links users to organizations with roles.
    - `invitations`: Pending invites to join an organization.
  - **Relations**: Defines how users relate to sessions, accounts, and organizations.

- **`competitions-schema.ts`**:
  - **Tables**:
    - `competitions`: The main competition entity. Linked to an `organization`. Includes metadata like dates, banner ID, and status.
  - **Relations**: Links competitions to their owning organization and banner image.

- **`files-schema.ts`**:
  - **Tables**:
    - `files`: Stores metadata for uploaded files (file key, size, type). The actual files are stored in S3 or local disk.
  - **Relations**: Links files to the user who uploaded them.

- **`forms-schema.ts`** (Dynamic Forms):
  - **Tables**:
    - `forms`: Represents a form (e.g., "Registration Form") belonging to a competition.
    - `formFields`: Individual fields within a form (with type, order, validation rules).
  - **Relations**: Forms belong to competitions; Fields belong to forms.

- **`interests-schema.ts`**:
  - **Tables**:
    - `userInterests`: A many-to-many link table storing user interests (e.g., "AI", "Design").

- **`rate-limit-schema.ts`**:
  - **Tables**:
    - `rateLimits`: Stores hit counts for rate limiting (key, count, expiry).
