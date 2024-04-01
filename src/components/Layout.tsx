import { Outlet } from "react-router-dom";
import Header from "./header/Header";

function Layout() {
  return (
    <>
      <Header />
      <div className="p-5 h-main">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
