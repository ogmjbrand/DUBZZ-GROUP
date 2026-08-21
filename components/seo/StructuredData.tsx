import { contact, founder, site, socials } from "@/lib/data/site";
import { divisions } from "@/lib/data/divisions";

/**
 * Organization schema for the Group.
 *
 * Deliberately conservative: no employee count, no founding date, no
 * aggregate ratings, no telephone. Structured data is the one place a
 * fabricated detail is machine-read and then repeated verbatim by search
 * engines, so it carries only what the corporate profile publishes.
 *
 * `subOrganization` is what makes the holding structure legible to a crawler —
 * the same argument the ecosystem section makes to a reader.
 */
export function OrganizationSchema() {
  const base = site.url.replace(/\/$/, "");

  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${base}/#organization`,
    name: site.name,
    url: base,
    description: site.description,
    slogan: site.tagline,
    address: {
      "@type": "PostalAddress",
      addressLocality: contact.city,
      addressRegion: contact.region,
      addressCountry: "NG",
    },
    founder: {
      "@type": "Person",
      name: founder.name,
      jobTitle: founder.role,
    },
    sameAs: socials.map((s) => s.href),
    subOrganization: divisions.map((d) => ({
      "@type": "Organization",
      name: d.name,
      url: `${base}${d.href}`,
      description: d.description,
    })),
  };

  return (
    <script
      type="application/ld+json"
      // Values are authored in this repo, not user input, and the payload is
      // serialised from a plain object rather than concatenated.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** Breadcrumb trail for a section page. Pass the trail without the home crumb. */
export function BreadcrumbSchema({ trail }: { trail: { name: string; path: string }[] }) {
  const base = site.url.replace(/\/$/, "");

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${base}${crumb.path === "/" ? "" : crumb.path}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
