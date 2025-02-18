import Amazon from "../../assets/Analysis/Amazon.png"
import Retouch from "../../assets/Analysis/Retouch.png"
import Table from "../../assets/Analysis/Table.png"
import Summary from "../../assets/Analysis/Summary.png"
import { useNavigate } from "react-router-dom";

export default function AnalysisCards() { 
  const navigate = useNavigate();
    const analysisData = [
      {
        title: "Quantitative Analysis",
        description:
          "Transforms numeric, Likert scale, and multiple-choice data into graphs and tables, helping you identify the most and least common responses.",
        icon: Amazon, 
      },
      {
        title: "Cluster Analysis",
        description:
          "Transforms free-form textual responses into graphs and tables by noting similarities in meaning across respondents’ answers.",
        icon: Retouch, 
      },
      {
        title: "Sentiment Analysis",
        description:
          "Takes free-form text and detects the emotion - from very negative to very positive - depicting it via charts and with accompanying, representative verbatims.",
        icon: Table, 
      },
      {
        title: "Analysis Overview",
        description:
          "Performs all analyses before distilling the key insights and themes into a narrative report. It starts with an executive summary and then provides further details for each data column.",
        icon: Summary,
      },
    ];
  
    return (
      <div className="grid grid-cols-1 sm:grid-cols-1 w-fit bg-white p-8  rounded-2xl lg:grid-cols-4 gap-6 m-auto max-w-7xl">
        {analysisData.map((item, index) => (
          <div
            key={index}
            className="relative bg-white shadow-lg rounded-xl p-4 text-center border border-gray-200 flex flex-col items-center justify-center gap-3"
          >
            <span className="absolute -top-4 -left-4 rounded-full py-3 px-5 text-xl font-bold bg-[#00425F] text-white">{index + 1}</span>
            <img className="w-[45px]" src={item.icon} />
            <h3 className="text-lg font-semibold mb-2 text-[#00425F]">{item.title}</h3>
            <p className="text-[#00425F] text-sm text-left">{item.description}</p>
          </div>
        ))}
        <div
          className="relative left-[500px] cursor-pointer self-center bg-[#00425F] w-fit text-white px-10 py-2 pb-3 mt-8 text-base rounded-[50px]"
          onClick={() => navigate("/upload")}
        >
          Create my report
        </div>
      </div>
    );
  }
  