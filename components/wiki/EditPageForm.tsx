"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Editor } from "./Editor";

type EditPageFormProps = {
  pageId: string;
  pageSlug: string;
  initialContent: string;
};

export function EditPageForm({
  pageId,
  pageSlug,
  initialContent,
}: EditPageFormProps) {
  const [content, setContent] = useState(initialContent);
  const [summary, setSummary] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/wiki/revisions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pageId,
          markdownContent: content,
          changeSummary: summary || "Edit",
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || res.statusText);
      }
      router.push(`/wiki/${pageSlug}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-wiki-muted mb-1">
          Change summary (optional)
        </label>
        <input
          type="text"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="e.g. Fixed typo, added section"
          className="w-full rounded-lg border border-wiki-border bg-wiki-surface px-3 py-2 text-gray-200 placeholder:text-wiki-muted focus:outline-none focus:ring-2 focus:ring-wiki-accent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-wiki-muted mb-1">
          Content (Markdown, [[Wikilinks]] supported)
        </label>
        <Editor
          initialContent={content}
          onChange={setContent}
          minHeight="28rem"
        />
      </div>
      {error && (
        <p className="text-wiki-danger text-sm">{error}</p>
      )}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 rounded-lg bg-wiki-accent text-white hover:bg-wiki-accent-hover disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save"}
        </button>
        <a
          href={`/wiki/${pageSlug}`}
          className="px-4 py-2 rounded-lg border border-wiki-border text-gray-300 hover:bg-wiki-surface"
        >
          Cancel
        </a>
      </div>
    </form>
  );
}
