import "lenis/dist/lenis.css";
import "@/styles/site.css";
import SmoothScroll from "@/components/site/SmoothScroll";
import TransitionShell from "@/components/site/TransitionShell";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import CursorSparkles from "@/components/site/CursorSparkles";
import IntroLoader from "@/components/site/IntroLoader";
import JsonLd from "@/components/site/JsonLd";
import { organizationLd, websiteLd } from "@/lib/seo";

export default function MainLayout({ children }) {
  return (
    <>
      <JsonLd data={[organizationLd, websiteLd]} />
      <SmoothScroll>
      <TransitionShell>
        <div className="snt min-h-screen flex flex-col">
          <IntroLoader />
          <Navbar />
          <main id="content" className="flex-1">{children}</main>
          <Footer />
        </div>
        <CursorSparkles />
      </TransitionShell>
      </SmoothScroll>
    </>
  );
}
