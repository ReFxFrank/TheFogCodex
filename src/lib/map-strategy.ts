import { characters, perkBySlug } from "@/data";
import type { GameMap, MetaTier } from "@/types";

// ============================================================
// Per-map strategy: which killers tend to thrive, and which perks are worth
// bringing for each side. Derived from the map's attributes (setting / size /
// lean / layout tags) via a verified rule table, then matched against the
// site's actual roster and perk catalog — so it cross-links and stays in sync
// as content changes. These are general, high-level tendencies, not guarantees.
// ============================================================

interface RuleEntry {
  thrive: string[]; // killer archetypeTags that do well
  struggle: string[]; // killer archetypeTags that struggle
  why: string;
  survivorPerks: { slug: string; reason: string }[];
  killerPerks: { slug: string; reason: string }[];
}

// Rule table keyed by attribute. Populated from the verified workflow output.
// Keys: "setting:indoor|outdoor|mixed", "size:small|medium|large",
//       "lean:killer|balanced|survivor", and "tag:<bucket>".
const RULES: Record<string, RuleEntry> = {
  "setting:indoor": {"thrive":["stealth","ambush","map-control","teleport","traps","summoner"],"struggle":["ranged","zoning","mobility","rush","chainsaw"],"why":"Tight corridors and broken sightlines reward surprise approaches and zone-locking pressure while choking off ranged shots and high-speed power lines.","survivorPerks":[{"slug":"windows-of-opportunity","reason":"Indoor mazes hide loop layouts; aura-reading pallets/windows is essential navigation"},{"slug":"bond","reason":"Cramped indoor halls keep the killer constantly close; bond warns before you round into them"},{"slug":"quick-and-quiet","reason":"Plentiful indoor lockers and corners enable silent locker juke escapes"}],"killerPerks":[{"slug":"nowhere-to-hide","reason":"Aura kick cuts through blocked indoor sightlines to find survivors hugging walls"},{"slug":"darkness-revealed","reason":"Indoor maps are full of lockers; opening one reveals nearby auras through walls"},{"slug":"bamboozle","reason":"Indoor window-mazes let survivors chain vaults; blocking windows breaks the maze"},{"slug":"lethal-pursuer","reason":"Opening aura matters most where indoor walls block normal line of sight"}]},
  "setting:outdoor": {"thrive":["ranged","zoning","mobility","blink","phase","instadown"],"struggle":["traps","ambush","teleport"],"why":"Long open sightlines and connected terrain let projectiles and high-mobility powers operate at full value while ambush setups have fewer blind angles to exploit.","survivorPerks":[{"slug":"sprint-burst","reason":"Open spaces with gaps between loops reward exhaustion distance to reach safety"},{"slug":"lithe","reason":"Outdoor loops connect via vaults; lithe converts those into chase-extending sprints"},{"slug":"windows-of-opportunity","reason":"Scattered jungle gyms are easier to route between when their auras are shown"}],"killerPerks":[{"slug":"bbq-and-chili","reason":"Wide maps reward post-hook aura info to choose the next far target"},{"slug":"corrupt-intervention","reason":"Spread-out gens give survivors early traction; corrupt funnels them inward"},{"slug":"lethal-pursuer","reason":"Long sightlines let you act on the opening aura reveal immediately"}]},
  "setting:mixed": {"thrive":["anti-loop","mobility","tracking","map-control"],"struggle":["traps"],"why":"Hybrid layouts reward flexible, all-purpose powers that adapt between open chases and tight pockets rather than setups that need one consistent terrain type.","survivorPerks":[{"slug":"windows-of-opportunity","reason":"Inconsistent loop spacing; aura info adapts to both open and tight zones"},{"slug":"bond","reason":"Useful in cramped interior sections and to read teammate spacing outdoors"},{"slug":"resilience","reason":"Flat gen/vault/heal value that holds up regardless of which zone you are in"}],"killerPerks":[{"slug":"pain-resonance","reason":"Reliable slowdown that doesn't depend on the map's variable loop strength"},{"slug":"nowhere-to-hide","reason":"Reveals survivors hiding in the indoor pockets mixed maps tuck into corners"},{"slug":"lethal-pursuer","reason":"Flexible aura value works across both the open and enclosed sections"}]},
  "size:small": {"thrive":["anti-loop","snowball","instadown","traps","ambush","area"],"struggle":["mobility","rush","teleport"],"why":"Compact maps let weak M1 killers reach loops fast and apply 3-gen pressure, so snowball and trap setups dominate while traversal powers are wasted.","survivorPerks":[{"slug":"prove-thyself","reason":"Small maps cluster survivors together; co-op gen speed counters tight 3-gen pressure"},{"slug":"deja-vu","reason":"Highlights the three closest gens so you can actively break the small-map 3-gen"},{"slug":"resilience","reason":"Faster gen ticks matter most where killer pressure is constant"}],"killerPerks":[{"slug":"deadlock","reason":"Short patrol distances make a small map a 3-gen machine; deadlock stacks the lockout"},{"slug":"eruption","reason":"Tight gen spread means a kicked gen explodes survivors clustered nearby"},{"slug":"pop-goes-the-weasel","reason":"Short travel time lets you reliably reach and pop gens to defend a 3-gen"},{"slug":"corrupt-intervention","reason":"Locks far gens early, forcing survivors into your small-map 3-gen"}]},
  "size:medium": {"thrive":["anti-loop","mobility","tracking","ranged"],"struggle":[],"why":"Standard footprints reward balanced kits that can both close distance and win chases without favoring either extreme of traversal or pure denial.","survivorPerks":[{"slug":"prove-thyself","reason":"Balanced gen spacing rewards grouped, efficient gen progress"},{"slug":"windows-of-opportunity","reason":"Varied tiles; loop aura info keeps chases efficient"},{"slug":"resilience","reason":"General gen/heal/vault speed value that scales well on standard maps"}],"killerPerks":[{"slug":"pain-resonance","reason":"Consistent regression that fits the standard gen layout of a medium map"},{"slug":"pop-goes-the-weasel","reason":"Medium travel distances let you reach a gen to pop after a hook"},{"slug":"lethal-pursuer","reason":"Reliable opening pressure regardless of medium-map tile variety"}]},
  "size:large": {"thrive":["mobility","blink","phase","teleport","rush"],"struggle":["traps","ambush","area","summoner"],"why":"Sprawling maps punish slow M1 killers with long walks, so only fast traversal keeps gen pressure while stationary setup powers can't cover the ground.","survivorPerks":[{"slug":"prove-thyself","reason":"Large maps drag games long; co-op gen speed offsets slow patrols"},{"slug":"deja-vu","reason":"Spread-out gens are hard to find; aura highlights cut wasted walking"},{"slug":"urban-evasion","reason":"Travel dead-space lets crouch-stealth cross between objectives unseen"}],"killerPerks":[{"slug":"corrupt-intervention","reason":"Huge gen spread gives early free progress; corrupt buys patrol time"},{"slug":"pain-resonance","reason":"Slowdown is mandatory when patrol times are long; ranged regression spans the map"},{"slug":"bbq-and-chili","reason":"Post-hook aura tells you which far corner to commit to next"},{"slug":"lethal-pursuer","reason":"Saves seconds finding the first target across large traversal distances"}]},
  "lean:killer": {"thrive":["anti-loop","instadown","snowball","ranged"],"struggle":[],"why":"Killer-sided maps amplify any pressure kit by handing free hits and short loops, letting strong powers convert the layout advantage into early downs.","survivorPerks":[{"slug":"prove-thyself","reason":"Survivors must rush gens together before chases collapse"},{"slug":"decisive-strike","reason":"Snowball-prone killer maps invite tunneling; DS buys anti-tunnel breathing room"},{"slug":"sprint-burst","reason":"Deadzones force survivors to sprint to reach the few loops that exist"}],"killerPerks":[{"slug":"pain-resonance","reason":"Press the map's advantage with strong regression to snowball the lead"},{"slug":"infectious-fright","reason":"Scarce safe tiles make snowballs likely; scream info chains downs together"},{"slug":"pop-goes-the-weasel","reason":"Win chases fast, then pop gens to compound pressure"},{"slug":"lethal-pursuer","reason":"Stacks with map advantage to convert early aura into a fast first down"}]},
  "lean:balanced": {"thrive":["anti-loop","mobility","tracking","high-skill"],"struggle":[],"why":"Fair maps decide outcomes on skill and consistent power value rather than layout abuse, rewarding versatile and mechanically demanding killers.","survivorPerks":[{"slug":"windows-of-opportunity","reason":"Fair tile variety rewards efficient loop routing via aura info"},{"slug":"prove-thyself","reason":"Even maps come down to gen-versus-chase efficiency; co-op speed tips it"},{"slug":"resilience","reason":"Flat value perk that reliably improves core survivor actions"}],"killerPerks":[{"slug":"pain-resonance","reason":"Top-tier slowdown that performs consistently on a neutral layout"},{"slug":"pop-goes-the-weasel","reason":"Efficient on-demand regression that fits any fair gen spread"},{"slug":"lethal-pursuer","reason":"Reliable opening tempo regardless of the balanced map's specifics"}]},
  "lean:survivor": {"thrive":["blink","anti-loop","phase","mobility"],"struggle":["instadown","chainsaw","relentless","area"],"why":"Survivor-sided maps need powers that ignore loops entirely, since plain M1 and momentum-down killers get held at safe tiles all match.","survivorPerks":[{"slug":"windows-of-opportunity","reason":"Loop-rich maps reward chaining the many safe tiles via aura"},{"slug":"resilience","reason":"With chases lasting long, the gen/vault boost finishes gens before downs"},{"slug":"prove-thyself","reason":"Long survivable chases plus grouped gen speed close games out fast"}],"killerPerks":[{"slug":"corrupt-intervention","reason":"Survivor-sided maps snowball gens fast; corrupt slows the explosive early game"},{"slug":"pain-resonance","reason":"You need maximum slowdown to compete on a layout that favors survivors"},{"slug":"bamboozle","reason":"Loop-heavy maps need window blocks to make safe tiles winnable"},{"slug":"deadlock","reason":"Passive gen lockout buys time when chases are inherently hard to win here"}]},
  "tag:open": {"thrive":["ranged","instadown","anti-loop","chainsaw","hatchets","zoning"],"struggle":["stealth","ambush","traps"],"why":"Sparse loops and deadzones let projectiles and instant-down sprints punish exposed survivors, while stealth has no cover and traps have no chokepoints to seed.","survivorPerks":[{"slug":"sprint-burst","reason":"Deadzones demand instant distance to reach the nearest real loop"},{"slug":"dead-hard","reason":"Open deadzones force a hit reaching loops; dead-hard saves that hit"},{"slug":"lithe","reason":"Converts the few vaults in sparse maps into burst distance to safety"}],"killerPerks":[{"slug":"bbq-and-chili","reason":"Open sightlines plus aura make crossing deadzones to the next target trivial"},{"slug":"coup-de-grace","reason":"Deadzones leave survivors without pallets; lunge range converts that into free downs"},{"slug":"a-nurses-calling","reason":"Sparse cover means healing survivors are exposed; auras lead you straight in"},{"slug":"nowhere-to-hide","reason":"Few objects to hide behind means a kick reliably exposes nearby survivors"}]},
  "tag:strong-main-building": {"thrive":["anti-loop","blink","phase","ranged"],"struggle":["chainsaw","instadown","relentless","snowball"],"why":"God windows and infinite-style mains demand window-blocking or loop-bypassing powers, since straight-line momentum killers get endlessly looped inside.","survivorPerks":[{"slug":"windows-of-opportunity","reason":"Confirms the god-window/main resources so you loop them to the second"},{"slug":"resilience","reason":"Faster vaults make the main building's god window even more oppressive"},{"slug":"lithe","reason":"Main-building vaults convert into burst distance when you finally leave the tile"}],"killerPerks":[{"slug":"bamboozle","reason":"Blocks the god window so survivors can't infinite the main building"},{"slug":"brutal-strength","reason":"Main buildings stack pallets; faster breaks shut the strong tile down quicker"},{"slug":"enduring","reason":"Main-building pallets get chained; reduced stun lets you stay on the survivor"},{"slug":"spirit-fury","reason":"Punishes the pallet-heavy main building by auto-breaking after forced stuns"}]},
  "tag:low-visibility": {"thrive":["stealth","ambush","small","tracking","anti-stealth","teleport"],"struggle":["ranged","hatchets","zoning"],"why":"Corn and fog hide the killer's approach for surprise grabs and tracking value while obscuring the line-of-sight that ranged powers depend on.","survivorPerks":[{"slug":"iron-will","reason":"The killer hunts by sound in corn/fog; silencing grunts makes you hard to relocate"},{"slug":"urban-evasion","reason":"Low visibility hides crouch movement; you can sneak past the killer in the corn"},{"slug":"lightweight","reason":"Corn already hides you; fading scratch marks removes the killer's last trail"}],"killerPerks":[{"slug":"stridor","reason":"When vision is blocked by corn, amplified grunts become primary tracking"},{"slug":"lethal-pursuer","reason":"Aura cuts straight through fog and corn that block normal vision"},{"slug":"infectious-fright","reason":"Low-vis downs are easy to lose; the scream pinpoints nearby hidden survivors"},{"slug":"a-nurses-calling","reason":"Survivors heal hidden in the corn; the aura reveals them through foliage"}]},
  "tag:elevation": {"thrive":["blink","phase","teleport","mobility"],"struggle":["chainsaw","traps","snowball"],"why":"Multi-level drops let survivors break line and reset distance, so only powers that traverse or reach across floors keep pace while ground-bound charges get cut off.","survivorPerks":[{"slug":"balanced-landing","reason":"The signature elevation perk; every drop becomes a free exhaustion sprint to reset chase"},{"slug":"dead-hard","reason":"Drops let you bait a hit then dead-hard, doubling distance gained off elevation"},{"slug":"windows-of-opportunity","reason":"Multi-level tiles are disorienting; aura clarifies routes between floors"},{"slug":"bond","reason":"Vertical maps hide teammates on other floors; bond reveals them through height"}],"killerPerks":[{"slug":"a-nurses-calling","reason":"Survivors heal on the floor you aren't on; auras through floors let you commit upward"},{"slug":"bamboozle","reason":"Elevated tiles pair drops with windows; blocking them removes the height-reset escape"},{"slug":"nowhere-to-hide","reason":"Reveals survivors tucked on the floor a kick would otherwise miss"},{"slug":"lethal-pursuer","reason":"Multi-floor layouts hide the start position; aura shows which level to descend toward"}]},
  "tag:pallet-dense": {"thrive":["anti-loop","zoning","slowdown","blink","phase"],"struggle":["instadown","chainsaw","relentless","snowball"],"why":"A sea of safe pallets rewards killers that eat or bypass pallets quickly, while M1 momentum killers burn the whole chase dropping every drop.","survivorPerks":[{"slug":"windows-of-opportunity","reason":"Tracks which of the many pallets remain so you never run to a dropped one"},{"slug":"resilience","reason":"Abundant pallets mean long chases; faster everything-else converts that time to gens"},{"slug":"prove-thyself","reason":"Strong pallet maps already win chases; group gen speed closes the game out"}],"killerPerks":[{"slug":"brutal-strength","reason":"Pallet-dense maps demand constant breaking; faster breaks reclaim lost time"},{"slug":"enduring","reason":"You will eat many pallet stuns here; reduced duration keeps you on the survivor"},{"slug":"spirit-fury","reason":"Turns the survivors' many pallet stuns into free auto-breaks that drain resources"},{"slug":"bamboozle","reason":"Cuts pallet-and-window loops short so the dense layout can't be chained forever"}]},
};

/** Collapse a map's many specific tags into the handful of rule buckets. */
function tagBuckets(tags: readonly string[]): string[] {
  const has = (...kw: string[]) => tags.some((t) => kw.some((k) => t.includes(k)));
  const keys: string[] = [];
  if (has("open", "deadzone", "sparse-loop", "low-pallet", "dead-loop", "few-interior", "spread-gen"))
    keys.push("tag:open");
  if (has("main-building", "god-loop", "god-pallet", "strong-window", "strong-loop", "many-windows", "huge-central"))
    keys.push("tag:strong-main-building");
  if (has("low-visibility", "corn", "foliage", "bamboo")) keys.push("tag:low-visibility");
  if (has("two-floor", "second-floor")) keys.push("tag:elevation");
  if (has("pallet-dense", "god-pallet", "mixed-pallets")) keys.push("tag:pallet-dense");
  return keys;
}

const TIER_RANK: Record<string, number> = { S: 0, A: 1, B: 2, C: 3, "off-meta": 4 };
const tierRank = (t?: MetaTier) => (t ? TIER_RANK[t] ?? 5 : 5);

export interface RecommendedKiller {
  slug: string;
  name: string;
  tier?: MetaTier;
  matched: string[]; // which thrive-tags this killer hits
}
export interface RecommendedPerk {
  slug: string;
  name: string;
  reason: string;
}
export interface MapStrategy {
  demand: string;
  killers: RecommendedKiller[];
  strugglesNote: string | null;
  survivorPerks: RecommendedPerk[];
  killerPerks: RecommendedPerk[];
}

const SETTING_DESC: Record<GameMap["setting"], string> = {
  indoor: "indoor",
  outdoor: "outdoor",
  mixed: "mixed indoor/outdoor",
};
const SIZE_DESC: Record<GameMap["size"], string> = {
  small: "small",
  medium: "medium-sized",
  large: "large",
};
const LEAN_CLAUSE: Record<GameMap["lean"], string> = {
  killer: " that leans killer-sided",
  survivor: " that leans survivor-sided",
  balanced: " that plays fairly evenly",
};

export function deriveMapStrategy(map: GameMap): MapStrategy {
  const keys = [
    `setting:${map.setting}`,
    `size:${map.size}`,
    `lean:${map.lean}`,
    ...tagBuckets(map.tags),
  ];
  const applicable = keys.map((k) => RULES[k]).filter(Boolean);

  const thriveCount = new Map<string, number>();
  const struggle = new Set<string>();
  // slug -> { reason, count } so perks recommended by several attributes rank up.
  const survivor = new Map<string, { reason: string; count: number }>();
  const killerP = new Map<string, { reason: string; count: number }>();

  for (const r of applicable) {
    for (const t of r.thrive) thriveCount.set(t, (thriveCount.get(t) ?? 0) + 1);
    for (const t of r.struggle) struggle.add(t);
    for (const p of r.survivorPerks) {
      const cur = survivor.get(p.slug);
      survivor.set(p.slug, { reason: cur?.reason ?? p.reason, count: (cur?.count ?? 0) + 1 });
    }
    for (const p of r.killerPerks) {
      const cur = killerP.get(p.slug);
      killerP.set(p.slug, { reason: cur?.reason ?? p.reason, count: (cur?.count ?? 0) + 1 });
    }
  }

  // Recommended killers: roster killers whose tags intersect the thrive set,
  // ranked by how strongly they match, then by tier.
  const killers: RecommendedKiller[] = characters
    .filter((c) => c.role === "killer")
    .map((c) => {
      const matched = c.archetypeTags.filter((t) => thriveCount.has(t));
      const score = matched.reduce((s, t) => s + (thriveCount.get(t) ?? 0), 0);
      return { c, matched, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || tierRank(a.c.killerTier) - tierRank(b.c.killerTier))
    .slice(0, 4)
    .map((x) => ({
      slug: x.c.slug,
      name: x.c.name,
      tier: x.c.killerTier,
      matched: x.matched,
    }));

  const resolvePerks = (m: Map<string, { reason: string; count: number }>): RecommendedPerk[] =>
    [...m.entries()]
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 4)
      .map(([slug, v]) => ({ slug, name: perkBySlug.get(slug)?.name ?? slug, reason: v.reason }));

  const strugglesNote =
    struggle.size > 0
      ? `Tougher going for ${[...struggle].slice(0, 3).map(humanArchetype).join(", ")} killers.`
      : null;

  return {
    demand: composeDemand(map, applicable),
    killers,
    strugglesNote,
    survivorPerks: resolvePerks(survivor),
    killerPerks: resolvePerks(killerP),
  };
}

function composeDemand(map: GameMap, applicable: RuleEntry[]): string {
  const lead = `A ${SIZE_DESC[map.size]}, ${SETTING_DESC[map.setting]} map${LEAN_CLAUSE[map.lean]}.`;
  // Append the most specific "why" we have (tag rules are pushed last, so the
  // last applicable entry is the most specific signal).
  const why = applicable[applicable.length - 1]?.why;
  return why ? `${lead} ${why}` : lead;
}

const ARCHETYPE_LABEL: Record<string, string> = {
  "anti-loop": "anti-loop",
  mobility: "high-mobility",
  ranged: "ranged",
  zoning: "zoning",
  stealth: "stealth",
  ambush: "ambush",
  "map-control": "map-control",
  instadown: "one-shot",
  traps: "trap",
  summoner: "summoner",
  blink: "blink",
  phase: "phase",
  snowball: "snowball",
  teleport: "teleport",
};
function humanArchetype(t: string): string {
  return ARCHETYPE_LABEL[t] ?? t;
}
