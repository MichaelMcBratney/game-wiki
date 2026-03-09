"use client";

import {
  Sword,
  Heart,
  MapPin,
  Target,
  Zap,
  Shield,
  type LucideIcon,
} from "lucide-react";

export type InfoboxRow = {
  label: string;
  value: string | number;
  icon?: string; // Lucide icon name
};

const iconMap: Record<string, LucideIcon> = {
  sword: Sword,
  heart: Heart,
  map: MapPin,
  target: Target,
  zap: Zap,
  shield: Shield,
};

export type InfoboxProps = {
  title: string;
  rows: InfoboxRow[];
  imageUrl?: string;
  className?: string;
};

/** Game-themed infobox (e.g. Item Stats, Boss HP, Map locations). Renders JSON-like row data. */
export function Infobox({ title, rows, imageUrl, className = "" }: InfoboxProps) {
  return (
    <div
      className={`rounded-lg border border-wiki-border bg-wiki-surface overflow-hidden ${className}`}
    >
      <div className="bg-wiki-border/50 px-3 py-2 border-b border-wiki-border">
        <h3 className="font-display font-semibold text-wiki-gold">{title}</h3>
      </div>
      {imageUrl && (
        <div className="p-2 border-b border-wiki-border">
          <img
            src={imageUrl}
            alt={title}
            className="w-full rounded object-cover max-h-48"
          />
        </div>
      )}
      <table className="w-full text-sm">
        <tbody>
          {rows.map((row, i) => {
            const Icon = row.icon ? iconMap[row.icon.toLowerCase()] : null;
            return (
              <tr
                key={i}
                className="border-b border-wiki-border last:border-b-0 even:bg-wiki-bg/30"
              >
                <td className="px-3 py-2 text-wiki-muted font-medium w-1/3 align-top">
                  <span className="inline-flex items-center gap-1.5">
                    {Icon && <Icon className="size-4 shrink-0" />}
                    {row.label}
                  </span>
                </td>
                <td className="px-3 py-2 text-gray-200">{row.value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
