# Notification System Upgrade Guide

This document outlines the requirements and design for the upgraded notification system, covering notification types, UI behavior, database schema, server actions, and message templates.

## 1. Notification Types & Visual Distinction

The system will support three distinct types of notifications. To differentiate them visually, we will use **3 distinct shades/colors** (e.g., borders or background accents).

### 1. Delegate Side
*   **Purpose**: Notifications related to a user's participation in competitions.
*   **Examples**:
    *   Competition registration confirmation.
    *   Elimination / Selection for the next round.
    *   Competition announcements.
    *   Timeline event reminders (e.g., "Submission deadline in 1 hour").
*   **Visual Style**: Type `delegate` (e.g., Blue/Neutral shade).

### 2. OC (Organizing Committee) Side
*   **Purpose**: Notifications for competition organizers.
*   **Examples**:
    *   "Competition X created successfully".
    *   "Competition X published successfully".
    *   OC member / Judge invitations.
    *   Analytics milestones (e.g., "100 participants reached").
*   **Visual Style**: Type `oc` (e.g., Gold/Orange shade).

### 3. System
*   **Purpose**: Platform-level alerts and achievements.
*   **Examples**:
    *   System warnings (e.g., "Password expiring").
    *   User Milestones (e.g., "Registered for 10 competitions").
*   **Visual Style**: Type `system` (e.g., Red/Alert shade).

---

## 2. User Interface (UI) Behavior

### Read/Unread & Truncation Logic

#### Unread vs. Read
*   **Unread**: Bold text or highlighted background.
*   **Read**: Normal text, dimmed background.

#### Handling Long Messages
*   **Default View**: Only a part of the message (summary/truncated version) is visible initially.

#### Interaction Flow
1.  **Notification Click (Dropdown/Preview)**:
    *   Clicking a long message in the preview/dropdown redirects the user to the **Notification Page** (`/notifications`).
    *   The specific notification should be highlighted or focused.

2.  **Notification Page (`src/app/(authenticated)/notifications/page.tsx`)**:
    *   **Unread Messages**: Can be read by clicking on them.
    *   **Expand/Collapse**:
        *   **Clicking** the unread/read message container increases the height of the component to reveal the **whole message**.
        *   **"Show Less"**: An arrow button appears when expanded to collapse the message back to its truncated state.

---

## 3. Database Schema Update

The `notifications` table structure will be updated to include the following fields.

**Target File**: `src/db/schemas/notifications.ts` (Already Implemented)

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `uuid` | Primary Key. |
| `is_read` | `boolean` | Read status (default: `false`). |
| `title` | `text` | Short header/title of the notification. |
| `type` | `text` | Enum: `delegate`, `oc`, `system`. |
| `message` | `text` | The full body content of the notification. |
| `link` | `text` | (Nullable) URL to redirect to (e.g., specific competition dashboard). |
| `link_label` | `text` | (Nullable) Text to display for the link button. |
| `user_id` | `text` | Foreign Key to Users table. |
| `created_at` | `timestamp` | Timestamp of creation. |

---

## 4. Server Actions

We need to implement server actions to handle reading and writing notifications.

### Write Action (Create Notification)
*   **Function**: `createNotification`
*   **Inputs**: `userId`, `title`, `type`, `message`, `link` (optional), `linkLabel` (optional).
*   **Logic**: Inserts a new record into the `notifications` table.

### Read Actions
1.  **Fetch Notifications**:
    *   **Function**: `getNotifications`
    *   **Logic**: Retrieve notifications for a specific user, ordered by `created_at` DESC.
2.  **Mark as Read**:
    *   **Function**: `markNotificationAsRead`
    *   **Inputs**: `notificationId`.
    *   **Logic**: Updates `is_read` to `true` for the given ID.

---

## 5. Sample Message Templates

Helper functions for these templates have been implemented in `src/data-access/delegate/notification-templates.ts`. You should use these functions to trigger notifications instead of manually calling `createNotification`.

### Implemented Templates
*   `notifyCompetitionRegistration`
*   `notifyRoundResult`
*   `notifyTimelineReminder`
*   `notifyAnnouncement`
*   `notifyCompetitionCreated`
*   `notifyCompetitionPublished`
*   `notifyInvitationAccepted`
*   `notifyAnalyticsMilestone`
*   `notifySystemWarning`
*   `notifySystemMilestone`
*   `notifyInvitedToJudge`
*   `notifyInvitedToJoinOC`
