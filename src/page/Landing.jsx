import React from "react";
import Header from "../component/header/Header";
import bgIMG from "../assets/logo/bg-img.png";
import AnalysisCards from "../component/home/AnalysisCards";
import { useNavigate } from "react-router-dom";
const Landing = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/upload1");
  };
  return (
    <>
      <div className="bg-[#F0F7FF] p-4 h-[100vh] mt-20">
        <div className="relative">
          <img
            src={bgIMG}
            alt="Company Logo"
            className="w-full h-[50%] rounded-[15px] object-contain"
          />
          <div className="absolute bottom-[50px] left-[50px]  text-white text-xl font-bold">
            <div className="text-4xl">Goodbye Manual Effort,</div>
            <div className="text-4xl"> Hello AI-Driven Survey Solutions.</div>
            <div className="text-2xl font-medium mt-3">
              {" "}
              Survey analysis and visualisation tool.
            </div>
            <div
              className="cursor-pointer bg-[#FFB800] w-fit text-[#00425F] px-8 py-2 pb-2 mt-8 text-base rounded-[50px] select-none"
              onClick={handleClick}
            >
              Create my report
            </div>
          </div>
        </div>
        <AnalysisCards />
      </div>
    </>
  );
};

export default Landing;
