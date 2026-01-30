import { Role as BetterAuthRole, createAccessControl } from "better-auth/plugins/access";
import { allPermissions } from "./all-permissions";
import { Role } from "./roles";

export const accessControl = createAccessControl(allPermissions);

export const roles: Record<Role, BetterAuthRole> = {
    admin: accessControl.newRole({
        user: ["create", "list", "set-role", "ban", "unban", "reset-2fa", "set-password"],
    }),
    user: accessControl.newRole({
        user: [],
    }),
};
