import React, { useState } from "react";
// import DownloadSection from "./DownloadSection";
// import "../styles/QuantitativeAnalysisPage.css";
// import { formatWords } from "../utils/helpers";
// import DropDownComponent from "./DropDownComponenet";
import { getFullUrl } from "../../../utils";
import Popup from "../../tools/Popup";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../sidebar/Sidebar";


// const { getFullUrl } = require("../../../utils");

const FinalColumn = ({ setColumns }) => {
  const [expandedPreviews, setExpandedPreviews] = useState([]);
  const navigate = useNavigate();

  const [previewData, setPreviewData] = useState([
    {
      column_name:
        "Q3 What Attracts You To Argyll And Bute? (Select Top 3 Reasons)",
      freq_table: [
        {
          "Group Name": "The friendly local people",
          Count: 371,
        },
        {
          "Group Name":
            "To explore Argyll and Bute and its surrounding regions / rest of Scotland",
          Count: 368,
        },
        {
          "Group Name": "The climate and weather",
          Count: 366,
        },
        {
          "Group Name":
            "Other special event (music concert, sports match, etc.)",
          Count: 354,
        },
        {
          "Group Name": "Value for money",
          Count: 353,
        },
        {
          "Group Name": "The scenery and landscape",
          Count: 348,
        },
        {
          "Group Name":
            "Personal event / celebration (anniversary, wedding, etc.)",
          Count: 347,
        },
        {
          "Group Name": "Holidayed before and wanted to return",
          Count: 340,
        },
        {
          "Group Name": "The history and culture",
          Count: 340,
        },
        {
          "Group Name": "To visit a film location",
          Count: 337,
        },
        {
          "Group Name": "To visit a particular attraction",
          Count: 327,
        },
        {
          "Group Name": "Argyll and Bute's reputation",
          Count: 325,
        },
        {
          "Group Name":
            "To visit family and friends who live in Argyll and Bute",
          Count: 324,
        },
      ],
      visualization_url:
        "visualizations/16a3e09d-e93e-465f-af85-7ff8a593d1da/visualizations/Q3_What_Attracts_You_To_Argyll_And_Bute_Select_Top_3_Reasons_freq_plot.png",
      group_by_visualizations: [],
    },
    {
      column_name:
        "Q4 As A Visitor To Argyll And Bute, What Type Of Accommodation Are You Staying In?",
      freq_table: [
        {
          "Group Name": "Staying with friends and family",
          Count: 210,
        },
        {
          "Group Name": "Self-catering",
          Count: 203,
        },
        {
          "Group Name": "Student accommodation",
          Count: 192,
        },
        {
          "Group Name": "Hotel",
          Count: 186,
        },
        {
          "Group Name": "Homestay (e.g., Airbnb)",
          Count: 183,
        },
        {
          "Group Name": "B&B or guest house",
          Count: 178,
        },
        {
          "Group Name": "Caravan / campervan",
          Count: 176,
        },
        {
          "Group Name": "Campsite",
          Count: 172,
        },
      ],
      visualization_url:
        "visualizations/16a3e09d-e93e-465f-af85-7ff8a593d1da/visualizations/Q4_As_A_Visitor_To_Argyll_And_Bute_What_Type_Of_Accommodation_Are_You_Staying_In_freq_plot.png",
      group_by_visualizations: [],
    },
  ]);

  const fetchQuantReportData = async () => {
    setLoadingPreviews(true);
    try {
      const response = await fetch(
        getFullUrl(`/generate_quant_report/?session_id=${sessionId}`)
      );

      if (!response.ok) {
        throw new Error("Failed to fetch preview data.");
      }
      const data = await response.json();
      console.log(data);
      //   setPreviewData(data);
    } catch (fetchError) {
      console.error("Error fetching preview data:", fetchError);
      setError("Error fetching preview data. Please try again later.");
    } finally {
      setLoadingPreviews(false);
    }
  };

  const togglePreviewExpansion = (column) => {
    setExpandedPreviews((prevState) =>
      prevState.includes(column)
        ? prevState.filter((item) => item !== column)
        : [...prevState, column]
    );
  };

  const fileName = sessionStorage.getItem("file_name") ?? "No file available";

  return (
    <>
      <div>
        <div className="bg-[#E1E5EA] rounded-xl p-6 w-3/5 flex flex-col gap-4">
          <h2 className="text-[#00425F] font-bold text-[38px]">
            Final Column Selection
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
          <div>
            {previewData.length > 0 &&
              previewData.map((data, index) => (
                <div key={index} className="preview-container">
                  <div
                    className="preview-box"
                    onClick={() => togglePreviewExpansion(data?.column_name)}
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
                      expandedPreviews.includes(data?.column_name) ? "show" : ""
                    }`}
                  >
                    <h3>Preview for Column: {data?.column_name}</h3>
                    <h4>Group Name and Frequency</h4>
                    {data?.freq_table?.length && data?.freq_table.length > 0 ? (
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
                        src={`http://localhost:8000/${data?.visualization_url}`}
                        alt={`Visualization for ${data?.column_name}`}
                        className="frequency-plot"
                      />
                    ) : (
                      <p>No frequency plot available.</p>
                    )}

                    <h4 style={{ color: "red" }}>Group-by Visualizations</h4>
                    {data?.group_by_visualizations?.length &&
                    data?.group_by_visualizations.length > 0 ? (
                      data.group_by_visualizations.map(
                        ([plotUrl, legendUrl], idx) => (
                          <div
                            key={idx}
                            className="grouped-visualization-section"
                          >
                            <img
                              src={`http://localhost:8000/${plotUrl}`}
                              alt={`Grouped Visualization for ${data.column_name}`}
                              className="grouped-visualization"
                            />
                            <img
                              style={{ border: "5px solid red" }}
                              src={`http://localhost:8000/${legendUrl}`}
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
            <button
              className="w-fit cursor-pointer  text-[#00425F] border border-[#00425F] py-1 px-5 text-sm rounded-full mr-2"
              onClick={() => setColumns({ page: "analysis" })}
            >
              Back to Groping columns
            </button>
            <button
              onClick={() => navigate("/cluster-analysis")}
              className="w-fit cursor-pointer bg-[#00425F] text-white border border-[#00425F] py-1 px-5 text-sm rounded-full"
            >
              Proceed to Cluster Analysis
            </button>
          </div>
          {/* <Popup popupContent={reason} closePopup={() => setReason("")} /> */}
        </div>
      </div>
    </>
  );
};

export default FinalColumn;
