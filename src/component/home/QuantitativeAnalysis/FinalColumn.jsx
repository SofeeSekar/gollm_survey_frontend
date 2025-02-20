import React, { useEffect, useState } from "react";
// import DownloadSection from "./DownloadSection";
// import "../styles/QuantitativeAnalysisPage.css";
// import { formatWords } from "../utils/helpers";
// import DropDownComponent from "./DropDownComponenet";
import { getFullUrl } from "../../../utils";
import Popup from "../../tools/Popup";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../sidebar/Sidebar";
import DownloadSection from "../../DownloadSection/DownloadSection";


// const { getFullUrl } = require("../../../utils");

const FinalColumn = ({ finalData, setColumns }) => {
  const [expandedPreviews, setExpandedPreviews] = useState([]);
  const navigate = useNavigate();
  const [selectedColumns, setSelectedColumns] = useState([]);

  useEffect(() => {setSelectedColumns(finalData)}, [finalData]);

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
          <div className="flex flex-col gap-4">
        <div className="flex w-full justify-between">
          <p
            className="w-fit flex gap-2 cursor-default select-none"
            onClick={() =>
              setSelectedColumns(
                selectedColumns.map((item) => ({ ...item, selected: true }))
              )
            }
          ></p>
          <p>{selectedColumns?.length ?? 0} columns identified</p>
        </div>
        <div>
          {selectedColumns?.length &&
            selectedColumns?.map(({ column_name, selected, reason }, ind) => (
              <div className="flex gap-4 items-center mb-6" key={ind}>
                <div className="bg-white font-semibold w-full p-2 px-5 rounded-3xl text-[#00425F] flex gap-2 items-center justify-between">
                  <p className="w-3/4 text-sm">{column_name}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
          <div className="w-full text-center">
            <button
              className="w-fit m-2 cursor-pointer  text-[#00425F] border border-[#00425F] py-1 px-5 text-sm rounded-full mr-2"
              onClick={() => setColumns({ page: "grouping" })}
            >
              Back to Grouping columns
            </button>
            {/* <button
              className="w-fit m-2 cursor-pointer  text-[#00425F] border border-[#00425F] py-1 px-5 text-sm rounded-full mr-2"
            >
              Download Quantitative Report
            </button> */}
            <DownloadSection className="w-fit m-2 cursor-pointer  text-[#00425F] border border-[#00425F] py-1 px-5 text-sm rounded-full mr-2"
            downloadEndpoint={getFullUrl(
              `/download_excel/?session_id=${sessionStorage.getItem("session_id")}`
            )}
            fileType="excel"
            buttonText={"Download Report"}
          />
            <button
              onClick={() => navigate('/quantitative-analysis')}
              className="w-fit m-2 cursor-pointer bg-[#00425F] text-white border border-[#00425F] py-1 px-5 text-sm rounded-full"
            >
              Proceed to Quantitative Analysis
            </button>
          </div>
          {/* <Popup popupContent={reason} closePopup={() => setReason("")} /> */}
        </div>
      </div>
    </>
  );
};

export default FinalColumn;
