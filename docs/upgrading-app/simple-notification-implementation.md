# Simple Notification Implementation Plan

This plan outlines the steps to implement a simple notification dropdown in the authenticated header.

## Goal
Replace the current static notification icon with a functional dropdown that shows notifications fetched from the server and includes a "See more" link to the full notifications page.

## Proposed Changes

### 1. Server Action
**File:** `src/data-access/delegate/actions.ts`
-   Create a new server action `getNotificationsAction`.
-   This action will:
    -   Get the current user session using `getUserSession` (or similar auth check).
    -   Call `getNotifications(userId)` from `src/data-access/delegate/notifications.ts`.
    -   Return the list of notifications.

### 2. Notification Dropdown Component
**File:** `src/components/notifications/notification-dropdown.tsx` (New File)
-   **Type:** Client Component (`"use client"`).
-   **Dependencies:** `useQuery` (TanStack Query), `DropdownMenu` components, `Bell` icon.
-   **Functionality:**
    -   Fetch notifications using `getNotificationsAction`.
    -   Display a list of notifications (limited to top 5 or scrollable).
    -   Display "See more" button at the bottom pointing to `/notifications`.
    -   Show unread indicator if there are notifications (simplification: if list > 0, or just always show icon).
    -   **Note**: Read/Unread status logic is not implemented yet, so all fetched notifications will be shown.

### 3. Header Integration
**File:** `src/components/ui/header-authenticated.tsx`
-   Import `NotificationDropdown`.
-   Replace the existing `<Button>` containing the Bell icon with `<NotificationDropdown />`.

## Verification Plan

### Manual Verification
1.  **Start the server**: `npm run dev`.
2.  **Login**: Access the dashboard.
3.  **Check Header**: Verify the Bell icon is present.
4.  **Open Dropdown**: Click the Bell icon.
    -   Verify the dropdown opens.
    -   Verify notifications are listed (if any exist in DB).
    -   *Edge Case*: If DB is empty, verify "No notifications" message (or empty state).
5.  **Navigation**: Click "See more".
    -   Verify redirection to `/notifications`.

### Data Verification
-   Since the current UI uses dummy data, the dropdown might show different data (real DB data) vs the page (dummy data). This is expected per requirements.
