/**
 * Used by both client & server
 */

import z from "zod";

export const userRoles = ["admin", "user"] as const;
export type Role = (typeof userRoles)[number];

export const rolesSchema = z.enum(userRoles);
