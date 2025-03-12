import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFullUrl } from "../utils";
import DownloadSection from "../component/DownloadSection/DownloadSection";

const Cluster = () => {
  const [currentAnalysis, setCurrentAnalysis] = useState("");
  const fileName = sessionStorage.getItem("file_name") ?? "No file available";
  const [expandedPreviews, setExpandedPreviews] = useState([]);
  const navigate = useNavigate();
  const loadingRef = useRef(true);

  useEffect(() => {
    const path = window.location.pathname?.split("-")[0]?.substring(1) ?? "";
    // const currentStage = analysisList.find(({ title }) =>
    //   path.includes(title.split(" ")[0]?.toLocaleLowerCase())
    // );
    // if (currentStage) {
    //   setCurrentAnalysis(currentStage?.title);
    // }
  }, []);

  const [previewData, setPreviewData] = useState([]);
  useEffect(() => {
    if (loadingRef.current) {
      const fetchClusterReportData = async () => {
        try {
          const response = await fetch(
            getFullUrl(
              `/generate_cluster_report/?session_id=${sessionStorage.getItem(
                "session_id"
              )}`
            )
          ).catch((error) => {
            loadingRef.current = false;
            console.log(error);
          });

          if (!response.ok) {
            throw new Error("Failed to fetch cluster preview data.");
          }
          const data = await response.json();
          setPreviewData(data);
        } catch (fetchError) {
          loadingRef.current = false;
          console.error("Error fetching cluster preview data:", fetchError);
          // setError("Error fetching cluster preview data. Please try again later.");
        }
      };
      loadingRef.current = false;
      fetchClusterReportData();
    }
  }, []);
  console.log(loadingRef);

  return (
    <div className="bg-[#00425F] h-full w-full flex justify-between min-h-[92vh]">
      <div className="mt-20 bg-white rounded-tl-xl p-8 flex justify-center w-full">
        <div className="bg-[#E1E5EA] rounded-xl p-6 w-3/5 flex flex-col gap-4 h-fit">
          <h2 className="text-[#00425F] font-bold text-[38px]">
            Cluster Analysis
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
              <p>Loading Cluster Analysis...</p>
            </div>
          ) : (
            <>
              <div>
                {previewData?.length > 0 &&
                  previewData?.map((data, index) => (
                    <div key={index} className="preview-container">
                      <div
                        className="preview-box"
                        onClick={() =>
                          togglePreviewExpansion(data?.column_name)
                        }
                      >
                        <p className="preview-title">
                          {data?.column_name || "Unnamed Column"}
                        </p>
                        <span
                          className={`arrow-indicator ${
                            expandedPreviews.includes(data?.column_name)
                              ? "expanded"
                              : ""
                          }`}
                        >
                          ▶
                        </span>
                      </div>
                      <div
                        className={`detailed-preview ${
                          expandedPreviews.includes(data?.column_name)
                            ? "show"
                            : ""
                        }`}
                      >
                        <h3>Preview for Column: {data?.column_name}</h3>
                        <h4>Group Name and Frequency</h4>
                        {data?.freq_table?.length &&
                        data?.freq_table.length > 0 ? (
                          <table>
                            <thead>
                              <tr>
                                <th>Group Name</th>
                                <th>Frequency</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data?.freq_table?.length &&
                                data?.freq_table.map((row, idx) => (
                                  <tr key={idx}>
                                    <td>{row["Group Name"]}</td>
                                    <td>{row["Count"]}</td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        ) : (
                          <p>No frequency data available.</p>
                        )}

                        <h4>Frequency Plot</h4>
                        {data?.visualization_url ? (
                          <img
                            src={getFullUrl('/' + data?.visualization_url)}
                            alt={`Visualization for ${data?.column_name}`}
                            className="frequency-plot"
                          />
                        ) : (
                          <p>No frequency plot available.</p>
                        )}

                        <h4 style={{ color: "red" }}>
                          Group-by Visualizations
                        </h4>
                        {data?.group_by_visualizations?.length &&
                        data?.group_by_visualizations.length > 0 ? (
                          data.group_by_visualizations.map(
                            ([plotUrl, legendUrl], idx) => (
                              <div
                                key={idx}
                                className="grouped-visualization-section"
                              >
                                <img
                                  src={getFullUrl(plotUrl)}
                                  alt={`Grouped Visualization for ${data.column_name}`}
                                  className="grouped-visualization"
                                />
                                <img
                                  style={{ border: "5px solid red" }}
                                  src={getFullUrl(legendUrl)}
                                  alt={`Legend for Grouped Visualization of ${data.column_name}`}
                                  className="legend-image"
                                />
                              </div>
                            )
                          )
                        ) : (
                          <p>No grouped visualizations available.</p>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
              <div className="w-full text-center">
                {/* <button
              className="w-fit cursor-pointer  text-[#00425F] border border-[#00425F] py-1 px-5 text-sm rounded-full mr-2"
            >
              Download Cluster Report
            </button> */}
                <DownloadSection
                  className="w-fit m-2 cursor-pointer  text-[#00425F] border border-[#00425F] py-1 px-5 text-sm rounded-full mr-2"
                  downloadEndpoint={getFullUrl(
                    `/download_cluster_report/?session_id=${sessionStorage.getItem(
                      "session_id"
                    )}`
                  )}
                  fileType="cluster_report"
                  buttonText={"Download Cluster Report"}
                />
                {sessionStorage.getItem("selected_route") === "QACLSAIR" && (
                  <button
                    onClick={() => navigate("/sentiment")}
                    className="w-fit cursor-pointer bg-[#00425F] text-white border border-[#00425F] py-1 px-5 text-sm rounded-full"
                  >
                    Proceed to Sentiment Analysis
                  </button>
                )}
              </div>
            </>
          )}
          {/* <Popup popupContent={reason} closePopup={() => setReason("")} /> */}
        </div>
      </div>
    </div>
  );
};

export default Cluster;
