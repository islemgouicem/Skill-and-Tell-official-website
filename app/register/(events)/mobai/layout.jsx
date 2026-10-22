import Navbar from "./features/layout/Navbar";
import Footer from "./features/layout/Footer";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata({
  title: "MobAI Hackathon: Register",
  description: "MobAI is a 3-day hackathon by Skill&Tell bringing together mobile development, AI and UI/UX, with hands-on workshops before the challenge.",
  path: "/register/mobai",
  keywords: ["MobAI", "MobAI hackathon", "mobile AI hackathon Algeria"],
});

export default function RootLayout({ children, }) {
    return (<div className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Footer />
        </div>);
}
