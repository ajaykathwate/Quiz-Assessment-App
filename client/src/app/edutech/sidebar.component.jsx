import { React, useState } from "react";

// not in use
// import MessageIcon from "@mui/icons-material/Message";
// import PendingActionsIcon from "@mui/icons-material/PendingActions";
// import StreamIcon from "@mui/icons-material/Stream";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import GroupsIcon from "@mui/icons-material/Groups";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import QuizIcon from "@mui/icons-material/Quiz";
import SchoolIcon from "@mui/icons-material/School";
import TaskIcon from "@mui/icons-material/Task";
import { NavLink } from "react-router-dom";

const Sidebar = ({ open, setOpen }) => {
  const logoutUser = () => {
    localStorage.removeItem("token");
  };

  const whenActive = `text-lime-500 border-l border-[#0e927a] hover:text-emerald-400   flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-sm items-center gap-x-4 
                  mt-2`;

  const whenNotActive = `text-gray-600 flex hover:text-emerald-400 rounded-md p-2 cursor-pointer hover:bg-light-white text-sm items-center gap-x-4 
                  mt-2`;
  return (
    <div className="flex flex-wrap flex-col">
      <ArrowBackIcon
        className={`absolute cursor-pointer -right-3 top-9 w-7 border-white
          border-2 rounded-full bg-white text-gray-900  ${
            !open && "rotate-180"
          }`}
        onClick={() => setOpen(!open)}
      />
      <div className="flex gap-x-4 items-center">
        <NavLink to="/">
          <SchoolIcon
            fontSize="large"
            className={`text-black cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
        </NavLink>
        <h1
          className={`text-black font-semibold origin-left text-xl duration-200 ${
            !open && "scale-0"
          }`}
        >
          EduTech
        </h1>
      </div>
      <ul className="pt-2">
        {/* <NavLink to="dashboard">
          {({ isActive }) => (
            <p className={`${isActive ? whenActive : whenNotActive}`}>
              <DashboardIcon />
              <span
                className={`${!open && "hidden"} origin-left duration-200 `}
              >
                Dashboard
              </span>
            </p>
          )}
        </NavLink> */}
        <NavLink to="exams">
          {({ isActive }) => (
            <p className={`${isActive ? whenActive : whenNotActive}`}>
              <QuizIcon />
              <span
                className={`${!open && "hidden"} origin-left duration-200 `}
              >
                Exams
              </span>
            </p>
          )}
        </NavLink>
        <NavLink to="results">
          {({ isActive }) => (
            <p className={`${isActive ? whenActive : whenNotActive}`}>
              <TaskIcon />
              <span
                className={`${!open && "hidden"} origin-left duration-200 `}
              >
                Results
              </span>
            </p>
          )}
        </NavLink>
        <NavLink to="students">
          {({ isActive }) => (
            <p className={`${isActive ? whenActive : whenNotActive}`}>
              <GroupsIcon />
              <span
                className={`${!open && "hidden"} origin-left duration-200 `}
              >
                Students
              </span>
            </p>
          )}
        </NavLink>
        {/* <NavLink to="schedule">
          {({ isActive }) => (
            <p className={`${isActive ? whenActive : whenNotActive}`}>
              <EventAvailableIcon />
              <span
                className={`${!open && "hidden"} origin-left duration-200 `}
              >
                Schedule
              </span>
            </p>
          )}
        </NavLink> */}
        {/* <NavLink to="message">
          {({ isActive }) => (
            <p className={`${isActive ? whenActive : whenNotActive}`}>
              <MessageIcon />
              <span
                className={`${!open && "hidden"} origin-left duration-200 `}
              >
                Message
              </span>
            </p>
          )}
        </NavLink> */}
        {/* <NavLink to="notice-board">
          {({ isActive }) => (
            <p className={`${isActive ? whenActive : whenNotActive}`}>
              <PendingActionsIcon />
              <span
                className={`${!open && "hidden"} origin-left duration-200 `}
              >
                Noticeboard
              </span>
            </p>
          )}
        </NavLink> */}
        {/* <NavLink to="live-class">
          {({ isActive }) => (
            <p className={`${isActive ? whenActive : whenNotActive}`}>
              <StreamIcon />
              <span
                className={`${!open && "hidden"} origin-left duration-200 `}
              >
                Live Class
              </span>
            </p>
          )}
        </NavLink> */}
        {localStorage.getItem("token") ? (
          <NavLink to="myprofile">
            {({ isActive }) => (
              <p className={`${isActive ? whenActive : whenNotActive}`}>
                <AccountCircleIcon />
                <span
                  className={`${!open && "hidden"} origin-left duration-200 `}
                >
                  Profile
                </span>
              </p>
            )}
          </NavLink>
        ) : null}
        {!localStorage.getItem("token") ? (
          <NavLink to="login-register">
            {({ isActive }) => (
              <p className={`${isActive ? whenActive : whenNotActive}`}>
                <LoginIcon />
                <span
                  className={`${!open && "hidden"} origin-left duration-200 `}
                >
                  Login
                </span>
              </p>
            )}
          </NavLink>
        ) : (
          <NavLink to="/" onClick={logoutUser}>
            {({ isActive }) => (
              <p className={`${isActive ? whenActive : whenNotActive}`}>
                <LogoutIcon />
                <span
                  className={`${!open && "hidden"} origin-left duration-200 `}
                >
                  Logout
                </span>
              </p>
            )}
          </NavLink>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
