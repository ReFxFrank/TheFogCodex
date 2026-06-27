"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import * as Popover from "@radix-ui/react-popover";
import { LogOut, User as UserIcon, LayoutGrid, LogIn } from "lucide-react";

export function UserMenu() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <span className="h-8 w-8 rounded-full bg-white/5 shimmer" aria-hidden />;
  }

  if (!session?.user) {
    return (
      <Link
        href="/login"
        className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-fog-800/60 px-2.5 py-2 text-sm text-ink-2 transition-colors hover:border-white/20 hover:text-ink"
      >
        <LogIn className="h-4 w-4" />
        <span className="hidden sm:inline">Sign in</span>
      </Link>
    );
  }

  const user = session.user;
  const initial = (user.name ?? user.email ?? "?").charAt(0).toUpperCase();

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          type="button"
          aria-label="Account menu"
          className="grid h-8 w-8 place-items-center overflow-hidden rounded-full border border-white/15 bg-fog-800 text-sm font-semibold text-ink transition-colors hover:border-accent"
        >
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.image} alt="" className="h-full w-full object-cover" />
          ) : (
            initial
          )}
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="end"
          sideOffset={8}
          className="z-[70] w-56 overflow-hidden rounded-xl glass-elevated p-1.5"
        >
          <div className="border-b border-white/8 px-3 py-2.5">
            <p className="truncate text-sm font-medium text-ink">
              {user.name ?? "Signed in"}
            </p>
            {user.email && (
              <p className="truncate text-xs text-ink-3">{user.email}</p>
            )}
          </div>
          <MenuLink href="/profile" icon={<LayoutGrid className="h-4 w-4" />}>
            My builds
          </MenuLink>
          <MenuLink href="/builds/new" icon={<UserIcon className="h-4 w-4" />}>
            Create a build
          </MenuLink>
          <button
            type="button"
            onClick={() => signOut()}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-ink-2 transition-colors hover:bg-white/5 hover:text-ink"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

function MenuLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-ink-2 transition-colors hover:bg-white/5 hover:text-ink"
    >
      {icon}
      {children}
    </Link>
  );
}
