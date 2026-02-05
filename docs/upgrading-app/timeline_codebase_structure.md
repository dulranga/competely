# Competition & Timeline Codebase Structure

This document outlines the key files and directories responsible for Competition Creation, Round Management, and the Timeline functionality. It groups them by feature and architectural layer to clarify their relationships.

## 1. Competition Creation Module
Handles the initialization of new competitions.

### **Frontend & Pages**
- **`src/app/(authenticated)/create/page.tsx`**: The entry page for creating a new competition.
- **`src/app/(authenticated)/create/actions.ts`**: Server actions specific to the creation form submission.

### **Data Access & Business Logic**
- **`src/data-access/competitions/createCompetition.ts`**: Core function to insert a new competition record into the database.
- **`src/db/schemas/competitions-schema.ts`**: Defines the `competitions` table structure (title, dates, status, etc.).

---

## 2. Timeline & Round Management Module
Handles the scheduling of the competition, including Rounds (Phases) and Events.

### **Frontend: Pages & View**
- **`src/app/(authenticated)/dashboard/timeline/page.tsx`**: The main dashboard page for managing the timeline. It fetches rounds/events and renders the interactive timeline.

### **Frontend: Components**
- **`src/components/timeline/TimelineCard.tsx`**: The reusable UI component for displaying an event or phase card. Handles rendering for different variants (default, edit mode, vertical/horizontal).
- **`src/components/dashboard/secondary-sidebars/RoundSidebar.tsx`**: The sidebar component that lists all rounds. Handles round creation and deletion interactions.
- **`src/components/dashboard/secondary-sidebars/RoundItem.tsx`**: Individual list item for a round in the sidebar. logic for "System" vs "Custom" rounds (e.g., disabling delete for Registration).
- **`src/components/dashboard/modals/modals/CreateEventModal.tsx`**: The form modal for creating and editing events. Handles input validation, date picking, and file resource uploads.

### **Data Access: Server Actions (API Layer)**
- **`src/data-access/competitions/actions/competition-rounds.ts`**: Server actions called by the frontend.
    - `fetchRoundsAction`: Gets all rounds, auto-creates "Registration" round if missing.
    - `createRoundAction`, `updateRoundAction`, `deleteRoundAction`: CRUD wrappers with business logic (e.g., protecting System rounds).
- **`src/data-access/competitions/actions/competition-events.ts`**: Server actions for events.
    - `fetchEventsAction`: Gets events for a specific round.
    - `createEventAction`, `updateEventAction`, `deleteEventAction`: CRUD wrappers enforcing logic (e.g., "Registration" round constraints).

### **Data Access: Internal Database Helpers**
- **`src/data-access/competitions/timeline/rounds.ts`**: Direct database queries for rounds (insert, select, update).
- **`src/data-access/competitions/timeline/events.ts`**: Direct database queries for events and resources. Handles transaction logic for saving event resources (links/files).

### **Database Schemas**
- **`src/db/schemas/competition-timeline-schema.ts`**: Defines the tables:
    - `competition_rounds`: Grouping entities (e.g., "Registration", "Round 1").
    - `competition_events`: Specific checkpoints (e.g., "Submission Deadline").
    - `competition_event_resources`: Attachments (links or files) for events.

---

## 3. Shared Infrastructure
Utilities used across these modules.

- **`src/lib/schemas/timeline.schema.ts`**: Zod validation schemas for forms (e.g., `createEventSchema`).
- **`src/components/form-inputs/FileUpload.tsx`**: Generic file upload component used in the Event Modal.
- **`src/app/api/upload/route.ts`**: API route handling file uploads.
- **`src/lib/storage.ts`**: Utility for saving files (currently local storage, adaptable to S3).
