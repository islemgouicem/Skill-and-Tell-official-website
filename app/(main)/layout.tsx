import Navbar  from "./features/layout/Navbar"
import Footer  from "./features/layout/Footer"
function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
        <Navbar/>
      {children}
      <Footer/>
    </div>
  );
}
export default Layout