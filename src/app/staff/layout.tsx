import { notFound } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Users, LayoutGrid, MessageSquare, ArrowLeft } from "lucide-react";
import { auth } from "@/auth";
import { isStaff } from "@/lib/permissions";
import { ROLE_LABEL } from "@/lib/permissions";

export const dynamic = "force-dynamic";

const NAV = [
  { href: "/staff", label: "Dashboard", Icon: ShieldCheck, exact: true },
  { href: "/staff/users", label: "Users", Icon: Users },
  { href: "/staff/builds", label: "Builds", Icon: LayoutGrid },
  { href: "/staff/comments", label: "Comments", Icon: MessageSquare },
];

export default async function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  // Hide the panel entirely from anyone who isn't staff.
  if (!session?.user || session.user.banned || !isStaff(session.user.role)) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-gold/40 bg-gold/10 text-gold">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div>
            <h1 className="font-display text-xl font-bold text-ink">Staff panel</h1>
            <p className="text-xs text-ink-3">
              Signed in as {session.user.name ?? session.user.email} ·{" "}
              <span className="text-gold">{ROLE_LABEL[session.user.role]}</span>
            </p>
          </div>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-ink-3 transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to site
        </Link>
      </div>

      <nav className="mb-8 flex flex-wrap gap-1 rounded-xl border border-white/10 bg-fog-800/40 p-1">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-ink-2 transition-colors hover:bg-white/5 hover:text-ink"
          >
            <item.Icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>

      {children}
    </div>
  );
}
