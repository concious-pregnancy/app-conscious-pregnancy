import type { Metadata } from "next";
import { Crimson_Text, Inter } from "next/font/google";
import MotionProvider from "@/components/MotionProvider";
import { JsonLd } from "@/components/JsonLd";
import "./globals.css";

const crimsonText = Crimson_Text({
  variable: "--font-crimson",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

/* Inter carries 600 too, since the ClearPath template uses Inter
   weight 600 for every uppercase eyebrow / CTA / nav-link label —
   roles we previously assigned to Fragment Mono. The mono family is
   gone; --font-mono in globals.css now aliases to Inter so legacy
   var(--font-mono) consumers automatically pick up the same family. */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://consciouspregnancy.care";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Conscious Pregnancy | Dr. Ashley Alden",
    template: "%s | Conscious Pregnancy",
  },
  description:
    "A whole-body, whole-partnership approach to preconception and pregnancy. Functional medicine, Traditional Chinese Medicine, somatic healing, and psychedelic integration for the preparation that matters most.",
  applicationName: "Conscious Pregnancy",
  authors: [{ name: "Dr. Ashley Alden, DACM, L.Ac." }],
  keywords: [
    "preconception care",
    "functional medicine pregnancy",
    "traditional chinese medicine fertility",
    "acupuncture preconception",
    "somatic healing pregnancy",
    "Dr. Ashley Alden",
    "Venice CA acupuncturist",
    "prepping the palace",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Conscious Pregnancy",
    title: "Conscious Pregnancy | Dr. Ashley Alden",
    description:
      "Before the baby, there is you. A whole-body, whole-partnership approach to preconception and pregnancy with Dr. Ashley Alden.",
    locale: "en_US",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Conscious Pregnancy with Dr. Ashley Alden",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Conscious Pregnancy | Dr. Ashley Alden",
    description:
      "Before the baby, there is you. Functional medicine, TCM, somatic healing, and psychedelic integration for preconception and pregnancy.",
    images: ["/og.jpg"],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "XqofOFKeYVfl70rDPBGpqOJsKnk_Or6j1BWFgmHbfak",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${crimsonText.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Conscious Pregnancy",
            url: SITE_URL,
            logo: `${SITE_URL}/icon.svg`,
            description:
              "A whole-body, whole-partnership approach to preconception and pregnancy with Dr. Ashley Alden — functional medicine, Traditional Chinese Medicine, somatic healing, and psychedelic integration.",
            founder: {
              "@type": "Person",
              name: "Ashley Alden",
              honorificSuffix: "DACM, L.Ac.",
              jobTitle: "Doctor of Acupuncture and Chinese Medicine",
            },
            sameAs: [],
          }}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Conscious Pregnancy",
            url: SITE_URL,
            inLanguage: "en-US",
          }}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "MedicalBusiness",
            name: "Conscious Pregnancy with Dr. Ashley Alden",
            url: SITE_URL,
            image: `${SITE_URL}/og.jpg`,
            priceRange: "$$$",
            telephone: "",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Venice",
              addressRegion: "CA",
              addressCountry: "US",
            },
            medicalSpecialty: [
              "Acupuncture",
              "FunctionalMedicine",
              "TraditionalChineseMedicine",
              "PreconceptionCare",
            ],
            founder: {
              "@type": "Person",
              name: "Ashley Alden",
              honorificSuffix: "DACM, L.Ac.",
            },
          }}
        />
        <MotionProvider />
        {children}
      </body>
    </html>
  );
}
