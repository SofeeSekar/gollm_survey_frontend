import React, { useEffect, useState } from 'react'
import Checkbox from '../../tools/checkbox';
import CustomCheckbox from '../../tools/checkbox';
import { useLocation, useNavigate } from 'react-router-dom';
import { getFullUrl } from '../../../utils';
import { v4 as uuidv4 } from "uuid";
import Popup from '../../tools/Popup';
const AnalysisColumns = ({ setColumns }) => {
  const { state } = useLocation();
  console.log(state);
  
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [reason, setReason] = useState("");
  const fileName = sessionStorage.getItem("file_name") ?? "No file available";
  const sessionId = sessionStorage.getItem("session_id");
  
  useEffect(() => {setSelectedColumns(state)}, [state]);

    const handleColumnSelectionSave = () => {
      // setUsefulColumns(selectedColumns);
      const payload = selectedColumns.filter((item) => item.selected).map((item) => item.column_name);
      fetch(getFullUrl("/submit_useful_columns/"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "session-id": sessionId,
        },
        body: JSON.stringify({ useful_columns: payload }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            setColumns({page: "grouping", data: data?.grouping_column_analysis});
          }
        });
    };

    
    const handleCheck = (columnName) => {
        const copy = [...selectedColumns];
        const index = copy.findIndex((column) => column.column_name === columnName);
        copy[index] = { ...copy[index], selected: !copy[index]?.selected };
        setSelectedColumns(copy);
    };

    return (
      <div className="bg-[#E1E5EA] rounded-xl p-6 w-3/5 flex flex-col gap-4">
        <h2 className="text-[#00425F] font-bold text-[38px]">Analysis column selection</h2>
        <div className="bg-white font-semibold w-full p-2 px-5 rounded-3xl text-[#00425F] flex items-center justify-between">
          <p className="text-sm">{fileName}</p>
          <div className="cursor-pointer border border-[#00425F] py-1 px-5 text-sm rounded-full">
            Select another file
          </div>
        </div>
        <p className="font-bold text-[#00425F] text-sm">
          AI preselected all relevant columns.
          <br /> By ticking the box you can modify which ones should be included in your report.
        </p>
        <div className="flex flex-col gap-4">
          <div className="flex w-full justify-between">
            <p
              className="w-fit flex gap-2 cursor-default select-none"
              onClick={() => setSelectedColumns(selectedColumns.map((item) => ({ ...item, selected: true })))}
            >
              <CustomCheckbox checked={selectedColumns?.length && selectedColumns.every(({ selected }) => selected == true)} /> Select all
            </p>
            <p>{selectedColumns?.length ?? 0} columns identified</p>
          </div>
          <div>
            {selectedColumns?.length &&
              selectedColumns?.map(({ column_name, selected, reason }, ind) => (
                <div className="flex gap-4 items-center mb-6" key={Math.random()}>
                  <CustomCheckbox checked={selected} onClick={() => handleCheck(column_name)} />
                  <div className="bg-white font-semibold w-full p-2 px-5 rounded-3xl text-[#00425F] flex items-center justify-between">
                    <p className="w-3/4 text-sm">{column_name}</p>
                    <button className="cursor-pointer border border-[#00425F] py-2 px-5 text-xs rounded-full" onClick={() => setReason(reason)}>
                      Show reason
                    </button>
                  </div>
                </div>
              ))}
          </div>
            </div>
            <div className='w-full text-center'>
            <button className="w-fit cursor-pointer bg-[#00425F] text-white border border-[#00425F] py-1 px-5 text-sm rounded-full"
             onClick={() => handleColumnSelectionSave()}>
              Proceed to selecting Grouping columns
            </button>
        </div>
        <Popup popupContent={reason} closePopup={() => setReason("")}/>
      </div>
    );
}

export default AnalysisColumns