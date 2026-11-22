import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/db";
import * as schema from "@/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  user: {
    additionalFields: {
      phone: {
        type: "string",
        required: false,
        defaultValue: null,
        input: true,
      },
      dob: { type: "string", required: false, defaultValue: null, input: true },
    },
  },
  plugins: [nextCookies()],
});
