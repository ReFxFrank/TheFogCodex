import type { GameMap } from "@/types";

// ============================================================
// Map / realm knowledgebase — current as of 2026.
//
// Facts (realm, indoor/outdoor, rough size, licensed) are stable; the "lean"
// (which side a map favours) is a community read that moves every balance
// patch — it reflects the post-9.3.x pallet-density passes and is a guide, not
// an official stat. Descriptions are paraphrased; no copyrighted art is
// bundled (drop public/images/maps/<slug>.jpg to show a real image instead of
// the generated emblem).
//
// Note: Haddonfield (Lampkin Lane) was retired in Jan 2026 when its license
// lapsed, so it's intentionally not listed.
// ============================================================

export const MAPS: GameMap[] = [
  // ---------------- MacMillan Estate ----------------
  {
    slug: "coal-tower",
    name: "Coal Tower",
    realm: "MacMillan Estate",
    setting: "outdoor",
    size: "medium",
    lean: "balanced",
    tags: ["central-tower", "fair", "comp-staple"],
    summary: "The textbook 'fair' map — a central tower loop on even ground.",
    notes:
      "Coal Tower is often held up as the model balanced map: a central tower with a decent loop, even resource spread, and few surprises. It's a common pick for competitive play precisely because neither side gets a free ride.",
  },
  {
    slug: "groaning-storehouse",
    name: "Groaning Storehouse",
    realm: "MacMillan Estate",
    setting: "mixed",
    size: "medium",
    lean: "balanced",
    tags: ["large-main-building", "two-floor"],
    summary: "A large storehouse main building anchors an otherwise even map.",
    notes:
      "The storehouse is a sizeable two-floor structure that rewards survivors who play it well, but the rest of the map is even-handed — how the trial goes leans on the killer's ability to crack that building.",
  },
  {
    slug: "ironworks-of-misery",
    name: "Ironworks of Misery",
    realm: "MacMillan Estate",
    setting: "mixed",
    size: "medium",
    lean: "survivor",
    tags: ["strong-window", "strong-main-building"],
    summary: "Home to a famously safe elevated ironworks window.",
    notes:
      "The ironworks building's elevated window loop is hard to counter without the right power or Bamboozle, so it tilts slightly survivor. The surrounding map is average, leaving that one structure to define the chase.",
  },
  {
    slug: "shelter-woods",
    name: "Shelter Woods",
    realm: "MacMillan Estate",
    setting: "outdoor",
    size: "small",
    lean: "killer",
    tags: ["open", "deadzone-prone", "sparse-loops"],
    summary: "Famously barren — one big central tree and not much else.",
    notes:
      "The most open map in the game: a single landmark tree, sparse loops, and long gaps between resources. Once the pallets are spent it strongly favours the killer.",
  },
  {
    slug: "suffocation-pit",
    name: "Suffocation Pit",
    realm: "MacMillan Estate",
    setting: "mixed",
    size: "medium",
    lean: "balanced",
    tags: ["consistent-layout", "well-spaced"],
    summary: "A consistent, well-spaced layout with a sunken centre.",
    notes:
      "Resources are spaced evenly and the central building splits over two awkward levels. It's a fair, predictable map — neither side gets a structural gift.",
  },

  // ---------------- Autohaven Wreckers ----------------
  {
    slug: "azarovs-resting-place",
    name: "Azarov's Resting Place",
    realm: "Autohaven Wreckers",
    setting: "outdoor",
    size: "medium",
    lean: "balanced",
    tags: ["long-road", "readable-car-tiles"],
    summary: "A long road bisects readable rows of car tiles.",
    notes:
      "A central road splits the map into readable car-tile loops. It's fairly even — the open road helps the killer cut corners while the car piles give survivors something to work with.",
  },
  {
    slug: "blood-lodge",
    name: "Blood Lodge",
    realm: "Autohaven Wreckers",
    setting: "outdoor",
    size: "medium",
    lean: "balanced",
    tags: ["central-lodge", "mixed-pallets"],
    summary: "A central lodge surrounded by a mix of safe and unsafe pallets.",
    notes:
      "The lodge gives a solid central loop and the pallet spread is a mix of safe and unsafe — a generally balanced Autohaven map.",
  },
  {
    slug: "gas-heaven",
    name: "Gas Heaven",
    realm: "Autohaven Wreckers",
    setting: "outdoor",
    size: "medium",
    lean: "survivor",
    tags: ["gas-station-building", "hiding-spots"],
    summary: "A gas-station main with plenty of car-pile cover.",
    notes:
      "The gas station offers a reliable loop and the junkyard's car piles give survivors lots of cover, nudging this one slightly survivor-side.",
  },
  {
    slug: "wreckers-yard",
    name: "Wreckers' Yard",
    realm: "Autohaven Wreckers",
    setting: "outdoor",
    size: "medium",
    lean: "killer",
    tags: ["open-visibility", "few-interior-loops"],
    summary: "Open sightlines and few interior loops.",
    notes:
      "Good visibility for the killer and a shortage of strong interior loops make this one of the more killer-leaning Autohaven maps.",
  },
  {
    slug: "wretched-shop",
    name: "Wretched Shop",
    realm: "Autohaven Wreckers",
    setting: "outdoor",
    size: "medium",
    lean: "balanced",
    tags: ["garage-main", "good-tile-spread"],
    summary: "A weaker garage main offset by a good spread of tiles.",
    notes:
      "The garage main building isn't especially strong, but a healthy spread of surrounding tiles keeps the map balanced overall.",
  },

  // ---------------- Coldwind Farm ----------------
  {
    slug: "fractured-cowshed",
    name: "Fractured Cowshed",
    realm: "Coldwind Farm",
    setting: "mixed",
    size: "large",
    lean: "survivor",
    tags: ["pallet-dense", "barn-main", "low-visibility"],
    summary: "A dense-pallet Coldwind map around a central barn.",
    notes:
      "The barn main plus a dense ring of perimeter pallets — and the corn's low visibility — make this a survivor-friendly Coldwind variant.",
  },
  {
    slug: "rancid-abattoir",
    name: "Rancid Abattoir",
    realm: "Coldwind Farm",
    setting: "mixed",
    size: "medium",
    lean: "balanced",
    tags: ["abattoir-main", "low-visibility", "reworked"],
    summary: "Slaughterhouse centre; its old deadzones were patched out.",
    notes:
      "The abattoir building anchors the map and the corn cuts sightlines. It used to lean killer thanks to deadzones, but the 9.2.0 pallet pass evened it out into a fair map.",
  },
  {
    slug: "rotten-fields",
    name: "Rotten Fields",
    realm: "Coldwind Farm",
    setting: "outdoor",
    size: "large",
    lean: "balanced",
    tags: ["open-corn", "spread-gens", "reworked"],
    summary: "Open cornfields with spread-out gens; reworked toward fair.",
    notes:
      "Wide, open corn with generators spread far apart. Once a killer-sided deadzone, added pallets brought it back to roughly fair — though the concealment still helps survivors hide.",
  },
  {
    slug: "the-thompson-house",
    name: "The Thompson House",
    realm: "Coldwind Farm",
    setting: "mixed",
    size: "medium",
    lean: "survivor",
    tags: ["two-floor-house", "low-visibility", "pallet-dense"],
    summary: "A two-story farmhouse with corn cover and dense pallets.",
    notes:
      "The house main, corn concealment, and a generous post-9.2.0 pallet count make this a comfortable map for survivors — some feel the buffs went a touch far.",
  },
  {
    slug: "torment-creek",
    name: "Torment Creek",
    realm: "Coldwind Farm",
    setting: "outdoor",
    size: "large",
    lean: "survivor",
    tags: ["silo", "open-fields", "low-visibility"],
    summary: "Open fields under a silo, with strong corn sightline cover.",
    notes:
      "A large, open Coldwind map with a silo landmark. The corn lines of sight and added pallets lean it survivor — again, arguably over-buffed.",
  },

  // ---------------- Crotus Prenn Asylum ----------------
  {
    slug: "disturbed-ward",
    name: "Disturbed Ward",
    realm: "Crotus Prenn Asylum",
    setting: "indoor",
    size: "large",
    lean: "survivor",
    tags: ["strong-main-building", "god-loops", "indoor"],
    summary: "A very strong asylum main with god pallets and windows.",
    notes:
      "The asylum building is one of the strongest mains in the game — chainable god pallets and windows. Even after the 9.3.0 nerf to its loop chaining, it stays survivor-favoured.",
  },
  {
    slug: "fathers-campbells-chapel",
    name: "Father Campbell's Chapel",
    realm: "Crotus Prenn Asylum",
    setting: "mixed",
    size: "medium",
    lean: "balanced",
    tags: ["chapel-main"],
    summary: "The chapel main makes for a more even Asylum sibling.",
    notes:
      "A calmer counterpart to Disturbed Ward — the chapel gives a loop without dominating, and the grounds are open and fair.",
  },

  // ---------------- Backwater Swamp ----------------
  {
    slug: "the-pale-rose",
    name: "The Pale Rose",
    realm: "Backwater Swamp",
    setting: "outdoor",
    size: "medium",
    lean: "survivor",
    tags: ["steamboat", "water-slows-traversal"],
    summary: "A grounded steamboat structure on slow, watery terrain.",
    notes:
      "The beached steamboat is a landmark loop and the water slows movement across lanes; it leans slightly survivor.",
  },
  {
    slug: "grim-pantry",
    name: "Grim Pantry",
    realm: "Backwater Swamp",
    setting: "mixed",
    size: "medium",
    lean: "survivor",
    tags: ["strong-main-building", "hook-deadzones"],
    summary: "One of the stronger main buildings in the swamp.",
    notes:
      "The pantry main is genuinely strong, which leans the map survivor — though sparse hook coverage in spots can bite both ways.",
  },

  // ---------------- Léry's Memorial Institute ----------------
  {
    slug: "treatment-theatre",
    name: "Léry's Memorial Institute",
    realm: "Léry's Memorial Institute",
    setting: "indoor",
    size: "small",
    lean: "balanced",
    tags: ["indoor", "many-windows", "reworked"],
    summary: "A small, window-heavy indoor hospital, reworked in 2025.",
    notes:
      "A claustrophobic indoor map with lots of windows and nowhere outside to hide. The 2025 rework opened it up, separated the wings, and added navigation cues — its lean is contested and swings by killer.",
  },

  // ---------------- Red Forest ----------------
  {
    slug: "mothers-dwelling",
    name: "Mother's Dwelling",
    realm: "Red Forest",
    setting: "mixed",
    size: "large",
    lean: "survivor",
    tags: ["largest-map", "strong-main-building", "many-loops"],
    summary: "The biggest map in the game, with a window-rich main house.",
    notes:
      "Sheer size makes gens hard to patrol, and the central house carries two strong downstairs windows. A classic survivor-favoured map for low-mobility killers especially.",
  },
  {
    slug: "temple-of-purgation",
    name: "The Temple of Purgation",
    realm: "Red Forest",
    setting: "outdoor",
    size: "large",
    lean: "survivor",
    tags: ["central-temple", "long-chases"],
    summary: "A large map built around a central temple, with long chases.",
    notes:
      "The temple anchors a big footprint that stretches chases out; added pallets over time pushed it toward the survivor side.",
  },

  // ---------------- Gideon Meat Plant ----------------
  {
    slug: "the-game",
    name: "The Game",
    realm: "Gideon Meat Plant",
    setting: "indoor",
    size: "small",
    lean: "survivor",
    licensed: true,
    tags: ["indoor", "two-floor", "pallet-dense", "reworked"],
    summary: "The Saw meat plant — two indoor floors, famously pallet-dense.",
    notes:
      "Two tight floors with the highest pallet density in the game and few windows; chained god pallets can be brutal for the killer. Reworks thinned the pallets, but it still leans survivor.",
  },

  // ---------------- Yamaoka Estate ----------------
  {
    slug: "family-residence",
    name: "Family Residence",
    realm: "Yamaoka Estate",
    setting: "mixed",
    size: "medium",
    lean: "survivor",
    tags: ["residence-main", "bamboo-mindgames"],
    summary: "A Japanese residence main with bamboo short-wall mindgames.",
    notes:
      "The residence gives a strong loop and the bamboo short-walls create mindgame potential; on balance it leans slightly survivor.",
  },
  {
    slug: "sanctum-of-wrath",
    name: "Sanctum of Wrath",
    realm: "Yamaoka Estate",
    setting: "mixed",
    size: "medium",
    lean: "killer",
    tags: ["central-shrine", "high-visibility", "few-hiding-spots"],
    summary: "A central shrine grants map-wide visibility.",
    notes:
      "The tall central shrine gives sweeping sightlines and there are few hiding spots, which tips this Yamaoka map toward the killer.",
  },

  // ---------------- Ormond ----------------
  {
    slug: "mount-ormond-resort",
    name: "Mount Ormond Resort",
    realm: "Ormond",
    setting: "mixed",
    size: "large",
    lean: "survivor",
    tags: ["central-lodge", "second-floor-escapes", "edge-pallets"],
    summary: "A big snowy resort with a two-floor lodge and edge pallets.",
    notes:
      "Large, with a resort lodge offering second-floor escapes and a ring of edge pallets. Size and structure usually lean survivor, though open snowfields can punish a bad drop.",
  },
  {
    slug: "ormond-lake-mine",
    name: "Ormond Lake Mine",
    realm: "Ormond",
    setting: "indoor",
    size: "medium",
    lean: "balanced",
    tags: ["indoor-mine", "tighter-than-resort"],
    summary: "The indoor mine — tighter and more contained than the resort.",
    notes:
      "Ormond's indoor map: a contained mine that plays tighter than the resort, landing closer to balanced.",
  },

  // ---------------- Grave of Glenvale ----------------
  {
    slug: "dead-dawg-saloon",
    name: "Dead Dawg Saloon",
    realm: "Grave of Glenvale",
    setting: "outdoor",
    size: "small",
    lean: "killer",
    tags: ["compact", "breakable-walls", "3-gen-prone"],
    summary: "A compact western town with breakable walls and easy 3-gens.",
    notes:
      "Tight sightlines, short loops, and breakable walls make it killer-friendly — and the close generator clusters make accidental 3-gens easy to fall into.",
  },

  // ---------------- Forsaken Boneyard ----------------
  {
    slug: "eyrie-of-crows",
    name: "Eyrie of Crows",
    realm: "Forsaken Boneyard",
    setting: "outdoor",
    size: "large",
    lean: "survivor",
    tags: ["huge-central-building", "reworked"],
    summary: "A huge central structure on a large desert footprint.",
    notes:
      "Dominated by an enormous central building; the 2024 rework squared it off and spaced the maze tiles to break loop chains, but its size still punishes low-mobility killers.",
  },
  {
    slug: "dead-sands",
    name: "Dead Sands",
    realm: "Forsaken Boneyard",
    setting: "outdoor",
    size: "medium",
    lean: "balanced",
    tags: ["desert-ruins", "open-sightlines"],
    summary: "Open desert ruins with long sightlines.",
    notes:
      "The Boneyard's more even map — ruined structures across open sand, with decent sightlines for the killer and enough loops to keep it fair.",
  },

  // ---------------- The Decimated Borgo ----------------
  {
    slug: "shattered-square",
    name: "The Shattered Square",
    realm: "The Decimated Borgo",
    setting: "outdoor",
    size: "small",
    lean: "killer",
    tags: ["low-pallet-density", "dead-loops", "cluttered"],
    summary: "Cluttered gothic ruins with low pallet density and dead loops.",
    notes:
      "Tight, cluttered ruins with sparse pallets and a lot of dead loops, which makes it one of the more killer-leaning maps.",
  },
  {
    slug: "forgotten-ruins",
    name: "Forgotten Ruins",
    realm: "The Decimated Borgo",
    setting: "mixed",
    size: "medium",
    lean: "killer",
    tags: ["underground-dungeon", "deadzone-prone"],
    summary: "An underground dungeon with huge deadzones.",
    notes:
      "A semi-indoor dungeon riddled with deadzones — widely considered one of the strongest maps for the killer.",
  },

  // ---------------- Sleepless District ----------------
  {
    slug: "tricksters-delusion",
    name: "Trickster's Delusion",
    realm: "Sleepless District",
    setting: "mixed",
    size: "medium",
    lean: "balanced",
    tags: ["urban", "new-2026", "scripted-events"],
    summary: "DBD's first urban map — a neon city block added in 2026.",
    notes:
      "Added in March 2026, the game's first fully urban map: a neon-lit city district with scripted environmental events. It's new enough that its balance is still being figured out.",
  },

  // ---------------- Withered Isle ----------------
  {
    slug: "garden-of-joy",
    name: "Garden of Joy",
    realm: "Withered Isle",
    setting: "outdoor",
    size: "large",
    lean: "survivor",
    tags: ["strongest-main-building", "god-pallet", "strong-window"],
    summary: "Arguably the strongest survivor main building in the game.",
    notes:
      "The two-floor house pairs a god pallet with a strong window and is widely seen as the strongest main building going. A cleanup rework helped a little, but the community still rates it strongly survivor-sided.",
  },
  {
    slug: "greenville-square",
    name: "Greenville Square",
    realm: "Withered Isle",
    setting: "outdoor",
    size: "medium",
    lean: "survivor",
    tags: ["small-town", "strong-main-building"],
    summary: "The Unknown's small-town map, with a strong main building.",
    notes:
      "Added in 2024 with The Unknown — a small-town layout whose strong main building leans it slightly survivor.",
  },
  {
    slug: "freddy-fazbears-pizza",
    name: "Freddy Fazbear's Pizza",
    realm: "Withered Isle",
    setting: "mixed",
    size: "medium",
    lean: "balanced",
    licensed: true,
    tags: ["interior-heavy", "new-2025", "camera-mechanic"],
    summary: "The FNAF map — interior-heavy with a security-door/camera gimmick.",
    notes:
      "Added in June 2025 from Five Nights at Freddy's: an interior-heavy pizzeria with a security-door and camera mechanic. Being recent, its balance is still settling.",
  },
  {
    slug: "fallen-refuge",
    name: "Fallen Refuge",
    realm: "Withered Isle",
    setting: "mixed",
    size: "medium",
    lean: "survivor",
    licensed: true,
    tags: ["prison-tower", "hospital", "new-2025"],
    summary: "The Walking Dead map — a prison tower and hospital complex.",
    notes:
      "Added July 2025 from The Walking Dead: a prison tower and hospital with decorative walkers reacting to the central gen. Reception has been lukewarm; it leans survivor.",
  },

  // ---------------- Dvarka Deepwood ----------------
  {
    slug: "toba-landing",
    name: "Toba Landing",
    realm: "Dvarka Deepwood",
    setting: "outdoor",
    size: "large",
    lean: "balanced",
    tags: ["alien-jungle", "foliage-cover"],
    summary: "An alien jungle with foliage that hides survivors.",
    notes:
      "A large alien-jungle map where foliage gives concealment; it plays close to fair, with most calling for only small tweaks.",
  },
  {
    slug: "nostromo-wreckage",
    name: "Nostromo Wreckage",
    realm: "Dvarka Deepwood",
    setting: "indoor",
    size: "medium",
    lean: "balanced",
    licensed: true,
    tags: ["spaceship-interior", "indoor"],
    summary: "The Alien map — a derelict spaceship interior.",
    notes:
      "From Alien: a derelict spaceship interior that's generally considered one of the more balanced indoor maps.",
  },

  // ---------------- Springwood ----------------
  {
    slug: "badham-preschool",
    name: "Badham Preschool",
    realm: "Springwood",
    setting: "mixed",
    size: "large",
    lean: "survivor",
    licensed: true,
    tags: ["school-building", "basement", "suburban", "strong-loops"],
    summary: "A suburb around a two-floor preschool that can hold the basement.",
    notes:
      "A Nightmare on Elm Street's neighbourhood: the school is a strong multi-level structure (it can hold the basement) and the streets add house loops. It leans survivor; only the original of its five variants is in the ranked rotation.",
  },

  // ---------------- Silent Hill ----------------
  {
    slug: "midwich-elementary",
    name: "Midwich Elementary School",
    realm: "Silent Hill",
    setting: "indoor",
    size: "small",
    lean: "killer",
    licensed: true,
    tags: ["indoor", "symmetrical", "two-floor", "hard-to-learn"],
    summary: "A small, symmetrical two-floor school of long corridors.",
    notes:
      "From Silent Hill: a compact, mirrored two-floor school. The symmetry and long indoor halls are easy to patrol and notoriously hard to learn callouts for — it tends to favour the killer.",
  },

  // ---------------- Hawkins National Laboratory ----------------
  {
    slug: "the-underground-complex",
    name: "The Underground Complex",
    realm: "Hawkins National Laboratory",
    setting: "indoor",
    size: "medium",
    lean: "killer",
    licensed: true,
    tags: ["indoor", "lab-maze", "disliked"],
    summary: "The Stranger Things lab maze — strong for killers, disliked by all.",
    notes:
      "From Stranger Things: a lab maze that often posts among the lowest survivor escape rates. It's strongly killer-sided and unpopular with both sides for how disorienting it is.",
  },

  // ---------------- Raccoon City ----------------
  {
    slug: "rpd-east-wing",
    name: "R.P.D. East Wing",
    realm: "Raccoon City",
    setting: "indoor",
    size: "large",
    lean: "balanced",
    licensed: true,
    tags: ["indoor", "maze", "best-balanced-indoor"],
    summary: "The east half of the RPD — the best-balanced indoor map.",
    notes:
      "From Resident Evil: one of the two halves the police station was split into. The East Wing has good pallet density and is often called the most balanced indoor map in the game.",
  },
  {
    slug: "rpd-west-wing",
    name: "R.P.D. West Wing",
    realm: "Raccoon City",
    setting: "indoor",
    size: "large",
    lean: "survivor",
    licensed: true,
    tags: ["indoor", "maze", "god-pallets", "narrow-halls"],
    summary: "The west half of the RPD — narrow halls and god pallets.",
    notes:
      "The other RPD half: narrow halls, line-of-sight-breaking rooms, and god pallets make the West Wing meaningfully more survivor-sided than its eastern counterpart.",
  },
];
