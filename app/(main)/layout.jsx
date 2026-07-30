import Navbar from "./features/layout/Navbar";
import Footer from "./features/layout/Footer";
function Layout({ children, }) {
    return (<div>
        <Navbar />
            {children}
      <Footer />
    </div>);
}
export default Layout;
