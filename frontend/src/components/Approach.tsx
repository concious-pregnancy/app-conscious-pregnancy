import styles from "./Approach.module.css";

type ApproachContent = {
  heading?: string;
  headingEm?: string;
  sub?: string;
} | null;

export default function Approach({ content }: { content?: ApproachContent }) {
  const heading = content?.heading ?? "Support grounded in experience, guided by clarity, and";
  const headingEm = content?.headingEm ?? "built for lasting change.";
  const sub =
    content?.sub ??
    "Our sessions create space for that change to happen. We take time to understand your needs, offer structure where it helps, and support your direction, not ours. Learn more about how we work and what to expect from the process.";

  return (
    <section id="approach-intro" data-section="approach" className={styles.approach}>
      <div className={styles.inner}>
        <h2 className={styles.h2}>
          {heading} <em>{headingEm}</em>
        </h2>
        <p className={styles.sub}>{sub}</p>
      </div>
    </section>
  );
}
