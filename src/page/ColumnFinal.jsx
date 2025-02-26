import { useEffect, useState } from "react";
import documentImg from "../assets/other/document.png";
import { Amazon, Retouch, Summary, Table } from "../assets";
import CustomCheckbox from "../component/tools/checkbox";
import { useLocation } from "react-router-dom";
import Filepopup from "../component/tools/Filepopup";
import DownloadSection from "../component/DownloadSection/DownloadSection";
import { getFullUrl } from "../utils";
import { useNavigate } from "react-router-dom";

const ColumnFinal = ({ finalData, setColumns }) => {
  const { state, id } = useLocation();
  console.log(id);
  const [reason, setReason] = useState("");
  const navigate = useNavigate();

  console.log(state);

  const [file, setFile] = useState(
    sessionStorage.getItem("file_name") ?? "Unknown File Name"
  );
  const fileName = sessionStorage.getItem("file_name") ?? "No file available";

  const [selectedColumns, setSelectedColumns] = useState([]);

  useEffect(() => {
    setSelectedColumns(finalData);
  }, [finalData]);

  const handleFileChange = () => {
    setReason("s");
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-blue-50 p-6 mt-20">
      <div className="bg-white shadow-lg rounded-[30px] p-6 max-w-5xl w-full">
        <div className="rounded-xl p-6 w-full flex flex-col gap-4">
          <h2 className="text-[#00425F] font-bold text-[38px]">
            Final Column Selection
          </h2>
          <div className="bg-white font-semibold w-full p-2 px-5 rounded-3xl text-[#00425F] flex items-center justify-between border border-5 border-[#FFF3D6] ">
            <p className="text-sm">{fileName}</p>

            <label
              className="cursor-pointer border border-[#00425F] text-[#00425F] px-6 py-2 text-sm font-medium rounded-[50px]"
              onClick={handleFileChange}
            >
              Select another file
            </label>
          </div>
          <p className="font-bold text-[#00425F] text-sm">
            DAVE has pre-selected the columns he believes are appropriate to
            analyse based on sampling your dataset.
            <br />
            By ticking the box you can modify which ones should be included in
            your report.
          </p>
          <div className="bg-[#F0F7FF] flex flex-col gap-4 p-6 rounded-3xl">
            <div className="flex flex-col gap-4">
              <div className="flex w-full justify-between">
                <p
                  className="w-fit flex gap-2 cursor-default select-none"
                  onClick={() =>
                    setSelectedColumns(
                      selectedColumns.map((item) => ({
                        ...item,
                        selected: true,
                      }))
                    )
                  }
                >
                  <CustomCheckbox
                    checked={
                      selectedColumns?.length &&
                      selectedColumns.every(({ selected }) => selected == true)
                    }
                  />{" "}
                  Select all
                </p>
                <p>{selectedColumns?.length ?? 0} columns identified</p>
              </div>
              <div>
                {selectedColumns?.length &&
                  selectedColumns?.map(
                    ({ column_name, selected, reason }, ind) => (
                      <div
                        className="flex gap-4 items-center mb-6"
                        key={Math.random()}
                      >
                        <CustomCheckbox
                          checked={selected}
                          onClick={() => handleCheck(column_name)}
                        />
                        <div className="bg-white font-semibold w-full p-2 px-5 rounded-3xl text-[#00425F] flex items-center justify-between">
                          <p className="w-3/4 text-sm">{column_name}</p>
                        </div>
                      </div>
                    )
                  )}
              </div>
            </div>
          </div>
          <div className="w-full text-center">
            <DownloadSection
              className="w-fit m-2 cursor-pointer  text-[#00425F] border border-[#00425F] py-1 px-5 text-sm rounded-full mr-2"
              downloadEndpoint={getFullUrl(
                `/download_excel/?session_id=${sessionStorage.getItem(
                  "session_id"
                )}`
              )}
              fileType="excel"
              buttonText={"Download Report"}
            />
            <button
              className="w-fit cursor-pointer bg-[#00425F] text-white border border-[#00425F] py-1 px-5 text-sm rounded-full"
              onClick={() => navigate("/quantitative")}
            >
              Proceed to Quantitative Analysis
            </button>
          </div>
          <Filepopup popupContent={reason} closePopup={() => setReason("")} />
        </div>
      </div>
    </div>
  );
};

export default ColumnFinal;
