import { Outlet } from "react-router-dom";
import Aside from "./ui/Aside";

function AppLayout() {
  return (
    <div className="relative md:flex bg-[var(--bg-color-primary)] w-full h-[100vh]">
      {/* <div className="relative md:flex bg-[#131426] w-full h-[100vh]"> */}
      <Aside />
      <Outlet />
    </div>
  );
}

export default AppLayout;
