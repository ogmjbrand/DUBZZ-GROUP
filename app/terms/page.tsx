import type { Metadata } from "next";
import LegalArticle from "@/components/ui/LegalArticle";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms governing your use of Dubzz Group's websites and services.",
};

export default function TermsPage() {
  return (
    <LegalArticle
      overline="Legal"
      title="Terms of Service"
      updated="24 July 2026"
      sections={[
        {
          heading: "Agreement",
          paragraphs: [
            "By using the Dubzz Group website and the services of its divisions, you agree to these terms. If you are using the site on behalf of a company — for example, opening a trade inquiry — you confirm you have authority to bind that company.",
          ],
        },
        {
          heading: "The Services",
          paragraphs: [
            "Dubzz Wear sells physical goods in numbered runs; availability is genuinely limited and orders are accepted in sequence. Dubzz Wine Resort accepts reservations subject to its booking conditions provided at the time of booking. Dubzz Media engagements and Dubzz Trade contracts are governed by their own signed agreements, which prevail over these terms where they differ.",
          ],
        },
        {
          heading: "Orders & Payment",
          paragraphs: [
            "Prices are shown at checkout and include applicable taxes unless stated otherwise. An order is accepted when we confirm dispatch. We may decline or cancel orders affected by pricing errors, suspected fraud, or stock exhaustion — with a full refund in every such case.",
          ],
        },
        {
          heading: "Returns",
          paragraphs: [
            "Unworn pieces in original condition may be returned within fourteen days of delivery for a refund or exchange. Numbered-run items are restocked to the archive only; once a run closes, exchanges are fulfilled while archive stock lasts.",
          ],
        },
        {
          heading: "Intellectual Property",
          paragraphs: [
            "Everything on this site — marks, designs, photography, film, text, and code — belongs to Dubzz Group or its licensors. You may not reproduce or exploit it commercially without written permission.",
          ],
        },
        {
          heading: "Acceptable Use",
          paragraphs: [
            "Do not misuse the services: no unlawful activity, no attempts to breach security, no scraping at scale, no interference with other users. We may suspend access to protect the services or other users.",
          ],
        },
        {
          heading: "Liability",
          paragraphs: [
            "We provide the site with care but without warranty that it will be uninterrupted or error-free. To the extent the law allows, our liability for claims arising from use of the site is limited to the amount you paid us for the relevant product or service. Nothing in these terms limits liability that cannot lawfully be limited.",
          ],
        },
        {
          heading: "Changes & Contact",
          paragraphs: [
            "We may update these terms; material changes will be posted here with a new date. Continued use after changes means acceptance. Questions: legal@dubzzgroup.com.",
          ],
        },
      ]}
    />
  );
}
