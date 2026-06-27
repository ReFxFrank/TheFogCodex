import { handlers } from "@/auth";

// pg requires the Node.js runtime (not edge).
export const runtime = "nodejs";

export const { GET, POST } = handlers;
