"use client";

import { SessionProvider } from "next-auth/react";

/** Client-side session context so the header can show auth state without
 *  forcing every page to render dynamically. */
export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
