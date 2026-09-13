import type { Metadata } from "next";

// No page links to the service detail pages and they're not in the sitemap,
// so keep them out of search results. /services carries the service content.
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function ServiceDetailLayout({ children }: { children: React.ReactNode }) {
  return children;
}
