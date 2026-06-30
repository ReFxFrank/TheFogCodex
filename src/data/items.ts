// ============================================================
// Items, add-ons & offerings reference.
//
// Survivors bring an item (toolbox, medkit, flashlight, key, map) plus up to
// two add-ons; killers bring two power add-ons; both sides can burn an
// offering. Exact numbers and a few specifics shift every patch — these are
// plain-English summaries of what each thing is for, paraphrased, not copied.
// ============================================================

export interface ItemAddon {
  name: string;
  note: string;
}

export interface SurvivorItem {
  slug: string;
  name: string;
  summary: string;
  detail: string;
  addons: ItemAddon[];
}

export const SURVIVOR_ITEMS: SurvivorItem[] = [
  {
    slug: "toolbox",
    name: "Toolbox",
    summary: "Repair generators faster — or rip hooks out of the ground.",
    detail:
      "Toolboxes spend charges to speed up generator repairs, and some can sabotage hooks so a downed teammate can't be hung nearby. They range from the flimsy Worn-Out Tools up to repair-focused options like the Commodious and Engineer's Toolboxes.",
    addons: [
      { name: "Wire Spool", note: "More charges — the toolbox lasts longer." },
      { name: "Scraps", note: "A small, common charge boost." },
      { name: "Instructions", note: "Faster, quieter hook sabotage." },
      { name: "Brand New Part", note: "Skill-check it for a big instant chunk of gen progress." },
    ],
  },
  {
    slug: "medkit",
    name: "Medkit",
    summary: "Heal yourself or a teammate in a hurry.",
    detail:
      "Medkits speed up healing and let you patch yourself without a second survivor. The strongest add-ons turn them into panic buttons — a Styptic Agent grants a moment of Endurance, and a Syringe can finish a heal on its own, even mid-chase.",
    addons: [
      { name: "Styptic Agent", note: "Burns the medkit for an instant heal + brief Endurance." },
      { name: "Syringe", note: "Slowly auto-heals you while it ticks down." },
      { name: "Butterfly Tape", note: "Faster self-healing." },
      { name: "Gauze / Bandages", note: "Extra charges for more heals." },
    ],
  },
  {
    slug: "flashlight",
    name: "Flashlight",
    summary: "Blind the killer to steal a save.",
    detail:
      "A well-timed beam blinds the killer as they pick a survivor up, break a pallet, or kick a gen — dropping their prey or buying time. It's high-skill: miss the angle and it's wasted. Comes in standard, Sport, and Utility flavours.",
    addons: [
      { name: "Power Bulb / Battery", note: "Longer burn time before it dies." },
      { name: "Intense Halogen", note: "Blinds faster, so the window of error shrinks." },
      { name: "Wide Lens", note: "Wider beam — easier to land the blind." },
    ],
  },
  {
    slug: "key",
    name: "Key",
    summary: "Open the hatch — and read auras.",
    detail:
      "Keys can open the hatch for a clutch escape, and with the right add-ons reveal survivor (or other) auras across the map. The Skeleton Key is the strong one; Dull and Broken keys are weaker. Hatch and key rules shift with patches.",
    addons: [
      { name: "Weaved Ring", note: "Reveals survivor auras for a while." },
      { name: "Blood Amber", note: "Reveals the killer's aura too." },
      { name: "Prayer Beads", note: "Adds extra duration to the aura reading." },
    ],
  },
  {
    slug: "map",
    name: "Map",
    summary: "Find every objective on the trial grounds.",
    detail:
      "The Map tracks the auras of objectives near where you've been — generators, totems, chests, the hatch — so a coordinated team can plan totem cleanses or a hatch play. Add-ons widen its range and what it shows.",
    addons: [
      { name: "Red Twine", note: "Tracks more objects at once." },
      { name: "Black Silk Cord", note: "Reveals the hatch once it can spawn." },
      { name: "Unusual / Odd Stamp", note: "Extends the tracking range." },
    ],
  },
];

export interface OfferingGroup {
  slug: string;
  name: string;
  side: "survivor" | "killer" | "both";
  summary: string;
  examples: ItemAddon[];
}

export const OFFERING_GROUPS: OfferingGroup[] = [
  {
    slug: "bloodpoints",
    name: "Bloodpoints",
    side: "both",
    summary: "Earn more bloodpoints from the trial — the most common burn.",
    examples: [
      { name: "Bloody Party Streamers", note: "A big bonus for everyone in the match." },
      { name: "Escape Cake / Survivor Pudding", note: "Bonus points for survivors." },
      { name: "Bog Laurel / Tanstype", note: "Category-specific point boosts." },
    ],
  },
  {
    slug: "map-selection",
    name: "Map & realm",
    side: "both",
    summary: "Try to send the trial to a specific realm or map.",
    examples: [
      { name: "Realm offerings", note: "Nudge the trial toward a whole realm." },
      { name: "Specific-map offerings", note: "Aim for one exact map." },
      { name: "Ward", note: "Blocks someone else's map offering." },
    ],
  },
  {
    slug: "fog",
    name: "Fog & visibility",
    side: "both",
    summary: "Thicken the fog to shorten sightlines.",
    examples: [
      { name: "Murky Reagent", note: "Denser fog — harder to see across the map." },
      { name: "Clear Reagent", note: "Thins the fog instead, for clearer sightlines." },
    ],
  },
  {
    slug: "spawn",
    name: "Spawn locations",
    side: "survivor",
    summary: "Change where survivors start the trial.",
    examples: [
      { name: "Shroud of Separation", note: "Survivors spawn apart from each other." },
      { name: "Shroud of Union", note: "Survivors spawn together." },
      { name: "Shroud of Binding", note: "Everyone spawns near you." },
    ],
  },
  {
    slug: "mori",
    name: "Mori (killer)",
    side: "killer",
    summary: "Kill survivors by your own hand instead of hooking.",
    examples: [
      { name: "Cypress Memento Mori", note: "Mori the last survivor standing." },
      { name: "Stronger moris", note: "Higher-rarity moris exist; the rules shift with reworks." },
    ],
  },
  {
    slug: "luck",
    name: "Luck & hooks",
    side: "both",
    summary: "Tweak hook luck and self-unhook odds.",
    examples: [
      { name: "Chalk / Salt Pouch", note: "Improves the chance to unhook yourself." },
      { name: "Petrified Oak (killer)", note: "Reduces how often survivors find the hatch." },
    ],
  },
];

// Short explainer for the killer add-on system (we don't catalog per-killer
// add-ons — those live on each killer's page).
export const KILLER_ADDON_NOTE =
  "Killers don't carry an item, but every killer brings two power add-ons that tune their ability — from small quality-of-life tweaks up to game-warping Iridescent add-ons. They're unique to each killer's power, so the strong ones are part of what makes a killer scary.";
