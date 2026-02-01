import { string } from "zod";

export const phoneNumber = string().regex(/^\+[1-9]\d{1,14}$/, {
    message: "Phone number must be in E.164 format (e.g., +33612345678)",
});
