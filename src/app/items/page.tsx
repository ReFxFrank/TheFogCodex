import type { Metadata } from "next";
import { PageHeader } from "@/components/app/page-header";
import { ItemsExplorer } from "@/components/app/items-explorer";
import { ITEM_CATALOG, KILLER_ADDON_NOTE } from "@/data/items-catalog";

const offeringCount = ITEM_CATALOG.filter((e) => e.kind === "offering").length;
const itemCount = ITEM_CATALOG.filter((e) => e.kind === "item").length;
const addonCount = ITEM_CATALOG.filter((e) => e.kind === "addon").length;

export const metadata: Metadata = {
  title: "Items, Add-ons & Offerings",
  description:
    "Browse every Dead by Daylight survivor item, item add-on, and offering in plain English — toolboxes, med-kits, flashlights, keys, maps and their add-ons, plus bloodpoint, map, fog, mori and luck offerings. Filter by type, side, and rarity.",
};

export default function ItemsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <PageHeader
        eyebrow="Reference"
        title="Items, add-ons & offerings"
        description={`A browsable catalog of everything both sides carry into a trial — ${itemCount} survivor items, ${addonCount} add-ons, and ${offeringCount} offerings. Search or filter by type, side, and rarity. Effects are paraphrased and qualitative; exact numbers shift every patch.`}
        className="mb-8"
      />

      <ItemsExplorer />

      <section data-role="killer" className="mt-12">
        <h2 className="mb-3 font-display text-xl font-semibold text-ink">Killer add-ons</h2>
        <p className="rounded-2xl glass p-6 text-sm leading-relaxed text-ink-2">
          {KILLER_ADDON_NOTE}
        </p>
      </section>
    </div>
  );
}
