import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import convertToBase64 from "../shared/helpers/convert";
import { updateUser } from "../shared/helpers/helper";
import { profileValidation } from "../shared/helpers/validate-profile";
import useFetch from "../shared/hooks/fetch.hook";

const EditProfile = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [{ isLoading, apiData, serverError, status }] = useFetch();

  const formik = useFormik({
    initialValues: {
      name: apiData?.user.name || "",
      phone_no: "",
      gender: "",
      organization: "",
      department: "",
      year: "",
      prn: "",
      location: "",
      dob: "",
      summary: "",
    },
    enableReinitialize: true,
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
      values = await Object.assign(values, {
        profile: file || apiData?.user.profile,
      });

      let updatePromise = updateUser(values);
      toast.promise(updatePromise, {
        loading: "Updating",
        success: "Updated Successfully...!",
        error: "Could not update!",
      });
      navigate("/myprofile");
    },
  });

  //   file upload
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  const handleRadioButtonsGender = (e) =>
    (formik.values.gender = e.target.value);
  const handleRadioButtonsYear = (e) => (formik.values.year = e.target.value);

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
    <form
      className="w-full flex items-center justify-center"
      onSubmit={formik.handleSubmit}
    >
      <Toaster position="top-right" reverseOrder={false}></Toaster>
      <div className="bg-white h-auto rounded w-full p-5 m-5 pt-2 text-center text-md text-gray-800 font-normal shadow-lg">
        <div className="flex items-center justify-end">
          <Link to="/myprofile">
            <CloseIcon sx={{ fontSize: 30 }} className="p-0.5 cursor-pointer" />
          </Link>
        </div>
        <div className="flex items-center justify-between w-full h-auto pb-5 flex-wrap">
          <label htmlFor="profile">
            {file || apiData?.user.profile ? (
              <img
                src={apiData?.user.profile || file}
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
            <input
              type="file"
              name="profile"
              id="profile"
              className="hidden"
              onChange={onUpload}
            />
          </label>
          <p className="pt-2 text-left text-2xl text-gray-700 font-semibold flex-1 px-10">
            {apiData?.user.name || "No Name Available"} <br />
            <span className="text-gray-400 text-sm font-normal">
              Username: {apiData?.user.username || ""}
            </span>
          </p>
        </div>
        <p className="pt-2 text-left text-xl text-gray-500 font-semibold">
          Basic Info
        </p>
        <div className="flex items-center justify-between py-2">
          <p className="w-1/4 text-left">Name</p>
          <div className="flex-1 text-left">
            <input
              required
              className="appearance-none border pl-2 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-2 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Name"
              {...formik.getFieldProps("name")}
            />
          </div>
        </div>
        {/* <hr className="my-1" />
        <div className="flex items-center justify-between py-2">
          <p className="w-1/4 text-left">Username</p>
          <div className="flex-1 text-left">
            <input
              required
              className="appearance-none border pl-2 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-2 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              {...formik.getFieldProps("username")}
            />
          </div>
        </div>
        <hr className="my-1" />
        <div className="flex items-center justify-between py-2">
          <p className="w-1/4 text-left">Email</p>
          <div className="flex-1 text-left">
            <input
              required
              className="appearance-none border pl-2 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-2 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
              id="email"
              type="email"
              placeholder="demo@gmail.com"
              {...formik.getFieldProps("email")}
            />
          </div>
        </div> */}
        <hr className="my-1" />
        <div className="flex items-center justify-between py-2">
          <p className="w-1/4 text-left">Phone No</p>
          <div className="flex-1 text-left">
            <input
              required
              className="appearance-none border pl-2 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-2 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
              id="phone_no"
              type="text"
              placeholder="Phone Number"
              {...formik.getFieldProps("phone_no")}
            />
          </div>
        </div>
        <hr className="my-1" />
        <div className="flex items-center justify-between py-2">
          <p className="w-1/4 text-left">Gender</p>
          <div className=" flex flex-1 text-left flex-row items-center gap-4">
            <div className="flex items-center">
              <input
                id="male"
                type="radio"
                value="Male"
                name="gender"
                className="w-auto h-auto text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) => handleRadioButtonsGender(e)}
              />
              <label
                htmlFor="male"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Male
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="female"
                type="radio"
                value="Female"
                name="gender"
                className="w-auto h-auto text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) => handleRadioButtonsGender(e)}
              />
              <label
                htmlFor="female"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Female
              </label>
            </div>
          </div>
        </div>

        <hr className="my-1" />
        <div className="flex items-center justify-between py-2">
          <p className="w-1/4 text-left">Organization</p>
          <div className="flex-1 text-left">
            <input
              className="appearance-none border pl-2 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-2 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
              id="organization"
              type="text"
              placeholder="Organization"
              {...formik.getFieldProps("organization")}
            />
          </div>
        </div>
        <hr className="my-1" />
        <div className="flex items-center justify-between py-2">
          <p className="w-1/4 text-left">Department</p>
          <div className="flex-1 text-left">
            <input
              className="appearance-none border pl-2 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-2 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
              id="department"
              type="text"
              placeholder="Department"
              {...formik.getFieldProps("department")}
            />
          </div>
        </div>
        <hr className="my-1" />
        <div className={`flex items-center justify-between py-2`}>
          <p className="w-1/4 text-left">Year</p>
          <div className=" flex flex-1 text-left flex-row items-center gap-4">
            <div className="flex items-center">
              <input
                id="fe"
                type="radio"
                value="FE"
                name="year"
                onChange={(e) => handleRadioButtonsYear(e)}
                className="w-auto h-auto text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="fe"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                FE
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="se"
                type="radio"
                value="SE"
                name="year"
                onChange={(e) => handleRadioButtonsYear(e)}
                className="w-auto h-auto text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="se"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                SE
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="te"
                type="radio"
                value="TE"
                onChange={(e) => handleRadioButtonsYear(e)}
                name="year"
                className="w-auto h-auto text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="te"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                TE
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="be"
                type="radio"
                value="BE"
                name="year"
                onChange={(e) => handleRadioButtonsYear(e)}
                className="w-auto h-auto text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="be"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                BE
              </label>
            </div>
          </div>
        </div>
        <hr className="my-1" />
        <div className="flex items-center justify-between py-2">
          <p className="w-1/4 text-left">PRN</p>
          <div className="flex-1 text-left">
            <input
              className="appearance-none border pl-2 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-2 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
              id="prn"
              type="text"
              placeholder="F19111016"
              {...formik.getFieldProps("prn")}
            />
          </div>
        </div>
        <hr className="my-1" />
        <div className="flex items-center justify-between py-2">
          <p className="w-1/4 text-left">Location</p>
          <div className="flex-1 text-left">
            <input
              className="appearance-none border pl-2 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-2 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
              id="location"
              type="text"
              placeholder="Location"
              {...formik.getFieldProps("location")}
            />
          </div>
        </div>
        <hr className="my-1" />
        <div className="flex items-center justify-between py-2">
          <p className="w-1/4 text-left">Birthday</p>
          <div className="flex-1 text-left">
            <input
              className="w-1/5 appearance-none border pl-2 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md py-2 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
              id="dob"
              type="date"
              {...formik.getFieldProps("dob")}
            />
          </div>
        </div>
        <hr className="my-1" />
        <div className="flex items-start justify-between py-2">
          <p className="w-1/4 text-left">Summary</p>
          <div className="max-w-5xl flex-1 text-left">
            <textarea
              className="appearance-none border pl-2 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-2 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
              id="summary"
              type="text"
              placeholder="Write your summary here..."
              {...formik.getFieldProps("summary")}
            />
          </div>
        </div>
        <hr className="my-1" />
        <div className="flex items-center justify-end pt-2">
          <button
            type="submit"
            className="text-white py-2 px-4 rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditProfile;
