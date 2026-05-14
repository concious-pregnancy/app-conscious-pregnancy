"use client";

export const dynamic = "force-dynamic";

import nextDynamic from "next/dynamic";
import { useEffect } from "react";
import config from "../../../../sanity.config";

const NextStudio = nextDynamic(() => import("next-sanity/studio").then((mod) => mod.NextStudio), {
  ssr: false,
});

export default function StudioPage() {
  useEffect(() => {
    const prevHtml = document.documentElement.style.cssText;
    const prevBody = document.body.style.cssText;
    document.documentElement.style.height = "100%";
    document.body.style.height = "100%";
    document.body.style.overflow = "hidden";
    document.body.style.overflowX = "visible";
    return () => {
      document.documentElement.style.cssText = prevHtml;
      document.body.style.cssText = prevBody;
    };
  }, []);

  return <NextStudio config={config} />;
}
