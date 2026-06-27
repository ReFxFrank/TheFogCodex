# The Fog Codex

A polished, fast, dark-themed **Dead by Daylight builds & perk knowledgebase**. Every build renders as a visual in-game-style loadout, backed by a complete, cross-linked perk encyclopedia and a ⌘K command palette.

> **Unofficial fan-made resource.** Not affiliated with or endorsed by Behaviour Interactive. Dead by Daylight and all related characters, perks, names and marks are the property of their respective owners. All effect text is paraphrased; all character/perk art is generated placeholder.

---

## ✨ Features

- **Visual loadouts** — every build is a row of in-game-style perk slots, not a bullet list.
- **Honest signal** — each build carries a meta tier (S/A/B/C/off-meta) _and_ a difficulty rating, with explicit *Why it works / Trade-offs / Best against* notes.
- **Deep cross-linking** — tap any perk → its page → every build that uses it. The whole site is a graph.
- **Meta-history flags** — notable perks carry a "was-OP / nerfed / controversial" note (e.g. Pain Resonance, Dead Hard, Eruption).
- **⌘K command palette** — fuzzy search across builds, perks and characters at once, plus quick actions and a randomizer.
- **URL-serialized filters** — every filtered view of `/builds` and `/perks` is a shareable link; back/forward works.
- **Build sandbox** (`/builds/new`) — draft a loadout and share it as an encoded URL.
- **Favorites** — heart any build; persisted to `localStorage`, no account needed.
- **Survivor (cool teal) / Killer (crimson) accent split** across the whole UI.

## 🧱 Tech stack

Next.js 15 (App Router, RSC, TypeScript strict) · Tailwind CSS v4 · Radix UI primitives · cmdk · Fuse.js · lucide-react. **No database, no API** — all content is typed data under `src/data`, statically rendered.

---

## 🚀 Quick start (development)

```bash
npm install
npm run dev
# open http://localhost:3000
```

## 📦 Production build & run on Ubuntu

Requires **Node.js ≥ 18.18** (Node 20 LTS recommended — see `.nvmrc`).

```bash
# 1. Install Node 20 (via nvm, recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
nvm install 20 && nvm use 20

#    …or via apt:
#    sudo apt update && sudo apt install -y nodejs npm

# 2. Install, build, run
npm ci                 # clean, reproducible install from package-lock.json
npm run build          # produces an optimized static/SSG build
npm run start          # serves on http://localhost:3000

# Use a different port:
PORT=8080 npm run start
```

That's the entire deployment for a single Ubuntu box. To keep it running, use a process manager:

**pm2**

```bash
npm i -g pm2
pm2 start "npm run start" --name fog-codex
pm2 save && pm2 startup
```

**systemd** (`/etc/systemd/system/fog-codex.service`)

```ini
[Unit]
Description=The Fog Codex
After=network.target

[Service]
WorkingDirectory=/srv/fog-codex
ExecStart=/usr/bin/npm run start
Environment=NODE_ENV=production
Environment=PORT=3000
Restart=always
User=www-data

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl enable --now fog-codex
```

Put Nginx in front of it as a reverse proxy for TLS/port 80 if exposing publicly.

## 🐳 Docker

The app is configured with `output: "standalone"`, so the image is tiny and self-contained.

```bash
docker build -t fog-codex .
docker run -p 3000:3000 fog-codex
```

## ▲ Vercel

Push to GitHub and import the repo — zero configuration. Framework auto-detected as Next.js.

---

## 🗂️ Project structure

```
src/
  app/                     # routes (App Router)
    page.tsx               # landing
    builds/                # /builds, /builds/[slug], /builds/new (sandbox)
    perks/                 # /perks, /perks/[slug]
    characters/            # /characters, /characters/[slug]
    about/                 # /about — how builds are rated, disclaimer, sources
    globals.css            # "Fog Glass" design tokens + utilities
  components/
    ui/                    # shadcn-style primitives (Button)
    app/                   # domain components (PerkSlot, BuildCard, CommandPalette…)
  data/                    # ← all content lives here (typed, no DB)
    perks.ts               # the perk knowledgebase
    characters.ts          # the roster
    builds.ts              # the build library
    meta-notes.ts          # "was-OP / nerfed" meta-history annotations
    addons.ts, offerings.ts# loadout-extras stubs
    index.ts               # in-memory index + the cross-link graph
  hooks/                   # use-favorites (localStorage store)
  lib/                     # cn(), search (Fuse), placeholders
  types.ts                 # all domain types (union types derived from as-const arrays)
```

## ➕ Adding content

All content is plain typed data — no database, no admin panel. Slugs are the join keys, so keep them consistent.

- **Add a build** → append to `src/data/builds.ts`. Give it a unique `slug`, exactly four `perkSlugs` (each must exist in `perks.ts`), an optional `characterSlug`, archetypes, `difficulty`, `metaTier`, and the honest copy fields. Set `featured: true` to surface it on the landing page.
- **Add a perk** → append to `src/data/perks.ts` (unique `slug`, `role`, `categories`, paraphrased `description`, optional `characterSlug` owner and `tierHint`).
- **Add a character** → append to `src/data/characters.ts` (their `perkSlugs` should reference perks that exist in the Codex).
- **Add a meta-history flag** → add a `slug: "note"` entry to `src/data/meta-notes.ts`.

The build will fail loudly if types don't line up; cross-references resolve at load time via `src/data/index.ts`.

## 🎨 Dropping in real art

Art is optional — components render tasteful generated SVG placeholders by default. To use real images:

- **Perk icon** → drop `public/images/perks/<slug>.png` and set that perk's `icon: "/images/perks/<slug>.png"` field in `perks.ts`.
- **Character portrait** → drop `public/images/characters/<slug>.png` and set the character's `portrait` field in `characters.ts`.

## 📊 How builds are rated

See [`/about`](http://localhost:3000/about) in the running app. In short: **meta tier** = how strong right now; **difficulty** = how hard to pilot — kept independent on purpose. Killer tiers are approximate community estimates and shift each patch.
