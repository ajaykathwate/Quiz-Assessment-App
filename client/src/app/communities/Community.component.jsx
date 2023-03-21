import { React, useEffect, useState } from "react";
import { AiFillDelete, AiOutlineArrowRight } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import CommunityModel from "./CommunityModel.component";
import DeleteCommunityModel from "./DeleteCommunityModel.component";
import { useNavigate } from 'react-router-dom';



const Community = () => {
  const [communities, setCommunities] = useState(null);
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  const [showNewCommunityModel, setShowNewCommunityModel] = useState(false);
  const [showDeleteCommunityModel, setShowDeleteCommunityModel] =
    useState(false);
  const [communityId, setCommunityId] = useState();
  const navigate = useNavigate();


  useEffect(() => {
    fetch("http://localhost:3300/api/edutech/community")
      .then((res) => res.json())
      .then((data) => {
        console.log("useEffect renders: " + data.communities);
        setCommunities(data.communities);
      });
  }, [showNewCommunityModel, setCommunities]);

  const handleOnClose = () => setShowNewCommunityModel(false);
  const handleDeleteOnClose = () => {
    setShowDeleteCommunityModel(false);
  };

  return (
    <div className="bg-white font-Poppins flex  h-screen items-center justify-center">
      <div className="w-72 h-80 font-medium">
        <div
          className="bg-gray-900 text-white w-72 p-2  items-center  rounded flex justify-between cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          {selected
            ? selected?.length > 25
              ? selected?.substring(0, 25) + "..."
              : selected
            : "Select Community"}
          <BiChevronDown className={`${open && "rotate-180"}`} size={20} />
        </div>
        <ul className="bg-gray-900 mt-1 rounded max-h-80 ">
          <li
            className="flex justify-center items-center p-1 text-white cursor-pointer  hover:bg-sky-600 rounded"
            onClick={() => {
              setShowNewCommunityModel(true);
              setOpen(false);
            }}
          >
            <span className="font-bold text-xl">+</span> Add New Community
          </li>
          <ul
            className={`overflow-y-auto h-auto  scrollbar-thumb-gray-400 scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-rounded 
            ${open ? "max-h-60" : "max-h-0"}`}
          >
            {communities?.map((community) => (
              <li
                className="p-2 text-sm flex items-center justify-between text-white rounded  hover:bg-sky-600 hover:text-white cursor-pointer"
                key={community._id}
              >
                <p
                  className="flex-1"
                  onClick={() => {
                    if (
                      community?.communityName?.toLowerCase() !==
                      selected.toLowerCase()
                    ) {
                      setSelected(community?.communityName);
                      setOpen(false);
                      setCommunityId(community._id);
                    }
                  }}
                >
                  {community.communityName}
                </p>
                <div
                  className="w-6 h-6 bg-bkack flex items-center justify-center hover:text-gray-900 hover:rounded-full cursor-pointer"
                  onClick={() => {
                    setCommunityId(community._id);
                    setShowDeleteCommunityModel(true);
                  }}
                >
                  <AiFillDelete size={15} />
                </div>
              </li>
            ))}
          </ul>
        </ul>
        <br />
        {selected && !open ? (
          <div className="flex items-center justify-center">
            <div
              className="bg-blue-500 hover:bg-blue-700 hover:text-white flex flex-row p-2 justify-center items-center gap-1 text-white rounded hover:cursor-pointer"
              id={communityId}
              onClick={() => {
                console.log(communityId);
                navigate(`/${communityId}`);
              }}
            >
              Enter
              <AiOutlineArrowRight size={15} />
            </div>
          </div>
        ) : null}
        <CommunityModel
          visible={showNewCommunityModel}
          onClose={handleOnClose}
        />
        <DeleteCommunityModel
          visible={showDeleteCommunityModel}
          onClose={handleDeleteOnClose}
          id={communityId}
        />
      </div>
    </div>
  );
};

export default Community;
