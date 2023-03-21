import { React, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar.component";

const EduTech = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex min-w-max">
      <div
        className={` ${
          open ? "w-auto" : "w-20"
        } bg-white h-screen p-5  pt-8 relative duration-300`}
      >
        <Sidebar open={open} setOpen={setOpen} />
      </div>

      <div className="h-screen bg-[#f1f5f9] flex-1  scrollbar-thumb-gray-400 scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-rounded">
        <Outlet />
      </div>
    </div>
  );
};
export default EduTech;
