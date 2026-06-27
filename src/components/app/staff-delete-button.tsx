"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { deleteBuildAsStaff, deleteCommentAsStaff } from "@/app/actions/staff";

interface Props {
  kind: "build" | "comment";
  id: string;
}

export function StaffDeleteButton({ kind, id }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function onClick() {
    if (!window.confirm(`Delete this ${kind}? This can't be undone.`)) return;
    startTransition(async () => {
      const res =
        kind === "build"
          ? await deleteBuildAsStaff(id)
          : await deleteCommentAsStaff(id);
      if (res.ok) router.refresh();
      else window.alert(res.error);
    });
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      aria-label={`Delete ${kind}`}
      className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-1.5 text-xs text-ink-2 transition-colors hover:border-killer/50 hover:text-killer"
    >
      <Trash2 className="h-3.5 w-3.5" />
      {pending ? "Deleting…" : "Delete"}
    </button>
  );
}
