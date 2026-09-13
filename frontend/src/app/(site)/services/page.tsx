import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ServicePanels, { type ServicePanelDoc } from "@/components/ServicePanels";
import { client } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";
import { servicesPanelsQuery, servicesCtaQuery } from "@/lib/sanity/queries";
import { pageMetadata } from "@/lib/og";
import s from "@/components/PageScaffold.module.css";

export const metadata: Metadata = pageMetadata({
  title: "Services | Conscious Pregnancy",
  description:
    "Functional and Eastern medicine, somatic healing, acupuncture, and pre-conception care for both partners.",
  path: "/services",
});

const IMG = "/clearpath-ref/services";

type SanityImage = { asset?: { _ref?: string } } | null | undefined;
type ServicePanelQueryDoc = Omit<ServicePanelDoc, "imageUrl"> & { image?: SanityImage };

function imgUrl(image: SanityImage, fallback: string): string {
  return image?.asset?._ref ? urlFor(image).width(2400).url() : fallback;
}

export default async function ServicesPage() {
  const opts = { cache: "no-store" } as const;
  const [panels, cta] = await Promise.all([
    client.fetch<ServicePanelQueryDoc[]>(servicesPanelsQuery, {}, opts),
    client.fetch(servicesCtaQuery, {}, opts),
  ]);

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
