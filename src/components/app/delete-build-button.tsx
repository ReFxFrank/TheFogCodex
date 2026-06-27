"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { deleteBuild } from "@/app/actions/community";
import { Button } from "@/components/ui/button";

export function DeleteBuildButton({ buildId }: { buildId: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function onDelete() {
    if (!window.confirm("Delete this build? This can't be undone.")) return;
    startTransition(async () => {
      await deleteBuild(buildId);
      router.push("/community");
      router.refresh();
    });
  }

  return (
    <Button variant="outline" size="sm" onClick={onDelete} disabled={pending}>
      <Trash2 className="h-4 w-4" />
      {pending ? "Deleting…" : "Delete"}
    </Button>
  );
}
