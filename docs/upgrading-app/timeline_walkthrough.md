# Timeline Architecture Walkthrough

I have implemented the requested changes to the Competition Timeline and Round Management system.

## Changes Overview

### 1. Database Schema
- Added `isSystem` boolean flag to `competition_rounds` and `competition_events` tables.
- This flag protects critical system-managed data (like the "Registration" round) from accidental deletion or renaming.

### 2. Registration Round Logic
- **Automatic Creation**: When accessing the Timeline, if no rounds exist, a specific "Registration" round is automatically created.
- **System Event**: A "Registration Period" event is automatically added to this round.
- **Data Sync**: The Registration event card on the timeline now displays the global Competition Start/End dates (managed in the Editor), ensuring consistency.
- **Protection**: 
  - The "Registration" round cannot be renamed or deleted.
  - The "Registration Period" event cannot be deleted, but its Description and Resources can be edited.
  - "Add Event" is disabled in the Registration round to strictly enforce the single-card requirement.

### 3. User Interface
- **Round Sidebar**:
  - Displays the list of rounds.
  - Handles selection state via URL parameters (`?roundId=...`).
  - Disables "Rename" and "Delete" options for the Registration round.
- **Timeline Page**:
  - Fetches and displays events for the selected round.
  - Shows the "Registration" card with special system event badging.
  - Allows adding/editing/deleting events for custom rounds.

## Verification Steps

Since the automated browser verification encountered an environment issue, please verify the following manually:

1.  **Navigate to Timeline**: Go to `http://localhost:5070/dashboard/timeline`.
2.  **Check Registration**:
    - You should see "Registration" in the sidebar.
    - The main view should show a single "Registration Period" card.
    - "Add Event" button should be hidden or disabled.
    - Dates on the card should match your Competition settings.
3.  **Round Management**:
    - Try to rename or delete the "Registration" round (should be blocked).
    - Click "Add Round" and create "Phase 1".
    - Select "Phase 1". "Add Event" button should now be visible.
    - Create a new event and verify it appears.
4.  **Database Migration (IMPORTANT)**:
    - I attempted to run `npx drizzle-kit push`, but it warned about potential **data loss** (deleting tables that might not be in the current schema definition).
    - **I aborted the migration to be safe.**
    - Please run `npx drizzle-kit push` manually and review the changes. You only need to apply the addition of the `is_system` column to `competition_rounds` and `competition_events`. Ensure other tables are not accidentally deleted due to schema mismatches.
