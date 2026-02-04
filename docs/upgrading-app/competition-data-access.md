# Data Access Layer: Competitions

**Location**: `src/data-access/competitions/`

This directory handles all database interactions related to Competition entities. These functions are typically reused across Server Actions and Server Components.

## Files Analysis

### 1. `createCompetition.ts`
*   **Function**: `createCompetition(data: CreateCompetitionSchema)`
*   **Purpose**: Creates a new competition and its associated organization.
*   **Logic**:
    1.  Generates a URL-friendly slug from the competition name.
    2.  Checks for slug uniqueness using `checkSlugExists`.
    3.  Creates a Better Auth **Organization** first (since every competition maps to an organization).
    4.  Inserts a new record into the `competitions` table linked to that organization.
*   **Status**: **USED**
    *   **Consumer**: `src/app/(authenticated)/create/actions.ts` (Server Action)
    *   **Flow**: User submits "Create Competition" form -> Server Action calls this function.

### 2. `getAllCompetitions.ts`
*   **Function**: `getAllCompetitions()`
*   **Purpose**: Fetches a list of highly relevant, published competitions for public discovery.
*   **Logic**:
    *   Performs a SQL `SELECT` on `competitions`.
    *   **Joins**:
        *   `organizations`: To get the organizer's name.
        *   `files`: To get the banner image details.
    *   **Ordering**: Newest created first (`desc(createdAt)`).
*   **Status**: **USED**
    *   **Consumer**: `src/app/(public)/discover/page.tsx`
    *   **Flow**: Populates the initial "Recently Visited" or "All Competitions" list on the Discover page.

### 3. `getUserCompetitions.ts`
*   **Function**: `getUserCompetitions()`
*   **Purpose**: Fetches competitions that the **current logged-in user** is managing or involved in.
*   **Logic**:
    1.  Gets the current user's session.
    2.  Queries `competitions` table.
    3.  **Joins**:
        *   `members`: Filter where `members.userId` == `currentUser.id`.
    *   **Result**: Returns only competitions where the user has a membership role.
*   **Status**: **USED**
    *   **Consumer**: `src/app/(authenticated)/create/page.tsx`
    *   **Flow**: Displays the "Your Competitions" list on the Create/Dashboard landing page, allowing users to select a competition to manage.

### 4. `searchCompetitions.ts`
*   **Function**: `searchCompetitions(query: string)`
*   **Purpose**: Full-text search for competitions based on user input.
*   **Logic**:
    *   Accepts a `query` string.
    *   Performs a `SELECT` with a `WHERE` clause using `OR` logic:
        *   `OR( organization.name LIKE query, competition.tagline LIKE query )`
    *   Returns matching competitions with organization and banner details.
*   **Status**: **USED**
    *   **Consumer**: `src/app/(public)/discover/page.tsx`
    *   **Flow**: Used when a user types into the search bar on the Discover page.

### 5. `setActiveCompetition.ts`
*   **Function**: `setActiveCompetition(competitionId: string)`
*   **Purpose**: Switches the user's "Active Context" to a specific competition.
*   **Logic**:
    1.  Finds the `organizationId` associated with the given `competitionId`.
    2.  Calls Better Auth API `setActiveOrganization` to update the user's session.
    *   *Note*: This is crucial for role-based access control (RBAC), as permissions are often scoped to the "active organization".
*   **Status**: **USED**
    *   **Consumer**: `src/app/(authenticated)/dashboard/competition/page.ts` (Likely a middleware or page initialization step).
    *   **Flow**: When a user clicks "Manage" on a competition, this function ensures their session context is updated so subsequent actions apply to that specific competition.
