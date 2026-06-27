import {
  pgTable,
  text,
  timestamp,
  primaryKey,
  integer,
  jsonb,
  unique,
  boolean,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

// ============================================================
// Database schema (Postgres via Drizzle ORM).
//
// The first four tables are the standard Auth.js adapter tables.
// The last three are the community layer: user-submitted builds,
// star ratings, and comments.
// ============================================================

// ---- Auth.js tables ----------------------------------------------------------

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  // Email/password accounts store a hash here; OAuth-only users leave it null.
  passwordHash: text("passwordHash"),
  // Staff / moderation.
  role: text("role").notNull().default("user"), // "user" | "moderator" | "admin"
  banned: boolean("banned").notNull().default(false),
  bannedReason: text("bannedReason"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    primaryKey({ columns: [account.provider, account.providerAccountId] }),
  ],
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => [primaryKey({ columns: [vt.identifier, vt.token] })],
);

// ---- Community layer ---------------------------------------------------------

export const communityBuilds = pgTable("community_build", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  authorId: text("authorId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  role: text("role").notNull(), // "survivor" | "killer"
  characterSlug: text("characterSlug"),
  perkSlugs: jsonb("perkSlugs").$type<string[]>().notNull(),
  archetypes: jsonb("archetypes").$type<string[]>().notNull(),
  difficulty: text("difficulty").notNull(),
  summary: text("summary").notNull(),
  whyItWorks: text("whyItWorks"),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
});

export const ratings = pgTable(
  "rating",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    buildId: text("buildId")
      .notNull()
      .references(() => communityBuilds.id, { onDelete: "cascade" }),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    value: integer("value").notNull(), // 1..5
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  },
  // One rating per user per build.
  (t) => [unique("rating_build_user_unique").on(t.buildId, t.userId)],
);

export const comments = pgTable("comment", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  buildId: text("buildId")
    .notNull()
    .references(() => communityBuilds.id, { onDelete: "cascade" }),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  body: text("body").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
});

export type CommunityBuildRow = typeof communityBuilds.$inferSelect;
export type CommentRow = typeof comments.$inferSelect;
