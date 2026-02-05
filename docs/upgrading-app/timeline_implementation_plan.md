# Timeline & Round Management Implementation Plan

## Goal
Fix the competition timeline functionality to enforce a mandatory "Registration" round with a single, unique timeline card, and enable managing multiple rounds with their own events.

## User Review Required
> [!IMPORTANT]
> **Database Changes**: I propose adding an `isSystem` boolean flag to `competition_rounds` and `competition_events` tables to robustly identify and protect the "Registration" round and its default event, rather than relying on name string matching ("Registration").
>
> **"Registration" Event Data**: The "Registration" round's single card will utilize a special `competition_events` record. This allows it to hold `description` and `resources` like any other event, while its `startDate` and `endDate` will be synced/displayed from the Competition's main settings ("fetched from editor").

## Proposed Changes

### Database Schema
#### [MODIFY] [competition-timeline-schema.ts](file:///c:/Users/sithu/My%20Works/My%20Softwares/Competitions/Devthon3_26/Competely_v1/src/db/schemas/competition-timeline-schema.ts)
- Add `isSystem` (boolean, default false) to `competitionRounds`.
- Add `isSystem` (boolean, default false) to `competitionEvents`.

### Server Actions
#### [MODIFY] [competition-rounds.ts](file:///c:/Users/sithu/My%20Works/My%20Softwares/Competitions/Devthon3_26/Competely_v1/src/data-access/competitions/actions/competition-rounds.ts)
- Update `fetchRoundsAction`:
    - Ensure "Registration" round creation sets `isSystem: true`.
    - Ensure it also creates a default "Registration Period" event with `isSystem: true` if missing.
- Update `deleteRoundAction`: Throw error if `isSystem` is true.
- Update `updateRoundAction`: Throw error if `isSystem` is true (for name change).

#### [MODIFY] [competition-events.ts](file:///c:/Users/sithu/My%20Works/My%20Softwares/Competitions/Devthon3_26/Competely_v1/src/data-access/competitions/actions/competition-events.ts)
- Update `createEventAction`: Throw error if `roundId` belongs to a system round (Registration).
- Update `deleteEventAction`: Throw error if `isSystem` is true.

### Frontend Components

#### [MODIFY] [RoundSidebar.tsx](file:///c:/Users/sithu/My%20Works/My%20Softwares/Competitions/Devthon3_26/Competely_v1/src/components/dashboard/secondary-sidebars/RoundSidebar.tsx)
- Disable "Delete" and "Rename" actions for rounds where `isSystem` (or name "Registration" if flag not available in UI type yet) is true.
- Handle selection state: Pass the selected `roundId` up to the parent or update URL search param `?roundId=...` so the Timeline view knows what to display.

#### [MODIFY] [page.tsx](file:///c:/Users/sithu/My%20Works/My%20Softwares/Competitions/Devthon3_26/Competely_v1/src/app/(authenticated)/dashboard/timeline/page.tsx)
- Read `roundId` from URL search params (or default to the first round, likely "Registration").
- Fetch events using `fetchEventsAction(roundId)`.
- If "Registration" round is selected:
    - Disable "Add Event" button.
    - Render the "Registration" event card.
        - Fetch competition details (start/end date) to display.
        - Allow editing Description and Resources (calls `updateEventAction`).
- If other round is selected:
    - Enable "Add Event" button.
    - Render list of events sorted by `startDate`.
    - Allow CRUD on events.

### Utils / Validation
#### [MODIFY] [timeline.schema.ts](file:///c:/Users/sithu/My%20Works/My%20Softwares/Competitions/Devthon3_26/Competely_v1/src/lib/schemas/timeline.schema.ts)
- Ensure validation permits the specific updates needed for the Registration event (e.g. description only, preserving system dates).

## Verification Plan

### Automated Tests
- None currently exist. I will verify manually.

### Manual Verification
1.  **Registration Round**:
    - Load Timeline page. Verify "Registration" round exists and is selected by default.
    - try to Rename/Delete "Registration" -> Should be disabled or error.
    - Verify "Add Event" button is disabled.
    - Edit the Description of the Registration card -> Save -> Reload -> Verify persistence.
    - Verify dates match the Competition's global start/end dates.
2.  **Custom Rounds**:
    - Create a new Round "Round 1".
    - Select "Round 1".
    - Verify "Add Event" button is enabled.
    - Create an Event "Hackathon Start" -> Verify it appears.
    - Create another Event "Hackathon End" -> Verify they sort by date.
    - Delete "Round 1" -> Verify success.
