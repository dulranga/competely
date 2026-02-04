# Codebase Overview & Competition Timeline Analysis

This document provides an overview of key directories in the `src` folder and a specific analysis of the "Competition Timeline" feature.

## 1. Codebase Directory Analysis

### 1.1 `src/app/(authenticated)/dashboard`
This directory contains the main application pages for authenticated users.

*   **`layout.tsx`**: The root layout for the dashboard. It wraps all child pages in the `DashboardLayoutWrapper`. This ensures a consistent structure (sidebar, header) across the dashboard.
*   **`page.tsx`**: The main "Overview" page of the dashboard. It fetches and displays high-level metrics (e.g., Active Delegates, Open Submissions) and recent activity. It connects to the `DashboardLayoutWrapper` via the layout.
*   **`analytics/`**: Contains the analytics page/components.
*   **`competition/`**: Likely handles specific competition details.
*   **`editor/`**: Contains the landing page editor functionality.
*   **`forms/`**: Manages form creation and status viewing.
*   **`preview/`**: For previewing changes (e.g., forms or landing pages).
*   **`timeline/`**: The page for viewing the competition timeline (see Section 2).
*   **`users/`**: User management interface.

### 1.2 `src/components/dashboard`
Contains reusable UI components specifically for the dashboard layout and functionality.

*   **`DashboardLayoutWrapper.tsx`**: The main shell of the dashboard. It likely integrates the `Sidebar` and handles mobile responsiveness or layout state.
*   **`Sidebar.tsx`**: The navigation sidebar. It uses `usePathname` to highlight the active route and defines the navigation items (`sidebarItems` array). It supports "secondary sidebars" for complex features like the Editor.
*   **`SidebarProvider.tsx`**: Likely a Context Provider to manage sidebar state (collapsed/expanded) across the app.
*   **`SidebarSecondaryContent.tsx`**: A container for rendering the secondary sidebar content (e.g., specific tools when in "Editor" mode).
*   **`FormBuilder.tsx`**: A complex component for building forms (drag-and-drop or configuration based).
*   **`editor/`**: Components specific to the landing page editor.
*   **`modals/`**: Dashboard-specific modals (e.g., "Create Competition").
*   **`secondary-sidebars/`**: Contains the specialized sidebar contents (e.g., `EditorSidebar`, `FormBuilderSidebar`) referenced in `Sidebar.tsx`.

### 1.3 `src/data-access`
This layer handles all direct database interactions using Drizzle ORM. It abstracts SQL queries from the UI components.

*   **`competitions/`**:
    *   **`getAllCompetitions.ts`**: Fetches all published competitions, joining with `organizations` and `files` (for banners).
    *   **`getUserCompetitions.ts`**: Fetches competitions the current user is a member of.
    *   **`createCompetition.ts`**, **`searchCompetitions.ts`**, **`setActiveCompetition.ts`**: Self-explanatory mutation and search helpers.
*   **`delegate/`**: Code related to delegate functionality (e.g. `bookmarks.ts`).
*   **`checkSlugExists.ts`**: Utility to verify if a URL slug is unique.
*   **`forms.ts`**: Data access for form definitions and submissions.
*   **`getCurrentUser.ts`**: Helper to retrieve the current session/user securely.
*   **`rate-limit.ts`**: Database queries related to rate limiting logic.
*   **`save-interests.ts`**: Persists user interests.
*   **`searchUsers.ts`**: User search functionality.

### 1.4 `src/db`
Contains the Database schema definitions and client configuration.

*   **`client.ts`**: Initializes the Drizzle client and database connection.
*   **`schema.ts`**: The main entry point that exports all schema definitions.
*   **`relations.ts`**: Defines the relationships (one-to-many, many-to-one) between tables for Drizzle Query API.
*   **`schemas/`**: Breakdown of table definitions:
    *   `auth-schema.ts`: Users, sessions, accounts (Better Auth).
    *   `competitions-schema.ts`: Main `competitions` table.
    *   `competition-timeline-schema.ts`: Tables for `competition_rounds`, `competition_events`, etc.
    *   `files-schema.ts`, `forms-schema.ts`, `interests-schema.ts`, `rate-limit-schema.ts`: Other domain-specific tables.

### 1.5 `src/lib/organization-access-control`
Implements Role-Based Access Control (RBAC) specifically for Organizations.

*   **`org-ac-system.ts`**: Initializes the access control system using `better-auth/plugins/access`. Defines roles (`owner`, `delegate`, `judge`, `oc_member`) and their capabilities.
*   **`org-all-permissions.ts`**: Defines the granular permissions available (e.g., `member.list`, `organization.delete`).
*   **`org-roles.ts`**: TypeScript definitions for the roles.
*   **`org-permissions.client.ts` / `org-permissions.server.ts`**: Helpers to check permissions in client components or server actions respectively.

---

## 2. Competition Timeline Analysis

This feature allows users to view a timeline of events for a competition.

### 2.1 Related Files
1.  **`src/app/(authenticated)/timeline/page.tsx`**:
    *   **What it does**: The main entry page for the timeline.
    *   **Connection**: Renders the `VerticalTimeline` component.
2.  **`src/components/timeline/VerticalTimeline.tsx`**:
    *   **What it does**: The UI component that renders events in a vertical timeline or calendar view.
    *   **Connection**: Currently imports data from `~/components/sample-data/timeline.json`.
3.  **`src/db/schemas/competition-timeline-schema.ts`**:
    *   **What it does**: Defines the database tables:
        *   `competition_rounds`: Grouping of events (e.g., "Round 1").
        *   `competition_events`: Actual events with dates (e.g., "Submission Deadline").
        *   `competition_event_resources`: Files or URLs attached to an event.
4.  **`src/components/sample-data/timeline.json`**:
    *   **What it does**: Static JSON file containing mock timeline events.

### 2.2 Connectivity and Gaps (What is missing?)

**Current Status:** Disconnected.
The database schema exists and is well-structured, but the frontend is completely isolated from it, relying entirely on mock data.

**Specific Gaps:**
1.  **No Data Fetching**: There is no file in `src/data-access` (e.g., `src/data-access/competitions/timeline/get-timeline.ts`) to fetch events from the `competition_events` table.
2.  **No Type Safety Bridge**: The frontend `TimelineEvent` interface (in `VerticalTimeline.tsx`) does not match the Drizzle schema inference.
3.  **No Management UI**: There appears to be no interface to **add** or **edit** timeline events. Users cannot populate the `competition_events` table via the app.
4.  **Static Logic**: The `VerticalTimeline.tsx` component parses dates from strings in the JSON (`"NOV 03, 2025"`) instead of handling actual JavaScript `Date` objects returned by the database.

**Required Steps for Upgrade:**
1.  Create `src/data-access/competitions/timeline/get-competition-timeline.ts` to query `competition_events`.
2.  Update `VerticalTimeline.tsx` to accept events as props instead of importing JSON.
3.  Fetch the data in `src/app/(authenticated)/timeline/page.tsx` and pass it to the component.
