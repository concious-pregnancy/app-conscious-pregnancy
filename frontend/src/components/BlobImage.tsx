import s from "./PageScaffold.module.css";

const blobs = [
  {
    cls: s.blob0,
    viewBox: "0 0 297 222",
    d: "M13.013 89.829c-52.508 167.719 66.63 135.575 130.863 116.16 64.233-19.415 187.688-14.692 143.955-97.6C244.098 25.482 65.521-77.89 13.013 89.829Z",
  },
  {
    cls: s.blob1,
    viewBox: "0 0 314 236",
    d: "M299.371 37.497c71.678 93.882-140.257 275.01-199.025 163.175C41.578 88.837-21.431 89.682 7.074 47.254c28.505-42.427 241.57-76.198 292.297-9.757Z",
  },
  {
    cls: s.blob2,
    viewBox: "0 0 314 211",
    d: "M169.086 208.356C58.174 226.813-56.084 146.002 30.446 47.732s165.89-17.958 249.552 4.49c83.662 22.447 0 137.678-110.912 156.134Z",
  },
];

export default function BlobImage({
  src,
  alt = "",
  index,
}: {
  src: string;
  alt?: string;
  index: number;
}) {
  const blob = blobs[index % blobs.length];
  return (
    <div className={`${s.blobFrame} ${blob.cls}`}>
      <img src={src} alt={alt} />
      <svg
        className={s.blobOutline}
        viewBox={blob.viewBox}
        preserveAspectRatio="none"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        aria-hidden="true"
      >
        <path d={blob.d} />
      </svg>
    </div>
  );
}
