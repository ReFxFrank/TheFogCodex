# The Fog Codex

A polished, fast, dark-themed **Dead by Daylight builds & perk knowledgebase** with a community layer. Every curated build renders as a visual in-game-style loadout, backed by a complete cross-linked perk encyclopedia, a ⌘K command palette — and a sign-in-gated community where players publish their own builds, rate them, and comment.

> **Unofficial fan-made resource.** Not affiliated with or endorsed by Behaviour Interactive. Dead by Daylight and all related characters, perks, names and marks are the property of their respective owners. All effect text is paraphrased; all character/perk art is generated placeholder.

---

## ✨ Features

**Curated knowledgebase (no backend needed):**

- **Visual loadouts** — every build is a row of in-game-style perk slots, not a bullet list.
- **Honest signal** — meta tier (S/A/B/C/off-meta) _and_ difficulty, with *Why it works / Trade-offs / Best against* notes.
- **Deep cross-linking** — tap any perk → its page → every build that uses it. The whole site is a graph.
- **Meta-history flags** — notable perks carry a "was-OP / nerfed / controversial" note (Pain Resonance, Dead Hard, Eruption…).
- **⌘K command palette** — fuzzy search across builds, perks and characters, plus quick actions and a randomizer.
- **URL-serialized filters** — every filtered view of `/builds` and `/perks` is a shareable link.
- **Build sandbox** (`/builds/new`) — draft a loadout and share it as an encoded URL.
- **Favorites** — heart any build; persisted to `localStorage`, no account needed.

**Community layer (database + auth):**

- **Accounts** via GitHub/Google OAuth **or** email + password (Auth.js / NextAuth v5, JWT sessions).
- **Publish your own builds** from the sandbox to `/community`.
- **Star ratings** (1–5) and **threaded comments** on community builds.
- **Profile** (`/profile`) listing everything you've shared; delete your own builds and comments.
- **Staff panel** (`/staff`) with roles (user / moderator / admin): manage users, change roles, ban/unban, and remove any build, comment, or account. Banned users can't post.

## 🧱 Tech stack

Next.js 15 (App Router, RSC, TypeScript strict) · Tailwind CSS v4 · Radix UI · cmdk · Fuse.js · lucide-react. The community layer adds **Auth.js v5**, **Drizzle ORM** (pure TS — no native binary), and **Postgres** (via `node-postgres`).

The curated content is typed data under `src/data` and renders **fully static**. Only the community/auth routes (`/community`, `/profile`, `/login`, `/api/auth/*`) touch the database and render dynamically — so the bulk of the site stays cacheable and fast.

---

## 🚀 Quick start (development)

```bash
npm install
cp .env.example .env.local        # then fill in the values (see below)
npm run db:migrate                # create the tables in your Postgres DB
npm run dev                       # http://localhost:3000
```

Browsing works immediately. Sign-in/community features need a database and OAuth credentials configured in `.env.local`.

## 🔐 Environment & setup

Copy `.env.example` to `.env.local` and set:

| Variable | What it is |
| --- | --- |
| `DATABASE_URL` | Postgres connection string, e.g. `postgresql://user:pass@localhost:5432/fogcodex` |
| `AUTH_SECRET` | Random secret — generate with `npx auth secret` or `openssl rand -base64 33` |
| `AUTH_TRUST_HOST` | `true` when self-hosting behind a proxy / on a bare server |
| `AUTH_GITHUB_ID` / `AUTH_GITHUB_SECRET` | GitHub OAuth app ([create one](https://github.com/settings/developers), callback `<url>/api/auth/callback/github`) |
| `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` | Google OAuth client ([create one](https://console.cloud.google.com/apis/credentials), callback `<url>/api/auth/callback/google`) |
| `AUTH_URL` | Your public site URL (e.g. `https://thefogcodex.com`) when running behind a proxy/domain |
| `STAFF_ADMIN_EMAILS` | Comma-separated emails auto-promoted to **admin** on sign-in (bootstraps the staff panel) |

OAuth is optional — **email + password sign-up always works**, even with no providers configured.

### Staff & moderation

Roles are `user` → `moderator` → `admin`. The staff panel lives at `/staff` (hidden from everyone else) and lets staff manage users, builds, and comments.

- **Bootstrap an admin:** put your email in `STAFF_ADMIN_EMAILS`, then sign in — you're promoted to admin automatically. (Or set it directly: `UPDATE "user" SET role='admin' WHERE email='you@example.com';`)
- **Admins** can change roles, ban/unban, and delete users, builds, and comments.
- **Moderators** can ban regular users and delete any build or comment.
- Nobody can act on someone at or above their own role, or on themselves. Banned users can't publish, rate, or comment.

**Database migrations** (Drizzle):

```bash
npm run db:generate   # regenerate SQL after editing src/db/schema.ts
npm run db:migrate    # apply pending migrations (uses DATABASE_URL)
npm run db:studio     # optional: browse the DB in Drizzle Studio
```

## 📦 Production on Ubuntu

Requires **Node.js ≥ 18.18** (Node 20 LTS recommended — see `.nvmrc`) and a reachable Postgres.

```bash
# 1) Postgres (one box example)
sudo apt update && sudo apt install -y postgresql
sudo -u postgres psql -c "CREATE ROLE fog LOGIN PASSWORD 'change-me';"
sudo -u postgres psql -c "CREATE DATABASE fogcodex OWNER fog;"

# 2) App
nvm install 20 && nvm use 20      # or: sudo apt install -y nodejs npm
npm ci
cp .env.example .env.local        # fill in DATABASE_URL, AUTH_SECRET, OAuth creds
npm run db:migrate                # create tables
npm run build
npm run start                     # http://localhost:3000  (PORT=8080 to change)
```

Keep it alive with **pm2** (`pm2 start "npm run start" --name fog-codex`) or **systemd**:

```ini
# /etc/systemd/system/fog-codex.service
[Unit]
Description=The Fog Codex
After=network.target postgresql.service

[Service]
WorkingDirectory=/srv/fog-codex
ExecStart=/usr/bin/npm run start
EnvironmentFile=/srv/fog-codex/.env.local
Environment=NODE_ENV=production
Restart=always
User=www-data

[Install]
WantedBy=multi-user.target
```

Put Nginx in front for TLS/port 80 if exposing publicly.

## 🐳 Docker

A multi-stage `Dockerfile` builds the app and runs `next start`.

```bash
docker build -t fog-codex .
docker run -p 3000:3000 --env-file .env.local fog-codex
# (point DATABASE_URL at a reachable Postgres — e.g. a linked container or host)
```

## ▲ Vercel

Import the repo (zero config for the app). Add a hosted Postgres (Vercel Postgres / Neon / Supabase) and set the env vars in the dashboard; run `db:migrate` against it once.

---

## 🗂️ Project structure

```
src/
  app/
    page.tsx                 # landing
    builds/ perks/ characters/ about/   # curated, static content
    builds/new/              # sandbox (+ publish-to-community)
    community/               # /community, /community/[slug]  (dynamic, DB)
    profile/  login/         # auth-gated pages (dynamic)
    actions/community.ts     # server actions: publish / rate / comment / delete
    api/auth/[...nextauth]/  # Auth.js route handlers
    globals.css              # "Fog Glass" design tokens
  components/ui|app/         # primitives + domain components
  data/                      # curated content (perks, characters, builds, meta-notes)
  db/                        # Drizzle schema + Postgres client
  lib/                       # cn(), search (Fuse), placeholders, community queries
  auth.ts                    # Auth.js (NextAuth v5) config
  types.ts                   # domain types
drizzle/                     # generated SQL migrations
```

## ➕ Adding curated content

All curated content is plain typed data — no database needed. Slugs are the join keys.

- **Build** → append to `src/data/builds.ts` (unique `slug`, four valid `perkSlugs`, etc.; `featured: true` surfaces it on the landing page).
- **Perk** → append to `src/data/perks.ts`.
- **Character** → append to `src/data/characters.ts`.
- **Meta-history flag** → add an entry to `src/data/meta-notes.ts`.

(Community builds, by contrast, are user-submitted and live in Postgres.)

## 🎨 Dropping in real art

Components render generated SVG placeholders by default. To use real images:

- **Perk** → drop `public/images/perks/<slug>.png` and set the perk's `icon` field in `perks.ts`.
- **Character** → drop `public/images/characters/<slug>.png` and set the character's `portrait` field.

## 📊 How builds are rated

See [`/about`](http://localhost:3000/about). In short: **meta tier** = how strong right now; **difficulty** = how hard to pilot — kept independent on purpose. Killer tiers are approximate community estimates that shift each patch.
