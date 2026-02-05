# Timeline & Event Architecture Overview

This document provides a technical overview of the competition timeline and event functionality in the Competely application. It details how data is structured, accessed, and presented to the user.

## 1. Database & Schemas

The foundation of the timeline functionality lies in the database schemas and their relationships.

### `src/db/schemas/competition-timeline-schema.ts`
Defines the PostgreSQL tables using Drizzle ORM.
- **`competitionRounds`**: Represents phases of a competition (e.g., "Registration", "Semi-Finals").
  - Linked to `competitions` via `competitionId`.
- **`competitionEvents`**: Specific events within a round (e.g., "Submission Deadline", "Workshop").
  - Linked to `competitionRounds` via `roundId`.
  - fields: `name`, `type`, `startDate`, `endDate`, `location`, `description`, etc.
- **`competitionEventResources`**: Resources (URLs or Files) attached to an event.
  - Linked to `competitionEvents` via `eventId`.

### `src/lib/schemas/timeline.schema.ts`
Defines **Zod** schemas for frontend validation, primarily used in forms.
- **`createEventSchema`**: Validates the input for creating/editing an event.
  - Ensures start/end dates are valid, resources have URLs/Files, and custom types are handled correctly.

### `src/db/relations.ts`
Defines the relationships between the tables for Drizzle Queries (`db.query...`).
- **`competitionsRelations`**: A Competition has many `rounds`.
- **`competitionRoundsRelations`**: A Round belongs to a `competition` and has many `events`.
- **`competitionEventsRelations`**: An Event belongs to a `round` and has many `resources`.

## 2. Data Access Layer

This layer handles communication between the application and the database. It is split into **Server Actions** (callable from Client Components) and **Internal Data Access** (direct DB operations).

### Server Actions (Public API) `src/data-access/competitions/actions/`
- **`competition-rounds.ts`**:
  - `fetchRoundsAction`: Gets rounds for the active competition. Creates a default "Registration" round if none exist.
  - `createRoundAction`, `updateRoundAction`, `deleteRoundAction`: Basic CRUD wrappers.
- **`competition-events.ts`**:
  - `fetchEventsAction`: Gets events for a specific round.
  - `createEventAction`, `updateEventAction`, `deleteEventAction`: Basic CRUD wrappers.

### Internal Data Access (Private) `src/data-access/competitions/timeline/`
- **`rounds.ts`**:
  - `getCompetitionRounds`: DB query to list rounds ordered by creation.
  - CRUD functions using `db.insert`, `db.update`, `db.delete`.
- **`events.ts`**:
  - `getEventsByRound`: DB query to list events with their `resources`.
  - `createCompetitionEvent`: **Transaction** that creates an event AND its resources safely.
  - `updateCompetitionEvent`: **Transaction** that updates event details and performs a "delete-all-insert-new" strategy for resources to ensure consistency.

## 3. Frontend Architecture

The frontend is built using React Server Components (Next.js App Router) and Client Components.

### Dashboard Page `src/app/(authenticated)/dashboard/timeline/page.tsx`
- The main entry point for the Timeine view.
- Currently uses **Mock Data** (`events` array) to render the UI.
- Contains the `CreateEventModal` for adding new events.
- Displays a list of events visually.

### Components `src/components/dashboard/` & `src/components/timeline/`
- **`CreateEventModal.tsx`**:
  - Uses `react-hook-form` and `zodResolver` (`createEventSchema`) to handle form state and validation.
  - Calls `createEventAction` (mocked in the file currently as a timeout) to submit data.
- **`RoundSidebar.tsx`**:
  - Fetches and displays the list of rounds using `fetchRoundsAction`.
  - Allows creating/renaming/deleting rounds via `RoundItem`.
- **`RoundItem.tsx`**:
  - Represents a single round in the sidebar.
  - Handles inline editing and delete confirmation.
- **`Timeline.tsx`**:
  - A horizontal scrollable timeline visualization.
  - Shows events placed on a timeline axis.
- **`VerticalTimeline.tsx`**:
  - A vertical list view of events.
  - Includes a "Calendar" view mode using `react-day-picker`.

## 4. How It All Connects

1.  **Viewing the Timeline**:
    - User visits `/dashboard/timeline`.
    - `page.tsx` renders. (Currently static, needs to fetch real data using `fetchRoundsAction` -> `fetchEventsAction`).

2.  **Managing Rounds**:
    - Sidebar (`RoundSidebar`) loads rounds from DB.
    - User clicks "Add Round" -> calls `createRoundAction` -> DB Insert -> UI updates.

3.  **Creating an Event**:
    - User clicks "Add Event" -> `CreateEventModal` opens.
    - User fills form (validated by `timeline.schema.ts`).
    - User submits -> `onSubmit` calls `createEventAction`.
    - `createEventAction` calls `createCompetitionEvent` (DB Transaction).
    - `revalidatePath` triggers a refresh of the logical route to show new data.

## 5. Upgrade Path (Next Steps)

To fully connect the pieces:
1.  **Update `page.tsx`**: Replace mock `events` array with actual data fetching using `fetchEventsAction` (or a direct server component DB call).
2.  **Connect Modal**: In `CreateEventModal`, replace the `setTimeout` mock with the actual `createEventAction`.
3.  **State Management**: Ensure selecting a Round in the sidebar updates the events shown in the main view (likely via URL query params like `?roundId=...` or client-state).
