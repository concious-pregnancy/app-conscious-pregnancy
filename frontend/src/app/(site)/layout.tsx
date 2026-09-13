import type { Metadata } from "next";
import MotionProvider from "@/components/MotionProvider";
import { JsonLd } from "@/components/JsonLd";
import { OG_IMAGE } from "@/lib/og";
import "../globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://consciouspregnancy.care";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Conscious Pregnancy | Dr. Ashley Alden",
    template: "%s | Conscious Pregnancy",
  },
  description:
    "Whole-body, whole-partnership preconception and pregnancy care with Dr. Ashley Alden. Functional medicine, TCM, somatic healing, and psychedelic integration.",
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
    url: "/",
    siteName: "Conscious Pregnancy",
    title: "Conscious Pregnancy | Dr. Ashley Alden",
    description:
      "Before the baby, there is you. A whole-body, whole-partnership approach to preconception and pregnancy with Dr. Ashley Alden.",
    locale: "en_US",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Conscious Pregnancy | Dr. Ashley Alden",
    description:
      "Before the baby, there is you. Functional medicine, TCM, somatic healing, and psychedelic integration for preconception and pregnancy.",
    images: [OG_IMAGE],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
    // iOS ignores SVG touch icons. iMessage link previews and home-screen
    // bookmarks need a PNG.
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
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

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
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
          image: `${SITE_URL}${OG_IMAGE.url}`,
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
    </>
  );
}
