import React from "react";
import { NavLink } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <NavLink to="signup">New Account</NavLink><br />
      <NavLink to="/">SignIn</NavLink>
    </div>
  );
};

export default Login;
