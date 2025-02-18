import React, { useState } from "react";
import { Amazon, Retouch, Summary, Table } from "../../../assets";
import Sidebar from "../../sidebar/Sidebar";

const ClusterAnalysis = () => {
  const [currentAnalysis, setCurrentAnalysis] = useState("Cluster Analysis");

  const analysisList = [
    { title: "Quantitative Analysis", icon: Amazon },
    { title: "Cluster Analysis", icon: Retouch },
    { title: "Introduction Analysis", icon: Summary },
    { title: "Sentiment Analysis", icon: Table },
  ];
  return (
    <div className="bg-[#00425F] h-full w-full flex justify-between min-h-[92vh]">
      <Sidebar className={"fixed top-16"}>
        <div
          className={
            "bg-[#00425F] flex flex-col justify-evenly gap-8 p-10 select-none"
          }
          style={{ flexBasis: "15%" }}
        >
          {analysisList.map(({ title, icon }, ind) => {
            return (
              <>
                <div
                  className={`relative flex flex-col items-center gap-2 py-6 px-12 h-[130px] bg-[#F7F9FB] text-[#55575E] rounded-[24px] ${
                    currentAnalysis == title
                      ? "bg-[#FFB800] text-[#00425F]"
                      : ind < 0
                      ? "!bg-[#00A8CC] !text-white"
                      : ""
                  }`}
                  key={ind}
                >
                  <img
                    src={icon}
                    height={40}
                    width={40}
                    className={`saturate-0 brightness-100`}
                    style={{
                      filter:
                        currentAnalysis == title
                          ? ""
                          : ind < 0
                          ? "brightness(0) invert(1)"
                          : "",
                    }}
                  />
                  <p className="w-[100px] text-center text-sm font-bold">
                    {title}
                  </p>
                  <span className="absolute -top-4 -left-4 rounded-full py-2 px-4 text-lg font-bold bg-[#F0F7FF] text-[#55575E]">
                    {ind + 1}
                  </span>
                </div>
                <span></span>
              </>
            );
          })}
        </div>
      </Sidebar>
      <div
        className="ml-80 mt-20 bg-white rounded-tl-xl p-8"
        style={{ flexBasis: "85%" }}
      >
        <div>Cluster Analysis</div>
      </div>
    </div>
  );
};

export default ClusterAnalysis;
