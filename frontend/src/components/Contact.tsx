"use client";

import styles from "./Contact.module.css";

const whereOptions = [
  "Actively trying to conceive",
  "Planning to conceive in the next 6 months",
  "Just starting to think about it",
  "Currently pregnant",
  "Postpartum",
];

type ContactContent = {
  label?: string;
  headingLine1?: string;
  headingLine2?: string;
  sub?: string;
  formHeading?: string;
  trustLine?: string;
  submitLabel?: string;
} | null;

export default function Contact({ content }: { content?: ContactContent }) {
  const label = content?.label ?? "Begin Your Journey";
  const headingLine1 = content?.headingLine1 ?? "Your preparation";
  const headingLine2 = content?.headingLine2 ?? "starts here.";
  const sub =
    content?.sub ??
    "Fill out the form and we will reach out within 24 hours to schedule your discovery call. We will talk through where you are, what you want to optimize, and whether this program is the right fit.";
  const formHeading = content?.formHeading ?? "Tell us about you.";
  const trustLine = content?.trustLine ?? "Trusted by 80+ clients";
  const submitLabel = content?.submitLabel ?? "Request a Discovery Call";

  return (
    <section id="contact" data-section="contact" className={styles.contact}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.left}>
          <p data-reveal className={styles.label}>
            {label}
          </p>
          <h2 data-reveal className={styles.heading}>
            {headingLine1}
            <br />
            {headingLine2}
          </h2>
          <p data-reveal className={styles.sub}>
            {sub}
          </p>

          <div className={styles.trust}>
            <p className={styles.trustLine}>{trustLine}</p>
            <p className={styles.trustContact}>
              Prefer to chat first?{" "}
              <a href="mailto:hello@consciouspregnancy.care" className={styles.trustLink}>
                Send us an email
              </a>{" "}
              or connect with us on social.
            </p>
          </div>
        </div>

        <form className={styles.form} onSubmit={(e) => e.preventDefault()} data-reveal>
          <p className={styles.formHeading}>{formHeading}</p>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="firstName" className={styles.fieldLabel}>
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className={styles.input}
                placeholder="Your first name"
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="lastName" className={styles.fieldLabel}>
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className={styles.input}
                placeholder="Your last name"
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="email" className={styles.fieldLabel}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.input}
              placeholder="you@example.com"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="phone" className={styles.fieldLabel}>
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className={styles.input}
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <fieldset className={styles.fieldset}>
            <legend className={styles.formHeading}>Where are you in the process?</legend>
            <div className={styles.options}>
              {whereOptions.map((opt) => (
                <label key={opt} className={styles.option}>
                  <input type="checkbox" name="stage" value={opt} />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className={styles.field}>
            <p className={styles.formHeading}>Tell Us About You.</p>
            <textarea
              id="message"
              name="message"
              className={styles.textarea}
              rows={4}
              placeholder="What brings you here? What do you most want to address before conception?"
            />
          </div>

          <button type="submit" className={`btn btn-primary ${styles.submit}`}>
            <span className="btn-dot" />
            {submitLabel}
          </button>
        </form>
      </div>
    </section>
  );
}
