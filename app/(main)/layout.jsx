import "lenis/dist/lenis.css";
import "@/styles/site.css";
import SmoothScroll from "@/components/site/SmoothScroll";
import TransitionShell from "@/components/site/TransitionShell";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import CursorSparkles from "@/components/site/CursorSparkles";
import IntroLoader from "@/components/site/IntroLoader";

export const metadata = {
  title: {
    default: "Skill & Tell — Scientific Club at ENSIA",
    template: "%s · Skill & Tell",
  },
  description:
    "Skill&Tell is a dynamic scientific club at ENSIA (National Higher School of Artificial Intelligence) — hackathons, datathons, competitions and hands-on Missions that grow skills beyond academics.",
};

export default function MainLayout({ children }) {
  return (
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
  );
}
