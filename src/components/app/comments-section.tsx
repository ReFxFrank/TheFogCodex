"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Send, Trash2 } from "lucide-react";
import { addComment, deleteComment } from "@/app/actions/community";
import type { CommentWithAuthor } from "@/lib/community";
import { AuthorChip } from "./author-chip";
import { Button } from "@/components/ui/button";

interface CommentsSectionProps {
  buildId: string;
  comments: CommentWithAuthor[];
  currentUserId: string | null;
  isAuthenticated: boolean;
}

function timeAgo(date: Date): string {
  const d = new Date(date);
  const secs = Math.floor((Date.now() - d.getTime()) / 1000);
  const units: [number, string][] = [
    [31536000, "y"],
    [2592000, "mo"],
    [86400, "d"],
    [3600, "h"],
    [60, "m"],
  ];
  for (const [s, label] of units) {
    const v = Math.floor(secs / s);
    if (v >= 1) return `${v}${label} ago`;
  }
  return "just now";
}

export function CommentsSection({
  buildId,
  comments,
  currentUserId,
  isAuthenticated,
}: CommentsSectionProps) {
  const router = useRouter();
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function post() {
    const text = body.trim();
    if (!text) return;
    setError(null);
    startTransition(async () => {
      const res = await addComment(buildId, text);
      if (!res.ok) setError(res.error);
      else {
        setBody("");
        router.refresh();
      }
    });
  }

  function remove(id: string) {
    startTransition(async () => {
      await deleteComment(id);
      router.refresh();
    });
  }

  return (
    <section className="mt-10">
      <h2 className="mb-4 font-display text-lg font-semibold text-ink">
        Discussion <span className="text-sm text-ink-3">({comments.length})</span>
      </h2>

      {isAuthenticated ? (
        <div className="rounded-2xl glass p-4">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            maxLength={1000}
            rows={3}
            placeholder="Share a tip, a tweak, or a matchup note…"
            className="w-full resize-y rounded-lg border border-white/10 bg-fog-900/60 px-3 py-2 text-sm text-ink outline-none placeholder:text-ink-3 focus-visible:border-accent"
          />
          <div className="mt-2 flex items-center justify-between gap-3">
            <span className="text-xs text-ink-3">{body.length}/1000</span>
            <Button variant="accent" size="sm" onClick={post} disabled={pending || !body.trim()}>
              <Send className="h-4 w-4" />
              Post comment
            </Button>
          </div>
          {error && <p className="mt-2 text-sm text-killer">{error}</p>}
        </div>
      ) : (
        <div className="rounded-2xl glass p-4 text-sm text-ink-2">
          <Link
            href={`/login?callbackUrl=/community/${buildId}`}
            className="text-accent hover:underline"
          >
            Sign in
          </Link>{" "}
          to join the discussion.
        </div>
      )}

      <ul className="mt-4 flex flex-col gap-3">
        {comments.map((c) => (
          <li key={c.id} className="rounded-2xl glass p-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <AuthorChip name={c.authorName} image={c.authorImage} size="md" />
                <span className="text-xs text-ink-3">{timeAgo(c.createdAt)}</span>
              </div>
              {currentUserId === c.userId && (
                <button
                  type="button"
                  onClick={() => remove(c.id)}
                  disabled={pending}
                  aria-label="Delete comment"
                  className="rounded p-1 text-ink-3 transition-colors hover:text-killer"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
            <p className="mt-2 whitespace-pre-wrap text-sm text-ink-2">{c.body}</p>
          </li>
        ))}
        {comments.length === 0 && (
          <li className="rounded-2xl border border-dashed border-white/10 p-6 text-center text-sm text-ink-3">
            No comments yet. Start the conversation.
          </li>
        )}
      </ul>
    </section>
  );
}
