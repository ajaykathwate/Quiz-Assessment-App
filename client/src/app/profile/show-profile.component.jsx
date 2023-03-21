import EditIcon from "@mui/icons-material/Edit";
import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../shared/hooks/fetch.hook";

const ShowProfile = () => {
  const [{ isLoading, apiData, serverError, status }] = useFetch();

  if (isLoading) {
    return (
      <h1>
        <lottie-player
          src="https://assets8.lottiefiles.com/packages/lf20_p8bfn5to.json"
          background="transparent"
          speed="1"
          style={{ width: "300px", height: "auto" }}
          loop
          autoplay
        ></lottie-player>
      </h1>
    );
  }
  if (serverError) {
    return (
      <h1>
        {status === 404 ? (
          <lottie-player
            src="https://assets5.lottiefiles.com/packages/lf20_suhe7qtm.json"
            background="transparent"
            speed="1"
            style={{ width: "150px", height: "auto" }}
            loop
            autoplay
          ></lottie-player>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <lottie-player
              src="https://assets5.lottiefiles.com/packages/lf20_ddxv3rxw.json"
              background="transparent"
              speed="1"
              style={{ width: "150px", height: "auto" }}
              loop
              autoplay
            ></lottie-player>
            <h1 className="text-lg font-semibold">
              {serverError.message || "No message"}
            </h1>
          </div>
        )}
      </h1>
    );
  }
  return (
    <div className="w-full flex items-center justify-center bg-slate-100">
      <div className="bg-white h-auto rounded w-full p-5 m-5 pt-2 text-center text-md text-gray-500 font-normal shadow-lg">
        <div className="flex items-center justify-between w-full h-auto py-5 flex-wrap">
          {apiData?.user.profile ? (
            <img
              src={apiData?.user.profile}
              alt="profile pic"
              className="w-40 h-40 rounded-2xl object-cover	border-4 "
            />
          ) : (
            <lottie-player
              src="https://assets7.lottiefiles.com/packages/lf20_8pL7DHZXvo.json"
              background="transparent"
              speed="1"
              style={{ width: "150px", height: "auto" }}
              loop
              autoplay
            ></lottie-player>
          )}
          <p className="pt-2 text-left text-2xl text-gray-800 font-semibold flex-1 px-10">
            {apiData?.user.name || "No Name Available"}{" "}
            <span className="px-2 ">
              {" "}
              <Link to="setprofile">
                <EditIcon
                  sx={{ fontSize: 20 }}
                  className="border rounded p-0.5 hover:bg-gray-400 hover:text-gray-900 hover:p-0 cursor-pointer"
                />
              </Link>
            </span>{" "}
            <br />
            <span className="text-gray-400 text-sm font-normal">
              Username: {apiData?.user.username}
            </span>
          </p>
        </div>
        <p className="pt-2 text-left text-xl text-gray-500 font-semibold">
          Basic Info
        </p>
        <div className="flex items-center justify-between py-2">
          <p className="w-1/4 text-left">Name</p>
          <p className="flex-1 text-left">
            {apiData?.user.name || "No Name Available"}
          </p>
        </div>
        <hr className="my-1" />
        <div className="flex items-center justify-between py-2">
          <p className="w-1/4 text-left">Email</p>
          <p className="flex-1 text-left">{apiData?.user.email}</p>
        </div>
        <hr className="my-1" />
        <div className="flex items-center justify-between py-2">
          <p className="w-1/4 text-left">Phone No</p>
          <p className="flex-1 text-left">
            {apiData?.user.phone_no || "No Phone Number"}
          </p>
        </div>
        <hr className="my-1" />
        <div className="flex items-center justify-between py-2">
          <p className="w-1/4 text-left">Gender</p>
          <p className="flex-1 text-left">
            {apiData?.user.gender || "No Gender"}
          </p>
        </div>
        <hr className="my-1" />
        <div className="flex items-center justify-between py-2">
          <p className="w-1/4 text-left">Organization</p>
          <p className="flex-1 text-left">
            {apiData?.user.organization || "No Organization"}
          </p>
        </div>
        <hr className="my-1" />
        <div className="flex items-center justify-between py-2">
          <p className="w-1/4 text-left">Department</p>
          <p className="flex-1 text-left">
            {apiData?.user.year ||
              "No Year" - apiData?.user.department ||
              "No Department"}
          </p>
        </div>
        <hr className="my-1" />
        <div className="flex items-center justify-between py-2">
          <p className="w-1/4 text-left">PRN</p>
          <p className="flex-1 text-left">{apiData?.user.prn || "No PRN"}</p>
        </div>
        <hr className="my-1" />
        <div className="flex items-center justify-between py-2">
          <p className="w-1/4 text-left">Location</p>
          <p className="flex-1 text-left">
            {apiData?.user.location || "No Location"}
          </p>
        </div>
        <hr className="my-1" />
        <div className="flex items-center justify-between py-2">
          <p className="w-1/4 text-left">Birthday</p>
          <p className="flex-1 text-left">{apiData?.user.dob || "No DOB"}</p>
        </div>
        <hr className="my-1" />
        <div className="flex items-start justify-between py-2">
          <p className="w-1/4 text-left">Summary</p>
          <p className="max-w-5xl flex-1 text-left">
            {apiData?.user.summary || "No Summary"}
          </p>
        </div>
        <hr className="my-1" />
      </div>
    </div>
  );
};

export default ShowProfile;
