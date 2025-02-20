import React, { useEffect, useRef, useState } from "react";
import { Amazon, Retouch, Summary, Table } from "../../../assets";
import Sidebar from "../../sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { getFullUrl } from "../../../utils";
import DownloadSection from "../../DownloadSection/DownloadSection";

const SentimentalAnalysis = () => {
  const [currentAnalysis, setCurrentAnalysis] = useState("");
  const fileName = sessionStorage.getItem("file_name") ?? "No file available";
  const [expandedPreviews, setExpandedPreviews] = useState([]);
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
        const fetchSentimentReportData = async () => {
            try {
              const response = await fetch(
                getFullUrl(`/generate_sentiment_report/?session_id=${sessionStorage.getItem('session_id')}`)
              );
              if (!response.ok) {
                throw new Error("Failed to fetch sentiment preview data.");
              }
              const data = await response.json();
              setPreviewData(data);
            } catch (fetchError) {
              console.error("Error fetching sentiment preview data:", fetchError);
            }
          };
          loadingRef.current = false;
          fetchSentimentReportData();
    }
  }, []);

 // Ensure previewData has the required structure to avoid errors
 const totalSentimentCounts = previewData.total_sentiment_counts || {};
 const sampleResponses = previewData.sample_responses || {};
 const sentimentVisuals = previewData.sentiment_visuals || {};

 // Expand/collapse preview section
 const togglePreviewExpansion = (column) => {
   setExpandedPreviews((prevState) =>
     prevState.includes(column)
       ? prevState.filter((item) => item !== column)
       : [...prevState, column]
   );
 };
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
        {/* <div>Cluster Analysis</div> */}
        <div className="bg-[#E1E5EA] rounded-xl p-6 w-3/5 flex flex-col gap-4">
          <h2 className="text-[#00425F] font-bold text-[38px]">
                Sentimental Analysis
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
          {loadingRef?.current || previewData?.length === 0 ? (
            <div className="w-full flex items-center gap-3">
              <div
                className="loading-spinner"
                style={{ marginLeft: "0px" }}
              ></div>
              <p>Loading Sentimental Analysis...</p>
            </div>
          ) :<div>
          <div>
          {previewData && Object.keys(totalSentimentCounts).map((columnName, index) => (
          <div key={index} className="preview-section">
            <div
              className={`cursor-pointer flex justify-between bg-white p-2 rounded-[8px] my-2 preview-box ${
                expandedPreviews.includes(columnName) ? "expanded" : ""
              }`}
              onClick={() => togglePreviewExpansion(columnName)}
            >
              <p>{columnName || "Unnamed Column"}</p>
              <span className="arrow-indicator">
                {expandedPreviews.includes(columnName) ? "▲" : "▼"}
              </span>
            </div>

            {expandedPreviews.includes(columnName) && (
              <div className="detailed-preview">
                <h4>Sentiment Summary</h4>
                <table className="sentiment-summary-table">
                  <thead>
                    <tr>
                      <th>Positive</th>
                      <th>Neutral</th>
                      <th>Negative</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{totalSentimentCounts[columnName]?.Positive || 0}</td>
                      <td>{totalSentimentCounts[columnName]?.Neutral || 0}</td>
                      <td>{totalSentimentCounts[columnName]?.Negative || 0}</td>
                    </tr>
                  </tbody>
                </table>

                {/* Display sample responses for each sentiment */}
                <div className="sample-responses">
                  <h4>Sample Responses</h4>
                  <div>
                    <h5>Positive</h5>
                    <ul>
                      {(sampleResponses[columnName]?.Positive || []).map(
                        (response, i) => (
                          <li key={`positive-${i}`}>{response}</li>
                        )
                      )}
                    </ul>
                  </div>
                  <div>
                    <h5>Neutral</h5>
                    <ul>
                      {(sampleResponses[columnName]?.Neutral || []).map(
                        (response, i) => (
                          <li key={`neutral-${i}`}>{response}</li>
                        )
                      )}
                    </ul>
                  </div>
                  <div>
                    <h5>Negative</h5>
                    <ul>
                      {(sampleResponses[columnName]?.Negative || []).map(
                        (response, i) => (
                          <li key={`negative-${i}`}>{response}</li>
                        )
                      )}
                    </ul>
                  </div>
                </div>

                {/* Display sentiment visualizations */}
                {sentimentVisuals[columnName] && (
                  <div className="sample-chart">
                    <img
                      src={sentimentVisuals[columnName].bar_plot}
                      alt={`Bar chart for ${columnName}`}
                    />
                    <img
                      src={sentimentVisuals[columnName].donut_chart}
                      alt={`Donut chart for ${columnName}`}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
          </div>
          <div className="w-full text-center">
          <DownloadSection className="w-fit m-2 cursor-pointer  text-[#00425F] border border-[#00425F] py-1 px-5 text-sm rounded-full mr-2"
            downloadEndpoint={getFullUrl(
              `/download_sentiment_report/?session_id=${sessionStorage.getItem("session_id")}`
            )}
            fileType="sentiment_report"
            buttonText={"Download Sentiment Analysis Report"}
          />

            <DownloadSection
            downloadEndpoint={getFullUrl(
              `/download_complete_report/?session_id=${sessionStorage.getItem("session_id")}`
            )}
            fileType="complete_report"
            buttonText={"Download Complete Analysis Report"}
          />
            {/* <button
              className="w-fit cursor-pointer  text-[#00425F] border border-[#00425F] py-1 px-5 text-sm rounded-full mr-2"
            >
              Download Sentimental Analysis Report
            </button>
            <button
              className="w-fit cursor-pointer bg-[#00425F] text-white border border-[#00425F] py-1 px-5 text-sm rounded-full"
            >
              Download Complete Analysis Report
            </button> */}

          </div>
          </div>}
          {/* <Popup popupContent={reason} closePopup={() => setReason("")} /> */}
        </div>
      </div>
    </div>
  );
};

export default SentimentalAnalysis;
