import { useState } from "react";
import documentImg from "../assets/other/document.png";
import { Amazon, Retouch, Summary, Table } from "../assets";
import { useLocation, useNavigate } from "react-router-dom";
import Filepopup from "../component/tools/Filepopup";

const SelectAnalysis = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [reason, setReason] = useState("");

  const handleNaviagte = (key) => {
    navigate("/analysis", { state: state });
    console.log("Navigating to column-analysis with state:", state);
    sessionStorage.setItem("selected_route", key);
  };
  console.log(state);
  const [file, setFile] = useState(
    sessionStorage.getItem("file_name") ?? "Unknown File Name"
  );
  const analysisList = [
    [{ title: "Quantitative Analysis", icon: Amazon, key: "QA" }],
    [
      { title: "Quantitative Analysis", icon: Amazon, key: "QAIR" },
      { title: "Introduction Report", icon: Summary, key: "QAIR" },
    ],
    [
      { title: "Quantitative Analysis", icon: Amazon, key: "QASAIR" },
      { title: "Sentiment Analysis", icon: Table, key: "QASAIR" },
      { title: "Introduction Report", icon: Summary, key: "QASAIR" },
    ],
    [
      { title: "Quantitative Analysis", icon: Amazon, key: "QACLSAIR" },
      { title: "Cluster Analysis", icon: Retouch, key: "QACLSAIR" },
      { title: "Sentiment Analysis", icon: Table, key: "QACLSAIR" },
      { title: "Introduction Report", icon: Summary, key: "QACLSAIR" },
    ],
  ];
  const handleFileChange = () => {
    setReason("open");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-6 mt-20">
      <div className="bg-white shadow-lg rounded-[30px] p-6 max-w-5xl w-full">
        <div className="bg-[#FFF3D6] text-yellow-800 px-4 py-3 rounded-[30px] flex flex-col gap-3">
          <div className="flex items-center justify-center gap-3 ">
            <img
              src={documentImg}
              alt="Company Logo"
              className="object-contain w-[40px]"
            />
            <div className="text-[#00425F] text-xl font-medium">
              Successful upload!
            </div>
          </div>

          <div className="flex flex-wrap justify-between items-center gap-3 max-sm:justify-center border-none px-5 py-3 rounded-[18px] mb-6 bg-white">
            <span className="text-[#00425F] font-medium">{file}</span>
            <label
              className="cursor-pointer border border-[#00425F] text-[#00425F] px-6 py-2 text-sm font-medium rounded-[50px]"
              onClick={handleFileChange}
            >
              Select another file
            </label>
          </div>
        </div>
        <h2 className="text-lg font-semibold text-gray-700 text-center mb-4 pt-6">
          Select the analyses you'd like D.A.V.E. to include in generating a
          report for you:
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 justify-center">
          {analysisList.map((group, index) => (
            <div
              key={index}
              className="p-6 rounded-[25px] shadow-md border bg-[#F0F7FF] h-fit w-full hover:bg-white"
            >
              {group.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center gap-2 mb-2 text-lg"
                  onClick={() => handleNaviagte(item?.key)}
                >
                  <img
                    className="text-2xl text-[#00425F]"
                    src={item.icon}
                    alt=""
                  />
                  <span className="text-[#00425F] text-center font-medium max-w-[120px]">
                    {item.title}
                  </span>
                  {i < group.length - 1 && (
                    <div className="text-[#FFB800] text-[55px] m-3">+</div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Filepopup popupContent={reason} closePopup={() => setReason("")} />
    </div>
  );
};

export default SelectAnalysis;
