// ============================================================
// Meta history — the honest "was-OP / got-nerfed / controversial"
// signal, keyed by perk slug. This is the distinctive, patch-aware
// annotation most fan resources lack: not "is it good", but "how
// has the community's relationship with this perk changed".
//
// Keep these short, factual, and free of hype.
// ============================================================

export const META_NOTES: Record<string, string> = {
  // ---- Killer ----
  "pain-resonance":
    "Repeatedly tuned down from its dominant 2022 form, yet still the single most reliable regression perk in the game.",
  "pop-goes-the-weasel":
    "Reworked from a flat gen chunk to a percentage of current progress — a real nerf that left it a permanent meta staple anyway.",
  "grim-embrace":
    "Buffed into a top-tier slowdown perk, then trimmed back once it became near-mandatory in optimised builds.",
  "corrupt-intervention":
    "So consistently strong that players half-jokingly argue it should simply be base kit.",
  deadlock:
    "A quiet must-pick — strong and setup-free enough that nearly every slowdown build still runs it.",
  eruption:
    "Infamously overpowered in early 2023 (incapacitated survivors plus huge regression). Heavily nerfed and now situational.",
  "hex-ruin":
    "Reworked from a skill-check curse into passive regression, then nerfed again — a shadow of the meta-defining perk it once was.",
  noed: "Perennially controversial: a free endgame snowball or a dead perk, entirely depending on whether the totems were cleared.",
  thanatophobia:
    "Buffed into the slowdown meta, then pulled back down once stacked anti-heal builds got genuinely oppressive.",
  "a-nurses-calling":
    "A decade-old staple that quietly punishes the self-care meta harder than almost anything else.",

  // ---- Survivor ----
  "dead-hard":
    "The most-nerfed survivor perk in the game's history — once near-automatic value, now a precise, conditional skill expression.",
  "decisive-strike":
    "Cut from a five-second to a three-second stun and disabled while on objectives, after years as the undisputed anti-tunnel king.",
  "circle-of-healing":
    "Dominant on release and repeatedly nerfed as the whole boon-totem system was reined in.",
  "self-care":
    "Endlessly debated — efficient in theory, a notorious time-sink in practice. The classic 'noob trap or comfort pick' argument.",
  adrenaline:
    "Slightly reined in over the years, but still the premier endgame payoff and a fixture of clutch builds.",
  "prove-thyself":
    "Trimmed after gen-rush metas turned it into a near-automatic include for coordinated teams.",
  "off-the-record":
    "Rose to meta status as anti-tunnel protection, then saw its stealth and endurance window tightened in balance passes.",
};

export function getMetaNote(slug: string): string | undefined {
  return META_NOTES[slug];
}
