import React, { useState } from "react";

const Students = () => {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="flex flex-col mx-5">
      <div className="overflow-x-auto">
        <div className="flex justify-between py-3 pl-2">
          <div className="relative max-w-xs">
            <label htmlFor="hs-table-search" className="sr-only">
              Search
            </label>
            <input
              type="text"
              name="hs-table-search"
              id="hs-table-search"
              className="block w-full p-3 pl-10 text-sm border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
              placeholder="Search..."
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <svg
                className="h-3.5 w-3.5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative">
              <button className="relative z-0 inline-flex text-sm rounded-md shadow-sm focus:ring-accent-500 focus:border-accent-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1">
                <span className="relative inline-flex items-center px-3 py-3 space-x-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md sm:py-2">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3 h-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                      />
                    </svg>
                  </div>
                  <div className="hidden sm:block">Filters</div>
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-1.5 w-full inline-block align-middle">
          <div className="overflow-hidden border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-white">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    Username
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    College
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                  >
                    Department
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                  >
                    View Profile
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                    Ajay Kathwate
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                    ajaykathwate
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                    ajaykathwate
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                    MES College of Engineering
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <p className="text-gray-500">
                      BE-Computer Science and Engineering
                    </p>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
                    <p
                      className="text-sky-400 hover:text-sky-600 cursor-pointer"
                      onClick={() => setShowProfile(!showProfile)}
                    >
                      {!showProfile ? "View" : "Close"}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            {showProfile ? (
              <div className="w-full flex items-center justify-center ">
                <div className=" h-auto rounded w-full p-5 my-5 pt-2 text-center text-md text-gray-500 font-normal shadow-lg">
                  <div className="flex items-center justify-between w-full h-auto py-5 flex-wrap">
                    <img
                      src="https://media.gettyimages.com/id/619453036/photo/bollywood-actress-kiara-advani-posing-for-a-profile-shoot-on-occasion-of-diwali-festival-at.jpg?s=612x612&w=0&k=20&c=ohNC7daMdHMc2k8g36-EKPkpALajHg-Ulfk12AQnudM="
                      alt="profile pic"
                      className="w-40 h-40 rounded-2xl object-cover	border-4 "
                    />
                    <p className="pt-2 text-left text-2xl text-gray-800 font-semibold flex-1 px-10">
                      Kiara Advani <br />
                      <span className="text-gray-400 text-sm font-normal">
                        Username: kiaraadvani
                      </span>
                    </p>
                  </div>
                  <p className="pt-2 text-left text-xl text-gray-500 font-semibold">
                    Basic Info
                  </p>
                  <div className="flex items-center justify-between py-2">
                    <p className="w-1/4 text-left">Name</p>
                    <p className="flex-1 text-left">Ajay Kathwate</p>
                  </div>
                  <hr className="my-1" />
                  <div className="flex items-center justify-between py-2">
                    <p className="w-1/4 text-left">Email</p>
                    <p className="flex-1 text-left">ajaykathwate13@gmail.com</p>
                  </div>
                  <hr className="my-1" />
                  <div className="flex items-center justify-between py-2">
                    <p className="w-1/4 text-left">Phone No</p>
                    <p className="flex-1 text-left">+91 9503200881</p>
                  </div>
                  <hr className="my-1" />
                  <div className="flex items-center justify-between py-2">
                    <p className="w-1/4 text-left">Gender</p>
                    <p className="flex-1 text-left">Male</p>
                  </div>
                  <hr className="my-1" />
                  <div className="flex items-center justify-between py-2">
                    <p className="w-1/4 text-left">Organization</p>
                    <p className="flex-1 text-left">
                      MES College Of Engineering
                    </p>
                  </div>
                  <hr className="my-1" />
                  <div className="flex items-center justify-between py-2">
                    <p className="w-1/4 text-left">Department</p>
                    <p className="flex-1 text-left">
                      BE - Computer Science and Engineering
                    </p>
                  </div>
                  <hr className="my-1" />
                  <div className="flex items-center justify-between py-2">
                    <p className="w-1/4 text-left">PRN</p>
                    <p className="flex-1 text-left">F19111016</p>
                  </div>
                  <hr className="my-1" />
                  <div className="flex items-center justify-between py-2">
                    <p className="w-1/4 text-left">Location</p>
                    <p className="flex-1 text-left">Pune, Maharashtra, India</p>
                  </div>
                  <hr className="my-1" />
                  <div className="flex items-center justify-between py-2">
                    <p className="w-1/4 text-left">Birthday</p>
                    <p className="flex-1 text-left">13/01/2001</p>
                  </div>
                  <hr className="my-1" />
                  <div className="flex items-start justify-between py-2">
                    <p className="w-1/4 text-left">Summary</p>
                    <p className="max-w-5xl flex-1 text-left">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Obcaecati, dignissimos. Possimus eveniet molestiae magni
                      dicta veritatis laudantium omnis repudiandae eaque fugit
                      nemo recusandae tempore ipsa temporibus culpa sequi
                      pariatur aspernatur animi at earum quidem sed unde, cum
                      laboriosam harum. Provident rem nesciunt sint illum?
                      Architecto consequuntur laborum at nam nihil Lorem30
                    </p>
                  </div>
                  <hr className="my-1" />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;
