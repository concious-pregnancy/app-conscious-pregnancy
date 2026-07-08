import path from "node:path";
import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  output: "standalone",
  assetPrefix: process.env.ASSET_PREFIX || undefined,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: path.join(__dirname),
  },
  // PostHog's ingest endpoints use trailing-slash API paths; don't redirect them.
  skipTrailingSlashRedirect: true,
  // Reverse-proxy PostHog through this origin so analytics survive ad blockers
  // and strict CSPs (connect-src 'self') without listing PostHog hosts.
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
      {
        source: "/ingest/flags",
        destination: "https://us.i.posthog.com/flags",
      },
    ];
  },
};

// Sentry build-time config. Source-map upload runs only when SENTRY_AUTH_TOKEN
// is valid. tunnelRoute keeps browser-to-Sentry traffic same-origin so it
// passes a strict CSP connect-src 'self'.
export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG || "golden-life-wellness-inc",
  project: process.env.SENTRY_PROJECT || "javascript-nextjs",
  authToken: process.env.SENTRY_AUTH_TOKEN,
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
  silent: !process.env.CI,
  disableLogger: true,
  // Annotate React components in stack traces with their file/line.
  reactComponentAnnotation: { enabled: true },
});
