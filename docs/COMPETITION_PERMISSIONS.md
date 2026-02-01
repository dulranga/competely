# Competition & Organization Permissions Mapping

This document explains how Competely maps competitions to Better Auth organizations and how the dual-layered access control system (Global vs. Competition-scoped) works.

## 1. Core Concepts

In Competely, every **Competition** is internally represented by a Better Auth **Organization**. This allows us to leverage Better Auth's native multi-tenancy and organization management features.

| Competely Entity       | Better Auth Entity  | Role in Organization |
| :--------------------- | :------------------ | :------------------- |
| Competition            | Organization        | N/A                  |
| OC Member (Organizer)  | Organization Member | `oc_member`          |
| Delegate (Participant) | Organization Member | `delegate`           |
| Judge                  | Organization Member | `judge`              |
| Owner (Creator)        | Organization Owner  | `owner`              |

## 2. Access Control Layers

We use two distinct access control systems to separate platform-wide administrative actions from competition-specific operations.

### A. Root Level Access Control (Global)

- **Files**: [src/lib/access-control/ac-system.ts](src/lib/access-control/ac-system.ts), [src/lib/access-control/all-permissions.ts](src/lib/access-control/all-permissions.ts)
- **Scope**: Platform-wide settings, user management, global analytics.
- **Usage**:

    ```typescript
    import { hasPermissionServer } from "~/lib/access-control/permissions.server";

    // Check for platform-wide administrative permission
    const canBan = await hasPermissionServer("user:ban");
    ```

### B. Organization Access Control (Competition-Scoped)

- **Files**: [src/lib/organization-access-control/org-ac-system.ts](src/lib/organization-access-control/org-ac-system.ts), [src/lib/organization-access-control/org-all-permissions.ts](src/lib/organization-access-control/org-all-permissions.ts)
- **Scope**: Competition management, member lists, judging, registration.
- **Usage**:

    ```typescript
    import { hasOrgPermissionServer } from "~/lib/organization-access-control/org-permissions.server";

    // Check for competition-specific permission
    // This automatically checks against the user's active organization (active competition)
    const canListMembers = await hasOrgPermissionServer("member:list");
    ```

## 3. Active Context Selection

The dashboard's context (which competition you are currently managing/viewing) is determined by the `activeOrganizationId` in the Better Auth session.

1. When a user selects a competition from their "My Competitions" list, we set that competition's `organizationId` as the active one.
2. `hasOrgPermissionServer` then automatically queries permissions for that specific organization.
3. If a user has no active organization selected, organization-scoped permission checks will fail.

## 4. Permission Comparison

| Feature     | `hasPermissionServer`            | `hasOrgPermissionServer`                             |
| :---------- | :------------------------------- | :--------------------------------------------------- |
| **Context** | Global / User Profile            | Organization / Competition                           |
| **Source**  | Root level `roles`               | `orgRoles`                                           |
| **Example** | `user:set-role`                  | `member:list`                                        |
| **Logic**   | "Is this user a Platform Admin?" | "Does this user have this role in THIS competition?" |
