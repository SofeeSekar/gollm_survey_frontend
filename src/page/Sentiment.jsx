import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFullUrl } from "../utils";
import DownloadSection from "../component/DownloadSection/DownloadSection";

const Sentiment = () => {
  const [currentAnalysis, setCurrentAnalysis] = useState("");
  const fileName = sessionStorage.getItem("file_name") ?? "No file available";
  const [expandedPreviews, setExpandedPreviews] = useState([]);
  const loadingRef = useRef(true);
  const navigate = useNavigate();
  const [previewData, setPreviewData] = useState([]);
  useEffect(() => {
    const path = window.location.pathname?.split("-")[0]?.substring(1) ?? "";
    //   const currentStage = analysisList.find(({title}) => path.includes(title.split(" ")[0]?.toLocaleLowerCase()));

    //   if(currentStage){
    //     setCurrentAnalysis(currentStage?.title);
    //   }
  }, []);

  useEffect(() => {
    if (loadingRef.current) {
      const fetchSentimentReportData = async () => {
        try {
          const response = await fetch(
            getFullUrl(
              `/generate_sentiment_report/?session_id=${sessionStorage.getItem(
                "session_id"
              )}`
            )
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

  return (
    <div className="bg-[#00425F] h-full w-full flex justify-between min-h-[92vh]">
      <div className="mt-20 bg-white rounded-tl-xl p-8 flex justify-center w-full">
        {/* <div>Cluster Analysis</div> */}
        <div className="bg-[#E1E5EA] rounded-xl p-6 w-3/5 flex flex-col gap-4 h-fit">
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
          ) : (
            <div>
              <div>
                {previewData &&
                  Object.keys(totalSentimentCounts).map((columnName, index) => (
                    <div key={index} className="preview-section">
                      <div
                        className={`cursor-pointer flex justify-between bg-white p-2 rounded-[8px] my-2 preview-box ${
                          expandedPreviews.includes(columnName)
                            ? "expanded"
                            : ""
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
                                <td>
                                  {totalSentimentCounts[columnName]?.Positive ||
                                    0}
                                </td>
                                <td>
                                  {totalSentimentCounts[columnName]?.Neutral ||
                                    0}
                                </td>
                                <td>
                                  {totalSentimentCounts[columnName]?.Negative ||
                                    0}
                                </td>
                              </tr>
                            </tbody>
                          </table>

                          {/* Display sample responses for each sentiment */}
                          <div className="sample-responses">
                            <h4>Sample Responses</h4>
                            <div>
                              <h5>Positive</h5>
                              <ul>
                                {(
                                  sampleResponses[columnName]?.Positive || []
                                ).map((response, i) => (
                                  <li key={`positive-${i}`}>{response}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h5>Neutral</h5>
                              <ul>
                                {(
                                  sampleResponses[columnName]?.Neutral || []
                                ).map((response, i) => (
                                  <li key={`neutral-${i}`}>{response}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h5>Negative</h5>
                              <ul>
                                {(
                                  sampleResponses[columnName]?.Negative || []
                                ).map((response, i) => (
                                  <li key={`negative-${i}`}>{response}</li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Display sentiment visualizations */}
                          {sentimentVisuals[columnName] && (
                            <div className="sample-chart">
                              <img
                                src={getFullUrl('/'+sentimentVisuals[columnName].bar_plot)}
                                alt={`Bar chart for ${columnName}`}
                              />
                              <img
                                src={getFullUrl('/'+sentimentVisuals[columnName].donut_chart)}
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
                <DownloadSection
                  className="w-fit m-2 cursor-pointer  text-[#00425F] border border-[#00425F] py-1 px-5 text-sm rounded-full mr-2"
                  downloadEndpoint={getFullUrl(
                    `/download_sentiment_report/?session_id=${sessionStorage.getItem(
                      "session_id"
                    )}`
                  )}
                  fileType="sentiment_report"
                  buttonText={"Download Sentiment Analysis Report"}
                />
                {sessionStorage.getItem("selected_route") === "QASAIR" && (
                  <button
                    onClick={() => navigate("/introduction")}
                    className="w-fit cursor-pointer bg-[#00425F] text-white border border-[#00425F] py-1 px-5 text-sm rounded-full"
                  >
                    Proceed to Introduction Report
                  </button>
                )}{" "}
                  {sessionStorage.getItem("selected_route") === "QACLSAIR" && (
                  <button
                    onClick={() => navigate("/introduction")}
                    className="w-fit cursor-pointer bg-[#00425F] text-white border border-[#00425F] py-1 px-5 text-sm rounded-full"
                  >
                    Proceed to Introduction Report
                  </button>
                )}
              </div>
            </div>
          )}
          {/* <Popup popupContent={reason} closePopup={() => setReason("")} /> */}
        </div>
      </div>
    </div>
  );
};

export default Sentiment;
