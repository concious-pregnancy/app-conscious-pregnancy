import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

import { expect, test } from '@playwright/test'

const TARGET_URL = process.env.CRAWL_TARGET_URL ?? 'https://clearpath-template.framer.website/'
const OUT_DIR = path.resolve(process.cwd(), 'artifacts', 'clearpath-blueprint')

async function settleAfterScroll(page: import('@playwright/test').Page, ms = 600) {
  await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => setTimeout(resolve, 100))))
  await page.waitForTimeout(ms)
}

test('extract DOM blueprint from ClearPath template', async ({ page }) => {
  await mkdir(OUT_DIR, { recursive: true })

  await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 120_000 })
  await settleAfterScroll(page, 1500)

  const pageMetrics = await page.evaluate(() => ({
    scrollHeight: document.documentElement.scrollHeight,
    viewportHeight: window.innerHeight,
    viewportWidth: window.innerWidth,
    title: document.title,
    bodyChildCount: document.body.children.length,
  }))

  const sections = await page.evaluate(() => {
    const results: Array<{
      index: number
      selector: string
      tag: string
      id: string
      className: string
      rect: { x: number; y: number; width: number; height: number }
      layout: { display: string; gridTemplateColumns: string; flexDirection: string } | null
      background: { backgroundColor: string; hasBackgroundImage: boolean; color: string }
      childCounts: { headings: number; paragraphs: number; images: number; links: number; buttons: number; formFields: number; svgs: number }
      headings: Array<{ tag: string; text: string; fontSize: string; fontFamily: string; fontWeight: string; color: string; letterSpacing: string }>
      bodyText: { fontSize: string; fontFamily: string; fontWeight: string; color: string; lineHeight: string } | null
      textPreview: string
    }> = []

    const candidates = document.querySelectorAll(
      'nav, header, section, footer, main, [class*="section"], [class*="Section"], [data-framer-name]',
    )

    const seen = new Set<Element>()
    const elements: Element[] = []

    if (candidates.length > 2) {
      candidates.forEach((el) => {
        if (!seen.has(el) && el.getBoundingClientRect().height > 80) {
          let dominated = false
          for (const existing of seen) {
            if (existing.contains(el)) {
              dominated = true
              break
            }
          }
          if (!dominated) {
            for (const existing of seen) {
              if (el.contains(existing)) {
                seen.delete(existing)
                const idx = elements.indexOf(existing)
                if (idx >= 0) elements.splice(idx, 1)
              }
            }
            seen.add(el)
            elements.push(el)
          }
        }
      })
    }

    if (elements.length < 4) {
      elements.length = 0
      seen.clear()
      const directChildren = Array.from(document.body.children)
      for (const child of directChildren) {
        if (child instanceof HTMLElement && child.getBoundingClientRect().height > 50) {
          elements.push(child)
          seen.add(child)
        }
      }
    }

    elements.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top)

    elements.forEach((el, i) => {
      const cs = window.getComputedStyle(el)
      const rect = el.getBoundingClientRect()

      let layoutInfo = null
      const firstChild = el.querySelector(':scope > div, :scope > section, :scope > main')
      if (firstChild) {
        const fcs = window.getComputedStyle(firstChild)
        layoutInfo = {
          display: fcs.display,
          gridTemplateColumns: fcs.gridTemplateColumns,
          flexDirection: fcs.flexDirection,
        }
      }
      if (!layoutInfo) {
        layoutInfo = {
          display: cs.display,
          gridTemplateColumns: cs.gridTemplateColumns,
          flexDirection: cs.flexDirection,
        }
      }

      const headingEls = el.querySelectorAll('h1, h2, h3, h4, h5, h6')
      const headings = Array.from(headingEls).slice(0, 8).map((h) => {
        const hcs = window.getComputedStyle(h)
        return {
          tag: h.tagName.toLowerCase(),
          text: (h.textContent ?? '').trim().slice(0, 140),
          fontSize: hcs.fontSize,
          fontFamily: hcs.fontFamily.split(',')[0].replace(/['"]/g, '').trim(),
          fontWeight: hcs.fontWeight,
          color: hcs.color,
          letterSpacing: hcs.letterSpacing,
        }
      })

      const firstP = el.querySelector('p')
      let bodyText = null
      if (firstP) {
        const pcs = window.getComputedStyle(firstP)
        bodyText = {
          fontSize: pcs.fontSize,
          fontFamily: pcs.fontFamily.split(',')[0].replace(/['"]/g, '').trim(),
          fontWeight: pcs.fontWeight,
          color: pcs.color,
          lineHeight: pcs.lineHeight,
        }
      }

      results.push({
        index: i,
        selector: el.tagName.toLowerCase() + (el.id ? `#${el.id}` : '') + (el.className ? `.${String(el.className).split(' ')[0].slice(0, 30)}` : ''),
        tag: el.tagName.toLowerCase(),
        id: el.id || '',
        className: String(el.className || '').slice(0, 120),
        rect: { x: Math.round(rect.x), y: Math.round(rect.y + window.scrollY), width: Math.round(rect.width), height: Math.round(rect.height) },
        layout: layoutInfo,
        background: {
          backgroundColor: cs.backgroundColor,
          hasBackgroundImage: cs.backgroundImage !== 'none',
          color: cs.color,
        },
        childCounts: {
          headings: el.querySelectorAll('h1,h2,h3,h4,h5,h6').length,
          paragraphs: el.querySelectorAll('p').length,
          images: el.querySelectorAll('img').length,
          links: el.querySelectorAll('a').length,
          buttons: el.querySelectorAll('button').length,
          formFields: el.querySelectorAll('input,textarea,select').length,
          svgs: el.querySelectorAll('svg').length,
        },
        headings,
        bodyText,
        textPreview: (el.textContent ?? '').trim().replace(/\s+/g, ' ').slice(0, 250),
      })
    })

    return results
  })

  let deepSections = sections
  if (sections.length < 5) {
    const mainContainer = sections.find((s) => s.rect.height > 5000)
    if (mainContainer) {
      deepSections = await page.evaluate((containerSelector) => {
        const container = document.querySelector(containerSelector)
        if (!container) return []

        const children = Array.from(container.children).filter(
          (el) => el instanceof HTMLElement && el.getBoundingClientRect().height > 80,
        ) as HTMLElement[]

        return children.map((el, i) => {
          const cs = window.getComputedStyle(el)
          const rect = el.getBoundingClientRect()

          const headingEls = el.querySelectorAll('h1, h2, h3, h4, h5, h6')
          const headings = Array.from(headingEls).slice(0, 6).map((h) => {
            const hcs = window.getComputedStyle(h)
            return {
              tag: h.tagName.toLowerCase(),
              text: (h.textContent ?? '').trim().slice(0, 140),
              fontSize: hcs.fontSize,
              fontFamily: hcs.fontFamily.split(',')[0].replace(/['"]/g, '').trim(),
              fontWeight: hcs.fontWeight,
              color: hcs.color,
              letterSpacing: hcs.letterSpacing,
            }
          })

          const firstP = el.querySelector('p')
          let bodyText = null
          if (firstP) {
            const pcs = window.getComputedStyle(firstP)
            bodyText = {
              fontSize: pcs.fontSize,
              fontFamily: pcs.fontFamily.split(',')[0].replace(/['"]/g, '').trim(),
              fontWeight: pcs.fontWeight,
              color: pcs.color,
              lineHeight: pcs.lineHeight,
            }
          }

          const images = Array.from(el.querySelectorAll('img')).slice(0, 5).map((img) => ({
            src: img.src.slice(0, 200),
            alt: img.alt,
            width: img.naturalWidth || img.width,
            height: img.naturalHeight || img.height,
          }))

          return {
            index: i,
            selector: el.tagName.toLowerCase() + (el.id ? `#${el.id}` : '') + (el.className ? `.${String(el.className).split(' ')[0].slice(0, 30)}` : ''),
            tag: el.tagName.toLowerCase(),
            id: el.id || '',
            className: String(el.className || '').slice(0, 120),
            rect: { x: Math.round(rect.x), y: Math.round(rect.y + window.scrollY), width: Math.round(rect.width), height: Math.round(rect.height) },
            layout: {
              display: cs.display,
              gridTemplateColumns: cs.gridTemplateColumns,
              flexDirection: cs.flexDirection,
              position: cs.position,
              overflow: cs.overflow,
            },
            background: {
              backgroundColor: cs.backgroundColor,
              hasBackgroundImage: cs.backgroundImage !== 'none',
              color: cs.color,
            },
            childCounts: {
              headings: el.querySelectorAll('h1,h2,h3,h4,h5,h6').length,
              paragraphs: el.querySelectorAll('p').length,
              images: el.querySelectorAll('img').length,
              links: el.querySelectorAll('a').length,
              buttons: el.querySelectorAll('button').length,
              formFields: el.querySelectorAll('input,textarea,select').length,
              svgs: el.querySelectorAll('svg').length,
              directChildren: el.children.length,
            },
            headings,
            bodyText,
            images,
            textPreview: (el.textContent ?? '').trim().replace(/\s+/g, ' ').slice(0, 250),
          }
        })
      }, mainContainer.selector.split('.')[0] + '.' + (mainContainer.className.split(' ')[0] || ''))
    }
  }

  const summary = {
    url: TARGET_URL,
    extractedAt: new Date().toISOString(),
    pageHeight: pageMetrics.scrollHeight,
    viewportWidth: pageMetrics.viewportWidth,
    viewportHeight: pageMetrics.viewportHeight,
    title: pageMetrics.title,
    topLevelSectionCount: sections.length,
    topLevelSections: sections,
    deepSectionCount: deepSections.length,
    deepSections,
  }

  await writeFile(path.join(OUT_DIR, 'sections.json'), JSON.stringify(summary, null, 2), 'utf-8')

  expect(deepSections.length).toBeGreaterThan(3)
})
