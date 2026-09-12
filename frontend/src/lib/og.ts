// Shared social preview image. Pages that set their own `openGraph` object
// replace the layout's entirely (Next.js merges metadata shallowly), so they
// must pass this in `images` too or the preview goes blank.
export const OG_IMAGE = {
  url: "/og-heart-hands.jpg",
  width: 1200,
  height: 630,
  alt: "Hands forming a heart over a pregnant belly, held from behind by a partner",
};
