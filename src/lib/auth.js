import "server-only";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const mongoUrl = process.env.MONGODB_URL || process.env.MONGODB_URI;
if (!mongoUrl) throw new Error("Set MONGODB_URL in your .env file.");

const client =
  globalThis.bazarMongoClient ||
  new MongoClient(mongoUrl, {
    serverSelectionTimeoutMS: 5000,
  });
if (process.env.NODE_ENV !== "production") globalThis.bazarMongoClient = client;
const db = client.db(process.env.MONGODB_DB_NAME || "bazar-dor");

export const enabledProviders = {
  google: Boolean(
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET,
  ),
};

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  onAPIError: {
    errorURL: "/signin?reason=social-error",
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: false,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },
  database: mongodbAdapter(db, { client }),
  socialProviders: {
    ...(enabledProviders.google && {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      },
    }),
  },
});
