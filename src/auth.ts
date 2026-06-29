import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users, accounts, sessions, verificationTokens } from "@/db/schema";
import { verifyPassword } from "@/lib/password";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import type { StaffRole } from "@/types";

// ============================================================
// Auth.js (NextAuth v5).
//
// Providers: GitHub + Google OAuth (when configured) and an
// email/password Credentials provider as a universal fallback.
//
// Because Credentials requires JWT sessions, the whole app uses
// the "jwt" strategy. To keep role/ban changes immediate, the
// session callback re-reads role + banned from the database on
// each session lookup.
// ============================================================

const adminEmails = (process.env.STAFF_ADMIN_EMAILS ?? "")
  .split(",")
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);

const oauthProviders = [
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
  session: { strategy: "jwt" },
  trustHost: true,
  pages: { signIn: "/login" },
  providers: [
    ...oauthProviders,
    Credentials({
      name: "Email & password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(creds) {
        // Throttle credentials sign-in attempts per IP to blunt brute force.
        const ip = await clientIp();
        if (!rateLimit(`login:${ip}`, 12, 60_000)) return null;

        const email = String(creds?.email ?? "").trim().toLowerCase();
        const password = String(creds?.password ?? "");
        if (!email || !password) return null;
        const rows = await db
          .select()
          .from(users)
          .where(eq(users.email, email))
          .limit(1);
        const user = rows[0];
        if (!user?.passwordHash) return null;
        if (!verifyPassword(password, user.passwordHash)) return null;
        if (user.banned) return null;
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Block banned users from establishing a session (OAuth path).
      if (!user?.id) return true;
      try {
        const rows = await db
          .select({ banned: users.banned })
          .from(users)
          .where(eq(users.id, user.id))
          .limit(1);
        if (rows[0]?.banned) return false;
      } catch {
        /* allow on lookup error */
      }
      return true;
    },
    jwt({ token, user }) {
      if (user?.id) token.sub = user.id;
      return token;
    },
    async session({ session, token }) {
      if (!token.sub || !session.user) return session;
      try {
        const rows = await db
          .select()
          .from(users)
          .where(eq(users.id, token.sub))
          .limit(1);
        const u = rows[0];
        if (u) {
          session.user.id = u.id;
          session.user.role = (u.role as StaffRole) ?? "user";
          session.user.banned = u.banned;
          session.user.name = u.name ?? session.user.name;
          session.user.email = u.email ?? session.user.email;
          session.user.image = u.image ?? session.user.image;
        }
      } catch {
        // Fail closed: if we can't re-check the user, drop privileges and
        // treat them as banned for this request rather than granting access.
        session.user.id = token.sub;
        session.user.role = "user";
        session.user.banned = true;
      }
      return session;
    },
  },
  events: {
    async signIn({ user, account }) {
      // Bootstrap admins listed in STAFF_ADMIN_EMAILS — but ONLY for a
      // verified OAuth identity. Email/password accounts have no email
      // verification, so a self-asserted address must never grant admin
      // (otherwise anyone could register a listed email and seize it).
      if (account?.provider === "credentials") return;
      if (user?.id && user.email && adminEmails.includes(user.email.toLowerCase())) {
        try {
          await db.update(users).set({ role: "admin" }).where(eq(users.id, user.id));
        } catch {
          /* non-fatal */
        }
      }
    },
  },
});

/** Which sign-in methods are available (drives the /login + /register UI). */
export const enabledProviders = {
  github: Boolean(process.env.AUTH_GITHUB_ID),
  google: Boolean(process.env.AUTH_GOOGLE_ID),
  credentials: true,
};
