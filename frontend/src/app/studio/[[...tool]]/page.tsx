"use client";

export const dynamic = "force-dynamic";

import nextDynamic from "next/dynamic";
import config from "../../../../sanity.config";

const NextStudio = nextDynamic(() => import("next-sanity/studio").then((mod) => mod.NextStudio), {
  ssr: false,
});

const studioScrollFix = `
  [data-sanity] [data-overflow],
  [data-sanity] [data-overflow="auto"],
  [data-sanity] [data-overflow="hidden"] {
    overflow-y: auto !important;
    overflow-x: hidden;
  }
  [data-sanity] [data-ui="Pane"] > div {
    overflow-y: auto !important;
  }
  [data-sanity] [data-ui="FormBuilder"] {
    overflow-y: auto !important;
  }
  [data-sanity] {
    height: 100%;
  }
  html, body {
    height: 100%;
    overflow: hidden;
  }
`;

export default function StudioPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: studioScrollFix }} />
      <NextStudio config={config} />
    </>
  );
}
