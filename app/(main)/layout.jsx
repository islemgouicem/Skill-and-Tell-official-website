import Navbar from "./features/layout/Navbar";
import Footer from "./features/layout/Footer";
import MouseSparkles from "@/components/effects/mouse-sparkles";
function Layout({ children, }) {
    return (<>
        <Navbar />
        <MouseSparkles />
            {children}
      <Footer />
    </>);
}
export default Layout;
