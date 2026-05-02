import { urlFor } from "@/lib/sanity/image";
import styles from "./Listen.module.css";

type SanityImage = { asset?: { _ref: string } };

type ListenContent = {
  quote?: string;
  attribution?: string;
  image?: SanityImage;
} | null;

export default function Listen({ content }: { content?: ListenContent }) {
  const quote =
    content?.quote ??
    "The body is always speaking. Learning to listen is where the deepest healing begins.";
  const attribution =
    content?.attribution ?? "Dr. Ashley Alden, DACM · L.Ac. · Founder of Conscious Pregnancy";
  const imgUrl = content?.image?.asset
    ? urlFor(content.image).width(1600).url()
    : "/hero/hero-water.jpeg";

  return (
    <section id="listen" data-section="listen" className={styles.listen}>
      <div className={styles.stage}>
        <div className={styles.imageWrap} data-listen-wrap>
          <div
            className={styles.image}
            style={{ backgroundImage: `url('${imgUrl}')` }}
            aria-hidden="true"
          />

          {/* Off-white cover with a uniform-curvature dome bottom edge.
              Mirrors the ClearPath template's Big Quote shape so the
              slope from corner to apex stays consistent. The cover
              collapses to zero height as --arc → 1 (scroll progress),
              flattening the dome and revealing the rectangular image. */}
          <svg
            className={styles.cover}
            viewBox="0 0 1514 443"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M 0 441 V 0 H 1514 V 441 C 1514 441, 1214.5 229, 757 229 C 299.5 229, 0 441, 0 441 Z" />
          </svg>

          {/* Double-line squiggle thread, vertical-dominant with loops.
              Two paths offset by a few units in x give the parallel-line
              feel of the ClearPath template; both reveal together via
              stroke-dashoffset driven by --arc. pathLength="1" normalizes
              so dashoffset = (1 - --arc) regardless of actual length.
              The path stays mostly in the central column of the image,
              loops around itself twice, and terminates above the bottom. */}
          <svg
            className={styles.thread}
            viewBox="0 0 680 2000"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            {/* Both paths copied verbatim from the ClearPath template
                via Playwright extraction (artifacts/listen-architecture/
                svgs-deep-6-9000.json). Two strokes offset slightly give
                the parallel-line look; the long extents above and below
                the viewBox are intentional, only the middle slice ever
                renders inside the SVG window. */}
            <path
              className={styles.threadPath}
              pathLength="1"
              d="M 288.784 -4000 C 202.776 -3764.462 209.274 -3473.637 516.263 -3396.38 C 823.252 -3319.123 223.717 -3766.427 185.057 -3396.38 C 146.397 -3026.333 866.552 -3059.991 533.173 -3016.262 C 199.794 -2972.533 618.875 -2239.813 141.673 -2606.955 C -335.528 -2974.097 898.694 -2380.924 455.173 -2153.115 C 11.652 -1925.306 525.457 -1731.808 242.173 -1671.253 C -41.111 -1610.699 836.443 -2132.952 500.173 -1549 C 163.903 -965.048 142.591 -946.818 318.673 -985.5 C 494.755 -1024.182 819.478 -831.518 474.173 -530.898 C 128.868 -230.278 497.924 -108.466 597.173 -174.631 C 696.422 -240.796 288.499 -410.716 198.173 -57.543 C 107.848 295.629 487.414 -103.673 597.173 25.519 C 706.933 154.711 497.466 413.512 315.673 327.746 C 133.88 241.979 576.582 385.053 369.423 843.132 C 162.265 1301.212 435.515 1167.326 455.173 1072.805 C 474.831 978.283 96.831 1142.487 228.173 1338.504 C 359.515 1534.52 894.701 1541.779 516.173 1370 C 137.645 1198.221 -143.336 1577.671 234.673 1715.5 C 612.682 1853.329 369.423 2000 369.423 2000"
            />
            <path
              className={styles.threadPath}
              pathLength="1"
              d="M 298.313 -4000 C 101.479 -3600.924 333.236 -3453.954 499.813 -3414.5 C 666.39 -3375.046 520.708 -3577.549 318.313 -3545 C 115.919 -3512.451 178.693 -3157.619 444.667 -3106.853 C 710.64 -3056.087 428.009 -3120.799 396.684 -2875.408 C 365.359 -2630.017 432.207 -2367.333 190.257 -2545.561 C -51.693 -2723.789 -3.614 -2837.426 243.238 -2634.926 C 490.091 -2432.426 790.221 -2327.402 459.161 -2127.353 C 128.102 -1927.305 427.86 -1835.353 348.701 -1727.219 C 269.541 -1619.086 37.072 -1641.137 359.813 -1791.5 C 682.555 -1941.863 616.69 -1811.107 377.191 -1332.106 C 137.691 -853.106 248.214 -985.692 444.667 -985.692 C 641.119 -985.692 703.16 -735.252 485.152 -561.961 C 267.144 -388.671 250.085 -185.802 485.152 -166.346 C 720.22 -146.889 628.502 -252.713 499.647 -269.768 C 370.792 -286.824 311.587 -259.663 243.238 -176.387 C 174.889 -93.111 56.615 195.552 396.684 44.515 C 736.753 -106.522 696.824 378.029 418.176 344.741 C 139.528 311.453 360.872 286.613 444.667 562.631 C 528.461 838.648 187.957 1058.856 286.223 1157.56 C 384.489 1256.264 561.553 901.845 377.191 1019.998 C 192.829 1138.152 102.163 1323.513 305.716 1441.72 C 509.269 1559.928 854.725 1528.704 444.667 1369.927 C 34.608 1211.15 -32.126 1591.926 243.238 1699.774 C 518.602 1807.622 514.579 1926.801 359.697 2000"
            />
          </svg>

          <div className={styles.overlay}>
            <p className={styles.quote}>&ldquo;{quote}&rdquo;</p>
            <p className={styles.attr}>{attribution}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
