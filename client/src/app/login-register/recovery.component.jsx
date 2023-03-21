import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { generateOTP, verifyOTP } from "../shared/helpers/helper";
import { useAuthStore } from "./../store/store";

const Recovery = () => {
  const { username } = useAuthStore((state) => state.auth);
  const [OTP, setOTP] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    generateOTP(username)
      .then((OTP) => {
        // console.log(OTP);
        if (OTP) return toast.success("OTP has beed send to your email");
      })
      .catch((err) => {
        return toast.error("Problem while generating OTP!");
      });
  }, [username]);

  async function onSubmit(e) {
    e.preventDefault();
    try {
      let { status } = await verifyOTP({ username, code: OTP });
      if (status === 201) {
        toast.success("Verify Successfully!");
        return navigate("/login-register/reset");
      }
    } catch (error) {
      return toast.error("Wrong OTP! Check email again!");
    }
  }

  // handler of resend OTP
  function resendOTP() {
    let sentPromise = generateOTP(username);

    toast.promise(sentPromise, {
      loading: "Sending...",
      success: <p>OTP has been send to your email!</p>,
      error: <p>Could not Send it!</p>,
    });

    // sentPromise.then((OTP) => {
    //   console.log(OTP);
    // });
  }

  return (
    <div className=" ">
      <Toaster position="top-right" reverseOrder={false}></Toaster>
      <div className="p-8 lg:w-full mx-auto">
        <div className="bg-gray-100 rounded-t-lg py-12 px-4 lg:px-20">
          <div className="text-center text-sm text-gray-500 font-light flex flex-row flex-wrap items-center justify-around">
            <lottie-player
              src="https://assets7.lottiefiles.com/packages/lf20_bz5y4quo.json"
              background="transparent"
              speed="1"
              style={{ width: "150px", height: "auto" }}
              loop
              autoplay
            ></lottie-player>
            <p className="py-2 text-2xl font-semibold ">
              {" "}
              Recovery <br />{" "}
              <span className="text-sm font-normal">
                Enter OTP o recover password
              </span>
            </p>
          </div>
          <form className="mt-6" onSubmit={onSubmit}>
            <div className="relative">
              <span className="pt-4 pl-2 text-sm text-left text-gray-400">
                Enter 6 digit OTP sent to your email address{" "}
              </span>
              <input
                className="appearance-none border pl-2 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                id="otp"
                type="text"
                placeholder="Enter OTP"
                onChange={(e) => setOTP(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-center mt-8">
              <button
                type="submit"
                className="text-white py-2 px-4 rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
              >
                Recover
              </button>
            </div>
          </form>
          <p className="pt-2 text-center text-sm text-gray-500 font-light">
            Can't get OTP?{" "}
            <button
              onClick={resendOTP}
              className="text-center text-sm font-light text-red-500"
            >
              Resend{" "}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Recovery;
