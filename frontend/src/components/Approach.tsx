import styles from "./Approach.module.css";

export default function Approach() {
  return (
    <section id="approach-intro" data-section="approach" className={styles.approach}>
      <div className={styles.inner}>
        <h2 className={styles.h2}>
          Support grounded in experience, guided by clarity, and <em>built for lasting change.</em>
        </h2>
        <p className={styles.sub}>
          Our sessions create space for that change to happen. We take time to understand your
          needs, offer structure where it helps, and support your direction, not ours. Learn more
          about <a href="#process">how we work</a> and what to expect from the process.
        </p>
      </div>
    </section>
  );
}
