import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Contact from "@/components/Contact";
import Locations from "@/components/Locations";
import Footer from "@/components/Footer";
import { client } from "@/lib/sanity/client";
import { contactSectionQuery } from "@/lib/sanity/queries";
import { pageMetadata } from "@/lib/og";

export const metadata: Metadata = pageMetadata({
  title: "Contact | Conscious Pregnancy",
  description:
    "Begin your journey. Fill out the form and Dr. Ashley Alden's team will reach out within 24 hours to schedule your discovery call.",
  path: "/contact",
});

export default async function ContactPage() {
  const contactContent = await client
    .fetch(contactSectionQuery, {}, { cache: "no-store" })
    .catch(() => null);

  return (
    <>
      <Nav />
      <main>
        <Contact content={contactContent} />
        <Locations content={contactContent} />
      </main>
      <Footer />
    </>
  );
}
