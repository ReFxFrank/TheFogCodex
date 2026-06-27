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
    summary: "The classic anti-tunnel stack. Come back for me and you'll regret it.",
    whyItWorks:
      "Each perk covers a different part of getting targeted. Off the Record hides you and eats a hit after the unhook, Decisive Strike punishes a grab, Dead Hard buys one more loop, and Unbreakable gets you up if they slug you instead. Tunneling you ends up costing the killer way more time than it should.",
    tradeoffs:
      "It's all reactive. None of it does anything until you're on hook or in chase, and a lot of it leans on hitting Dead Hard cleanly. Against a killer who just spreads pressure and never tunnels, half the build sits there doing nothing.",
    bestAgainst:
      "Killers who lock onto one person. The more they tunnel, the harder this punishes them.",
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
    summary: "Pump gens out fast and break up three-gens before they form.",
    whyItWorks:
      "Prove Thyself speeds you up when you group on a gen, Déjà Vu shows you which gens to hit so a three-gen never forms, and Hyperfocus plus Stake Out turn good skill checks into chunks of free progress. Gens go a lot faster than the killer plans for.",
    tradeoffs:
      "Hyperfocus only pays off if you actually hit your skill checks, so a shaky hand loses most of the value. And there's nothing here for chase, so you're trusting your team to buy the time.",
    bestAgainst:
      "Slow, setup-heavy killers who want a long game. Finish the gens before their slowdown even gets going.",
    extras: [
      { name: "Commodious Toolbox", kind: "item", note: "Pushes the repair lead even further." },
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
    summary: "All the info you'd get from comms, without the comms.",
    whyItWorks:
      "Kindred shows you the whole team and the killer every time someone's hooked, Bond keeps an eye on nearby teammates, and Windows teaches you the loops while Sprint Burst gets you there. You always know whether to go for the save, hide, or stay on the gen, which is basically the whole game in solo queue.",
    tradeoffs:
      "It makes you smarter, not stronger. You still have to make the right call with what you're seeing.",
    bestAgainst:
      "Any killer, any solo lobby. This is the build that teaches you the game.",
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
    summary: "A boon you keep relighting that heals, hides, and picks people up.",
    whyItWorks:
      "One blessed totem turns into a heal station (Circle of Healing), a stealth zone (Shadow Step), and an anti-slug net (Exponential) all at once, and Sprint Burst lets you run back to relight it whenever the killer snuffs it. Drop it somewhere central and the map sort of bends around it.",
    tradeoffs:
      "Blessing takes real time, and a smart killer will just keep patrolling and snuffing it to drain you. How good it is really comes down to placement and whether your team actually uses it.",
    bestAgainst:
      "Hit-and-run killers who want to leave you injured. The boon just undoes their pressure.",
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
    summary: "Vanish in the middle of a chase. No noise, no scratch marks, nothing to follow.",
    whyItWorks:
      "Iron Will kills your injured grunts, Urban Evasion moves you around unseen, and Quick & Quiet plus Dance With Me let you dive into cover without a sound or a scratch mark, so the killer just loses you. Clean reset every loop.",
    tradeoffs:
      "Stealth falls apart against tracking powers and aura perks, and crouch-walking everywhere with Urban Evasion costs you gen time if you overdo it. You need patience and to actually know the maps.",
    bestAgainst:
      "M1 killers with no built-in tracking. Break their line of sight and they've got nothing.",
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
    summary: "Does something useful in every part of the match, with no dead perks.",
    whyItWorks:
      "Windows and Sprint Burst win you chases, Resilience speeds up everything while you're injured (which is most of the game), and Quick Gambit turns your chase time into gen speed for the team. Nothing in here ever just sits unused.",
    tradeoffs:
      "Jack of all trades, master of none. There's no hard second chance, so a committed tunnel can still drag you out.",
    bestAgainst:
      "Everything. This is the one you bring when you don't feel like counter-picking.",
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
    summary: "Set up to win the last gen and the gate standoff with a free heal and a sprint.",
    whyItWorks:
      "Adrenaline saves a full heal and a speed boost for the exact moment the last gen pops, Resilience keeps you quick while injured before that, and Windows plus Balanced Landing give you the loops to actually make it that far.",
    tradeoffs:
      "Adrenaline does nothing for most of the match and completely whiffs if you're on hook when it goes off. The whole thing is a bet that you'll reach the endgame at all.",
    bestAgainst:
      "Endgame and NOED killers. Adrenaline's burst can carry you right out the gate before they cash in.",
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
    summary: "One toolbox that basically never runs out, fueling a constant gen lead.",
    whyItWorks:
      "Streetwise slows the drain, Built to Last refills it when it's empty, and Prove Thyself plus Déjà Vu turn that endless charge into team-wide repair speed that pulls three-gens apart. The toolbox just keeps going.",
    tradeoffs:
      "Two of these do nothing without an item, so a Franklin's or a dropped toolbox basically deletes the build. And like any gen-rush, it's no help in a chase.",
    bestAgainst:
      "Three-gen and slowdown killers who want to grind it out. You just out-repair the regression.",
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
    summary: "Heal yourself, loop with confidence, and never wait around for a teammate.",
    whyItWorks:
      "Inner Strength turns cleansing a totem into a free locker heal, Resilience makes the time you spend injured count for something, and Windows plus Sprint Burst keep you alive in chase. You stay useful without needing anyone to come find you.",
    tradeoffs:
      "Inner Strength needs totems to spend, and a locker heal gets interrupted if the killer's close. You're trading raw power for not depending on anyone.",
    bestAgainst:
      "Hit-and-run killers. Healing yourself takes away the whole thing they're built around.",
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
    summary: "Built to eat killer time: dodge the hit, know the loop, stay safe off hook.",
    whyItWorks:
      "Windows hands you the loops, Resilience speeds your vaults while injured, Dead Hard dodges the hit that would end the chase, and Off the Record keeps you safe and quiet after a hook. It's a chase main's toolkit for wasting the killer's whole match.",
    tradeoffs:
      "Really skill-dependent. Waste your Dead Hard and the ceiling drops out. It also does nothing for gens, so your team has to convert the time you're buying.",
    bestAgainst:
      "M1 chase killers. Stretch every chase out and the gens take care of themselves.",
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
    summary: "The dedicated rescuer: safe saves, protected teammates, eyes on every hook.",
    whyItWorks:
      "Kindred tells you when a save is actually safe, Borrowed Time protects whoever you unhook, Off the Record keeps you safe going in for it, and Windows gives you a loop to run the killer off afterward. The whole thing is built around the hook game.",
    tradeoffs:
      "It pours everything into saving people and almost nothing into your own gens or escape, so a passive team leaves it stranded. Borrowed Time is also pretty situational on top of the base-kit protection.",
    bestAgainst:
      "Campers and tunnelers. You turn their hook pressure into a string of failed trades.",
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
    summary: "Blast the gens out, then cash Adrenaline the second the lights go green.",
    whyItWorks:
      "Prove Thyself and Déjà Vu push gens fast, and since you're usually the one finishing the last one, Adrenaline's heal-and-sprint fires right when you want to leave. Sprint Burst fills the gaps. The whole build points at a quick, clean exit.",
    tradeoffs:
      "If the team stalls and gens drag, Adrenaline shows up late or not at all, and a couple of these perks want teammates repairing next to you.",
    bestAgainst:
      "Killers banking on a slow grind. You're out before their late game ever happens.",
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
    summary: "The dependable slowdown stack. No hexes, no luck, just gens that won't get done.",
    whyItWorks:
      "Corrupt buys you the opening, Deadlock blocks a gen every time one pops, Pain Resonance blows up the most-finished gen on a hook, and Pop punishes a kicked gen right after. They all fire at different moments, so the slowdown is steady instead of spiky, and none of it can be cleansed.",
    tradeoffs:
      "Zero help in chase. If you can't get downs and hooks, nothing feeds the regression and the build does nothing. It rewards good fundamentals, not raw power.",
    bestAgainst:
      "Coordinated gen-rush teams. The steady drip you can't cleanse outlasts their burst of repair speed.",
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
    summary: "Turn line of sight into hooks. You always know where the next chase is.",
    whyItWorks:
      "Lethal Pursuer opens the match showing you everyone (and boosts your other aura perks), BBQ points you at the next target on every hook, Nowhere to Hide flushes out hiders when you kick, and Darkness Revealed pulses the whole map off a locker. You basically never waste time looking for people, and on a map-control killer that's brutal.",
    tradeoffs:
      "It's all info and no slowdown, so if you can't close chases fast the gens still fly while you stare at auras. It rewards quick downs, not long hunts.",
    bestAgainst:
      "Stealthy teams that scatter and hide. You just never lose them.",
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
    summary: "A totem engine that's terrifying if it survives and dead if it doesn't.",
    whyItWorks:
      "Undying protects Ruin's free regression and Devour's snowball, and once totems start dropping, Pentimento relights them into stacking penalties. If the totems make it past the early game, the pressure snowballs into a match survivors can't really win.",
    tradeoffs:
      "Totally at the mercy of totem spawns. A team that cleanses fast in the first few minutes can gut the whole thing before it gets going. Huge ceiling, very low floor.",
    bestAgainst:
      "Teams that ignore totems and rush gens. They're handing you a free snowball.",
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
    summary: "Stretch out every heal and punish every gen cluster. Death by a thousand cuts.",
    whyItWorks:
      "Sloppy drags healing out so injured survivors stay off gens, Nowhere to Hide finds them when you kick, and Pain Resonance plus Dead Man's Switch turn every hook into both regression and a wave of blocked gens. The team ends up stuck mending instead of repairing.",
    tradeoffs:
      "It wants you spreading injures around, not committing to long chases, so it's weaker on killers who can't get hits quickly. Dead Man's Switch is also pretty streaky.",
    bestAgainst:
      "Heal-heavy, medkit-stacking teams. You make their whole healing economy fall apart.",
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
    summary: "Front-loaded slowdown that gets nastier with every fresh hook.",
    whyItWorks:
      "Grim Embrace pays you for hooking different survivors with global gen blocks and obsession info, Pain Resonance and Pop chunk progress on every hook and kick, and Deadlock mops up on completions. Spreading hooks isn't just the safe play here, it's what powers the build.",
    tradeoffs:
      "Since it wants four different hooks, a tunnel-heavy game underfeeds Grim Embrace. And like all slowdown, it does nothing in chase.",
    bestAgainst:
      "Altruistic teams that pile on the hook. Every rescue feeds the snowball.",
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
    summary: "Stall it out to the gates, then slam the door.",
    whyItWorks:
      "Pop and Deadlock drag the game toward the gates, then No Way Out blocks the exit switches while NOED hands you haste and one-shots for a nasty endgame swing. The longer it goes, the scarier you get.",
    tradeoffs:
      "Worth being honest: NOED is a hex and needs a totem to survive, so a team that does their totems just deletes your finisher. The whole build bets on the endgame actually happening.",
    bestAgainst:
      "Teams that skip totems and crowd the exit gates. You punish both.",
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
    summary: "Give a weak-power killer the tools to win loops and still hold gen pressure.",
    whyItWorks:
      "Bamboozle shuts the windows that wreck M1 killers, Coup de Grâce turns finished gens into surprise lunge downs, and Pain Resonance plus Pop keep regression going so winning chases actually means something. It patches the exact weakness low-mobility killers all share.",
    tradeoffs:
      "Two perks are pure chase with no slowdown of their own, so a slow chase still loses the gen race. And Coup gets its tokens from gens being done, which is the thing you're trying to stop.",
    bestAgainst:
      "Strong looping teams on pallet-heavy maps. You finally get to close the loops they live on.",
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
    summary: "Drop your terror radius and come out of nowhere.",
    whyItWorks:
      "Monitor shrinks your heartbeat on the approach, Tinkerer and Trail of Torment make you undetectable at the worst possible moments for survivors, and Dark Devotion slaps a fake terror radius onto your obsession so nobody knows where you actually are. They don't hear you coming.",
    tradeoffs:
      "It's a finesse build with barely any slowdown and no chase help, so if someone spots you anyway it's just you and your power. Dark Devotion also swings a lot on obsession play.",
    bestAgainst:
      "Heads-down gen teams. The surprise hit hurts most against people with tunnel vision.",
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
    summary: "Pick someone up, expose the whole rescue party, and watch it spiral.",
    whyItWorks:
      "On a big-terror, mobile killer, Starstruck exposes everyone near you while you're carrying, so a crowd of would-be rescuers turns into free downs. Pain Resonance and Pop keep gens honest between snowballs, and Bamboozle keeps the chase moving. When it goes off, it really goes off.",
    tradeoffs:
      "It's a bit of a meme and it lives or dies on big group moments, so a disciplined team that spreads out and doesn't swarm the hook starves it completely.",
    bestAgainst:
      "Altruistic teams that rush the hook. They walk right into the exposed radius.",
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
    summary: "Forgiving, hands-off value while you're still learning. Three of these do the work for you.",
    whyItWorks:
      "Corrupt and Deadlock make time without you doing anything special, Sloppy stretches every heal, and Pop builds the habit of kicking a gen after a hook. It gives a newer killer the breathing room to just focus on chases.",
    tradeoffs:
      "Lower ceiling than the real meta stack since there's no Pain Resonance. It's a build you learn on and then move past, not an endgame answer.",
    bestAgainst:
      "Honestly, anyone, while you're learning the ropes. The value mostly happens on its own.",
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
    summary: "Don't regress gens, just don't let them be touched.",
    whyItWorks:
      "This one wins by denial instead of regression. Grim Embrace and Deadlock block gens on hooks and completions, Dead Man's Switch locks any gen survivors bail off, and No Way Out seals the exits at the end. They spend the whole match staring at gens they're not allowed to work.",
    tradeoffs:
      "Blocking only delays, it doesn't erase progress the way Pain Resonance does. A team that just waits each block out and re-taps barely loses anything. Very timing-dependent.",
    bestAgainst:
      "Twitchy teams that jump off a gen the second you walk up. Dead Man's Switch punishes exactly that reflex.",
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
    summary: "Undetectable approaches with actual regression. Sneak in, hook, chunk a gen.",
    whyItWorks:
      "Tinkerer warns you the moment a gen's almost done and hides your approach, Monitor shrinks your heartbeat for the sneak, Trail of Torment lets you slip off a gen unseen, and Pain Resonance turns the hook you get into hard regression. It's stealth that actually slows the game down instead of just startling people.",
    tradeoffs:
      "Only one real slowdown perk, so it leans on your power to turn the surprise into a down. Against survivors who sit on gens to the last second, Tinkerer's warning can come a beat too late.",
    bestAgainst:
      "Confident teams that commit hard to gens. The undetectable hit catches them mid-repair.",
    patch: "10.0.1",
  },
];
