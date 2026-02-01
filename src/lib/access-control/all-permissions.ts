/**
 * Used by both client & server
 */

import { PermissionUnion } from "~/types/permissions";

export const allPermissions = {
    // better auth level perms
    user: ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "unban", "reset-2fa"],
    session: ["list", "revoke", "delete"],
    files: ["read_own", "read_all", "create"],
} as const;

// Resulting type
export type Permission = PermissionUnion<typeof allPermissions>;
