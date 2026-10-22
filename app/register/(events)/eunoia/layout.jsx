import Navbar from "./features/layout/Navbar";
import Footer from "./features/layout/Footer";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata({
  title: "EUNOIA Ideathon: Register",
  description: "EUNOIA is a full-day ideathon by Skill&Tell on student well-being, with expert talks, activities and a cultural village. Build solutions that matter.",
  path: "/register/eunoia",
  keywords: ["EUNOIA", "EUNOIA ideathon", "student well-being"],
});

export default function RootLayout({ children, }) {
    return (<div className="min-h-full flex flex-col">
                    <Navbar />
        {children}
        
                    <Footer />
                    </div>);
}
