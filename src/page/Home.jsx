import React from "react";
import bgIMG from "../assets/logo/bg-img.png";
import AnalysisCards from "../component/home/AnalysisCards";
const Home = () => {

  return (
    <>
      <div className="bg-[#00A8CC] mt-16 h-[100vh]">
        <div className="relative">
          <img
            src={bgIMG}
            alt="Company Logo"
            className="w-full h-[50%] object-contain"
          />
          <div className="absolute top-[50px] left-[50px]  text-white text-xl font-bold">
            <div className="text-4xl">Goodbye Manual Effort,</div>
            <div className="text-4xl"> Hello AI-Driven Survey Solutions.</div>
            <div className="text-2xl font-medium mt-3">
              {" "}
              Survey analysis and visualisation tool.
            </div>
          </div>
        </div>
        <div className="absolute bottom-16 flex items-center w-full">
          <AnalysisCards />
        </div>
      </div>
    </>
  );
};

export default Home;
