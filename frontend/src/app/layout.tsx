import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dr. Ashley Alden | Functional & Integrative Medicine',
  description:
    'Root cause medicine. Psychedelic integration. Radically personalized care for the health conditions conventional medicine misses.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
