# Public Competition Page Architecture

This document explains the architecture, file structure, and dynamic nature of the Public Competition Page in **Competely**.

## Overview

The Public Competition Page (`/c/[competitionId]`) is designed as a **Hybrid Server/Client architecture**.
-   **Server-Side:** Fetches all competition data, security checks (isRegistered, isBookmarked), and SEO metadata.
-   **Client-Side:** Handles interactive elements like the Countdown, Registration logic, and dynamic Timeline rendering.

## File Structure

### Core Page
-   **Entry Point**: `src/app/(public)/c/[competitionId]/page.tsx`
    -   This is a **Server Component**.
    -   It resolves the `competitionId` from the URL parameters.
    -   It calls `getPublicCompetitionDetails(competitionId)` to fetch all necessary data.
    -   It renders the `CompetitionPageContent` component, passing the fetched data.

### Main Content Component
-   **Location**: `src/components/competition-page/CompetitionPageContent.tsx`
    -   This is the **orchestrator component**.
    -   It receives the raw data and transforms it for specific child components.
    -   **Dynamic Data Transformation**:
        -   **Timeline Events**: It extracts events from nested rounds, filters for `addToTimeline: true`, sorts them by date, and maps them to the structure required by the timeline UI.

### Key Sub-Components
All components are located in `src/components/competition-page/`.

| Component | Type | Responsibility |
| :--- | :--- | :--- |
| **HeroSection** | UI | Displays the Banner, Logo, Organization Name, tagline, and key dates. It also shows the "Registered" badge if applicable. |
| **TimelineSection** | Client | Renders the horizontal scrollable timeline. It receives the *transformed* events from `CompetitionPageContent`. It uses `CompetitionCard` (Variant 3) to display event nodes. |
| **CountdownSection** | Client | A real-time countdown timer to the registration deadline. It uses `setInterval` to update the remaining time every second without server requests. |
| **RegistrationCard** | Client | Displays the registration "Call to Action" and any linked resources (files/links). It handles the **Registration Logic** (checking session, deadline, and opening the registration modal). |
| **RegisterButton** | Client | A standalone button that replicates the logic of the RegistrationCard, used in the Hero section for quick access. |
| **InfoCard** | UI | Displays social links and static deadline info. |
| **PrizesSection** | UI | Renders the list of prizes. |
| **ContactUsSection** | UI | Displays contact information for the organizers. |

## Data Flow & Dynamic Nature

### 1. Data Fetching
Data is fetched on the server using `src/data-access/competitions/public/get-details.ts`.
-   **Optimization**: It uses a single deep query (`db.query.competitions.findFirst`) to retrieve the competition, organization, rounds, events, prizes, and resources in one go.
-   **Personalization**: It checks the current user's session to determine `isBookmarked` and `isRegistered` status, allowing the page to show "You are registered" banners dynamically.

### 2. Timeline Logic
The timeline is **not** static.
-   **Source**: `data.rounds`.
-   **Filtering**: Only events with `addToTimeline: true` are shown.
-   **Status Calculation**: The `getEventStatus` helper function determines if an event is "Upcoming", "Active", or "Completed" based on current server time vs. event start/end dates.

### 3. Registration Logic
The registration flow is dynamic and secure:
1.  **Deadline Check**: `RegisterButton` checks if the current time > `registrationDeadline`. If passed, it disables the button.
2.  **Auth Check**: If the user is not logged in, it redirects to `/login` with a callback URL.
3.  **Form Handling**: If the competition has a custom form connected, it opens the `RegistrationFormModal`. Should no form exist, it calls the `registerToCompetitionAction` directly.

## Connected Files
-   `src/data-access/competitions/public/get-details.ts`: Core data fetching logic.
-   `src/data-access/delegate/actions/competitions.ts`: Server actions for registering users (`registerToCompetitionAction`).
-   `src/components/timeline/TimelineCard.tsx`: Reused component for rendering timeline nodes.
