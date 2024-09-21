import Navbar from "./Navbar";
import Sidebars from "./Sidebars";

const Layout = ({ userRole, children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar userRole={userRole} />
      <div className="flex flex-1 px-4">
        <Sidebars userRole={userRole} />
        <main className="flex-1 h-full overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
