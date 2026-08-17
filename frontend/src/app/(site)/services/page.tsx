import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ServicePanels, { type ServicePanelDoc } from "@/components/ServicePanels";
import { client } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";
import { servicesHeroQuery, servicesPanelsQuery, servicesCtaQuery } from "@/lib/sanity/queries";
import s from "@/components/PageScaffold.module.css";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Functional and Eastern medicine, somatic healing, acupuncture, and pre-conception care for both partners.",
};

const IMG = "/clearpath-ref/services";

type SanityImage = { asset?: { _ref?: string } } | null | undefined;
type ServicePanelQueryDoc = Omit<ServicePanelDoc, "imageUrl"> & { image?: SanityImage };

function imgUrl(image: SanityImage, fallback: string): string {
  return image?.asset?._ref ? urlFor(image).width(2400).url() : fallback;
}

export default async function ServicesPage() {
  const opts = { cache: "no-store" } as const;
  const [hero, panels, cta] = await Promise.all([
    client.fetch(servicesHeroQuery, {}, opts),
    client.fetch<ServicePanelQueryDoc[]>(servicesPanelsQuery, {}, opts),
    client.fetch(servicesCtaQuery, {}, opts),
  ]);

  const h = hero ?? {};
  const c = cta ?? {};
  const servicePanels: ServicePanelDoc[] = (panels ?? []).map((svc) => {
    const { image, ...rest } = svc;
    return {
      ...rest,
      imageUrl: imgUrl(image, `${IMG}/X1KAS3BPHbN4rR5FN8CCVsSUhM.jpg`),
    };
  });

  return (
    <>
      <Nav />
      <main className={s.pageMain}>
        {/* Hero */}
        <section className={s.hero}>
          <div className={s.heroWisp} aria-hidden="true">
            <svg
              viewBox="0 0 1516 443"
              preserveAspectRatio="none"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            >
              <path d="M0 441V0H1514V441C1514 441 1214.5 229 757 229C299.5 229 0 441 0 441Z" />
            </svg>
          </div>
          <div className={s.heroInnerStacked}>
            <h1 className={s.heroTitle}>
              {h.titleLine1 ?? "Every Step"} <em>{h.titleEm ?? "of Your Journey."}</em>
            </h1>
            <span className={`t-label t-label-eyebrow ${s.heroEyebrow}`}>
              {h.eyebrow ?? "Services"}
            </span>
            <p className={s.heroLeadLarge}>
              {h.lead ??
                "Explore our therapy and coaching options tailored to your goals, pace, and needs."}
            </p>
          </div>
        </section>

        {/* Service panels: full-bleed dark photographic per service */}
        <ServicePanels panels={servicePanels} />

        {/* Closing CTA */}
        <section className={s.closingCta}>
          <span className="t-label t-label-eyebrow">{c.eyebrow ?? "Book a session"}</span>
          <h2 className={s.closingTitle}>
            {c.title ?? "Support starts with a"} <em>{c.titleEm ?? "simple step."}</em>
          </h2>
          <p className={s.closingBody}>
            {c.body ??
              "Whether you're starting fresh, returning, or exploring options, we're here."}
          </p>
          <Link href="/contact" className="btn btn-primary">
            <span className="btn-dot" /> {c.ctaLabel ?? "Book a session"}
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
