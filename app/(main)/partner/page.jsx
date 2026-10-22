import PartnerView from "./PartnerView";
import JsonLd from "@/components/site/JsonLd";
import { PARTNER_FAQ } from "@/data/skillntell/partner";
import { breadcrumbLd, faqLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Partner with Us: Sponsoring & Collaborations",
  description: "Sponsor an event, host a workshop or a Mission: partner with Skill&Tell to reach 534+ motivated students at ENSIA, Algeria's National School of AI.",
  path: "/partner",
  keywords: ["sponsor student event Algeria", "partner ENSIA club", "student sponsorship"],
});

export default function PartnerPage() {
  return (
    <>
      <JsonLd data={[breadcrumbLd([{ name: "Partner with us", path: "/partner" }]), faqLd(PARTNER_FAQ)]} />
      <PartnerView />
    </>
  );
}
