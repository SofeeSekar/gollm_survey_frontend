import React, { useEffect,useState } from "react";
import Checkbox from "../../tools/checkbox";
import CustomCheckbox from "../../tools/checkbox";
import Popup from "../../tools/Popup";

const GroupingColumns = ({ groupingData, setColumns }) => {
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [reason, setReason] = useState("");
  useEffect(() => {setSelectedColumns(groupingData)}, [groupingData]);
  const fileName = sessionStorage.getItem("file_name") ?? "No file available";

  return (
    <div className="bg-[#E1E5EA] rounded-xl p-6 w-3/5 flex flex-col gap-4">
      <h2 className="text-[#00425F] font-bold text-[38px]">
        Grouping column selection
      </h2>
      <div className="bg-white font-semibold w-full p-2 px-5 rounded-3xl text-[#00425F] flex items-center justify-between">
        <p className="text-sm">{fileName}</p>
        <div className="cursor-pointer border border-[#00425F] py-1 px-5 text-sm rounded-full">
          Select another file
        </div>
      </div>
      <p className="font-bold text-[#00425F] text-sm">
        AI preselected all relevant columns.
        <br /> By ticking the box you can modify which ones should be included
        in your report.
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

                  <div className="flex gap-2">
                    <div className="flex gap-1">
                      <input
                        type="radio"
                        name={`select-${ind}`}
                        id={`analysis-${ind}`}
                        checked={!selected} />
                      <label
                        htmlFor={`analysis-${ind}`}
                        className="text-[12px] text-nowrap"
                      >
                        Analysis column
                      </label>
                    </div>
                    <div className="flex gap-1">
                      <input
                        type="radio"
                        name={`select-${ind}`}
                        id={`grouping-${ind}`}
                        checked={selected} 
                      />
                      <label
                        htmlFor={`grouping-${ind}`}
                        className="text-[12px] text-nowrap"
                      >
                        Grouping column
                      </label>
                    </div>
                  </div>
                  <button className="cursor-pointer border border-[#00425F] py-2 px-5 text-xs text-nowrap rounded-full" onClick={() => setReason(reason)}>
                    Show reason
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="w-full text-center">
        <button
          className="w-fit cursor-pointer  text-[#00425F] border border-[#00425F] py-1 px-5 text-sm rounded-full mr-2"
          onClick={() => setColumns({page: "analysis"})}
        >
          Back to Analysis columns
        </button>
        <button   onClick={() => setColumns({page: "final"})} className="w-fit cursor-pointer bg-[#00425F] text-white border border-[#00425F] py-1 px-5 text-sm rounded-full">
          Proceed to final columns selection
        </button>
      </div>
      <Popup popupContent={reason} closePopup={() => setReason("")}/>
    </div>
  );
};

export default GroupingColumns;
