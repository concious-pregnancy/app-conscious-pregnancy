import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { test } from "@playwright/test";

const OUT = path.resolve(process.cwd(), "artifacts", "font-audit");

const FONT_PROPS = [
  "fontFamily",
  "fontSize",
  "fontWeight",
  "fontStyle",
  "textTransform",
  "lineHeight",
  "letterSpacing",
] as const;

type FontSpec = Record<(typeof FONT_PROPS)[number], string>;

type Item = {
  tag: string;
  text: string;
  section: string | null;
  cls: string;
} & FontSpec;

async function collectFromSite(
  page: import("@playwright/test").Page,
  url: string,
  sectionAttr: string,
): Promise<Item[]> {
  await page.goto(url, { waitUntil: "networkidle", timeout: 120_000 });
  await page.waitForTimeout(1000);
  await page.evaluate(() => {
    // Walk the page to flush sticky/scrub/lazy mounts
    const h = document.documentElement.scrollHeight;
    for (let y = 0; y < h; y += 600) window.scrollTo(0, y);
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(500);

  return page.evaluate(
    ({ props, sectionAttr }) => {
      const TEXT_TAGS = new Set([
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "p",
        "span",
        "li",
        "a",
        "button",
        "label",
      ]);
      const out: any[] = [];
      const sectionFor = (el: Element): string | null => {
        let cur: Element | null = el;
        while (cur) {
          const v = (cur as HTMLElement).getAttribute(sectionAttr);
          if (v) return v;
          cur = cur.parentElement;
        }
        return null;
      };
      const visit = (el: Element) => {
        if (TEXT_TAGS.has(el.tagName.toLowerCase())) {
          const text = (el.textContent || "").trim();
          // skip empty and very long blocks of nested text
          const ownText = Array.from(el.childNodes)
            .filter((n) => n.nodeType === 3)
            .map((n) => n.textContent?.trim() || "")
            .join(" ")
            .trim();
          const useText = ownText || text;
          if (useText.length >= 3 && useText.length <= 100) {
            const cs = window.getComputedStyle(el as HTMLElement);
            const spec: any = {
              tag: el.tagName.toLowerCase(),
              text: useText.slice(0, 80),
              section: sectionFor(el),
              cls: (el.className?.toString?.() ?? "").slice(0, 80),
            };
            for (const p of props as readonly string[]) spec[p] = (cs as any)[p];
            out.push(spec);
          }
        }
        for (const c of el.children) visit(c);
      };
      visit(document.body);
      return out;
    },
    { props: FONT_PROPS as unknown as string[], sectionAttr },
  );
}

const SECTION_MAP: Record<string, string> = {
  // Our data-section -> ClearPath data-framer-name (best-fit semantic match)
  hero: "Hero",
  balance: "Toggle",
  services: "Our Services",
  process: "How It Works",
  credentials: "Story A",
  ready: "Ready to find your path?",
  pricing: "Pricing",
  approach: "Approach",
  listen: "Big Quote",
  "real-stories": "Story B",
  journal: "Journal",
  faq: "FAQ",
  contact: "Book A Session",
  footer: "footer-menu",
};

function normalizeFamily(f: string): string {
  // Strip placeholder/fallback names so "Inter, Inter Fallback, ..." == "Inter, Inter Placeholder, ..."
  const first = (f.split(",")[0] || "").trim().replace(/^["']|["']$/g, "");
  return first.toLowerCase();
}

function specsMatch(a: FontSpec, b: FontSpec) {
  return (
    normalizeFamily(a.fontFamily) === normalizeFamily(b.fontFamily) &&
    a.fontSize === b.fontSize &&
    a.fontWeight === b.fontWeight &&
    a.fontStyle === b.fontStyle &&
    a.textTransform === b.textTransform
  );
}

test("font audit: ours vs ClearPath, grouped by section", async ({ browser }) => {
  await mkdir(OUT, { recursive: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  const ours = await collectFromSite(page, "http://localhost:3000/", "data-section");
  const theirs = await collectFromSite(
    page,
    "https://clearpath-template.framer.website/",
    "data-framer-name",
  );

  await writeFile(path.join(OUT, "ours-raw.json"), JSON.stringify(ours, null, 2), "utf-8");
  await writeFile(path.join(OUT, "theirs-raw.json"), JSON.stringify(theirs, null, 2), "utf-8");

  // Group both by their section name. Match our `section` key to ClearPath via SECTION_MAP.
  const ourBySection = new Map<string, Item[]>();
  for (const it of ours) {
    const key = it.section ?? "(none)";
    if (!ourBySection.has(key)) ourBySection.set(key, []);
    ourBySection.get(key)!.push(it);
  }
  const theirBySection = new Map<string, Item[]>();
  for (const it of theirs) {
    const key = it.section ?? "(none)";
    if (!theirBySection.has(key)) theirBySection.set(key, []);
    theirBySection.get(key)!.push(it);
  }

  // For each mapped section, take a representative font spec per (tag, role) and diff.
  const report: any[] = [];
  for (const [ourSec, theirSec] of Object.entries(SECTION_MAP)) {
    const ourItems = ourBySection.get(ourSec) || [];
    const theirItems = theirBySection.get(theirSec) || [];
    if (ourItems.length === 0 && theirItems.length === 0) continue;

    // Group by tag, then take the *largest* font-size variant as representative
    const repByTag = (items: Item[]) => {
      const map = new Map<string, Item>();
      for (const it of items) {
        const cur = map.get(it.tag);
        if (!cur || parseFloat(it.fontSize) > parseFloat(cur.fontSize)) map.set(it.tag, it);
      }
      return map;
    };
    const ourReps = repByTag(ourItems);
    const theirReps = repByTag(theirItems);

    const tags = new Set([...ourReps.keys(), ...theirReps.keys()]);
    for (const tag of tags) {
      const o = ourReps.get(tag);
      const t = theirReps.get(tag);
      const match = o && t ? specsMatch(o, t) : false;
      report.push({
        section: { ours: ourSec, theirs: theirSec },
        tag,
        ours: o
          ? {
              text: o.text,
              fontFamily: normalizeFamily(o.fontFamily),
              fontSize: o.fontSize,
              fontWeight: o.fontWeight,
              fontStyle: o.fontStyle,
              textTransform: o.textTransform,
              letterSpacing: o.letterSpacing,
              lineHeight: o.lineHeight,
            }
          : null,
        theirs: t
          ? {
              text: t.text,
              fontFamily: normalizeFamily(t.fontFamily),
              fontSize: t.fontSize,
              fontWeight: t.fontWeight,
              fontStyle: t.fontStyle,
              textTransform: t.textTransform,
              letterSpacing: t.letterSpacing,
              lineHeight: t.lineHeight,
            }
          : null,
        match,
      });
    }
  }

  await writeFile(path.join(OUT, "report.json"), JSON.stringify(report, null, 2), "utf-8");

  // Human-readable summary
  const lines: string[] = [];
  lines.push("# Font audit — ours vs ClearPath\n");
  for (const row of report) {
    if (row.match) continue;
    lines.push(`## ${row.section.ours}  →  ClearPath ${row.section.theirs}  [${row.tag}]`);
    if (row.ours)
      lines.push(
        `  OURS:   ${row.ours.fontFamily} | ${row.ours.fontSize} | w${row.ours.fontWeight} ${row.ours.fontStyle} | tt:${row.ours.textTransform} | ls:${row.ours.letterSpacing}\n          text: ${JSON.stringify(row.ours.text)}`,
      );
    if (row.theirs)
      lines.push(
        `  THEIRS: ${row.theirs.fontFamily} | ${row.theirs.fontSize} | w${row.theirs.fontWeight} ${row.theirs.fontStyle} | tt:${row.theirs.textTransform} | ls:${row.theirs.letterSpacing}\n          text: ${JSON.stringify(row.theirs.text)}`,
      );
    if (!row.ours) lines.push("  OURS:   (no element of this tag in section)");
    if (!row.theirs) lines.push("  THEIRS: (no element of this tag in section)");
    lines.push("");
  }
  await writeFile(path.join(OUT, "diff.md"), lines.join("\n"), "utf-8");

  console.log(`MISMATCHES: ${report.filter((r) => !r.match).length} / ${report.length}`);
});
