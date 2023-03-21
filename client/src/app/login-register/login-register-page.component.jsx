import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const LoginRegisterPage = () => {
  return (
    <>
      <div className="bg-slate-200 flex flex-col justify-center items-center w-full h-screen rounded flex-wrap shadow-2xl">
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default LoginRegisterPage;
