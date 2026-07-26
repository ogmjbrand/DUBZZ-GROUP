import type { Metadata } from "next";
import LegalArticle from "@/components/ui/LegalArticle";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Dubzz Group collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <LegalArticle
      overline="Legal"
      title="Privacy Policy"
      updated="24 July 2026"
      sections={[
        {
          heading: "Who We Are",
          paragraphs: [
            "Dubzz Group and its divisions — Dubzz Media, Dubzz Wear, Dubzz Wines Resort, Dubzz Trade, and After Dark — operate this website and the services connected to it. This policy explains what personal information we collect across the ecosystem, why we collect it, and the choices you have.",
          ],
        },
        {
          heading: "What We Collect",
          paragraphs: [
            "Information you give us directly: contact details when you write to us, order and delivery details when you purchase from Dubzz Wear, reservation details when you book with the Wines Resort, and business information when you open a trade inquiry or media commission.",
            "Information collected automatically: standard technical data such as device type, browser, and pages visited, used to keep the site fast, secure, and improving. We keep this minimal and never sell it.",
          ],
        },
        {
          heading: "How We Use It",
          paragraphs: [
            "To fulfil what you asked for — orders, reservations, inquiries, applications, and correspondence. To operate our services safely, including fraud prevention and security. To send the Inner Circle dispatch if you subscribed, which you can leave with one click at any time.",
            "We do not sell personal information. We share it only with processors who help us operate (payments, logistics, hosting) under contracts that hold them to this policy's standard.",
          ],
        },
        {
          heading: "Where It Lives",
          paragraphs: [
            "Data is stored with our infrastructure providers inside access-controlled systems, encrypted in transit and at rest. Payment card details are handled by our payment processors and never touch our servers.",
          ],
        },
        {
          heading: "Your Rights",
          paragraphs: [
            "Depending on your jurisdiction, you may have the right to access, correct, export, or delete your personal information, and to object to or restrict certain processing. Write to privacy@dubzzgroup.com and we will respond within thirty days.",
          ],
        },
        {
          heading: "Retention",
          paragraphs: [
            "We keep personal information only as long as needed for the purpose it was collected — orders for as long as tax law requires, correspondence for as long as the relationship is live, and analytics in aggregate only.",
          ],
        },
        {
          heading: "Contact",
          paragraphs: [
            "Questions about this policy or your data: privacy@dubzzgroup.com. We read everything.",
          ],
        },
      ]}
    />
  );
}
