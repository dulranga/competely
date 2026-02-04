# Backend Implementation for Round Management

This document explains the backend infrastructure created to support dynamic management of Competition Rounds.

## Overview

The implementation follows a 3-layer architecture:
1.  **Context Layer**: determining *which* competition is active.
2.  **Data Access Layer (DAL)**: direct database interactions.
3.  **Server Actions**: public API for the frontend to invoke database operations.

## File Breakdown

### 1. `src/data-access/competitions/get-active-competition.ts`

**Purpose**: Resolves the context. It figures out which competition the user is currently managing.

**How it works**:
*   It looks at the User's **Session**.
*   It retrieves the `activeOrganizationId` from the session (set by Better Auth).
*   It queries the `competitions` table to find the competition associated with that Organization ID.
*   **Why implementation matters**: This prevents us from having to pass `competitionId` effectively "blindly" from the client, ensuring operations are always scoped to the user's currently active context.

### 2. `src/data-access/timeline/rounds.ts`

**Purpose**: The raw database operations for the `competition_rounds` table.

**Functions**:
*   `getCompetitionRounds(competitionId)`: Fetches all rounds for a given competition, sorted by creation date.
*   `createCompetitionRound(competitionId, name)`: Inserts a new row into the `competition_rounds` table.
*   `updateCompetitionRound(roundId, name)`: Updates the name of a specific round.
*   `deleteCompetitionRound(roundId)`: Removes a round from the database.

### 3. `src/lib/actions/competition-rounds.ts`

**Purpose**: The bridge between the Client (UI) and the Server (Database). These are **Server Actions** (`"use server"`).

**Key Responsibilities**:
*   **Safety**: It calls `getActiveCompetition()` first to ensure valid context before doing anything.
*   **Logic**:
    *   `fetchRoundsAction()`: It has a special logic check. If it fetches rounds and finds *none*, it automatically creates a default "Registration" round. This ensures the UI is never empty for a fresh competition.
*   **Revalidation**: After mutating data (Create/Update/Delete), it calls `revalidatePath("/dashboard/timeline")`. This tells Next.js to purge the cache for the timeline page so the user sees the new data immediately without refreshing.
