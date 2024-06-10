import Bottombar from "@/components/shared/Bottombar";
import LeftSideBar from "@/components/shared/LeftSideBar";
import Topbar from "@/components/shared/Topbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen w-full max-w-screen">
      {" "}
      <Topbar />
      <div className="md:flex flex-1 h-full">
        {/* Left Sidebar - Hidden in Mobile */}
        <div className="hidden md:block ">
          <LeftSideBar />
        </div>

        <section className="flex flex-1 h-full ">
          <Outlet />
        </section>
      </div>
      <div className="md:hidden fixed bottom-0 w-full">
        <Bottombar />
      </div>
    </div>
  );
};

export default RootLayout;
