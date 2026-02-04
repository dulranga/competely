# Current State Analysis: Competition Card & Bookmarks

**Date:** 2026-02-03
**Status:** Frontend Mock / Static Implementation

## Overview
The competition discovery and bookmarking features are currently implemented as **static frontend prototypes**. They utilize mock JSON data and hardcoded components. There is **no connection** to the PostgreSQL database for these features yet, despite the schema (`bookmarks` table) being ready.

## 1. Components & Data Sources

### A. `CompetitionCard.tsx`
*   **Location**: `src/components/discovery/CompetitionCard.tsx`
*   **Functionality**:
    *   Visual card displaying title, status, organizer, etc.
    *   **Bookmarking**: Handles bookmark state **internally** using `useState`.
    *   **Interaction**: Clicking the bookmark icon toggles the visual state (filled/unfilled) only for that session.
    *   **Persistence**: **None**. Refreshing the page resets all bookmarks. It does not call any API or Server Action.

### B. Discover Page (`DiscoverContent.tsx`)
*   **Location**: `src/components/discovery/DiscoverContent.tsx`
*   **Data Source**: Imports strictly from a JSON file:
    ```typescript
    import competitionsData from "~/components/sample-data/competitions.json";
    ```
*   **Functionality**:
    *   Maps over the JSON data to render `CompetitionCard` components.
    *   `handleSearch` and filters work by filtering this local JSON array.
    *   Does **not** fetch from the `competitions` database table.

### C. Bookmarks Page (`/bookmarks/page.tsx`)
*   **Location**: `src/app/(authenticated)/bookmarks/page.tsx`
*   **Data Source**: **Hardcoded JSX**.
    *   The page does not even use the JSON file. It contains multiple `<CompetitionCard />` elements written directly in the code with static props.
*   **Functionality**:
    *   Purely visual demonstration.
    *   Shows what a grid of cards *would* look like.
    *   One card has `isBookmarked={true}` hardcoded to demonstrate the active state.

## 2. Database Status
*   **Schema**: The `bookmarks` table has been successfully created and migrated to Supabase.
    *   Fields: `user_id`, `competition_id`, `is_bookmarked`, `createdAt`.
*   **Integration**: **0%**. No query reads from this table, and no mutation writes to it.

## 3. Summary of Gaps
| Feature | Current State | Required State |
| :--- | :--- | :--- |
| **Data Source** | `competitions.json` / Hardcoded JSX | Fetch from `competitions` DB table |
| **Bookmarking** | Local `useState` (temporary) | Server Action (Effect DB `bookmarks` table) |
| **Bookmarks Page** | Static hardcoded list | Query DB for `competitions` joined with `bookmarks` for current user |
| **Persistence** | Lost on refresh | Persisted in PostgreSQL |
