import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

const Profile = () => {
  return (
    <div className="mx-5 bg-[#f1f5f9]">
      <Toaster position="top-right" reverseOrder={false}></Toaster>
      <Outlet />
    </div>
  );
};

export default Profile;
