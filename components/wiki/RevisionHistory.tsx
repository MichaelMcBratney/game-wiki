"use client";

import { History, RotateCcw } from "lucide-react";
import Link from "next/link";

export type RevisionItem = {
  id: string;
  createdAt: string;
  changeSummary: string | null;
  authorId: string | null;
  isCurrent?: boolean;
};

type RevisionHistoryProps = {
  revisions: RevisionItem[];
  pageSlug: string;
  onRevert?: (revisionId: string) => void;
};

export function RevisionHistory({
  revisions,
  pageSlug,
  onRevert,
}: RevisionHistoryProps) {
  return (
    <div className="rounded-lg border border-wiki-border bg-wiki-surface overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-wiki-border bg-wiki-border/50">
        <History className="size-5 text-wiki-gold" />
        <h3 className="font-display font-semibold text-wiki-gold">
          Version history
        </h3>
      </div>
      <ul className="divide-y divide-wiki-border max-h-80 overflow-y-auto">
        {revisions.map((rev) => (
          <li
            key={rev.id}
            className="flex items-center justify-between gap-3 px-3 py-2 hover:bg-wiki-bg/30"
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm text-gray-300 truncate">
                {rev.changeSummary || "No summary"}
              </p>
              <p className="text-xs text-wiki-muted mt-0.5">
                {new Date(rev.createdAt).toLocaleString()}
                {rev.isCurrent && (
                  <span className="ml-2 text-wiki-accent font-medium">
                    (current)
                  </span>
                )}
              </p>
            </div>
            {onRevert && !rev.isCurrent && (
              <button
                type="button"
                onClick={() => onRevert(rev.id)}
                className="shrink-0 inline-flex items-center gap-1 text-sm text-wiki-accent hover:text-wiki-accent-hover"
                title="Revert to this version"
              >
                <RotateCcw className="size-4" />
                Revert
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
