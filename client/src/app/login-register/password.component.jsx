import { useFormik } from "formik";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { verifyPassword } from "../shared/helpers/helper";
import { passwordValidate } from "../shared/helpers/validate";
import useFetch from "../shared/hooks/fetch.hook";
import { useAuthStore } from "./../store/store";

const Password = () => {
  const navigate = useNavigate();
  const { username } = useAuthStore((state) => state.auth);
  const [{ isLoading, apiData, serverError, status }] = useFetch(
    `/user/${username}`
  );
  console.log("apiData from password component : ",apiData?.user.username);
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      // console.log(values);
      let loginPromise = verifyPassword({
        username,
        password: values.password,
      });
      toast.promise(loginPromise, {
        loading: "Checking...", 
        success: <p className="font-normal">Login Successfully...!</p>,
        error: <p className="font-normal">Password not match!</p>,
      });
      loginPromise.then((res) => {
        let { token } = res.data;
        localStorage.setItem("token", token);
        navigate("/myprofile");
      });
    },
  });
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
    <div className="bg-gray-100 rounded-lg py-12 px-4 lg:px-20">
      <Toaster position="top-right" reverseOrder={false}></Toaster>
      <div className="text-center text-sm text-gray-500 font-light flex flex-row flex-wrap items-center justify-between">
        <lottie-player
          src="https://assets5.lottiefiles.com/packages/lf20_eg88dyk9.json"
          background="transparent"
          speed="1"
          style={{ width: "150px", height: "auto" }}
          loop
          autoplay
        ></lottie-player>
        <p className="py-2 text-2xl font-semibold ">
          {" "}
          Password <br />{" "}
          <span className="text-sm font-normal">
            Enter password to continue
          </span>
        </p>
      </div>
      <form className="mt-6" onSubmit={formik.handleSubmit}>
        <div className="relative">
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
            Sign In
          </button>
        </div>
        <p className="pt-2 text-center text-sm text-gray-500 font-light">
          Forget Password?{" "}
          <Link
            to="/login-register/recovery"
            className="text-center text-sm font-light text-red-500"
          >
            {" "}
            Recover Now{" "}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Password;
