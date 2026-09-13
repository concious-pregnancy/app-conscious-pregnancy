import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ServicePanels, { type ServicePanelDoc } from "@/components/ServicePanels";
import { JsonLd } from "@/components/JsonLd";
import { sanityFetch } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";
import { servicesPanelsQuery, servicesCtaQuery } from "@/lib/sanity/queries";
import { pageMetadata } from "@/lib/og";
import { breadcrumbs, serviceList } from "@/lib/schema";
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
  const [panels, cta] = await Promise.all([
    sanityFetch<ServicePanelQueryDoc[]>(servicesPanelsQuery),
    sanityFetch(servicesCtaQuery),
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
      <JsonLd data={breadcrumbs("Services", "/services")} />
      <JsonLd data={serviceList(panels ?? [])} />
      <Nav />
      <main className={s.pageMain}>
        {/* The page opens straight into the photo panels, which have no page
            title, so the h1 is for screen readers and crawlers only. */}
        <h1 className={s.srOnly}>Services</h1>

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
