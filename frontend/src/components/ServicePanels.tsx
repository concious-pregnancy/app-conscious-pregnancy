"use client";

import { useEffect, useState } from "react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import s from "@/components/PageScaffold.module.css";

export type ServicePanelDoc = {
  _id: string;
  title?: string;
  titleLine2?: string;
  eyebrow?: string;
  body?: string;
  points?: string[];
  trigram?: string;
  imageUrl: string;
  lead?: string;
  detailBody?: PortableTextBlock[];
  slug?: { current?: string };
};

const portableComponents: PortableTextComponents = {
  marks: {
    link: ({
      value,
      children,
    }: {
      value?: { href?: string; blank?: boolean };
      children: React.ReactNode;
    }) => {
      const href = value?.href ?? "#";
      const target = value?.blank ? "_blank" : undefined;
      const rel = value?.blank ? "noopener noreferrer" : undefined;
      return (
        <a href={href} target={target} rel={rel}>
          {children}
        </a>
      );
    },
  },
};

export default function ServicePanels({ panels }: { panels: ServicePanelDoc[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const active = panels.find((p) => p._id === openId) ?? null;

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
    };
    document.addEventListener("keydown", onKey);
    const html = document.documentElement;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      html.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
    };
  }, [active]);

  return (
    <>
      {panels.map((svc, idx) => (
        <section
          key={svc._id}
          id={svc.slug?.current}
          className={s.servicePhotoBlock}
          style={{ "--service-bg": `url(${svc.imageUrl})` } as React.CSSProperties}
        >
          <div className={s.servicePhotoContent}>
            <div className={s.servicePhotoInner}>
              {svc.trigram && (
                <span className={s.servicePhotoTrigram} aria-hidden="true">
                  {svc.trigram}
                </span>
              )}
              <span className="t-label t-label-eyebrow">
                {svc.eyebrow ?? `Service · 0${idx + 1}`}
              </span>
              <h2 className={s.servicePhotoTitle}>
                {svc.title}{" "}
                {svc.titleLine2 && <em style={{ color: "var(--sage-light)" }}>{svc.titleLine2}</em>}
              </h2>
              {svc.body && (
                <div className={s.servicePhotoBody}>
                  <p>{svc.body}</p>
                </div>
              )}
              {svc.points && svc.points.length > 0 && (
                <ul className={s.servicePhotoPoints}>
                  {svc.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}
              <button
                type="button"
                onClick={() => setOpenId(svc._id)}
                className="btn btn-ghost-light"
                style={{ alignSelf: "flex-start", marginTop: "var(--s-4)" }}
              >
                <span className="btn-dot" /> Learn more
              </button>
            </div>
          </div>
        </section>
      ))}

      {active && (
        <div
          className={s.serviceModalOverlay}
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpenId(null);
          }}
          role="presentation"
        >
          <div
            className={s.serviceModalContent}
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-modal-title"
            data-lenis-prevent
          >
            <button
              type="button"
              className={s.serviceModalClose}
              onClick={() => setOpenId(null)}
              aria-label="Close"
            >
              &times;
            </button>
            {active.trigram && (
              <span className={s.serviceModalTrigram} aria-hidden="true">
                {active.trigram}
              </span>
            )}
            <h2 id="service-modal-title" className={s.serviceModalTitle}>
              {active.title} {active.titleLine2 && <em>{active.titleLine2}</em>}
            </h2>
            <div className={s.serviceModalBody}>
              {active.detailBody && active.detailBody.length > 0 ? (
                <PortableText value={active.detailBody} components={portableComponents} />
              ) : (
                <p>{active.lead || active.body}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
