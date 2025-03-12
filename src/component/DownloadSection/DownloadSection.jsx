import React from "react";
// import "../styles/DownloadSectionStyles.css";

const DownloadSection = ({
  downloadEndpoint,
  fileType = "report",
  buttonText,
}) => {
  const handleDownload = async () => {
    try {
      const sessionId = sessionStorage.getItem("session_id");
      const response = await fetch(downloadEndpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "session-id": sessionId,
        },
      });

      if (!response.ok) throw new Error(`Failed to download the ${fileType}.`);

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;

      // Set dynamic filename based on fileType prop
      link.setAttribute(
        "download",
        fileType === "excel"
          ? "Final_Trail_Data.xlsx"
          : fileType === "quant_report"
          ? "Quantitative_Analysis1.docx"
          : fileType === "cluster_report"
          ? "Clustering_Analysis_Report.docx"
          : fileType === "intro_report"
          ? "Introduction_Report.docx"
          : fileType === "sentiment_report"
          ? "Sentiment_Analysis_Report.docx"
          : fileType === "complete_report"
          ? "Complete_Analysis_Report.docx"
          : "Download_File"
      );

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(`Error downloading ${fileType}:`, error);
    }
  };

  const getReportTitle = () => {
    switch (fileType) {
      case "excel":
        return "Excel File";
      case "quant_report":
        return "Quantitative Report";
      case "cluster_report":
        return "Cluster Report";
      case "intro_report":
        return "Introduction Report";
      case "sentiment_report":
        return "Sentiment Analysis Report";
      case "complete_report":
        return "Complete Analysis Report";
      default:
        return "File";
    }
  };

  return (
    <div className="download-section">
      {/* <h3>Download {getReportTitle()}:</h3> */}
      <button onClick={handleDownload} className="w-fit m-2 cursor-pointer  text-[#00425F] border border-[#00425F] py-1 px-5 text-sm rounded-full mr-2 download-button">
        {buttonText ||  `Download ${fileType === "excel" ? "Excel" : getReportTitle()}`}
      </button>
    </div>
  );
};
export default DownloadSection;
