/**
 * Used by both client & server
 */

import z from "zod";

export const orgRoles = ["owner", "oc_member", "delegate", "judge"] as const;
export type OrgRole = (typeof orgRoles)[number];

export const orgRolesSchema = z.enum(orgRoles);
