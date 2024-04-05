import { Outlet } from "react-router-dom";
import Header from "../header/Header";

function Layout() {
  return (
    <>
      <Header />
      <div className="py-5 px-7 h-main">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
