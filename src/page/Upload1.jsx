import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import warnImg from "../assets/other/alert.png";
import uploadImg from "../assets/other/upload.png";
import Loader from "../component/loader/Loader";
import { v4 as uuidv4 } from "uuid";
import { getFullUrl } from "../utils";
import axios from "axios";
const Upload1 = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const sessionId = uuidv4();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setLoading(true);

      if (selectedFile.size > 2 * 1024 * 1024) {
        setError(true);
        setLoading(false);
        setFile(null);
        return;
      }

      setError(false);
      setFile(selectedFile);
      startUpload(selectedFile);
    }
  };

  const startUpload = async (selectedFile) => {
    if (!selectedFile) {
      alert("Please select a file to upload!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);

    // if(sessionStorage.getItem("session_id")){
    //   sessionStorage.removeItem("session_id");
    // }

    sessionStorage.setItem("session_id", sessionId);
    try {
      const response = await axios.post(getFullUrl(`/upload/`), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "session-id": sessionId,
        },
      });
      console.log(response );
      if (!!response) {
        if (sessionStorage.getItem("file_name")) {
          sessionStorage.removeItem("file_name");
        }
        if(sessionStorage.getItem("selected_route")){
          sessionStorage.removeItem("selected_route")
        }
        
        sessionStorage.setItem("file_name", selectedFile.name);
        navigate("/select-analysis", { state: response.data?.column_analysis });
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 h-[100vh] bg-[rgb(240,247,255)] flex flex-col items-center justify-center">
      {error && (
        <div className="flex flex-col items-center">
          <img src={warnImg} className="mb-3" alt="Warning" />
          <div className="text-[rgb(255,67,71)] font-medium">
            The file size is too large, the maximum size per file is 2 MB.
          </div>
          <div className="text-[rgb(255,67,71)] font-medium">
            Please try again!
          </div>
        </div>
      )}

      <div className="mt-10 bg-white flex flex-col items-center justify-center w-[50%] h-[230px] border-2 border-[#00425F] border-dashed rounded-xl text-[#00425F]">
        {!loading && (
          <>
            <div className="font-medium mt-1 text-2xl">
              Drag & drop your survey file here or browse it.
            </div>
            <div className="flex flex-col p-2 m-1 text-[15px] items-center">
              <div>Maximum: one at a time</div>
              <div>
                Maximum size: <span className="font-medium">2 MB</span>
              </div>
              <div>
                Acceptable formats:{" "}
                <span className="font-medium">xls, xlsx</span>
              </div>
            </div>

            <input
              type="file"
              accept=".xls,.xlsx"
              onChange={handleFileChange}
              className="hidden"
              id="file-input"
            />
            <label htmlFor="file-input">
              <div className="bg-[#00425F] cursor-pointer text-white font-medium px-7 py-2 rounded-[20px] text-md flex gap-2">
                Browse files
              </div>
            </label>
          </>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center mt-4">
            <img src={uploadImg} className="mb-3" alt="Uploading" />
            <div className="text-[#80858E] font-medium text-xl mb-5">
              Uploading
            </div>
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload1;
