import { useRef, useState } from "react";
import bgIMG from "../assets/logo/bg-img.png";
import { getFullUrl } from "../utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Upload = () => {
  const UploadRef = useRef();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false); // For drag-and-drop UI
  const inputRef = useRef(null); // Ref to trigger the input file manually
  const navigate = useNavigate();

  // Retrieve the session ID from sessionStorage
  const sessionId = uuidv4();

  // Handle file selection from the system
  const handleFileChange = (e) => {
    handleUpload(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  // Handle drag events
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleUpload(e.dataTransfer.files[0]);
    setFile(e.dataTransfer.files[0]);
    setDragActive(false);
  };

  // Manually trigger the file input when the user clicks the drop zone
  const handleClick = () => {
    inputRef.current.click();
  };

  // Handle file upload
  const handleUpload = async (files) => {
    if (!files) {
      alert("Please select a file to upload!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", files);

    // if(sessionStorage.getItem("session_id")){
    //   sessionStorage.removeItem("session_id");
    // } 
    sessionStorage.setItem('session_id',sessionId)
    try {      
      const response = await axios.post(getFullUrl(`/upload/`), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "session-id": sessionId,
        },
      });
      if(response?.data){
        if(sessionStorage.getItem("file_name")){
          sessionStorage.removeItem("file_name");
        } 
        sessionStorage.setItem("file_name", files.name);
        navigate('/analysis', { state: response.data?.column_analysis });
    }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-[#00425F] mt-16 h-[94vh] flex justify-end border-t border-t-white">
        <div className="w-[85%] border bg-white px-20 py-14 rounded-tl-2xl">
          <div className="relative">
            <img
              src={bgIMG}
              alt="Company Logo"
              className="w-full h-[50%] rounded-[15px] object-contain"
            />
            <div className="absolute top-[30px] left-[50px]  text-white text-xl font-bold w-96">
              <div className="text-3xl">Goodbye Manual</div>
              <div className="text-3xl">
                {" "}
                Effort, Hello AI-Driven Survey Solutions.
              </div>
              <div className="text-xl font-medium mt-2">
                {" "}
                Survey analysis and visualisation tool.
              </div>
            </div>
            <div
              className="absolute border text-[#00425F] bg-white w-[50%] bottom-[-25%] right-[320px] h-[180px] border-dotted border-[#00425F] rounded-xl flex flex-col gap-3 items-center justify-center"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleClick}
            >
              <div className="font-bold mt-2">
                Drag and drop your file here or browser it.
              </div>
              <div className="flex flex-col p-0 m-0 text-[10px] items-center">
                <div>Maximum: one at a time</div>
                <div>Maximum size: 2 MB</div>
                <div>Acceptable formats: xls,xlsx</div>
              </div>
              <input
                className="hidden"
                type="file"
                multiple={false}
                ref={UploadRef}
                onChange={handleFileChange}
              />
              <button
                className="text-md mb-3"
                onClick={() => UploadRef.current.click()}
              >
                <div
                  className={`bg-[#00425F] cursor-pointer text-white px-7 py-1 rounded-2xl text-sm flex gap-2`}
                >
                  {file?.name ?? loading ? "Uploading..." : "Upload & Process"}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Upload;
