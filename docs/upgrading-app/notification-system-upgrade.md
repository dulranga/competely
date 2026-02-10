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

**Target File**: `src/db/schemas/notifications.ts`

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

Below are the standard templates for the different notification types.

### A. Delegate Side Templates

**1. Competition Registration**
*   **Title**: Registration Confirmed
*   **Message**: "You have successfully registered for **[Competition Name]**. Get ready to compete!"
*   **Link**: `/competitions/[id]`
*   **Link Label**: Go to Competition
*   **Type**: `delegate`

**2. Elimination / Advancement**
*   **Title**: Round [N] Results
*   **Message (Success)**: "Congratulations! You have been selected for the next round of **[Competition Name]**."
*   **Message (Eliminated)**: "Thank you for participating in **[Competition Name]**. Unfortunately, you did not qualify for the next round."
*   **Type**: `delegate`

**3. Timeline Reminder**
*   **Title**: Upcoming Event Reminder
*   **Message**: "The **[Event Name]** for **[Competition Name]** starts in 1 hour. Be prepared!"
*   **Link**: `/competitions/[id]/timeline`
*   **Type**: `delegate`

**4. Announcement**
*   **Title**: Announcement from [Competition Name]
*   **Message**: "[Custom Announcement Text provided by OC...]"
*   **Type**: `delegate`

### B. OC Side Templates

**1. Competition Creation**
*   **Title**: Competition Created
*   **Message**: "You have successfully created the draft for **[Competition Name]**. Complete the setup to publish it."
*   **Link**: `/organize/[id]/settings`
*   **Link Label**: Edit Settings
*   **Type**: `oc`

**2. Competition Published**
*   **Title**: Published Successfully
*   **Message**: "**[Competition Name]** is now live and visible to the public!"
*   **Link**: `/competitions/[id]`
*   **Type**: `oc`

**3. Invitations (Judge/OC)**
*   **Title**: Invitation Accepted
*   **Message**: "**[User Name]** has accepted your invitation to join **[Competition Name]** as a Judge."
*   **Type**: `oc`

**4. Analytics Milestone**
*   **Title**: Milestone Reached!
*   **Message**: "Congratulations! **[Competition Name]** has reached **100 participants**."
*   **Link**: `/organize/[id]/analytics`
*   **Type**: `oc`

### C. System Templates

**1. Warnings**
*   **Title**: Account Warning
*   **Message**: "We detected unusual activity on your account. Please verify your email."
*   **Type**: `system`

**2. Milestones**
*   **Title**: New Badge Earned
*   **Message**: "You've just hit a milestone: **Registered for 10 Competitions**! Keep it up."
*   **Type**: `system`
