import { urlFor } from "@/lib/sanity/image";
import styles from "./Services.module.css";

type SanityImage = { asset?: { _ref: string } };

type Service = {
  _id: string;
  title: string;
  titleLine2?: string;
  body: string;
  image?: SanityImage;
  trigram: string;
};

type ServiceExtra = {
  _id: string;
  trigram: string;
  title: string;
  body: string;
};

export default function Services({
  services,
  extras,
}: {
  services: Service[];
  extras: ServiceExtra[];
}) {
  return (
    <section id="services" data-section="services" className={styles.services}>
      <div className={styles.head}>
        <div>
          <p className={styles.eyebrow}>The Work</p>
          <h2 className={styles.h2}>
            Four lenses on <em>one preparation.</em>
          </h2>
        </div>
        <div className={styles.headRight}>
          <p>
            Each practice stands on its own. Together, they meet you at every layer, cellular,
            energetic, emotional, in the window before you conceive.
          </p>
        </div>
      </div>

      <div className={styles.grid}>
        {services.map((s) => {
          const imgUrl = s.image?.asset ? urlFor(s.image).width(800).url() : "";
          return (
            <div key={s._id} className={styles.col} data-stagger>
              <article
                className={styles.card}
                style={{ backgroundImage: imgUrl ? `url(${imgUrl})` : undefined }}
              >
                <div className={styles.cardInner}>
                  <h3 className={styles.cardTitle}>
                    {s.titleLine2 ? (
                      <>
                        {s.title}
                        <br />
                        {s.titleLine2}
                      </>
                    ) : (
                      s.title
                    )}
                  </h3>
                  <div className={styles.cardFoot}>
                    <span className={styles.trigram}>{s.trigram}</span>
                    <a href="#contact">Read More</a>
                  </div>
                </div>
              </article>
              <p className={styles.body}>{s.body}</p>
            </div>
          );
        })}
      </div>

      <div className={styles.strip}>
        {extras.map((e) => (
          <div key={e._id} className={styles.stripItem}>
            <span className={styles.stripTrigram}>{e.trigram}</span>
            <h4 className={styles.stripTitle}>{e.title}</h4>
            <p className={styles.stripBody}>{e.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
