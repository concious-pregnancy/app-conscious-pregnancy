import type { Metadata } from "next";
import { Crimson_Text, Inter, Fragment_Mono } from "next/font/google";
import MotionProvider from "@/components/MotionProvider";
import "./globals.css";

const crimsonText = Crimson_Text({
  variable: "--font-crimson",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const fragmentMono = Fragment_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Conscious Pregnancy | Dr. Ashley Alden",
  description:
    "A whole-body, whole-partnership approach to preconception and pregnancy. Functional medicine, Traditional Chinese Medicine, somatic healing, and psychedelic integration for the preparation that matters most.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${crimsonText.variable} ${inter.variable} ${fragmentMono.variable}`}>
        <MotionProvider />
        {children}
      </body>
    </html>
  );
}
