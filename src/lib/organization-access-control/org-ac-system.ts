import { Role as BetterAuthRole, createAccessControl } from "better-auth/plugins/access";
import { allOrgPermissions } from "./org-all-permissions";
import { OrgRole } from "./org-roles";

export const orgAccessControl = createAccessControl(allOrgPermissions);

export const orgRoles: Record<OrgRole, BetterAuthRole> = {
    owner: orgAccessControl.newRole({
        organization: ["delete", "update"],
        member: ["create", "delete", "update", "list"],
        invitation: ["create", "cancel"],
    }),
    delegate: orgAccessControl.newRole({
        member: ["list"],
    }),
    judge: orgAccessControl.newRole({
        member: ["list"],
    }),
    oc_member: orgAccessControl.newRole({
        member: ["list"],
    }),
};
