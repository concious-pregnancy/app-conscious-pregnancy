import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

import { expect, test } from '@playwright/test'

const TARGET_URL = process.env.CRAWL_TARGET_URL ?? 'https://clearpath-template.framer.website/'
const OUT_DIR = path.resolve(process.cwd(), 'artifacts', 'clearpath-styles')

async function settleAfterScroll(page: import('@playwright/test').Page, ms = 600) {
  await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => setTimeout(resolve, 100))))
  await page.waitForTimeout(ms)
}

test('extract computed styles and design tokens from ClearPath template', async ({ page }) => {
  await mkdir(OUT_DIR, { recursive: true })

  await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 120_000 })
  await settleAfterScroll(page, 1000)

  const tokens = await page.evaluate(() => {
    const _rootStyles = window.getComputedStyle(document.documentElement)

    const cssVars: Record<string, string> = {}
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule instanceof CSSStyleRule && rule.selectorText === ':root') {
            for (let i = 0; i < rule.style.length; i++) {
              const prop = rule.style[i]
              if (prop.startsWith('--')) {
                cssVars[prop] = rule.style.getPropertyValue(prop).trim()
              }
            }
          }
        }
      } catch {
        // cross-origin stylesheet
      }
    }

    const extractEl = (selector: string) => {
      const el = document.querySelector(selector)
      if (!el) return null
      const cs = window.getComputedStyle(el)
      return {
        selector,
        fontFamily: cs.fontFamily.split(',')[0].replace(/['"]/g, '').trim(),
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        lineHeight: cs.lineHeight,
        letterSpacing: cs.letterSpacing,
        color: cs.color,
        backgroundColor: cs.backgroundColor,
        padding: cs.padding,
        margin: cs.margin,
        borderRadius: cs.borderRadius,
      }
    }

    const selectors = [
      'nav',
      'nav a',
      'nav button',
      'h1',
      'h2',
      'h3',
      'p',
      'a[href]',
      'button',
      'section',
      'section:nth-of-type(2)',
      'section:nth-of-type(3)',
      'footer',
      'input',
      'textarea',
      'select',
    ]

    const elements: Record<string, ReturnType<typeof extractEl>> = {}
    for (const sel of selectors) {
      elements[sel] = extractEl(sel)
    }

    const bodyCs = window.getComputedStyle(document.body)
    const htmlCs = window.getComputedStyle(document.documentElement)

    return {
      cssCustomProperties: cssVars,
      body: {
        fontFamily: bodyCs.fontFamily.split(',')[0].replace(/['"]/g, '').trim(),
        fontSize: bodyCs.fontSize,
        fontWeight: bodyCs.fontWeight,
        lineHeight: bodyCs.lineHeight,
        color: bodyCs.color,
        backgroundColor: bodyCs.backgroundColor,
      },
      html: {
        fontSize: htmlCs.fontSize,
        scrollBehavior: htmlCs.scrollBehavior,
      },
      elements,
    }
  })

  const allFonts = await page.evaluate(() => {
    const fonts = new Set<string>()
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule instanceof CSSFontFaceRule) {
            const family = rule.style.getPropertyValue('font-family').replace(/['"]/g, '').trim()
            if (family) fonts.add(family)
          }
        }
      } catch {
        // cross-origin
      }
    }
    return [...fonts]
  })

  const breakpoints = await page.evaluate(() => {
    const bps = new Set<string>()
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule instanceof CSSMediaRule) {
            bps.add(rule.conditionText)
          }
        }
      } catch {
        // cross-origin
      }
    }
    return [...bps]
  })

  const result = {
    url: TARGET_URL,
    extractedAt: new Date().toISOString(),
    ...tokens,
    fontFaces: allFonts,
    mediaBreakpoints: breakpoints,
  }

  await writeFile(path.join(OUT_DIR, 'tokens.json'), JSON.stringify(result, null, 2), 'utf-8')

  expect(Object.keys(tokens.elements).length).toBeGreaterThan(0)
})
