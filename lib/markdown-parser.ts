/**
 * Markdown utilities for the Game Wiki.
 * - Wikilink syntax: [[Page Title]] → links to /wiki/page-title (slugified).
 */

/** Convert a display title to a URL slug (e.g. "Item Name" → "item-name"). */
export function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Regex to match Wikilinks: [[...]] with optional pipe for display text [[slug|display]]. */
const WIKILINK_REGEX = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;

/**
 * Preprocess markdown: replace Wikilink syntax with standard markdown links.
 * - [[Item Name]] → [Item Name](/wiki/item-name)
 * - [[Item Name|Custom label]] → [Custom label](/wiki/item-name)
 */
export function preprocessWikilinks(markdown: string): string {
  return markdown.replace(WIKILINK_REGEX, (_, target: string, label?: string) => {
    const slug = slugify(target);
    const display = (label ?? target).trim();
    return `[${display}](/wiki/${slug})`;
  });
}

/**
 * Apply all wiki-specific markdown preprocessing before passing to react-markdown.
 * Use this in MarkdownRenderer so that [[Wikilinks]] work correctly.
 */
export function prepareMarkdown(markdown: string): string {
  return preprocessWikilinks(markdown);
}
