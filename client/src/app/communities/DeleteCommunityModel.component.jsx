import { React, useState } from "react";
import axiosInstance from "../services/axios-instance";
import useCommunityStore from "./../store/community.store";
import { AiOutlineClose } from "react-icons/ai";

const DeleteCommunityModel = ({ visible, onClose, id }) => {
  const [enteredPassword, setEnteredPassword] = useState("");
  const deleteCommunity = useCommunityStore((state) => state.deleteCommunity);
  const setCommunity = useCommunityStore((state) => state.setCommunity);

  const handleOnClose = (e) => {
    if (e.target.id === "container") {
      onClose();
    }
  };
  if (!visible) {
    return null;
  }

  const handleDelete = async () => {
    try {
      const res = await axiosInstance.get(`community/${id}`);
      const communityPassword = res.data.communityPassword;
      if (communityPassword === enteredPassword) {
        const res1 = await axiosInstance.delete(`community/${id}`);
        console.log(res1);
        deleteCommunity(id);
        setCommunity(res1);
        onClose();
      } else {
        alert("Password not matched!");
      }
      onClose();
      setEnteredPassword("");
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div
      id="container"
      onClick={handleOnClose}
      className="fixed inset-0 bg-opacity-5 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="w-full max-w-sm bg-gray-900 shadow-md rounded px-4 py-4 w-90 h-auto">
        <div className="flex items-center justify-end text-white">
          <AiOutlineClose
            size={20}
            className="cursor-pointer"
            onClick={() => onClose()}
          />
        </div>
        <div className="mb-4">
          <span className="text-center mb-5 text-gray-300">
            Enter password for deleting the community!
          </span>
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
            onChange={(e) => setEnteredPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-start">
          <button
            className="bg-blue-500 hover:bg-blue-700 flex items-center justify-center text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCommunityModel;
