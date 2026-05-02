import { urlFor } from "@/lib/sanity/image";
import styles from "./Journal.module.css";

type JournalArticle = {
  _id: string;
  title: string;
  excerpt: string;
  image?: { asset?: { _ref: string } };
  slug?: { current: string };
};

const blobs = [
  {
    viewBox: "0 0 314 211",
    path: "M169.086 208.356C58.174 226.813-56.084 146.002 30.446 47.732s165.89-17.958 249.552 4.49c83.662 22.447 0 137.678-110.912 156.134Z",
  },
  {
    viewBox: "0 0 297 222",
    path: "M13.013 89.829c-52.508 167.719 66.63 135.575 130.863 116.16 64.233-19.415 187.688-14.692 143.955-97.6C244.098 25.482 65.521-77.89 13.013 89.829Z",
  },
  {
    viewBox: "0 0 314 236",
    path: "M299.371 37.497c71.678 93.882-140.257 275.01-199.025 163.175C41.578 88.837-21.431 89.682 7.074 47.254c28.505-42.427 241.57-76.198 292.297-9.757Z",
  },
];

export default function Journal({ articles }: { articles: JournalArticle[] }) {
  return (
    <section id="journal" data-section="journal" className={`section ${styles.journal}`}>
      <div className="container">
        <div className={styles.header}>
          <svg className={styles.lotusIcon} viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <path
              d="M20 34c0 0-10-6-10-14a10 10 0 0 1 10-10 10 10 0 0 1 10 10c0 8-10 14-10 14Z"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20 10c0 0-6-6-13-4C4 8 4 15 8 19c3 3 7 4 12 3"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20 10c0 0 6-6 13-4 3 2 3 9-1 13-3 3-7 4-12 3"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p data-reveal className={styles.eyebrow}>
            Our Journal
          </p>
          <h2 data-reveal className={styles.title}>
            Evidence, not <em>opinion.</em>
          </h2>
          <p data-reveal className={styles.sub}>
            Reflections, research, and practical tools grounded in functional medicine and Chinese
            medicine. Written for women who want to understand, not just follow.
          </p>
          <a href="#" className={`btn ${styles.browseBtn}`}>
            Browse Insights
            <span className="btn-dot" />
          </a>
        </div>

        <div className={styles.grid}>
          {articles.map((a, i) => {
            const blob = blobs[i % blobs.length];
            const clipId = `blob-${i}`;
            const imgSrc = a.image?.asset ? urlFor(a.image).width(600).url() : "";
            return (
              <article key={a._id} className={styles.card} data-stagger>
                <div className={styles.cardImageWrap}>
                  <svg
                    className={styles.blobOutline}
                    viewBox={blob.viewBox}
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d={blob.path} stroke="var(--sage)" strokeWidth="1" opacity="0.21" />
                  </svg>
                  <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
                    <defs>
                      <clipPath id={clipId} clipPathUnits="objectBoundingBox">
                        <path
                          d={blob.path}
                          transform={`scale(${1 / parseFloat(blob.viewBox.split(" ")[2])}, ${1 / parseFloat(blob.viewBox.split(" ")[3])})`}
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  {imgSrc && (
                    <img
                      src={imgSrc}
                      alt=""
                      className={styles.cardImage}
                      loading="lazy"
                      style={{ clipPath: `url(#${clipId})` }}
                    />
                  )}
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{a.title}</h3>
                  <p className={styles.excerpt}>{a.excerpt}</p>
                  <a href="#" className={styles.readMore}>
                    Read Article
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path
                        d="M2 7h10M8 3l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
