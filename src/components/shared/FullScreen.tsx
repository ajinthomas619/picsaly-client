import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useParams, useNavigate } from "react-router-dom";

const FullScreen = () => {
  const { imgURL } = useParams<{ imgURL: string }>();
  const navigate = useNavigate();
  console.log("Rendering FullScreen Component");
  console.log("imgURL:", imgURL);

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="relative w-screen h-screen bg-black flex justify-center items-center">
      <div className="absolute top-4 left-4 text-white text-2xl cursor-pointer" onClick={handleBackClick}>
        <IoArrowBackOutline />
      </div>
      <img
        src={`http://localhost:3000/chat/${imgURL}`}
        alt="Sent Image"
        className="max-w-full max-h-full object-contain"
      />
    </div>
  );
};

export default FullScreen;
