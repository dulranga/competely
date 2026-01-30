import { msg } from "@lingui/core/macro";
import { z } from "zod";

export const getPhoneNumberSchema = (t: (msg: any) => string) =>
  z.string().regex(/^\+[1-9]\d{1,14}$/, {
    message: t(msg`Phone number must be in E.164 format (e.g., +33612345678)`),
  });

/**
 * @deprecated Use getPhoneNumberSchema(t) instead for i18n support
 */
export const phoneNumber = z.string().regex(/^\+[1-9]\d{1,14}$/, {
  message: "Phone number must be in E.164 format (e.g., +33612345678)",
});
