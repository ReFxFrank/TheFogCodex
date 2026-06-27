import type { Metadata, Viewport } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";
import { FogBackground } from "@/components/app/fog-background";
import { SiteHeader } from "@/components/app/site-header";
import { SiteFooter } from "@/components/app/site-footer";
import { CommandPaletteProvider } from "@/components/app/command-palette";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-cinzel",
  display: "swap",
});

const SITE_NAME = "The Fog Codex";
const SITE_DESC =
  "A curated, searchable library of the best Dead by Daylight builds for Survivors and Killers — backed by a complete perk knowledgebase. An unofficial fan resource.";

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — Dead by Daylight Builds & Perk Knowledgebase`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESC,
  applicationName: SITE_NAME,
  keywords: [
    "Dead by Daylight",
    "DBD builds",
    "DBD perks",
    "killer builds",
    "survivor builds",
    "perk knowledgebase",
  ],
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESC,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0b0f",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${cinzel.variable}`}>
      <body className="antialiased">
        <FogBackground />
        <CommandPaletteProvider>
          <div className="relative flex min-h-dvh flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </CommandPaletteProvider>
      </body>
    </html>
  );
}
