import styles from "./Locations.module.css";

type Location = {
  city: string;
  addressLine1: string;
  addressLine2: string;
  mapQuery: string;
  directionsDestination: string;
};

const LOCATIONS: Location[] = [
  {
    city: "Los Angeles",
    addressLine1: "12764 W. Washington Blvd.",
    addressLine2: "Los Angeles, CA 90066",
    mapQuery: "12764 W. Washington Blvd, Los Angeles, CA 90066",
    directionsDestination: "12764+W+Washington+Blvd+Los+Angeles+CA+90066",
  },
  {
    city: "Bay Area",
    addressLine1: "1475 Powell St. Unit 100",
    addressLine2: "Emeryville, CA 94608",
    mapQuery: "1475 Powell St Unit 100, Emeryville, CA 94608",
    directionsDestination: "1475+Powell+St+Unit+100+Emeryville+CA+94608",
  },
];

export default function Locations() {
  return (
    <section data-section="locations" className={styles.locations}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.head}>
          <p className={styles.label}>Where We Work</p>
          <h2 className={styles.heading}>Two homes for the practice.</h2>
          <p className={styles.sub}>
            Sessions run in person at either location. Both are open by appointment for discovery
            calls and the full preconception work.
          </p>
        </div>

        <div className={styles.grid}>
          {LOCATIONS.map((loc) => (
            <div key={loc.city} className={styles.card}>
              <div className={styles.map}>
                <iframe
                  title={`Conscious Pregnancy ${loc.city} location, ${loc.addressLine1}`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(loc.mapQuery)}&output=embed`}
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
                  href={`https://www.google.com/maps/dir/?api=1&destination=${loc.directionsDestination}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.directions}
                >
                  Get directions
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
