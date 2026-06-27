import type { Character } from "@/types";

// ============================================================
// Roster — a representative slice of Patch 10.0.1 (June 2026).
// Full live roster: 43 Killers · 50 Survivors.
//
// `perkSlugs` lists only this character's teachables that are
// catalogued in the Codex, so every cross-link resolves.
// Killer tiers are approximate community estimates (see /about).
//
// To use real art: drop /public/images/characters/<slug>.png and
// set the `portrait` field below.
// ============================================================

export const CHARACTERS: Character[] = [
  // ---------------- SURVIVORS ----------------
  {
    slug: "dwight-fairfield",
    name: "Dwight Fairfield",
    role: "survivor",
    archetypeTags: ["support", "team"],
    perkSlugs: ["prove-thyself", "bond"],
    blurb:
      "A nervous born-again leader who survives by keeping the team together. His perks pull the group onto gens and into safety.",
  },
  {
    slug: "meg-thomas",
    name: "Meg Thomas",
    role: "survivor",
    archetypeTags: ["looper", "athletic"],
    perkSlugs: ["adrenaline", "sprint-burst", "quick-and-quiet"],
    blurb:
      "A track star who runs toward danger to draw it off her friends. The original speedrunner of the chase.",
  },
  {
    slug: "jake-park",
    name: "Jake Park",
    role: "survivor",
    archetypeTags: ["stealth", "saboteur"],
    perkSlugs: ["iron-will"],
    blurb:
      "An off-grid survivalist who thrives alone in the fog, slipping chases in total silence.",
  },
  {
    slug: "nea-karlsson",
    name: "Nea Karlsson",
    role: "survivor",
    archetypeTags: ["stealth", "looper"],
    perkSlugs: ["balanced-landing", "urban-evasion", "streetwise"],
    blurb:
      "A street artist who treats the Entity's realm like a city to be tagged and outmaneuvered — vertical, mobile, hard to pin down.",
  },
  {
    slug: "laurie-strode",
    name: "Laurie Strode",
    realName: "Laurie Strode",
    role: "survivor",
    licensed: true,
    archetypeTags: ["anti-tunnel", "looper"],
    perkSlugs: ["decisive-strike"],
    blurb:
      "The final girl who has stared down a relentless killer and lived. She punishes anyone who fixates on her.",
  },
  {
    slug: "bill-overbeck",
    name: "William \"Bill\" Overbeck",
    realName: "William Overbeck",
    role: "survivor",
    licensed: true,
    archetypeTags: ["anti-slug", "support"],
    perkSlugs: ["unbreakable", "borrowed-time"],
    blurb:
      "A grizzled Vietnam veteran who refuses to stay down — and refuses to leave anyone behind on the ground.",
  },
  {
    slug: "feng-min",
    name: "Feng Min",
    role: "survivor",
    archetypeTags: ["looper", "athletic"],
    perkSlugs: ["lithe"],
    blurb:
      "A burnt-out esports prodigy who reads loops like a match replay and resets the chase with a flick.",
  },
  {
    slug: "kate-denson",
    name: "Kate Denson",
    role: "survivor",
    archetypeTags: ["looper", "stealth"],
    perkSlugs: ["windows-of-opportunity", "dance-with-me"],
    blurb:
      "A travelling musician with an easy charm and an instinct for the next pallet. Her perks teach the geometry of a chase.",
  },
  {
    slug: "david-tapp",
    name: "Detective Tapp",
    realName: "David Tapp",
    role: "survivor",
    licensed: true,
    archetypeTags: ["gen-repair", "investigator"],
    perkSlugs: ["stake-out"],
    blurb:
      "An obsessive detective who never closed his last case. He works the trial like a crime scene — methodical, precise.",
  },
  {
    slug: "zarina-kassir",
    name: "Zarina Kassir",
    role: "survivor",
    archetypeTags: ["anti-tunnel", "stealth"],
    perkSlugs: ["off-the-record"],
    blurb:
      "A documentary filmmaker who turns the Entity's lens back on the Killer, slipping the spotlight right after a hook.",
  },
  {
    slug: "david-king",
    name: "David King",
    role: "survivor",
    archetypeTags: ["anti-tunnel", "bodyblock"],
    perkSlugs: ["dead-hard"],
    blurb:
      "A bare-knuckle brawler who lives for the fight, eating a hit so a teammate can run.",
  },
  {
    slug: "nancy-wheeler",
    name: "Nancy Wheeler",
    realName: "Nancy Wheeler",
    role: "survivor",
    licensed: true,
    archetypeTags: ["self-sufficient", "stealth"],
    perkSlugs: ["inner-strength"],
    blurb:
      "A sharp young journalist from Hawkins who pieces together the rules of any nightmare and heals on her own terms.",
  },
  {
    slug: "felix-richter",
    name: "Felix Richter",
    role: "survivor",
    archetypeTags: ["gen-repair", "support"],
    perkSlugs: ["built-to-last"],
    blurb:
      "An architect who treats the trial as an engineering problem, making one good item last the entire match.",
  },
  {
    slug: "mikaela-reid",
    name: "Mikaela Reid",
    role: "survivor",
    archetypeTags: ["boon", "support"],
    perkSlugs: ["circle-of-healing", "shadow-step"],
    blurb:
      "A practising witch who blesses the Killer's own totems, turning hexed ground into a sanctuary of healing and cover.",
  },
  {
    slug: "jonah-vasquez",
    name: "Jonah Vasquez",
    role: "survivor",
    archetypeTags: ["boon", "anti-slug"],
    perkSlugs: ["exponential"],
    blurb:
      "A CIA cryptanalyst who finds the pattern in everything — including how to get a slugged teammate back on their feet.",
  },
  {
    slug: "claudette-morel",
    name: "Claudette Morel",
    role: "survivor",
    archetypeTags: ["healer", "stealth"],
    perkSlugs: ["self-care", "botany-knowledge", "empathy"],
    blurb:
      "A shy botanist and the realm's foremost field medic, keeping the team patched up and on their feet from the safety of the shadows.",
  },
  {
    slug: "quentin-smith",
    name: "Quentin Smith",
    realName: "Quentin Smith",
    role: "survivor",
    licensed: true,
    archetypeTags: ["support", "endurance"],
    perkSlugs: ["vigil"],
    blurb:
      "An exhausted teenager fighting to stay awake, squeezing every last second of stamina out of himself and the team around him.",
  },
  {
    slug: "shane-wiigwaas",
    name: "Shane Wiigwaas",
    realName: "Shane Wiigwaas",
    role: "survivor",
    archetypeTags: ["support", "newcomer"],
    perkSlugs: [],
    blurb:
      "The newest face to wake in the fog (Chapter 40.5). His teachable perks are still being charted by the community.",
  },

  // ---------------- KILLERS ----------------
  {
    slug: "the-nurse",
    name: "The Nurse",
    realName: "Sally Smithson",
    role: "killer",
    killerTier: "S",
    archetypeTags: ["blink", "anti-loop", "high-skill"],
    perkSlugs: ["a-nurses-calling", "stridor", "thanatophobia"],
    blurb:
      "A broken asylum nurse who blinks through walls and reality itself. The highest skill ceiling in the fog — and, mastered, the deadliest thing in it.",
  },
  {
    slug: "the-blight",
    name: "The Blight",
    realName: "Talbot Grimes",
    role: "killer",
    killerTier: "S",
    archetypeTags: ["mobility", "anti-loop", "rush"],
    perkSlugs: ["hex-undying"],
    blurb:
      "An alchemist mutated by his own serum, ricocheting off walls in violent rushes. Map pressure and lethality in one body.",
  },
  {
    slug: "the-hillbilly",
    name: "The Hillbilly",
    realName: "Max Thompson Jr.",
    role: "killer",
    killerTier: "S",
    archetypeTags: ["mobility", "instadown", "chainsaw"],
    perkSlugs: ["tinkerer", "enduring", "lightborn"],
    blurb:
      "A disfigured farm boy with a chainsaw and nothing to lose, crossing the map in seconds for a one-hit sprint down.",
  },
  {
    slug: "the-spirit",
    name: "The Spirit",
    realName: "Rin Yamaoka",
    role: "killer",
    killerTier: "S",
    archetypeTags: ["phase", "anti-loop", "tracking"],
    perkSlugs: ["spirit-fury"],
    blurb:
      "A vengeful phantom who phases out of sight and hunts by sound alone. Few chases are more disorienting to be on the wrong end of.",
  },
  {
    slug: "the-huntress",
    name: "The Huntress",
    realName: "Anna",
    role: "killer",
    killerTier: "A",
    archetypeTags: ["ranged", "zoning", "hatchets"],
    perkSlugs: [],
    blurb:
      "A lullaby-humming hunter raised by the woods, hurling hatchets across the map to end a loop before it begins.",
  },
  {
    slug: "the-artist",
    name: "The Artist",
    realName: "Carmina Mora",
    role: "killer",
    killerTier: "A",
    archetypeTags: ["ranged", "zoning", "map-control"],
    perkSlugs: ["pain-resonance", "grim-embrace", "pentimento"],
    blurb:
      "A tormented painter who commands swarms of corvids to scout and strike at range. Her perk trio defines the modern slowdown meta.",
  },
  {
    slug: "the-mastermind",
    name: "The Mastermind",
    realName: "Albert Wesker",
    role: "killer",
    licensed: true,
    killerTier: "A",
    archetypeTags: ["mobility", "anti-loop", "infection"],
    perkSlugs: [],
    blurb:
      "A viral overlord who bounds across the arena and slams Survivors into walls, spreading an infection as he goes.",
  },
  {
    slug: "the-good-guy",
    name: "The Good Guy",
    realName: "Chucky / Charles Lee Ray",
    role: "killer",
    licensed: true,
    killerTier: "A",
    archetypeTags: ["stealth", "anti-loop", "small"],
    perkSlugs: [],
    blurb:
      "A pint-sized killer doll who scuttles below sightlines and strikes from a dash. Tiny, fast, and impossible to see coming.",
  },
  {
    slug: "the-oni",
    name: "The Oni",
    realName: "Kazan Yamaoka",
    role: "killer",
    killerTier: "A",
    archetypeTags: ["snowball", "instadown", "mobility"],
    perkSlugs: [],
    blurb:
      "A wrathful samurai who collects spilled blood until he ignites into an unstoppable demon rush. Pure snowball potential.",
  },
  {
    slug: "the-ghoul",
    name: "The Ghoul",
    realName: "Ken Kaneki",
    role: "killer",
    licensed: true,
    killerTier: "A",
    archetypeTags: ["mobility", "anti-loop", "high-skill"],
    perkSlugs: [],
    blurb:
      "A half-ghoul torn between humanity and hunger, vaulting and lunging with kagune in a relentless high-mobility chase.",
  },
  {
    slug: "the-animatronic",
    name: "The Animatronic",
    realName: "Springtrap / William Afton",
    role: "killer",
    licensed: true,
    killerTier: "A",
    archetypeTags: ["stealth", "ambush", "map-control"],
    perkSlugs: [],
    blurb:
      "A decaying spring-lock suit housing a child murderer, lurking through vents and shadows to ambush from anywhere on the map.",
  },
  {
    slug: "the-clown",
    name: "The Clown",
    realName: "Kenneth Chase",
    role: "killer",
    killerTier: "B",
    archetypeTags: ["zoning", "anti-loop", "slowdown"],
    perkSlugs: ["pop-goes-the-weasel", "bamboozle", "coulrophobia"],
    blurb:
      "A sadistic showman who chokes loops with clouds of intoxicating gas. Crowd control made grotesque.",
  },
  {
    slug: "the-cenobite",
    name: "The Cenobite",
    realName: "Elliot Spencer / Pinhead",
    role: "killer",
    licensed: true,
    killerTier: "B",
    archetypeTags: ["ranged", "summoner", "map-control"],
    perkSlugs: ["deadlock"],
    blurb:
      "A priest of pleasure and pain who binds Survivors in chains from across the map and weaponizes a cursed puzzle box.",
  },
  {
    slug: "the-plague",
    name: "The Plague",
    realName: "Adiris",
    role: "killer",
    killerTier: "B",
    archetypeTags: ["ranged", "anti-heal", "infection"],
    perkSlugs: ["corrupt-intervention", "dark-devotion", "infectious-fright"],
    blurb:
      "A fallen priestess who spreads corruption with vile projectile sickness, denying healing across the whole trial.",
  },
  {
    slug: "the-twins",
    name: "The Twins",
    realName: "Charlotte & Victor Deshayes",
    role: "killer",
    killerTier: "B",
    archetypeTags: ["snowball", "zoning", "anti-heal"],
    perkSlugs: ["dead-mans-switch", "coup-de-grace"],
    blurb:
      "Conjoined siblings who split apart to hunt — tiny Victor pins a Survivor while Charlotte closes in. A slugging snowball.",
  },
  {
    slug: "the-nemesis",
    name: "The Nemesis",
    realName: "T-Type / Nemesis",
    role: "killer",
    licensed: true,
    killerTier: "C",
    archetypeTags: ["ranged", "anti-loop", "infection"],
    perkSlugs: ["lethal-pursuer", "eruption"],
    blurb:
      "A towering bioweapon with a whipping tentacle and zombie minions, breaking loops from a distance and spreading contamination.",
  },
  {
    slug: "the-knight",
    name: "The Knight",
    realName: "Tarhos Kovács",
    role: "killer",
    killerTier: "B",
    archetypeTags: ["summoner", "zoning", "map-control"],
    perkSlugs: ["nowhere-to-hide"],
    blurb:
      "A cursed mercenary who summons spectral guards to patrol, zone, and corner Survivors while he closes the trap.",
  },
  {
    slug: "the-cannibal",
    name: "The Cannibal",
    realName: "Bubba Sawyer",
    role: "killer",
    licensed: true,
    killerTier: "C",
    archetypeTags: ["instadown", "anti-loop", "chainsaw"],
    perkSlugs: ["bbq-and-chili"],
    blurb:
      "A chainsaw-wielding family man who turns a cluster of Survivors into a multi-down massacre at the right pallet.",
  },
  {
    slug: "the-dredge",
    name: "The Dredge",
    role: "killer",
    killerTier: "B",
    archetypeTags: ["stealth", "teleport", "ambush"],
    perkSlugs: ["darkness-revealed"],
    blurb:
      "A writhing mass of forgotten guilt that teleports between lockers and drowns the map in darkness. The fog's jump-scare incarnate.",
  },
  {
    slug: "the-hag",
    name: "The Hag",
    realName: "Lisa Sherwood",
    role: "killer",
    killerTier: "C",
    archetypeTags: ["traps", "ambush", "map-control"],
    perkSlugs: ["hex-ruin", "devour-hope"],
    blurb:
      "A swamp-cursed victim turned predator, scrawling phantom traps in the mud and teleporting to ambush anyone who trips them.",
  },
  {
    slug: "the-trickster",
    name: "The Trickster",
    realName: "Ji-Woon Hak",
    role: "killer",
    killerTier: "B",
    archetypeTags: ["ranged", "zoning", "snowball"],
    perkSlugs: ["no-way-out", "starstruck"],
    blurb:
      "A murderous pop idol who turns a chase into a knife-throwing performance, peppering Survivors from range until they drop.",
  },
  {
    slug: "the-executioner",
    name: "The Executioner",
    realName: "Pyramid Head",
    role: "killer",
    licensed: true,
    killerTier: "B",
    archetypeTags: ["ranged", "anti-heal", "zoning"],
    perkSlugs: ["trail-of-torment"],
    blurb:
      "The judge and punisher of Silent Hill, dragging his great blade to carve trenches of torment across the ground.",
  },
  {
    slug: "the-doctor",
    name: "The Doctor",
    realName: "Herman Carter",
    role: "killer",
    killerTier: "C",
    archetypeTags: ["tracking", "anti-stealth", "area"],
    perkSlugs: ["monitor-and-abuse"],
    blurb:
      "A sadistic electroshock therapist who floods the map with madness, ripping Survivors out of stealth with screams.",
  },
  {
    slug: "the-slasher",
    name: "The Slasher",
    realName: "Jason Voorhees",
    role: "killer",
    licensed: true,
    killerTier: "B",
    archetypeTags: ["stalker", "instadown", "relentless"],
    perkSlugs: [],
    blurb:
      "The newest nightmare to step through the fog — an unkillable, unhurried slasher who simply does not stop coming.",
  },
];
