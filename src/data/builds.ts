import type { Build } from "@/types";

// ============================================================
// Build library — Patch 10.0.1 (June 2026).
// Every `perkSlugs` entry resolves to a perk in perks.ts and
// every `characterSlug` resolves to a character in characters.ts.
//
// To add a build: copy a block, give it a unique `slug`, four
// valid perk slugs, and honest copy. That's it.
// ============================================================

export const BUILDS: Build[] = [
  // ============== SURVIVOR ==============
  {
    slug: "anti-tunnel-meta",
    title: "Second-Chance Stronghold",
    role: "survivor",
    perkSlugs: ["decisive-strike", "dead-hard", "off-the-record", "unbreakable"],
    archetypes: ["anti-tunnel", "meta"],
    difficulty: "advanced",
    metaTier: "S",
    summary: "The competitive answer to tunneling — stacked second chances that make you a nightmare to remove.",
    whyItWorks:
      "Each perk covers a different stage of being targeted: Off the Record hides you and eats a hit off-hook, Decisive Strike punishes the grab, Dead Hard extends the chase, and Unbreakable defeats the slug that all of the above invites. Together they force the Killer to commit far more time than tunneling should ever cost.",
    tradeoffs:
      "Almost entirely reactive — it does nothing until you're hooked or chased, and it leans on a clean Dead Hard. Against a Killer who simply spreads pressure and never tunnels, much of the kit sits idle.",
    bestAgainst:
      "Aggressive snowball and tunnel-prone Killers — the more they fixate on one Survivor, the harder this punishes them.",
    patch: "10.0.1",
    featured: true,
  },
  {
    slug: "gen-rush-efficiency",
    title: "Generator Overdrive",
    role: "survivor",
    characterSlug: "dwight-fairfield",
    perkSlugs: ["prove-thyself", "deja-vu", "hyperfocus", "stake-out"],
    archetypes: ["gen-rush"],
    difficulty: "intermediate",
    metaTier: "A",
    summary: "Maximum repair speed and skill-check value, with three-gen denial baked in.",
    whyItWorks:
      "Prove Thyself rewards grouping up, Déjà Vu spreads your repairs to dismantle three-gens, and Hyperfocus plus Stake Out turn every skill check into a chunk of bonus progress. The result is gens that pop noticeably faster than a Killer expects.",
    tradeoffs:
      "Hyperfocus demands consistent great skill checks — fumble them and you lose most of the build's value. It also offers nothing for the chase, so you rely on teammates to buy you time.",
    bestAgainst:
      "Slower, setup-heavy Killers who want a long game — out-pace their slowdown before it comes online.",
    extras: [
      { name: "Commodious Toolbox", kind: "item", note: "Amplifies the repair lead even further." },
    ],
    patch: "10.0.1",
    featured: true,
  },
  {
    slug: "solo-queue-info",
    title: "Solo-Queue Eyes",
    role: "survivor",
    perkSlugs: ["kindred", "windows-of-opportunity", "bond", "sprint-burst"],
    archetypes: ["meta", "beginner"],
    difficulty: "beginner",
    metaTier: "A",
    summary: "Constant aura information that replaces the comms solo players don't have.",
    whyItWorks:
      "Kindred shows you the whole team (and the Killer) during every hook, Bond keeps tabs on nearby teammates, and Windows teaches you the map's loops while Sprint Burst gets you to them. You always know whether to go for a save, hide, or hit a gen — the core decision in solo queue.",
    tradeoffs:
      "It's an information build, not a power build: it makes you smarter, not stronger. You still have to act on what you see.",
    bestAgainst:
      "Any Killer, in any solo lobby — this is the build that teaches the game.",
    patch: "10.0.1",
    featured: true,
  },
  {
    slug: "boon-support",
    title: "Sanctuary Station",
    role: "survivor",
    characterSlug: "mikaela-reid",
    perkSlugs: ["circle-of-healing", "shadow-step", "exponential", "sprint-burst"],
    archetypes: ["boon", "altruist"],
    difficulty: "intermediate",
    metaTier: "B",
    summary: "A self-relighting boon totem that heals, hides, and un-slugs the whole team.",
    whyItWorks:
      "One blessed totem becomes a healing field (Circle of Healing), a stealth zone (Shadow Step), and an anti-slug safety net (Exponential). Sprint Burst lets you dash back to relight it whenever the Killer snuffs it. Place it centrally and the map bends around your sanctuary.",
    tradeoffs:
      "Blessing eats real time, and a smart Killer will patrol and snuff the totem to bleed you of it. The value is highly dependent on placement and on teammates actually using it.",
    bestAgainst:
      "Hit-and-run Killers who rely on leaving you injured — your boon erases their pressure.",
    patch: "10.0.1",
  },
  {
    slug: "stealth-ghost",
    title: "Ghost in the Fog",
    role: "survivor",
    characterSlug: "jake-park",
    perkSlugs: ["iron-will", "urban-evasion", "quick-and-quiet", "dance-with-me"],
    archetypes: ["stealth"],
    difficulty: "intermediate",
    metaTier: "B",
    summary: "Disappear mid-chase — no noise, no scratch marks, no trail to follow.",
    whyItWorks:
      "Iron Will silences your injured grunts, Urban Evasion repositions you unseen, and Quick & Quiet plus Dance With Me let you vault into cover with no sound and no scratch marks, breaking the Killer's line on you entirely. A clean reset every loop.",
    tradeoffs:
      "Stealth collapses against tracking powers and aura perks, and Urban Evasion's slow crawl can cost you gen time if you over-use it. Demands patience and good map knowledge.",
    bestAgainst:
      "M1 and chase-reliant Killers with no innate tracking — break their line of sight and they're lost.",
    patch: "10.0.1",
  },
  {
    slug: "all-rounder-consistency",
    title: "Always Online",
    role: "survivor",
    perkSlugs: ["windows-of-opportunity", "sprint-burst", "resilience", "quick-gambit"],
    archetypes: ["meta"],
    difficulty: "intermediate",
    metaTier: "A",
    summary: "Value in every phase — chase, gens, and team pressure — with no dead perks.",
    whyItWorks:
      "Windows and Sprint Burst win you chases, Resilience speeds everything while you're injured (which is most of the match), and Quick Gambit converts your chase time into team gen speed. Nothing in the build ever sits unused.",
    tradeoffs:
      "It's a jack-of-all-trades — strong everywhere, dominant nowhere. It lacks a hard second chance, so a clean tunnel can still take you out.",
    bestAgainst:
      "Every Killer — this is the dependable default when you don't want to counter-pick.",
    patch: "10.0.1",
    featured: true,
  },
  {
    slug: "endgame-clutch",
    title: "Last Light",
    role: "survivor",
    perkSlugs: ["adrenaline", "resilience", "windows-of-opportunity", "balanced-landing"],
    archetypes: ["endgame"],
    difficulty: "advanced",
    metaTier: "A",
    summary: "Built to win the final gen and the endgame collapse with a free heal and burst.",
    whyItWorks:
      "Adrenaline banks a full health state and speed boost for the exact moment the last gen pops, Resilience keeps you fast while injured up to that point, and Windows plus Balanced Landing give you the loops to survive until the payoff lands.",
    tradeoffs:
      "Adrenaline is dead weight for most of the match and whiffs entirely if you're hooked when it triggers. This build gambles on reaching the endgame in the first place.",
    bestAgainst:
      "Endgame and NOED-reliant Killers — Adrenaline's burst can carry you straight out the gate.",
    patch: "10.0.1",
  },
  {
    slug: "toolbox-marathon",
    title: "Toolbox Marathon",
    role: "survivor",
    characterSlug: "felix-richter",
    perkSlugs: ["built-to-last", "streetwise", "prove-thyself", "deja-vu"],
    archetypes: ["gen-rush"],
    difficulty: "intermediate",
    metaTier: "B",
    summary: "One toolbox, stretched across the entire match, fuelling a relentless gen lead.",
    whyItWorks:
      "Streetwise slows your toolbox drain, Built to Last refills it whenever it runs dry, and Prove Thyself plus Déjà Vu turn that endless charge into a team-wide repair surge that dismantles three-gens. The toolbox effectively never runs out.",
    tradeoffs:
      "Two perks do nothing without an item, so a Franklin's Demise or a lost toolbox guts the build. Like all gen-rush, it gives you no help in a chase.",
    bestAgainst:
      "Three-gen and slowdown Killers who want to grind the match out — you simply out-repair the regression.",
    extras: [
      { name: "Commodious Toolbox", kind: "item", note: "Big charge pool to make Built to Last shine." },
      { name: "Wire Spool", kind: "addon", note: "Extra charges stretch the marathon longer." },
    ],
    patch: "10.0.1",
  },
  {
    slug: "self-sufficient-solo",
    title: "Self-Sufficient Solo",
    role: "survivor",
    perkSlugs: ["inner-strength", "resilience", "windows-of-opportunity", "sprint-burst"],
    archetypes: ["meta", "beginner"],
    difficulty: "beginner",
    metaTier: "B",
    summary: "Heal yourself, loop with confidence, and never wait on a teammate.",
    whyItWorks:
      "Inner Strength turns totem cleansing into free self-heals from a locker, Resilience rewards the time you spend injured, and Windows plus Sprint Burst keep you alive in chase. You stay productive without ever needing someone to come find you.",
    tradeoffs:
      "Inner Strength needs totems to spend, and a locker heal can be interrupted if the Killer is close. It trades raw power for independence.",
    bestAgainst:
      "Hit-and-run Killers — self-healing denies the pressure they're built around.",
    patch: "10.0.1",
  },
  {
    slug: "tanky-exhaustion-looper",
    title: "Iron Loop",
    role: "survivor",
    perkSlugs: ["dead-hard", "resilience", "windows-of-opportunity", "off-the-record"],
    archetypes: ["meta", "anti-tunnel"],
    difficulty: "advanced",
    metaTier: "A",
    summary: "Maximize time-in-chase: every hit dodged, every loop known, every off-hook protected.",
    whyItWorks:
      "Windows feeds you loops, Resilience speeds your vaults while injured, Dead Hard dodges the hit that would end the chase, and Off the Record keeps you safe and quiet after a hook. A chase specialist's toolkit for eating Killer time.",
    tradeoffs:
      "Heavily skill-dependent — a wasted Dead Hard collapses the build's ceiling. It offers nothing for gens, so your team has to convert the time you buy.",
    bestAgainst:
      "Chase-reliant M1 Killers — drag every chase out and the gens take care of themselves.",
    patch: "10.0.1",
  },
  {
    slug: "guardian-altruist",
    title: "Guardian Angel",
    role: "survivor",
    perkSlugs: ["off-the-record", "borrowed-time", "kindred", "windows-of-opportunity"],
    archetypes: ["altruist", "anti-tunnel"],
    difficulty: "intermediate",
    metaTier: "B",
    summary: "The dedicated rescuer — safe saves, protected survivors, and full hook awareness.",
    whyItWorks:
      "Kindred reads every hook so you know when a save is safe, Borrowed Time protects the person you unhook, Off the Record protects you for the rescue, and Windows gives you the loop to run the Killer off afterward. Purpose-built for the hook game.",
    tradeoffs:
      "It invests heavily in altruism and little in your own gens or solo escape, so a passive team can leave its value stranded. Borrowed Time is situational on top of base-kit protection.",
    bestAgainst:
      "Camping and tunneling Killers — you turn their hook pressure into failed trades.",
    patch: "10.0.1",
  },
  {
    slug: "adrenaline-gen-rush",
    title: "Sprint to the Finish",
    role: "survivor",
    characterSlug: "meg-thomas",
    perkSlugs: ["adrenaline", "prove-thyself", "deja-vu", "sprint-burst"],
    archetypes: ["gen-rush", "endgame"],
    difficulty: "intermediate",
    metaTier: "B",
    summary: "Rush the gens out, then cash Adrenaline the instant the lights go green.",
    whyItWorks:
      "Prove Thyself and Déjà Vu push the gens fast, and because you're the one finishing them, Adrenaline's heal-and-sprint fires right when you need an escape. Sprint Burst covers the gaps in between. The whole build is pointed at a fast, clean finish.",
    tradeoffs:
      "If the team stalls and gens drag, Adrenaline arrives late or not at all, and two perks lean on teammates repairing alongside you.",
    bestAgainst:
      "Killers who bank on a slow grind — you end the match before their late game exists.",
    patch: "10.0.1",
  },

  // ============== KILLER ==============
  {
    slug: "distributed-slowdown",
    title: "Distributed Slowdown",
    role: "killer",
    perkSlugs: ["pain-resonance", "pop-goes-the-weasel", "deadlock", "corrupt-intervention"],
    archetypes: ["slowdown"],
    difficulty: "intermediate",
    metaTier: "S",
    summary: "The reliable 2026 backbone — layered gen regression that never depends on luck.",
    whyItWorks:
      "Corrupt buys the opening, Deadlock blocks a gen on every completion, Pain Resonance blows up the most-progressed gen on a hook, and Pop punishes a kicked gen right after. Each effect triggers at a different moment, so the slowdown is constant rather than spiky — and none of it can be cleansed.",
    tradeoffs:
      "It offers zero help in the chase. If you can't reliably get downs and hooks, the regression never gets fed and the build does nothing. It rewards strong fundamentals, not raw power.",
    bestAgainst:
      "Coordinated gen-rush teams — the steady, un-cleansable drip outlasts their burst of repair speed.",
    patch: "10.0.1",
    featured: true,
  },
  {
    slug: "info-aura-pressure",
    title: "All-Seeing Hunt",
    role: "killer",
    characterSlug: "the-artist",
    perkSlugs: ["lethal-pursuer", "nowhere-to-hide", "bbq-and-chili", "darkness-revealed"],
    archetypes: ["info"],
    difficulty: "intermediate",
    metaTier: "A",
    summary: "Convert sightlines into hooks — you always know where the next chase is.",
    whyItWorks:
      "Lethal Pursuer opens the match knowing every position (and boosts the rest), BBQ points you to the next target on each hook, Nowhere to Hide flushes hiders off your gen kicks, and Darkness Revealed pulses the map at lockers. You never waste a second searching, which on a map-control Killer becomes relentless pressure.",
    tradeoffs:
      "Pure information with no slowdown — if you can't close chases quickly, the gens still fly while you stare at auras. It rewards efficient downs, not lengthy hunts.",
    bestAgainst:
      "Stealthy, scattered teams that rely on hiding — you simply never lose track of them.",
    patch: "10.0.1",
    featured: true,
  },
  {
    slug: "hex-gamble",
    title: "Four-Hex Gamble",
    role: "killer",
    perkSlugs: ["hex-ruin", "hex-undying", "devour-hope", "pentimento"],
    archetypes: ["hex"],
    difficulty: "advanced",
    metaTier: "B",
    summary: "A high-variance totem engine — terrifying if it holds, dead if it doesn't.",
    whyItWorks:
      "Undying protects Ruin's free regression and Devour's snowball, and once totems start falling, Pentimento rekindles them into stacking penalties. When the totems survive the early game, the pressure compounds into a near-unwinnable match for Survivors.",
    tradeoffs:
      "Brutally luck-dependent on totem spawns. A team that cleanses efficiently in the first minutes can gut the entire build before it ever comes online. High ceiling, low floor.",
    bestAgainst:
      "Teams that ignore totems and rush gens — they hand you a free, compounding snowball.",
    patch: "10.0.1",
  },
  {
    slug: "anti-heal-hit-and-run",
    title: "Bleed Them Dry",
    role: "killer",
    perkSlugs: ["sloppy-butcher", "pain-resonance", "dead-mans-switch", "nowhere-to-hide"],
    archetypes: ["anti-heal", "slowdown"],
    difficulty: "intermediate",
    metaTier: "A",
    summary: "Stretch every heal and punish every gen cluster — death by a thousand cuts.",
    whyItWorks:
      "Sloppy drags out healing so injured Survivors stay off gens longer, Nowhere to Hide finds them when you kick, and Pain Resonance plus Dead Man's Switch turn every hook into both regression and a wave of blocked gens. The result is a team perpetually stuck mending instead of repairing.",
    tradeoffs:
      "It wants you injuring lots of people rather than committing to long chases, so it's weaker on Killers who can't spread hits. Dead Man's Switch value is streaky.",
    bestAgainst:
      "Heal-heavy and medkit-stacking teams — you make their healing economy collapse.",
    patch: "10.0.1",
    featured: true,
  },
  {
    slug: "scourge-slowdown",
    title: "Scourge Snowball",
    role: "killer",
    perkSlugs: ["pain-resonance", "pop-goes-the-weasel", "grim-embrace", "deadlock"],
    archetypes: ["scourge-hook", "slowdown"],
    difficulty: "intermediate",
    metaTier: "A",
    summary: "Front-loaded slowdown that snowballs harder with every fresh hook.",
    whyItWorks:
      "Grim Embrace rewards hooking different Survivors with global gen blocks (and obsession info), Pain Resonance and Pop chunk progress on every hook and kick, and Deadlock cleans up on each completion. Spreading hooks isn't just safe — it actively powers the build.",
    tradeoffs:
      "Leaning on hooking four different Survivors means a tunnel-heavy game underfeeds Grim Embrace. Like all slowdown, it gives nothing in chase.",
    bestAgainst:
      "Altruistic teams that crowd the hook — every rescue feeds your snowball.",
    patch: "10.0.1",
  },
  {
    slug: "endgame-trap",
    title: "No Way Out",
    role: "killer",
    perkSlugs: ["pop-goes-the-weasel", "deadlock", "no-way-out", "noed"],
    archetypes: ["endgame"],
    difficulty: "intermediate",
    metaTier: "B",
    summary: "Stall to the gates, then slam the door — a lethal endgame trap.",
    whyItWorks:
      "Pop and Deadlock drag the match toward the gates, then No Way Out blocks the exit controls while NOED gives you haste and one-hit downs for a brutal endgame swing. The longer the game runs, the deadlier you become.",
    tradeoffs:
      "Honest warning: NOED is a hex and depends on a totem surviving — a thorough team cleanses it away and the finisher never fires. The build is a gamble on the endgame existing at all.",
    bestAgainst:
      "Teams that don't do totems and over-commit to the exit gates — you punish both.",
    patch: "10.0.1",
  },
  {
    slug: "m1-chase-tech",
    title: "Loop Breaker",
    role: "killer",
    characterSlug: "the-cannibal",
    perkSlugs: ["bamboozle", "coup-de-grace", "pain-resonance", "pop-goes-the-weasel"],
    archetypes: ["chase"],
    difficulty: "advanced",
    metaTier: "B",
    summary: "Give a weak-power Killer the chase tools to win loops — and keep gen pressure.",
    whyItWorks:
      "Bamboozle shuts down the windows that wreck M1 Killers, Coup de Grâce converts completed gens into surprise lunge downs, and Pain Resonance plus Pop keep the regression going so winning chases actually matters. It papers over the exact weakness low-mobility Killers share.",
    tradeoffs:
      "Two perks are pure chase with no slowdown of their own, so a slow chase still loses the gen race. Coup tokens come from gens being done — which is the thing you're trying to prevent.",
    bestAgainst:
      "Strong looping teams on pallet-dense maps — you finally close the loops they rely on.",
    patch: "10.0.1",
  },
  {
    slug: "jump-scare-stalker",
    title: "From the Dark",
    role: "killer",
    characterSlug: "the-dredge",
    perkSlugs: ["trail-of-torment", "tinkerer", "dark-devotion", "monitor-and-abuse"],
    archetypes: ["stealth-killer"],
    difficulty: "advanced",
    metaTier: "B",
    summary: "Strip away your terror radius and ambush from total silence.",
    whyItWorks:
      "Monitor shrinks your heartbeat for the approach, Tinkerer and Trail of Torment make you undetectable at the worst moments for Survivors, and Dark Devotion throws a phantom terror radius onto your obsession to mask where you really are. Nobody hears you coming.",
    tradeoffs:
      "It's a finesse build with little slowdown and no chase help — if a Survivor spots you anyway, you have only your raw power to fall back on. Dark Devotion's value swings on obsession play.",
    bestAgainst:
      "Gen-focused teams with their heads down — the surprise hit is devastating against tunnel vision.",
    patch: "10.0.1",
    featured: true,
  },
  {
    slug: "starstruck-snowball",
    title: "Spotlight Snowball",
    role: "killer",
    characterSlug: "the-trickster",
    perkSlugs: ["starstruck", "pain-resonance", "pop-goes-the-weasel", "bamboozle"],
    archetypes: ["snowball", "fun-meme"],
    difficulty: "advanced",
    metaTier: "B",
    summary: "Carry one Survivor and expose the whole rescue party for a chaotic snowball.",
    whyItWorks:
      "On a big-terror, mobile Killer, Starstruck Exposes everyone near you while you carry, turning a crowd of would-be rescuers into free downs. Pain Resonance and Pop keep gens in check between snowballs, and Bamboozle keeps the chase moving. When it pops off, it really pops off.",
    tradeoffs:
      "A meme-leaning build that lives or dies on big multi-Survivor moments; disciplined teams that spread out and don't swarm the hook starve it completely.",
    bestAgainst:
      "Altruistic, hook-rushing teams — they walk straight into the Exposed radius.",
    patch: "10.0.1",
  },
  {
    slug: "beginner-slowdown",
    title: "Slowdown Starter Kit",
    role: "killer",
    perkSlugs: ["corrupt-intervention", "deadlock", "sloppy-butcher", "pop-goes-the-weasel"],
    archetypes: ["slowdown", "beginner"],
    difficulty: "beginner",
    metaTier: "B",
    summary: "Forgiving, automatic value while you learn — three of these do their work for you.",
    whyItWorks:
      "Corrupt and Deadlock create time without you doing anything special, Sloppy stretches every heal, and Pop teaches the fundamental habit of kicking a gen after a hook. It buys a new Killer the breathing room to focus on chases.",
    tradeoffs:
      "Lower ceiling than the meta slowdown stack — it lacks Pain Resonance's punch. It's a teaching build you'll graduate from, not an endgame answer.",
    bestAgainst:
      "Anyone, while you're still learning the ropes — the value comes automatically.",
    patch: "10.0.1",
  },
  {
    slug: "gen-block-stall",
    title: "Locked Doors",
    role: "killer",
    perkSlugs: ["deadlock", "grim-embrace", "dead-mans-switch", "no-way-out"],
    archetypes: ["slowdown", "endgame"],
    difficulty: "intermediate",
    metaTier: "B",
    summary: "Block gens instead of regressing them — Survivors can't repair what they can't touch.",
    whyItWorks:
      "This stack wins by denial rather than regression: Grim Embrace and Deadlock block gens on hooks and completions, Dead Man's Switch locks gens Survivors abandon, and No Way Out seals the exits at the end. Survivors spend the match staring at gens they aren't allowed to work.",
    tradeoffs:
      "Blocking only delays — it doesn't erase progress like Pain Resonance does. A team that simply waits out each block and re-taps loses very little. Timing-dependent.",
    bestAgainst:
      "Twitchy teams that bail off gens the moment you approach — Dead Man's Switch punishes the reflex.",
    patch: "10.0.1",
  },
  {
    slug: "stealth-pressure",
    title: "Silent Pressure",
    role: "killer",
    characterSlug: "the-hillbilly",
    perkSlugs: ["tinkerer", "monitor-and-abuse", "trail-of-torment", "pain-resonance"],
    archetypes: ["stealth-killer", "slowdown"],
    difficulty: "advanced",
    metaTier: "B",
    summary: "Undetectable approaches plus real regression — sneak in, hook, and chunk a gen.",
    whyItWorks:
      "Tinkerer warns you the instant a gen is nearly done and hides your approach, Monitor shrinks your heartbeat for the sneak, Trail of Torment lets you peel off a gen unseen, and Pain Resonance converts the resulting hook into hard regression. Stealth that actually slows the game, not just startles.",
    tradeoffs:
      "Only one true slowdown perk, so it leans on your power to convert the surprise into a down. Against Survivors who hold gens to the last second, Tinkerer's warning can come too late.",
    bestAgainst:
      "Confident teams that commit hard to gens — the undetectable hit catches them mid-repair.",
    patch: "10.0.1",
  },
];
