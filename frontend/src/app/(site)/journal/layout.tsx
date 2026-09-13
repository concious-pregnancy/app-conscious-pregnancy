import type { Metadata } from "next";

// The journal isn't in the nav or the sitemap yet, and its articles are
// placeholder content, so keep /journal and every article out of search
// results. Remove this when the journal launches with original writing.
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function JournalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
