import type { DefaultSession } from "next-auth";
import type { StaffRole } from "@/types";

// Expose the database user id, staff role, and ban status on the session.
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: StaffRole;
      banned: boolean;
    } & DefaultSession["user"];
  }
}
