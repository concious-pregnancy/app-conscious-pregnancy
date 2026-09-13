// Shared schema.org JSON-LD nodes. The site layout emits the Organization,
// WebSite, and MedicalBusiness nodes on every page. Pages add their own nodes
// and point back at those by @id so search and answer engines can connect them.

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://consciouspregnancy.care";

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const BUSINESS_ID = `${SITE_URL}/#business`;
export const PERSON_ID = `${SITE_URL}/about#ashley-alden`;

export const VENICE_CA = {
  "@type": "PostalAddress",
  addressLocality: "Venice",
  addressRegion: "CA",
  addressCountry: "US",
};

// Credentials match the ones printed on the About page.
export const ASHLEY_ALDEN = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Ashley Alden",
  honorificPrefix: "Dr.",
  honorificSuffix: "L.Ac., DACM, MTOM, Dip. of O.M.",
  jobTitle: "Doctor of Acupuncture and Chinese Medicine",
  url: `${SITE_URL}/about`,
  sameAs: ["https://drashleyalden.com"],
  worksFor: { "@id": BUSINESS_ID },
  knowsAbout: [
    "Preconception care",
    "Functional medicine",
    "Traditional Chinese Medicine",
    "Acupuncture",
    "Somatic healing",
    "Nutritional biochemistry",
    "Psychedelic integration",
  ],
};

export const ABOUT_PROFILE = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: `${SITE_URL}/about`,
  mainEntity: ASHLEY_ALDEN,
};

export function breadcrumbs(name: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name, item: `${SITE_URL}${path}` },
    ],
  };
}

// Built from the same Sanity FAQ docs the home page renders, so the markup
// always matches what visitors can read. Null when there's nothing to mark up.
export function faqPage(items: { question?: string; answer?: string }[]) {
  const answered = items.flatMap((item) => {
    const question = item.question?.trim();
    const answer = item.answer?.trim();
    return question && answer ? [{ question, answer }] : [];
  });
  if (answered.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: answered.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

export function serviceList(services: { title?: string; titleLine2?: string; body?: string }[]) {
  const named = services.flatMap((svc) => {
    const name = [svc.title, svc.titleLine2].filter(Boolean).join(" ").trim();
    return name ? [{ name, description: svc.body?.trim() || undefined }] : [];
  });
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: named.map((svc, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: svc.name,
        description: svc.description,
        provider: { "@id": BUSINESS_ID },
      },
    })),
  };
}
