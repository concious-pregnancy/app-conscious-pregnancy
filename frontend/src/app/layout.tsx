import { Crimson_Text, Inter } from "next/font/google";

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
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

/**
 * Inline blocking script. Reads the persisted yin/yang mode from
 * localStorage and stamps data-mode on <html> before the page paints.
 * Without this, the page would flash yang (default) for one frame
 * before the client-side ModeToggle hydrates and corrects it.
 */
const modeInitScript = `(function(){try{var m=localStorage.getItem('cp-mode');if(m==='yin'||m==='yang'){document.documentElement.setAttribute('data-mode',m);}else{document.documentElement.setAttribute('data-mode','yang');}}catch(e){document.documentElement.setAttribute('data-mode','yang');}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${crimsonText.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: modeInitScript }} />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
