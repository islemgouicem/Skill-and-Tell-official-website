import RegisterView from "./RegisterView";
import JsonLd from "@/components/site/JsonLd";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Join Skill&Tell: Membership Registration",
  description: "Become a Skill&Tell member: register in about three minutes and choose your top three departments among HR, IT, Design, Marketing, Events and Relex.",
  path: "/register",
  keywords: ["join Skill&Tell", "Skill&Tell registration", "ENSIA club membership"],
});

export default function RegisterPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Join Skill&Tell", path: "/register" }])} />
      <RegisterView />
    </>
  );
}
