/**
 * Used by both client & server
 */

import type { PermissionUnion } from "~/types/permissions";

export const allPermissions = {
  // better auth level perms
  user: [
    "create",
    "list",
    "set-role",
    "ban",
    "impersonate",
    "delete",
    "set-password",
    "unban",
    "reset-2fa",
  ],
  session: ["list", "revoke", "delete"],
} as const;

// Resulting type
export type Permission = PermissionUnion<typeof allPermissions>;
