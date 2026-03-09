"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { prepareMarkdown } from "@/lib/markdown-parser";
import Link from "next/link";

type MarkdownRendererProps = {
  content: string;
  className?: string;
};

/** Renders markdown with GFM and Wikilinks ([[Page Name]] → /wiki/page-name). */
export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  const processed = prepareMarkdown(content);

  return (
    <div className={`wiki-prose ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children, ...props }) => {
            if (href?.startsWith("/wiki/")) {
              return (
                <Link href={href} {...props}>
                  {children}
                </Link>
              );
            }
            return (
              <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
                {children}
              </a>
            );
          },
        }}
      >
        {processed}
      </ReactMarkdown>
    </div>
  );
}
