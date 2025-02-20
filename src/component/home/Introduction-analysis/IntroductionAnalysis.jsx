import React, { useEffect, useRef, useState } from "react";
import { Amazon, Retouch, Summary, Table } from "../../../assets";
import Sidebar from "../../sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { getFullUrl } from "../../../utils";
import DownloadSection from "../../DownloadSection/DownloadSection";

const IntroductionAnalysis = () => {
  const [currentAnalysis, setCurrentAnalysis] = useState("");
  const fileName = sessionStorage.getItem("file_name") ?? "No file available";
  const [expandedPreviews, setExpandedPreviews] = useState([]);
  const navigate= useNavigate();
  const loadingRef = useRef(true);

  const [previewData, setPreviewData] = useState([]);
   useEffect(() => {
      const path = window.location.pathname?.split("-")[0]?.substring(1) ?? "";
      const currentStage = analysisList.find(({title}) => path.includes(title.split(" ")[0]?.toLocaleLowerCase()));
      if(currentStage){
        setCurrentAnalysis(currentStage?.title);
      }
    }, []);  

  useEffect(() => {
    if(loadingRef.current){
    const fetchIntroReportData = async () => {
        try {
          const response = await fetch(getFullUrl(`/generate_intro_report/?session_id=${sessionStorage.getItem("session_id")}`));
          if (!response.ok) {
            throw new Error("Failed to fetch introduction preview data.");
          }
        const data = await response.json();
        setPreviewData(data);
        } catch (fetchError) {
            console.error("Error fetching introduction preview data:", fetchError);
        } finally {
            loadingRef.current = false;
        }
      };
      loadingRef.current = false;
      fetchIntroReportData();
    }
  })

  const analysisList = [
    { title: "Quantitative Analysis", icon: Amazon },
    { title: "Cluster Analysis", icon: Retouch },
    { title: "Introduction Analysis", icon: Summary },
    { title: "Sentiment Analysis", icon: Table },
  ];

  const formatText = (text) => {
    return text
      .replace(/###\s(.*?)\n/g, "<h4>$1</h4>") // Convert '### ' to <h4> tags
      .replace(/(\d+\.)\s\*\*(.*?)\*\*/g, "<strong>$1 $2</strong>") // Bold for numbered points
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Convert '**text**' to <strong>text</strong>
      .replace(/Cluster\s*\d+\s*:/g, "") // Remove 'Cluster' and the following number
      .replace(/\n/g, "<br/>"); // Add line breaks
  };
  const togglePreviewExpansion = (column) => {
    setExpandedPreviews((prevState) =>
      prevState.includes(column)
        ? prevState.filter((item) => item !== column)
        : [...prevState, column]
    );
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
        {/* <div>Cluster Analysis</div> */}
        <div className="bg-[#E1E5EA] rounded-xl p-6 w-3/5 flex flex-col gap-4">
          <h2 className="text-[#00425F] font-bold text-[38px]">
                Introduction Analysis
          </h2>
          <div className="bg-white font-semibold w-full p-2 px-5 rounded-3xl text-[#00425F] flex items-center justify-between">
            <p className="text-sm">{fileName}</p>
            <div className="cursor-pointer border border-[#00425F] py-1 px-5 text-sm rounded-full">
              Select another file
            </div>
          </div>
          <p className="font-bold text-[#00425F] text-sm">
            AI preselected all relevant columns.
            <br /> By ticking the box you can modify which ones should be
            included in your report.
          </p>
         {loadingRef?.current || previewData?.length === 0 ?  <div className="w-full flex items-center gap-3">
              <div
                className="loading-spinner"
                style={{ marginLeft: "0px" }}
              ></div>
              <p>Loading Introduction Analysis...</p>
            </div> : <>      
          <div>
            {previewData?.intro_text &&
               <div className="intro-text">
          <h3>Introduction Overview</h3>
          <p
            dangerouslySetInnerHTML={{
              __html: formatText(previewData.intro_text),
            }}
          />
         {previewData.column_summaries &&
        Object.keys(previewData.column_summaries).map((column, index) => (
          <div key={index} className="preview-section">
            <div
              className={`cursor-pointer flex justify-between bg-white p-2 rounded-[8px] my-2 preview-box ${
                expandedPreviews.includes(column) ? "expanded" : ""
              }`}
              onClick={() => togglePreviewExpansion(column)}
            >
              <p>{column || "Unnamed Column"}</p>
              <span className="arrow-indicator">
                {expandedPreviews.includes(column) ? "▲" : "▼"}
              </span>
            </div>

            {/* Display Summary, Sample Responses, and Bubble Chart when expanded */}
            {expandedPreviews.includes(column) && (
              <div className="detailed-preview" style={{maxHeight:"max-content",opacity:"50"}}>
                <p
                  dangerouslySetInnerHTML={{
                    __html: formatText(previewData.column_summaries[column]),
                  }}
                />

                {/* Display sample responses if available */}
                {previewData.sample_responses &&
                  previewData.sample_responses[column] && (
                    <div className="sample-responses">
                      <h4>Sample Responses:</h4>
                      <ul>
                        {previewData.sample_responses[column]
                          .slice(0, 5) // Limit to 5 responses
                          .map((response, i) => (
                            <li key={i}>
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: formatText(response),
                                }}
                              />
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}

                {/* Display Bubble Chart if available */}
                {previewData.visualization_intro &&
                  previewData.visualization_intro[column] && (
                    <div className="bubble-chart-preview">
                      <h4>Keyword Bubble Chart:</h4>
                      <img
                        src={previewData.visualization_intro[column]}
                        alt={`${column} Keyword Bubble Chart`}
                        className="bubble-chart-image"
                      />
                    </div>
                  )}
              </div>
            )}
          </div>
        ))}
        </div>}
          </div>
          <div className="w-full text-center">
            {/* <button
              className="w-fit cursor-pointer  text-[#00425F] border border-[#00425F] py-1 px-5 text-sm rounded-full mr-2"
            >
              Download Introduction Report
            </button> */}
              <DownloadSection className="w-fit m-2 cursor-pointer  text-[#00425F] border border-[#00425F] py-1 px-5 text-sm rounded-full mr-2"
            downloadEndpoint={getFullUrl(
              `/download_intro_report/?session_id=${sessionStorage.getItem("session_id")}`
            )}
            fileType="intro_report"
            buttonText={"Download Introduction Report"}
          />
            <button
              onClick={() => navigate("/sentiment-analysis")}
              className="w-fit cursor-pointer bg-[#00425F] text-white border border-[#00425F] py-1 px-5 text-sm rounded-full"
            >
              Proceed to Sentiment Analysis
            </button>
          </div> 
          </>}
          {/* <Popup popupContent={reason} closePopup={() => setReason("")} /> */}
        </div>
      </div>
    </div>
  );
};

export default IntroductionAnalysis;
