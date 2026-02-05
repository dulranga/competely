# Timeline & Round Implementation Status Report

## 1. Implemented Features

### Backend & Database
- **Schema Protection**: Added `isSystem` flag to `competition_rounds` and `competition_events` tables.
- **Automatic Initialization**:
    - `fetchRoundsAction` automatically creates a "Registration" round if one does not exist.
    - Safely creates a default "Registration Period" event within that round.
- **Business Logic Enforcement**:
    - **Rounds**: Prevents renaming or deleting any round marked `isSystem` (e.g., Registration).
    - **Events**: Prevents adding new events to the Registration round (enforcing the "single card" rule). Prevents deleting system events.
    - **Data/Date Syncing**: System Events (Registration) automatically inherit `startDate` and `endDate` from the main Competition settings during retrieval, ensuring the timeline always matches the global competition schedule.

### Frontend (UI/UX)
- **Round Management (Sidebar)**:
    - Lists all competition rounds.
    - **Selection**: Handle round selection via URL parameters.
    - **Contextual Actions**: Disable actions for System rounds.
- **Timeline View**:
    - **Dynamic Rendering**: Rendering changes based on the selected round.
    - **Registration View**: "Registration Period" card with competition-level dates.
    - **TimelineCard Component**: Now using the shared `TimelineCard` component for consistent UI.
- **Event Management**:
    - **Create**: Modal allows creating events (disabled for Registration round).
    - **Edit**: Clicking a timeline card opens the modal pre-filled with event data for editing.
    - **Delete**: "Delete" button visible on cards (except System events) to remove them.

## 2. Pending Implementation

### Enhancements (Should Do)
- **Form Connection**: The schema includes `connectFormId`, and the architecture doc mentions connecting a form. This UI picker is currently mocked or missing real data integration.
- **Loading States**: The transition between rounds currently uses a full-page loading spinner.

## 3. Current Limitations

- **Database Migration**: The migration to add `isSystem` was **not applied automatically** due to warnings about potential data loss (unrelated table drops). 
    - *Impact*: The code expects columns that might not exist yet if the user hasn't run the migration manually.
- **Single Registration Event**: The system strictly enforces *one* event for the "Registration" round.
- **Manual Sorting**: Events are sorted by `startDate` automatically.

## 4. Next Steps Recommendation
1.  **Verify Migration**: Ensure the `is_system` columns are correctly added to your production/dev database.
2.  **Form Integration**: Fully implement the form picker with real form data.
