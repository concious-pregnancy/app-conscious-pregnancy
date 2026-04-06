import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

import { type Page, expect, test } from '@playwright/test'

const TARGET_URL = process.env.CRAWL_TARGET_URL ?? 'https://clearpath-template.framer.website/'
const OUT_DIR = path.resolve(process.cwd(), 'artifacts', 'clearpath-animations')

async function settleAfterScroll(page: Page, ms = 800) {
  await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => setTimeout(resolve, 100))))
  await page.waitForTimeout(ms)
}

test('extract scroll animation metadata from ClearPath template', async ({ page }) => {
  await mkdir(OUT_DIR, { recursive: true })

  await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 120_000 })
  await settleAfterScroll(page, 2000)

  // --- 1. GSAP ScrollTrigger (global check) ---
  const gsapData = await page.evaluate(() => {
    const w = window as unknown as Record<string, unknown>
    const gsap = w.gsap as Record<string, unknown> | undefined
    const ST = (w.ScrollTrigger ?? (gsap && (gsap as Record<string, unknown>).ScrollTrigger)) as
      | { getAll?: () => Array<Record<string, unknown>> }
      | undefined

    if (!ST?.getAll) {
      return { available: false, triggerCount: 0, triggers: [] as Array<Record<string, unknown>> }
    }

    const triggers = ST.getAll().map((trigger) => {
      const vars = (trigger.vars ?? {}) as Record<string, unknown>
      return {
        start: vars.start ?? trigger.start,
        end: vars.end ?? trigger.end,
        scrub: vars.scrub ?? false,
        pin: vars.pin ?? false,
      }
    })

    return { available: true, triggerCount: triggers.length, triggers }
  })

  // --- 2. Framer Motion data attributes ---
  const framerMotionData = await page.evaluate(() => {
    const attrs = ['data-framer-appear-id', 'data-framer-name', 'data-framer-component-type']
    const result: Array<{ selector: string; attributes: Record<string, string>; rect: { y: number; height: number } }> = []

    for (const attr of attrs) {
      const els = document.querySelectorAll(`[${attr}]`)
      els.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const entry: Record<string, string> = {}
        for (const a of attrs) {
          const v = el.getAttribute(a)
          if (v) entry[a] = v
        }
        result.push({
          selector: el.tagName.toLowerCase() + (el.id ? `#${el.id}` : '') + (el.className ? `.${String(el.className).split(/\s+/)[0].slice(0, 40)}` : ''),
          attributes: entry,
          rect: { y: Math.round(rect.top + window.scrollY), height: Math.round(rect.height) },
        })
      })
    }

    const seen = new Set<string>()
    return result.filter((r) => {
      const key = r.selector + r.rect.y
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
  })

  // --- 3. Scroll-position-based transform/opacity snapshot ---
  const totalHeight = await page.evaluate(() => document.documentElement.scrollHeight)
  const viewportHeight = await page.evaluate(() => window.innerHeight)
  const scrollPositions = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0].map(
    (pct) => Math.min(Math.round(pct * (totalHeight - viewportHeight)), totalHeight - viewportHeight),
  )

  const transformSnapshots: Array<{
    scrollY: number
    elements: Array<{ selector: string; transform: string; opacity: string; y: number }>
  }> = []

  for (const scrollY of scrollPositions) {
    await page.evaluate((y) => window.scrollTo(0, y), scrollY)
    await settleAfterScroll(page, 500)

    const snapshot = await page.evaluate(() => {
      const candidates = document.querySelectorAll(
        '[data-framer-appear-id], [data-framer-name], [style*="transform"], [style*="opacity"], img, h1, h2, h3, p',
      )
      const results: Array<{ selector: string; transform: string; opacity: string; y: number }> = []

      candidates.forEach((el) => {
        const cs = window.getComputedStyle(el)
        const transform = cs.transform
        const opacity = cs.opacity
        if ((transform && transform !== 'none') || (opacity && opacity !== '1')) {
          const rect = el.getBoundingClientRect()
          if (rect.width > 0 && rect.height > 0) {
            const tag = el.tagName.toLowerCase()
            const id = el.id ? `#${el.id}` : ''
            const cls = el.className ? `.${String(el.className).split(/\s+/)[0].slice(0, 40)}` : ''
            results.push({
              selector: tag + id + cls,
              transform,
              opacity,
              y: Math.round(rect.top),
            })
          }
        }
      })

      return results.slice(0, 60)
    })

    transformSnapshots.push({ scrollY, elements: snapshot })
  }

  // --- 4. CSS keyframes & scroll-driven animations ---
  const cssAnimations = await page.evaluate(() => {
    const keyframes: Array<{ name: string; stepCount: number }> = []
    const stickyElements: Array<{ selector: string; position: string; top: string }> = []

    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule instanceof CSSKeyframesRule) {
            keyframes.push({ name: rule.name, stepCount: rule.cssRules.length })
          }
        }
      } catch {
        // cross-origin
      }
    }

    const allEls = document.querySelectorAll('*')
    let count = 0
    for (const el of allEls) {
      if (count > 300) break
      count++
      const cs = window.getComputedStyle(el)
      if (cs.position === 'sticky' || cs.position === 'fixed') {
        const tag = el.tagName.toLowerCase()
        const id = el.id ? `#${el.id}` : ''
        const cls = el.className ? `.${String(el.className).split(/\s+/)[0].slice(0, 40)}` : ''
        stickyElements.push({
          selector: tag + id + cls,
          position: cs.position,
          top: cs.top,
        })
      }
    }

    return { keyframes, stickyElements }
  })

  // --- 5. Scroll behavior info ---
  const scrollBehavior = await page.evaluate(() => {
    const html = window.getComputedStyle(document.documentElement)
    const hasLenis = !!(window as unknown as Record<string, unknown>).lenis || document.documentElement.classList.contains('lenis')
    return {
      scrollBehavior: html.scrollBehavior,
      hasLenisClass: hasLenis,
      overflowY: html.overflowY,
    }
  })

  const result = {
    url: TARGET_URL,
    extractedAt: new Date().toISOString(),
    pageHeight: totalHeight,
    viewportHeight,
    gsap: gsapData,
    framerMotionElements: framerMotionData.length,
    framerMotionData: framerMotionData.slice(0, 100),
    transformSnapshots,
    cssAnimations,
    scrollBehavior,
  }

  await writeFile(path.join(OUT_DIR, 'animations.json'), JSON.stringify(result, null, 2), 'utf-8')

  expect(result.transformSnapshots.length).toBeGreaterThan(5)
})
