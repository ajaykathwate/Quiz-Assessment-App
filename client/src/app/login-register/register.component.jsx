import { useFormik } from "formik";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import convertToBase64 from "../shared/helpers/convert";
import { registerUser } from "../shared/helpers/helper";
import { registerValidation } from "../shared/helpers/validate";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [file, setFile] = useState();
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file });
      console.log(values);
      let registerPromise = registerUser(values);
      toast.promise(registerPromise, {
        loading: "Registering...",
        success: <p>Registered Successfully...!</p>,
        error: <p>Could not Register.</p>,
      });
      registerPromise.then(() => navigate("/login-register"));
    },
  });

  //   file upload
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  return (
    <div className="">
      <Toaster position="top-right" reverseOrder={false}></Toaster>
      <div className="p-8 lg:w-full mx-auto">
        <div className="bg-gray-100 rounded-t-lg py-12 px-4 lg:px-20">
          <div className="text-center text-sm text-gray-500 font-light flex flex-row flex-wrap items-center justify-between">
            <label htmlFor="profile">
              {!file ? (
                <lottie-player
                  src="https://assets7.lottiefiles.com/packages/lf20_8pL7DHZXvo.json"
                  background="transparent"
                  speed="1"
                  style={{ width: "150px", height: "auto" }}
                  loop
                  autoplay
                ></lottie-player>
              ) : (
                <img
                  src={file}
                  alt="alternative profile"
                  className="w-20 h-20 rounded-full mr-12"
                />
              )}
              <input
                type="file"
                name="profile"
                id="profile"
                className="hidden"
                onChange={onUpload}
              />
            </label>
            <p className="py-2 text-2xl font-semibold ">
              {" "}
              Register <br />{" "}
              <span className="text-sm font-normal">Happy to join you!</span>
            </p>
          </div>
          <form className="mt-6" onSubmit={formik.handleSubmit}>
            <div className="relative flex flex-col gap-2">
              <input
                className="appearance-none border pl-2 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                {...formik.getFieldProps("email")}
              />
              <input
                className="appearance-none border pl-2 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
                {...formik.getFieldProps("username")}
              />
              <input
                className="appearance-none border pl-2 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                {...formik.getFieldProps("password")}
              />
            </div>
            <div className="flex items-center justify-center mt-8">
              <button
                type="submit"
                className="text-white py-2 px-4 rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
              >
                Let's Go
              </button>
            </div>
            <p className="pt-2 text-center text-sm text-gray-500 font-light">
              Already Register?{" "}
              <Link
                to="/login-register"
                className="text-center text-sm font-light text-red-500"
              >
                {" "}
                Login Now{" "}
              </Link>
            </p>
          </form>
        </div>
        <div className="bg-white rounded-b-lg p-4">
          <p className="text-center text-sm text-gray-400 font-light">
            Register with
          </p>
          <div className="flex items-center justify-center space-x-4 mt-3">
            <button className="flex items-center py-2 px-4 text-sm uppercase rounded bg-white hover:bg-gray-100 text-indigo-500 border border-transparent hover:border-transparent hover:text-gray-700 shadow-md hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mr-3"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#fbc02d"
                  d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                />
                <path
                  fill="#e53935"
                  d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
                />
                <path
                  fill="#4caf50"
                  d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                />
                <path
                  fill="#1565c0"
                  d="M43.611 20.083 43.595 20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                />
              </svg>
              Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
