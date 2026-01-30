//! this is temporarily disabled for the schema gen in better-auth to work
//! should be turned on when deploying to prod
import "server-only";

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins";
import db from "~/db/client";
import * as schema from "~/db/schema";
// import * as dbViews from "~/db/views";
// import * as enums from "~/db/enums";
import { accessControl, roles } from "./access-control/ac-system";
import { sendEmail } from "./email";
import logger from "./logger";

// better auth
export const auth = betterAuth({
  appName: "Ape-X OBS",
  logger: {
    disabled: false,
    level: "error",
    log: (level, message, ...args) => {
      // Custom logging implementation
      logger.log(`[Better Auth] [${level}] ${message}`, args);
    },
  },
  rateLimit: {
    window: 10, // time window in seconds
    max: 100, // max requests in the window
  },

  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema: {
      ...schema,
      // ...dbViews,
      // ...enums,
    },
  }),

  emailAndPassword: {
    requireEmailVerification: true,
    enabled: true,
    signUp: {
      enabled: true,
      fields: ["email", "password", "name"],
    },
    login: {
      enabled: true,
      fields: ["email", "password"],
    },
    sendResetPassword: async ({ user, url }) => {
      // If the user has no password or was just created, this is an invitation

      sendEmail({
        emailAddress: user.email,
        subject: "Reset your password",
        // template: PasswordReset,
        data: {
          userName: user.name,
          resetUrl: url,
        },
      });
    },
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      sendEmail({
        emailAddress: user.email,
        subject: "Verify your email address",
        // template: EmailVerification,
        data: {
          userName: user.name,
          verificationUrl: url,
        },
      });
    },
  },

  socialProviders: {
    google: {
      enabled: true,
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    },

    facebook: {
      enabled: true,
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    },
  },

  advanced: {
    cookiePrefix: "ape-x-obs",
  },

  // trustedOrigins: ["https://*.obspower.fr", "https://obspower.fr", "http://localhost:3010"],

  plugins: [
    admin({
      ac: accessControl,
      roles: roles,
    }),
  ],
});
