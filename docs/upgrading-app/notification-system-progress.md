# Notification System Upgrade - Progress Tracker

## Phase 1: Foundation & Backend (Completed)
- [x] **Documentation**: Updated `docs/upgrading-app/notification-system-upgrade.md` with types, UI behavior, and schema.
- [x] **Database Schema**: Updated `notifications` table with `isRead`, `title`, `type`, `link`, `linkLabel`.
- [x] **Data Access**: Implemented `createNotification`, `getNotifications`, `markAsRead` logic.
- [x] **Server Actions**: Implemented `getNotificationsAction`, `markAsReadAction`, `markAllAsReadAction`.
- [x] **Refactoring**: Moved actions to `src/data-access/delegate/actions/notifications.ts` for better organization.
- [x] **Templates**: Created `src/data-access/delegate/notification-templates.ts` with standardized helper functions.
- [x] **Cleanup**: Removed redundant `sendRegistrationNotification` from core data access file.

## Phase 2: Frontend Implementation (Pending)
- [ ] **Notification Components**
    - [ ] Create `NotificationItem` component (Display title, message, time, proper styling based on type).
    - [ ] Implement text truncation for long messages.
    - [ ] Add "Mark as Read" interaction.
- [ ] **Header Dropdown**
    - [ ] Fetch recent notifications.
    - [ ] Display unread count badge.
    - [ ] "See All" link to full page.
- [ ] **Notification Page (`/notifications`)**
    - [ ] List all notifications.
    - [ ] Implement Expand/Collapse for long messages.
    - [ ] "Mark All as Read" button.

## Phase 3: Integration & Testing (Pending)
- [ ] **Trigger Notifications**: Integrate `createNotification` into key flows (Registration, Competition Creation).
- [ ] **Real-time Updates** (Optional/Future): Polling or WebSockets for new notifications.
- [ ] **Verification**: Test all notification types and interactions.
