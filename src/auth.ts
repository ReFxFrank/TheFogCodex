import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";
import { users, accounts, sessions, verificationTokens } from "@/db/schema";

// ============================================================
// Auth.js (NextAuth v5) — GitHub + Google OAuth, backed by the
// Drizzle/Postgres adapter with database sessions.
//
// Reads AUTH_SECRET and AUTH_<PROVIDER>_ID / _SECRET from the env.
// A provider with missing credentials simply can't be used to sign
// in — it doesn't break the build or the rest of the site.
// ============================================================

const providers = [
  ...(process.env.AUTH_GITHUB_ID ? [GitHub] : []),
  ...(process.env.AUTH_GOOGLE_ID ? [Google] : []),
];

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers,
  session: { strategy: "database" },
  trustHost: true,
  pages: { signIn: "/login" },
  callbacks: {
    session({ session, user }) {
      if (session.user) session.user.id = user.id;
      return session;
    },
  },
});

/** Provider ids that are actually configured (drive the /login UI). */
export const enabledProviders = {
  github: Boolean(process.env.AUTH_GITHUB_ID),
  google: Boolean(process.env.AUTH_GOOGLE_ID),
};
