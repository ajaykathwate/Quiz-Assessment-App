import { React, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import axiosInstance from "./../services/axios-instance";
import useCommunityStore from "./../store/community.store";


const CommunityModel = ({ visible, onClose }) => {
  const [communityName, setCommunityName] = useState("");
  const [communityPassword, setCommunityPassword] = useState("");
  const addCommunity = useCommunityStore((state) => state.addCommunity);



  const handleOnClose = (e) => {
    if (e.target.id === "container") {
      onClose();
    }
  };

  if (!visible) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("community", {
        communityName,
        communityPassword,
      });
      console.log(res.data.newCommunity);
      addCommunity(res.data);
      onClose();
    } catch (err) {
      console.log(err);
    }
    setCommunityName("");
    setCommunityPassword("");
  };

  return (
    <div
      id="container"
      onClick={handleOnClose}
      className="fixed inset-0 bg-black bg-opacity-5 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="w-full max-w-sm h-80">
        <form
          action=""
          onSubmit={handleSubmit}
          className="bg-gray-900 shadow-md rounded px-4 py-4 w-90   h-auto"
        >
          <div className="flex items-center justify-end text-white">
            <AiOutlineClose
              size={20}
              className="cursor-pointer"
              onClick={() => onClose()}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-500 text-sm font-bold mb-2"
              htmlFor="communityname"
            >
              Community Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="communityname"
              value={communityName}
              type="text"
              placeholder="Community Name"
              required
              onChange={(e) => {
                setCommunityName(e.target.value);
              }}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-500 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              required
              value={communityPassword}
              onChange={(e) => {
                setCommunityPassword(e.target.value);
              }}
            />
          </div>
          <div className="flex items-center justify-start">
            <button
              className="bg-blue-500 hover:bg-blue-700 flex items-center justify-center text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              id="createbtn"
            >
              Create
            </button>
          </div>
        </form>
          
      </div>
    </div>
  );
};

export default CommunityModel;
