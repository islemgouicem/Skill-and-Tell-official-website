import Navbar from "./features/layout/navbar";
import Footer from "./features/layout/navbar";
export default function Layout({ children, }) {
    return (<div className="min-h-full flex flex-col">
        <Navbar />

        {children}
        <Footer />
          </div>);
}
