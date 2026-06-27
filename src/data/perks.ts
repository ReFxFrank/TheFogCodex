import type { Perk } from "@/types";

// ============================================================
// Perk knowledgebase — Patch 10.0.1 (June 2026)
//
// Every effect description is PARAPHRASED in plain language —
// these are gameplay summaries, not copied wiki text.
//
// `characterSlug` = teachable owner (omit for general perks).
// To use real art: drop /public/images/perks/<slug>.png and set
// the `icon` field on the perk below.
// ============================================================

export const PERKS: Perk[] = [
  // ---------------- SURVIVOR ----------------
  {
    slug: "adrenaline",
    name: "Adrenaline",
    role: "survivor",
    characterSlug: "meg-thomas",
    categories: ["endgame", "healing"],
    tierHint: "A",
    description:
      "The instant the final generator is completed, you heal one health state and surge with a burst of speed. The payoff is automatic and huge — but it does nothing until the endgame finally arrives.",
  },
  {
    slug: "decisive-strike",
    name: "Decisive Strike",
    role: "survivor",
    characterSlug: "laurie-strode",
    categories: ["anti-tunnel"],
    tierHint: "A",
    description:
      "For a window after being unhooked, hitting a skill check while carried lets you stab free and stun the Killer, buying precious distance. The textbook punishment for tunneling.",
  },
  {
    slug: "dead-hard",
    name: "Dead Hard",
    role: "survivor",
    characterSlug: "david-king",
    categories: ["exhaustion", "anti-tunnel"],
    tierHint: "A",
    description:
      "While injured and recently unhooked, tap the active-ability button mid-chase for a flicker of invulnerability to dodge one hit. Enormous in skilled hands, useless if mistimed. Causes exhaustion.",
  },
  {
    slug: "off-the-record",
    name: "Off the Record",
    role: "survivor",
    characterSlug: "zarina-kassir",
    categories: ["anti-tunnel", "stealth"],
    tierHint: "A",
    description:
      "After an unhook you become hard to pin down — your aura stays hidden, your grunts of pain quiet down, and you shrug off the next hit. The Killer can't tunnel you off-hook without paying for it.",
  },
  {
    slug: "unbreakable",
    name: "Unbreakable",
    role: "survivor",
    characterSlug: "bill-overbeck",
    categories: ["utility", "anti-tunnel"],
    tierHint: "A",
    description:
      "Recover from the dying state on your own once per trial, and crawl back to your feet faster every time you're downed. The premier answer to slugging.",
  },
  {
    slug: "borrowed-time",
    name: "Borrowed Time",
    role: "survivor",
    characterSlug: "bill-overbeck",
    categories: ["anti-tunnel", "utility"],
    tierHint: "B",
    description:
      "Extends the protection a Survivor gets right after you unhook them, letting them take a hit and run. Layered on top of the base-kit safety, it makes risky saves survivable.",
  },
  {
    slug: "prove-thyself",
    name: "Prove Thyself",
    role: "survivor",
    characterSlug: "dwight-fairfield",
    categories: ["gen-repair"],
    tierHint: "A",
    description:
      "Repairing near other Survivors speeds everyone up and showers the team in bonus bloodpoints. The more hands on a gen, the faster it falls — the engine of any gen-rush.",
  },
  {
    slug: "deja-vu",
    name: "Déjà Vu",
    role: "survivor",
    categories: ["gen-repair", "aura-reading"],
    tierHint: "B",
    description:
      "Reveals generators clustered into a potential three-gen and boosts your repair speed on them, helping you break the cluster apart before the Killer can defend it.",
  },
  {
    slug: "hyperfocus",
    name: "Hyperfocus",
    role: "survivor",
    categories: ["gen-repair"],
    tierHint: "B",
    description:
      "Each great skill check stacks a bonus, making the next skill check faster, tighter, and far more rewarding. Pair it with Stake Out and repairs become explosive in steady hands.",
  },
  {
    slug: "stake-out",
    name: "Stake Out",
    role: "survivor",
    characterSlug: "david-tapp",
    categories: ["gen-repair", "utility"],
    tierHint: "B",
    description:
      "Standing inside the Killer's terror radius banks tokens that turn ordinary good skill checks into great ones with bonus progress. A quietly elite repair engine.",
  },
  {
    slug: "resilience",
    name: "Resilience",
    role: "survivor",
    categories: ["gen-repair", "healing", "utility"],
    tierHint: "A",
    description:
      "While injured, everything you do gets faster — repairing, healing, vaulting, sabotaging. Turns the cost of being hurt into raw, always-online efficiency.",
  },
  {
    slug: "windows-of-opportunity",
    name: "Windows of Opportunity",
    role: "survivor",
    characterSlug: "kate-denson",
    categories: ["aura-reading", "utility"],
    tierHint: "A",
    description:
      "Reveals the auras of nearby pallets and windows, so you always know your next loop. The single best perk for learning — and winning — chases.",
  },
  {
    slug: "sprint-burst",
    name: "Sprint Burst",
    role: "survivor",
    characterSlug: "meg-thomas",
    categories: ["exhaustion"],
    tierHint: "A",
    description:
      "Break into a sprint the moment you start running, instantly opening distance. It fires on its own, so disciplined movement is needed to save it for the chase. Causes exhaustion.",
  },
  {
    slug: "lithe",
    name: "Lithe",
    role: "survivor",
    characterSlug: "feng-min",
    categories: ["exhaustion"],
    tierHint: "B",
    description:
      "Vault a window or pallet and explode into a sprint — perfect for peeling off a strong loop and resetting the chase. Causes exhaustion.",
  },
  {
    slug: "balanced-landing",
    name: "Balanced Landing",
    role: "survivor",
    characterSlug: "nea-karlsson",
    categories: ["exhaustion"],
    tierHint: "B",
    description:
      "Land from a great height and surge forward while staggering far less, turning vertical maps into escape routes. Causes exhaustion.",
  },
  {
    slug: "kindred",
    name: "Kindred",
    role: "survivor",
    categories: ["aura-reading"],
    tierHint: "A",
    description:
      "While anyone hangs on a hook, every Survivor sees each other — and, when you're the hooked one, the Killer lurking nearby. Solo-queue's single best information tool.",
  },
  {
    slug: "bond",
    name: "Bond",
    role: "survivor",
    characterSlug: "dwight-fairfield",
    categories: ["aura-reading"],
    tierHint: "B",
    description:
      "See the auras of teammates within range, so you can group up for a fast gen or peel away from a chase headed your way. Cheap, constant awareness.",
  },
  {
    slug: "iron-will",
    name: "Iron Will",
    role: "survivor",
    characterSlug: "jake-park",
    categories: ["stealth"],
    tierHint: "B",
    description:
      "Muffles your grunts of pain while injured, letting you slip a chase and melt into the fog. A cornerstone of any stealth playstyle.",
  },
  {
    slug: "urban-evasion",
    name: "Urban Evasion",
    role: "survivor",
    characterSlug: "nea-karlsson",
    categories: ["stealth"],
    tierHint: "C",
    description:
      "Move far faster while crouched, slipping between cover and repositioning without ever standing tall enough for the Killer to spot you.",
  },
  {
    slug: "quick-and-quiet",
    name: "Quick & Quiet",
    role: "survivor",
    characterSlug: "meg-thomas",
    categories: ["stealth"],
    tierHint: "B",
    description:
      "Silences the noise of a rushed vault or locker dive, letting you break line of sight and vanish mid-chase. The setup for every disappearing act.",
  },
  {
    slug: "dance-with-me",
    name: "Dance With Me",
    role: "survivor",
    characterSlug: "kate-denson",
    categories: ["stealth"],
    tierHint: "B",
    description:
      "Leave no scratch marks for a few seconds after a quick vault or locker exit, erasing your trail so the Killer loses your direction entirely.",
  },
  {
    slug: "inner-strength",
    name: "Inner Strength",
    role: "survivor",
    characterSlug: "nancy-wheeler",
    categories: ["healing", "totem"],
    tierHint: "B",
    description:
      "Cleanse a totem to bank a charge, then duck into a locker to quietly heal yourself to full. Self-sufficient healing that doubles as totem pressure.",
  },
  {
    slug: "built-to-last",
    name: "Built to Last",
    role: "survivor",
    characterSlug: "felix-richter",
    categories: ["utility", "gen-repair"],
    tierHint: "B",
    description:
      "Stay still for a moment and your depleted item silently refills, letting a single toolbox or medkit carry you through the whole match. Made for item-stacking builds.",
  },
  {
    slug: "streetwise",
    name: "Streetwise",
    role: "survivor",
    characterSlug: "nea-karlsson",
    categories: ["utility"],
    tierHint: "C",
    description:
      "Your item drains more slowly and you share that thrift with nearby teammates, stretching toolboxes and medkits across the entire team.",
  },
  {
    slug: "circle-of-healing",
    name: "Circle of Healing",
    role: "survivor",
    characterSlug: "mikaela-reid",
    categories: ["boon", "healing"],
    tierHint: "B",
    description:
      "Bless a totem to raise a healing aura where Survivors mend themselves and each other quickly — a mobile field hospital you can simply relight if the Killer snuffs it.",
  },
  {
    slug: "shadow-step",
    name: "Shadow Step",
    role: "survivor",
    characterSlug: "mikaela-reid",
    categories: ["boon", "stealth"],
    tierHint: "C",
    description:
      "Bless a totem to erase Survivor scratch marks and auras within its range, turning a chase that passes through the boon into a clean vanishing act.",
  },
  {
    slug: "exponential",
    name: "Boon: Exponential",
    role: "survivor",
    characterSlug: "jonah-vasquez",
    categories: ["boon", "utility"],
    tierHint: "C",
    description:
      "Bless a totem so downed Survivors recover and pick themselves up far faster within its glow — a potent, well-placed answer to a slugging Killer.",
  },
  {
    slug: "quick-gambit",
    name: "Quick Gambit",
    role: "survivor",
    categories: ["gen-repair", "utility"],
    tierHint: "B",
    description:
      "While you're the one being chased, teammates repairing generators get a speed boost. Your time spent running becomes your team's gen pressure.",
  },

  // ---------------- KILLER ----------------
  {
    slug: "pain-resonance",
    name: "Scourge Hook: Pain Resonance",
    role: "killer",
    characterSlug: "the-artist",
    categories: ["scourge-hook", "gen-slowdown"],
    tierHint: "S",
    description:
      "Hooking a Survivor on a Scourge Hook detonates the most-progressed generator, blowing away a chunk of its work and screaming its location. Reliable regression that never depends on totem luck.",
  },
  {
    slug: "pop-goes-the-weasel",
    name: "Pop Goes the Weasel",
    role: "killer",
    characterSlug: "the-clown",
    categories: ["gen-slowdown"],
    tierHint: "A",
    description:
      "For a window after each hook, kicking a generator instantly devours a slice of its current progress. Front-loaded pressure that rewards staying on the offensive.",
  },
  {
    slug: "deadlock",
    name: "Deadlock",
    role: "killer",
    characterSlug: "the-cenobite",
    categories: ["gen-slowdown"],
    tierHint: "A",
    description:
      "Whenever a generator is completed, the next most-progressed one is sealed for a stretch, forcing Survivors off it and buying you time. Zero setup, almost no counterplay.",
  },
  {
    slug: "corrupt-intervention",
    name: "Corrupt Intervention",
    role: "killer",
    characterSlug: "the-plague",
    categories: ["gen-slowdown"],
    tierHint: "A",
    description:
      "At the opening of the trial the three generators farthest from you are blocked, funneling Survivors together and protecting your map control in the critical first minutes.",
  },
  {
    slug: "grim-embrace",
    name: "Grim Embrace",
    role: "killer",
    characterSlug: "the-artist",
    categories: ["gen-slowdown", "aura-reading"],
    tierHint: "A",
    description:
      "Hooking each different Survivor once briefly blocks every generator, and the fourth such hook locks them down hard while revealing the obsession. Rewards spreading your hooks around.",
  },
  {
    slug: "dead-mans-switch",
    name: "Dead Man's Switch",
    role: "killer",
    characterSlug: "the-twins",
    categories: ["gen-slowdown"],
    tierHint: "B",
    description:
      "After a Scourge Hook, any generator a Survivor lets go of is blocked, punishing the instinct to bail the moment you approach. Brutal stacked with Pain Resonance.",
  },
  {
    slug: "lethal-pursuer",
    name: "Lethal Pursuer",
    role: "killer",
    characterSlug: "the-nemesis",
    categories: ["aura-reading", "tracking"],
    tierHint: "A",
    description:
      "See every Survivor's aura for the opening seconds of the trial and extend the duration of your other aura perks. The premier opener for any information build.",
  },
  {
    slug: "nowhere-to-hide",
    name: "Nowhere to Hide",
    role: "killer",
    characterSlug: "the-knight",
    categories: ["aura-reading"],
    tierHint: "A",
    description:
      "Kicking a generator reveals the auras of all Survivors nearby, flushing out the teammates hiding just out of sight. Instant, free value on every single kick.",
  },
  {
    slug: "bbq-and-chili",
    name: "Barbecue & Chilli",
    role: "killer",
    characterSlug: "the-cannibal",
    categories: ["aura-reading", "tracking"],
    tierHint: "B",
    description:
      "Hooking a Survivor reveals the auras of the others far across the map, pointing you straight to your next chase and cutting wasted time spent rotating.",
  },
  {
    slug: "darkness-revealed",
    name: "Darkness Revealed",
    role: "killer",
    characterSlug: "the-dredge",
    categories: ["aura-reading", "tracking"],
    tierHint: "B",
    description:
      "Searching a locker lights up the auras of all Survivors near every locker on the map — a powerful pulse of information, devastating at chokepoints.",
  },
  {
    slug: "sloppy-butcher",
    name: "Sloppy Butcher",
    role: "killer",
    categories: ["anti-heal"],
    tierHint: "A",
    description:
      "Your basic attacks tear a deep, bleeding wound that drags out healing, stretching the time Survivors spend mending instead of sitting on generators.",
  },
  {
    slug: "hex-ruin",
    name: "Hex: Ruin",
    role: "killer",
    characterSlug: "the-hag",
    categories: ["hex", "gen-slowdown"],
    tierHint: "B",
    description:
      "While its totem stands, every generator quietly regresses the moment no one is working it. Enormous, hands-off pressure — until a Survivor stumbles onto the totem and cleanses it.",
  },
  {
    slug: "hex-undying",
    name: "Hex: Undying",
    role: "killer",
    characterSlug: "the-blight",
    categories: ["hex"],
    tierHint: "B",
    description:
      "Guards your other hexes — cleansing one simply teleports it to Undying's totem — and reveals Survivors lingering near any totem. Doubles the lifespan of a hex gamble.",
  },
  {
    slug: "devour-hope",
    name: "Hex: Devour Hope",
    role: "killer",
    characterSlug: "the-hag",
    categories: ["hex", "endgame"],
    tierHint: "B",
    description:
      "Hooks taken far from its totem stack tokens that grant haste, then one-hit downs, and finally the power to kill by hand. A snowball that ends games — if the totem survives.",
  },
  {
    slug: "pentimento",
    name: "Hex: Pentimento",
    role: "killer",
    characterSlug: "the-artist",
    categories: ["hex", "gen-slowdown"],
    tierHint: "B",
    description:
      "Rekindle cleansed totems to apply stacking penalties — slower repairs, healing, recovery and more. Turns the Survivors' own totem cleansing into your late-game engine.",
  },
  {
    slug: "noed",
    name: "Hex: No One Escapes Death",
    role: "killer",
    categories: ["hex", "endgame"],
    tierHint: "B",
    description:
      "If any totem still stands when the last generator pops, you gain haste and one-hit downs for the endgame. A coin-flip finisher — devastating, or dead on arrival if the totems were cleared.",
  },
  {
    slug: "no-way-out",
    name: "No Way Out",
    role: "killer",
    characterSlug: "the-trickster",
    categories: ["endgame"],
    tierHint: "B",
    description:
      "The first time each Survivor is hooked banks time; once the gates are powered, their controls are blocked for that whole duration, stalling the escape and screaming the alarm.",
  },
  {
    slug: "bamboozle",
    name: "Bamboozle",
    role: "killer",
    characterSlug: "the-clown",
    categories: ["chase"],
    tierHint: "B",
    description:
      "Vault windows faster and slam them shut behind you, shutting down the loops that weak-power Killers struggle to break. A genuine chase equalizer.",
  },
  {
    slug: "coup-de-grace",
    name: "Coup de Grâce",
    role: "killer",
    characterSlug: "the-twins",
    categories: ["chase"],
    tierHint: "B",
    description:
      "Each completed generator charges tokens that dramatically extend your next lunge, turning a near-miss at a loop into a clean down. Pure, unconditional chase pressure.",
  },
  {
    slug: "tinkerer",
    name: "Tinkerer",
    role: "killer",
    characterSlug: "the-hillbilly",
    categories: ["gen-slowdown", "tracking", "stealth"],
    tierHint: "B",
    description:
      "When a generator nears completion you're alerted and turn undetectable, letting you swoop in unseen for a surprise. A timeless stealth-pressure classic.",
  },
  {
    slug: "trail-of-torment",
    name: "Trail of Torment",
    role: "killer",
    characterSlug: "the-executioner",
    categories: ["stealth", "gen-slowdown"],
    tierHint: "C",
    description:
      "Kick a generator to mark it and vanish from sight until a Survivor touches it, letting you stalk away from a regressing gen and ambush out of the fog.",
  },
  {
    slug: "dark-devotion",
    name: "Dark Devotion",
    role: "killer",
    characterSlug: "the-plague",
    categories: ["stealth", "aura-reading"],
    tierHint: "C",
    description:
      "Striking your obsession cloaks your terror radius onto them, so other Survivors hear a heartbeat that isn't yours while you stalk in total silence.",
  },
  {
    slug: "monitor-and-abuse",
    name: "Monitor & Abuse",
    role: "killer",
    characterSlug: "the-doctor",
    categories: ["stealth", "chase"],
    tierHint: "C",
    description:
      "Shrinks your terror radius outside of a chase for a stealthy approach, then widens it the moment the chase begins to disorient. Quiet control over exactly what Survivors hear.",
  },
  {
    slug: "starstruck",
    name: "Starstruck",
    role: "killer",
    characterSlug: "the-trickster",
    categories: ["chase", "utility"],
    tierHint: "B",
    description:
      "While you carry a Survivor, everyone caught in your terror radius is struck Exposed — and stays vulnerable afterward. A snowball engine on big-terror, high-mobility Killers.",
  },

  // ---------------- SURVIVOR (extended meta pool) ----------------
  {
    slug: "vigil",
    name: "Vigil",
    role: "survivor",
    characterSlug: "quentin-smith",
    categories: ["exhaustion", "utility"],
    tierHint: "B",
    description:
      "You and nearby allies shrug off exhaustion and other status effects faster, quietly squeezing extra value out of every exhaustion perk the team is running.",
  },
  {
    slug: "self-care",
    name: "Self-Care",
    role: "survivor",
    characterSlug: "claudette-morel",
    categories: ["healing"],
    tierHint: "C",
    description:
      "Heal yourself anywhere, with no medkit required. Total independence at the cost of tempo — the classic trade of safety for time spent off generators.",
  },
  {
    slug: "botany-knowledge",
    name: "Botany Knowledge",
    role: "survivor",
    characterSlug: "claudette-morel",
    categories: ["healing"],
    tierHint: "C",
    description:
      "Speeds up your healing and sharpens the potency of medkits, turning a quick patch-up into a dependable, repeatable habit.",
  },
  {
    slug: "empathy",
    name: "Empathy",
    role: "survivor",
    characterSlug: "claudette-morel",
    categories: ["aura-reading"],
    tierHint: "C",
    description:
      "See the auras of injured and dying survivors across the map, so you always know who needs help — and, by extension, where the Killer is working.",
  },
  {
    slug: "lightweight",
    name: "Lightweight",
    role: "survivor",
    categories: ["stealth"],
    tierHint: "C",
    description:
      "Your scratch marks fade faster and cling closer together, making the trail you leave behind far harder for the Killer to read after a break in chase.",
  },

  // ---------------- KILLER (extended meta pool) ----------------
  {
    slug: "a-nurses-calling",
    name: "A Nurse's Calling",
    role: "killer",
    characterSlug: "the-nurse",
    categories: ["aura-reading"],
    tierHint: "A",
    description:
      "Reveals the auras of survivors healing themselves or others within range — punishing the heal and pointing you straight to where the action is.",
  },
  {
    slug: "stridor",
    name: "Stridor",
    role: "killer",
    characterSlug: "the-nurse",
    categories: ["tracking"],
    tierHint: "B",
    description:
      "Amplifies the breathing and grunts of injured survivors, making sound-based tracking far more reliable — brutal on Killers who hunt by ear.",
  },
  {
    slug: "thanatophobia",
    name: "Thanatophobia",
    role: "killer",
    characterSlug: "the-nurse",
    categories: ["gen-slowdown", "anti-heal"],
    tierHint: "B",
    description:
      "Every injured, hooked, or dying survivor drags down the whole team's repair, healing and sabotage speed. The more hurt they are, the slower the match crawls.",
  },
  {
    slug: "spirit-fury",
    name: "Spirit Fury",
    role: "killer",
    characterSlug: "the-spirit",
    categories: ["chase"],
    tierHint: "B",
    description:
      "After eating enough pallet stuns, the next dropped pallet is instantly smashed to pieces, flipping a strong loop straight back into your favor.",
  },
  {
    slug: "enduring",
    name: "Enduring",
    role: "killer",
    characterSlug: "the-hillbilly",
    categories: ["chase"],
    tierHint: "B",
    description:
      "Recover from pallet stuns far faster, shrinking the distance a survivor buys by dropping one. Pairs notoriously well with Spirit Fury.",
  },
  {
    slug: "lightborn",
    name: "Lightborn",
    role: "killer",
    characterSlug: "the-hillbilly",
    categories: ["utility"],
    tierHint: "B",
    description:
      "Flashlight blinds slide off you entirely and reveal the survivor who tried — turning a flashlight squad into a stream of free auras.",
  },
  {
    slug: "coulrophobia",
    name: "Coulrophobia",
    role: "killer",
    characterSlug: "the-clown",
    categories: ["anti-heal"],
    tierHint: "C",
    description:
      "Healing crawls within your terror radius, making any save or patch-up attempted near you a genuine risk. A natural anti-heal companion.",
  },
  {
    slug: "eruption",
    name: "Eruption",
    role: "killer",
    characterSlug: "the-nemesis",
    categories: ["gen-slowdown"],
    tierHint: "B",
    description:
      "Kicked generators are primed; the moment you down a survivor, every primed gen erupts, bleeding progress and screaming its location across the map.",
  },
  {
    slug: "infectious-fright",
    name: "Infectious Fright",
    role: "killer",
    characterSlug: "the-plague",
    categories: ["tracking"],
    tierHint: "B",
    description:
      "Down a survivor and everyone else caught in your terror radius screams, revealing themselves — the setup for a devastating snowball.",
  },
  {
    slug: "brutal-strength",
    name: "Brutal Strength",
    role: "killer",
    categories: ["chase"],
    tierHint: "C",
    description:
      "Tear through dropped pallets and breakable walls far faster, denying survivors the safety that a broken loop should have cost you.",
  },
];
