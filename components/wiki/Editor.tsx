"use client";

import { useState } from "react";

type EditorProps = {
  initialContent: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  minHeight?: string;
};

/** Simple textarea-based editor for wiki markdown. */
export function Editor({
  initialContent,
  onChange,
  placeholder = "Write your page in Markdown. Use [[Page Name]] for wikilinks.",
  className = "",
  minHeight = "24rem",
}: EditorProps) {
  const [value, setValue] = useState(initialContent);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const v = e.target.value;
    setValue(v);
    onChange?.(v);
  };

  return (
    <textarea
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className={`w-full rounded-lg border border-wiki-border bg-wiki-surface px-3 py-2 text-gray-200 placeholder:text-wiki-muted focus:outline-none focus:ring-2 focus:ring-wiki-accent resize-y font-mono text-sm ${className}`}
      style={{ minHeight }}
      spellCheck={false}
    />
  );
}
