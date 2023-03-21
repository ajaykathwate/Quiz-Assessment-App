import { useFormik } from "formik";
import React from "react";
import { toast, Toaster } from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { resetPassword } from "../shared/helpers/helper";
import { resetPasswordValidation } from "../shared/helpers/validate";
import useFetch from "../shared/hooks/fetch.hook";
import { useAuthStore } from "../store/store";

const Reset = () => {
  const { username } = useAuthStore((state) => state.auth);
  const navigate = useNavigate();
  const [{ isLoading, apiData, status, serverError }] =
    useFetch("createResetSession");

  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_pwd: "",
    },
    validate: resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      // console.log(values);
      let resetPromise = resetPassword({ username, password: values.password });
      toast.promise(resetPromise, {
        loading: "Resetting...",
        success: <p>Reset Successfully...!</p>,
        error: <p>Coul not reset!</p>,
      });
      resetPromise.then(function () {
        navigate("/login-register/password");
      });
    },
  });

  if (isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>;
  if (status && status !== 201)
    return <Navigate to={"/password"} replace={true}></Navigate>;
  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;

  return (
    <div className="bg-gray-100 rounded-lg py-12 px-4 lg:px-20">
      <Toaster position="top-right" reverseOrder={false}></Toaster>
      <div className="text-center text-sm text-gray-500 font-light flex flex-row flex-wrap items-center justify-around">
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
          Reset <br />{" "}
          <span className="text-sm font-normal">Enter new password</span>
        </p>
      </div>
      <form className="mt-6" onSubmit={formik.handleSubmit}>
        <div className="relative flex gap-1">
          <input
            className="appearance-none border pl-2 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
            id="password"
            type="text"
            placeholder="Password"
            {...formik.getFieldProps("password")}
          />
          <input
            className="appearance-none border pl-2 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
            id="newpassword"
            type="text"
            placeholder="Confirm New Password"
            {...formik.getFieldProps("confirm_pwd")}
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

export default Reset;
