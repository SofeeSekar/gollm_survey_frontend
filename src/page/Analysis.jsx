import React, { useEffect, useState } from "react";
import Sidebar from "../component/sidebar/Sidebar";
import { Amazon, Retouch, Summary, Table } from "../assets";
import AnalysisColumns from "../component/home/QuantitativeAnalysis/AnalysisColumn";
import GroupingColumns from "../component/home/QuantitativeAnalysis/GroupingColumns";
import FinalColumn from "../component/home/QuantitativeAnalysis/FinalColumn";

const Analysis = () => {
  const [currentAnalysis, setCurrentAnalysis] = useState(
    "Quantitative Analysis"
  );
  const [quantitativeColumns, setQuantitativeColumns] = useState({
    page: "analysis",
    data: [],
  });
  const analysisList = [
    { title: "Quantitative Analysis", icon: Amazon },
    { title: "Cluster Analysis", icon: Retouch },
    { title: "Introduction Analysis", icon: Summary },
    { title: "Sentiment Analysis", icon: Table },
  ];

  useEffect(() => {
    const path = window.location.pathname?.split("-")[0]?.substring(1) ?? "";
    const currentStage = analysisList.find(({title}) => path.includes(title.split(" ")[0]?.toLocaleLowerCase()));
    if(currentStage){
      setCurrentAnalysis(currentStage?.title);
    }
  }, []);  

  const switchComponents = () => {
    switch (quantitativeColumns?.page) {
      case "analysis":
        return <AnalysisColumns setColumns={setQuantitativeColumns} />;
      case "grouping":
        return (
          <GroupingColumns
            groupingData={quantitativeColumns?.data}
            setColumns={({ page }) =>
              setQuantitativeColumns((prev) => ({ ...prev, page }))
            }
          />
        );
      case "final":
        return <FinalColumn finalData={quantitativeColumns?.data}
         setColumns={setQuantitativeColumns} />;
      default:
        <AnalysisColumns />;
        break;
    }
  };

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
        {switchComponents()}
      </div>
    </div>
  );
};

export default Analysis;
