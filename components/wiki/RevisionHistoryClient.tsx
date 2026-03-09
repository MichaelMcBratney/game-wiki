"use client";

import { RevisionHistory } from "./RevisionHistory";
import type { RevisionItem } from "./RevisionHistory";

type RevisionHistoryClientProps = {
  revisions: RevisionItem[];
  pageSlug: string;
};

export function RevisionHistoryClient({
  revisions,
  pageSlug,
}: RevisionHistoryClientProps) {
  const handleRevert = async (revisionId: string) => {
    if (!confirm("Revert to this version? This will create a new revision with the same content.")) return;
    const res = await fetch("/api/wiki/revert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pageSlug, revisionId }),
    });
    if (res.ok) {
      window.location.href = `/wiki/${pageSlug}`;
    } else {
      const data = await res.json().catch(() => ({}));
      alert(data.error || "Failed to revert");
    }
  };

  return (
    <RevisionHistory
      revisions={revisions}
      pageSlug={pageSlug}
      onRevert={handleRevert}
    />
  );
}
