import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import s from "@/components/PageScaffold.module.css";

export const metadata: Metadata = {
  title: "Journal",
  description: "Articles, tools, and insights to help you find clarity, balance, and direction.",
};

const IMG = "/clearpath-ref/journal";

const featured = [
  {
    eyebrow: "Reflection · No. 01",
    title: "Learning to Pause Without Guilt.",
    image: `${IMG}/LksF7zMOHE97HJPqXDmb7LSvWE.jpg`,
    excerpt:
      "Taking a break isn't failure, it's part of the process. Here's how to slow down with kindness.",
  },
  {
    eyebrow: "Practice · No. 02",
    title: "What Makes Therapy Work?",
    image: `${IMG}/ZMX4xonC6WvSRyRzHHgOkTDzw4.jpg`,
    excerpt: "Beyond techniques or tools, therapy works best when it feels safe, real, and human.",
  },
];

const articles = [
  {
    eyebrow: "Slowing down · No. 03",
    title: "The Gentle Art of Slowing Down",
    image: `${IMG}/2EIIgE63cU5md9VUpWNs5xhsM.jpg`,
    excerpt:
      "Slowing down is more than just taking a break, it's a conscious choice to live at a pace that allows space for reflection, connection, and clarity. In a world that celebrates speed, learning to slow down can feel radical, but it's a powerful way to reclaim presence and peace.",
  },
  {
    eyebrow: "Release · No. 04",
    title: "Finding Strength in Release",
    image: `${IMG}/LsGrGUWDWx4Ok7pTwhp0PXTTA.jpg`,
    excerpt:
      "Letting go is one of the hardest, and most transformative, things we do. It asks us to release control, loosen our grip, and trust that something better might come in its place.",
  },
  {
    eyebrow: "Self-knowledge · No. 05",
    title: "Listening to Yourself Again.",
    image: `${IMG}/TF67zgMSYINSD7dymhKX4rhrTM.jpg`,
    excerpt:
      "In a noisy world full of advice, opinions, and pressure, it's easy to lose touch with your own voice. We start living on autopilot, doing what's expected instead of what feels true.",
  },
];

export default function JournalPage() {
  return (
    <>
      <Nav />
      <main className={s.pageMain}>
        {/* Hero */}
        <section className={s.hero}>
          <div className={s.heroMediaWrap} aria-hidden="true">
            <img src={`${IMG}/D6H1lHKBDuxkhpUVf8PPyt7Jivg.jpg`} alt="" className={s.heroMedia} />
          </div>
          <div className={s.heroInner}>
            <span className={`t-label t-label-eyebrow ${s.heroEyebrow}`}>Journal</span>
            <h1 className={s.heroTitle}>
              Insights <em>That Matter.</em>
            </h1>
            <p className={s.heroLead}>
              Articles, tools, and insights to help you find clarity, balance, and direction. Our
              journal is where we share thoughts, stories, and practical tools to help you find
              clarity and balance, and keep moving toward the life you want.
            </p>
          </div>
        </section>

        {/* Featured pair */}
        <section className={s.section}>
          <div className={s.sectionInner}>
            <div className={s.cardGrid}>
              {featured.map((article) => (
                <article key={article.title} className={s.card}>
                  <img src={article.image} alt="" className={s.cardMedia} />
                  <span className={`t-label t-label-eyebrow ${s.cardEyebrow}`}>
                    {article.eyebrow}
                  </span>
                  <h2 className={s.cardTitle} style={{ fontSize: "2rem", lineHeight: 1.15 }}>
                    {article.title}
                  </h2>
                  <p className={s.cardBody}>{article.excerpt}</p>
                  <Link href="#" className={s.cardLink}>
                    Read more
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Article grid */}
        <section className={`${s.section} ${s.sectionOffWhite}`}>
          <div className={s.sectionInner}>
            <div style={{ marginBottom: "var(--s-12)" }}>
              <span className="t-label t-label-eyebrow">Latest writing</span>
              <h2 className={s.twoColTitle} style={{ marginTop: "1rem" }}>
                Recent <em>articles.</em>
              </h2>
            </div>
            <div className={`${s.cardGrid} ${s.cardGrid3}`}>
              {articles.map((article) => (
                <article key={article.title} className={s.card}>
                  <img src={article.image} alt="" className={s.cardMedia} />
                  <span className={`t-label t-label-eyebrow ${s.cardEyebrow}`}>
                    {article.eyebrow}
                  </span>
                  <h3 className={s.cardTitle}>{article.title}</h3>
                  <p className={s.cardBody}>{article.excerpt}</p>
                  <Link href="#" className={s.cardLink}>
                    Read more
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className={s.closingCta}>
          <span className="t-label t-label-eyebrow">Begin Your Journey</span>
          <h2 className={s.closingTitle}>
            Ready to find <em>your path?</em>
          </h2>
          <p className={s.closingBody}>
            If this story resonates with you, maybe it's time to start your own. Therapy isn't about
            quick fixes, it's about meaningful change, one clear step at a time.
          </p>
          <Link href="/#contact" className="btn btn-primary">
            <span className="btn-dot" /> Start your journey
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
