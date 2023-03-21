import React from "react";

// not in use
// import LiveClass from "./shared/components/LiveClass";
// import Message from "./shared/components/Message";
// import NoticeBoard from "./shared/components/NoticeBoard";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import EduTech from "./edutech/edutech.component";
import LoginRegisterPage from "./login-register/login-register-page.component";
import Password from "./login-register/password.component";
import Recovery from "./login-register/recovery.component";
import Register from "./login-register/register.component";
import Reset from "./login-register/reset.component";
import Username from "./login-register/username.component";
import { AuthorizeUser, ProtectRoute } from "./middleware/auth";
import EditProfile from "./profile/edit-profile.component";
import Profile from "./profile/profile.component";
import ShowProfile from "./profile/show-profile.component";
import Exam from "./shared/components/Exam";
import PageNotFound from "./shared/components/page-not-found.component";
import Results from "./shared/components/Results";
import Signout from "./shared/components/Signout";
import Students from "./students/students.component";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EduTech />}>
          <Route path="/login-register" element={<LoginRegisterPage />}>
            <Route path="" element={<Username />} />
            <Route path="/login-register/register" element={<Register />} />
            <Route
              path="/login-register/password"
              element={
                <ProtectRoute>
                  {" "}
                  <Password />
                </ProtectRoute>
              }
            />
            <Route path="/login-register/reset" element={<Reset />} />
            <Route path="/login-register/recovery" element={<Recovery />} />
            <Route path="/login-register/signout" element={<Signout />} />
          </Route>

          {/* app routes */}
          <Route
            index
            element={
              <AuthorizeUser>
                {" "}
                <Exam />
              </AuthorizeUser>
            }
          />
          <Route
            path="/exams"
            element={
              <AuthorizeUser>
                {" "}
                <Exam />
              </AuthorizeUser>
            }
          />
          <Route
            path="/results"
            element={
              <AuthorizeUser>
                {" "}
                <Results />
              </AuthorizeUser>
            }
          />
          <Route
            path="/students"
            element={
              <AuthorizeUser>
                {" "}
                <Students />
              </AuthorizeUser>
            }
          />
          <Route
            path="/myprofile"
            element={
              <AuthorizeUser>
                {" "}
                <ShowProfile />
              </AuthorizeUser>
            }
          />
          <Route
            path="/myprofile/setprofile"
            element={
              <AuthorizeUser>
                {" "}
                <EditProfile />
              </AuthorizeUser>
            }
          />
          <Route path="/myprofile" element={<Profile />} />

          <Route path="*" element={<PageNotFound />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
