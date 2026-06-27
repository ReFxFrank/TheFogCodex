import type { Metadata } from "next";
import Link from "next/link";
import { Users, LayoutGrid, MessageSquare, Star, Ban, ArrowRight } from "lucide-react";
import { getStaffStats } from "@/lib/staff";

export const metadata: Metadata = { title: "Staff — Dashboard" };

export default async function StaffDashboard() {
  let stats = { users: 0, builds: 0, comments: 0, ratings: 0, banned: 0 };
  try {
    stats = await getStaffStats();
  } catch {
    /* DB hiccup — show zeros */
  }

  const cards = [
    { label: "Users", value: stats.users, Icon: Users, href: "/staff/users" },
    { label: "Community builds", value: stats.builds, Icon: LayoutGrid, href: "/staff/builds" },
    { label: "Comments", value: stats.comments, Icon: MessageSquare, href: "/staff/comments" },
    { label: "Ratings", value: stats.ratings, Icon: Star, href: "/staff/builds" },
    { label: "Banned", value: stats.banned, Icon: Ban, href: "/staff/users" },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="group rounded-2xl glass p-5 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:glow-accent"
          >
            <c.Icon className="h-5 w-5 text-gold" />
            <p className="mt-3 font-display text-3xl font-bold text-ink">{c.value}</p>
            <p className="text-xs text-ink-3">{c.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { href: "/staff/users", title: "Manage users", body: "Change roles, ban or unban, and remove accounts.", Icon: Users },
          { href: "/staff/builds", title: "Moderate builds", body: "Review and remove any community build.", Icon: LayoutGrid },
          { href: "/staff/comments", title: "Moderate comments", body: "Read the latest comments and delete anything off-limits.", Icon: MessageSquare },
        ].map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group rounded-2xl glass p-6 transition-[transform,box-shadow] duration-300 hover:glow-accent"
          >
            <c.Icon className="h-5 w-5 text-ink-2" />
            <h2 className="mt-3 font-display text-lg font-semibold text-ink">{c.title}</h2>
            <p className="mt-1 text-sm text-ink-2">{c.body}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm text-accent">
              Open
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
