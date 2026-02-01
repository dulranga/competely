/**
 * Used by both client & server
 */

import { PermissionUnion } from "~/types/permissions";

export const allOrgPermissions = {
    organization: ["update", "delete"],
    member: ["create", "update", "delete", "list"],
    invitation: ["create", "cancel"],
} as const;

// Resulting type
export type OrgPermission = PermissionUnion<typeof allOrgPermissions>;
