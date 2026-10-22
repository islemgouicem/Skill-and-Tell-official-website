import Navbar from "./features/layout/navbar";
import Footer from "./features/layout/navbar";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata({
  title: "ARCADE: Register",
  description: "ARCADE is Skill&Tell's signature event: a full day of team challenges at ENSIA with math puzzles, programming tasks, a scavenger hunt and games.",
  path: "/register/arcade",
  keywords: ["ARCADE", "ARCADE Skill&Tell", "team competition ENSIA"],
});

export default function Layout({ children, }) {
    return (<div className="min-h-full flex flex-col">
        <Navbar />

        {children}
        <Footer />
          </div>);
}
