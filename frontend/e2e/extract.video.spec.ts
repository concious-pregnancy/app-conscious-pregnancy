import { mkdir } from 'node:fs/promises'
import path from 'node:path'

import { test } from '@playwright/test'

const TARGET_URL = process.env.CRAWL_TARGET_URL ?? 'https://clearpath-template.framer.website/'
const OUT_DIR = path.resolve(process.cwd(), 'artifacts', 'videos')

test('record smooth scroll video of template', async ({ browser }) => {
  await mkdir(OUT_DIR, { recursive: true })

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    recordVideo: { dir: OUT_DIR, size: { width: 1440, height: 900 } },
  })

  const page = await context.newPage()

  await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 120_000 })
  await page.waitForTimeout(2000)

  const totalHeight = await page.evaluate(() => document.documentElement.scrollHeight)
  const viewportHeight = 900
  const maxScroll = totalHeight - viewportHeight
  const wheelDelta = 40

  let scrolled = 0
  while (scrolled < maxScroll) {
    const delta = Math.min(wheelDelta, maxScroll - scrolled)
    await page.mouse.wheel(0, delta)
    scrolled += delta
    await page.waitForTimeout(16)
  }

  await page.waitForTimeout(1500)

  let scrolledBack = maxScroll
  while (scrolledBack > 0) {
    const delta = Math.min(wheelDelta * 2, scrolledBack)
    await page.mouse.wheel(0, -delta)
    scrolledBack -= delta
    await page.waitForTimeout(16)
  }

  await page.waitForTimeout(1000)

  await context.close()
})
