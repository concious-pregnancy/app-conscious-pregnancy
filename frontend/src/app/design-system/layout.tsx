"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/design-system/colors", label: "Colors" },
  { href: "/design-system/type", label: "Type" },
  { href: "/design-system/components", label: "Components" },
  { href: "/design-system/surfaces", label: "Surfaces" },
];

export default function DesignSystemLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "var(--white)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <nav
        style={{
          background: "var(--white)",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          gap: 0,
          padding: "0 32px",
          flexShrink: 0,
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--muted)",
            paddingRight: 24,
            marginRight: 8,
            borderRight: "1px solid var(--border)",
          }}
        >
          Design system
        </span>
        {tabs.map((tab) => {
          const active = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                padding: "14px 20px",
                color: active ? "var(--dark)" : "var(--muted)",
                textDecoration: "none",
                borderBottom: active ? "2px solid var(--sage)" : "2px solid transparent",
              }}
            >
              {tab.label}
            </Link>
          );
        })}
        <span
          style={{
            marginLeft: "auto",
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--border-strong)",
          }}
        >
          Dev only · not indexed
        </span>
      </nav>
      <div style={{ flex: 1, background: "var(--white)" }}>{children}</div>
    </div>
  );
}
