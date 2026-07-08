import styles from "./Locations.module.css";

export type LocationContent = {
  city?: string;
  addressLine1?: string;
  addressLine2?: string;
};

export type LocationsContent = {
  locationsLabel?: string;
  locationsHeading?: string;
  locationsSub?: string;
  locations?: LocationContent[] | null;
} | null;

const DEFAULTS = {
  label: "Where We Work",
  heading: "Two homes for the practice.",
  sub: "Sessions run in person at either location. Both are open by appointment for discovery calls and the full preconception work.",
  locations: [
    {
      city: "Los Angeles",
      addressLine1: "12764 W. Washington Blvd.",
      addressLine2: "Los Angeles, CA 90066",
    },
    {
      city: "Bay Area",
      addressLine1: "1475 Powell St. Unit 100",
      addressLine2: "Emeryville, CA 94608",
    },
  ],
};

// Build the map query + directions destination from the plain address the
// client edits in Sanity, so no one has to hand-author encoded URL strings.
function fullAddress(loc: { addressLine1?: string; addressLine2?: string }): string {
  return [loc.addressLine1, loc.addressLine2].filter(Boolean).join(", ").trim();
}

export default function Locations({ content }: { content?: LocationsContent }) {
  const label = content?.locationsLabel?.trim() || DEFAULTS.label;
  const heading = content?.locationsHeading?.trim() || DEFAULTS.heading;
  const sub = content?.locationsSub?.trim() || DEFAULTS.sub;

  // Keep only entries with a real address; fall back to the defaults if the
  // Sanity document has no locations yet.
  const authored = (content?.locations ?? [])
    .map((l) => ({
      city: l.city?.trim() ?? "",
      addressLine1: l.addressLine1?.trim() ?? "",
      addressLine2: l.addressLine2?.trim() ?? "",
    }))
    .filter((l) => l.addressLine1 || l.addressLine2);
  const locations = authored.length ? authored : DEFAULTS.locations;

  return (
    <section data-section="locations" className={styles.locations}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.head}>
          <p className={styles.label}>{label}</p>
          <h2 className={styles.heading}>{heading}</h2>
          <p className={styles.sub}>{sub}</p>
        </div>

        <div className={styles.grid}>
          {locations.map((loc) => {
            const address = fullAddress(loc);
            return (
              <div key={`${loc.city}-${address}`} className={styles.card}>
                <div className={styles.map}>
                  <iframe
                    title={`Conscious Pregnancy ${loc.city} location, ${loc.addressLine1}`}
                    src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0, display: "block" }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
                <div className={styles.details}>
                  <h3 className={styles.city}>{loc.city}</h3>
                  <address className={styles.address}>
                    {loc.addressLine1}
                    <br />
                    {loc.addressLine2}
                  </address>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.directions}
                  >
                    Get directions
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
