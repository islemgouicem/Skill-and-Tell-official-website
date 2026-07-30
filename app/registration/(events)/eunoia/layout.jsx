import Navbar from "./features/layout/Navbar";
import Footer from "./features/layout/Footer";
export default function RootLayout({ children, }) {
    return (<body className="min-h-full flex flex-col">
                    <Navbar />
        {children}
        
                    <Footer />
                    </body>);
}
