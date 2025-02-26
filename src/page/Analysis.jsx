import React, { useEffect, useState } from "react";
import Sidebar from "../component/sidebar/Sidebar";
import { Amazon, Retouch, Summary, Table } from "../assets";
import AnalysisColumns from "../component/home/QuantitativeAnalysis/AnalysisColumn";
import GroupingColumns from "../component/home/QuantitativeAnalysis/GroupingColumns";
import FinalColumn from "../component/home/QuantitativeAnalysis/FinalColumn";
import ColumnAnalysis from "./ColumnAnalysis";
import ColumnGrouping from "./ColumnGrouping";
import ColumnFinal from "./ColumnFinal";
import { useLocation } from "react-router-dom";

const Analysis = () => {
  const { id } = useLocation();
  const [currentAnalysis, setCurrentAnalysis] = useState(
    "Quantitative Analysis"
  );
  const [quantitativeColumns, setQuantitativeColumns] = useState({
    page: "analysis",
    data: [],
  });
  const analysisList = [
    { title: "Quantitative Analysis", icon: Amazon },
    { title: "Cluster Analysis", icon: Retouch },
    { title: "Introduction Analysis", icon: Summary },
    { title: "Sentiment Analysis", icon: Table },
  ];

  useEffect(() => {
    const path = window.location.pathname?.split("-")[0]?.substring(1) ?? "";
    const currentStage = analysisList.find(({ title }) =>
      path.includes(title.split(" ")[0]?.toLocaleLowerCase())
    );
    if (currentStage) {
      setCurrentAnalysis(currentStage?.title);
    }
  }, []);

  const switchComponents = () => {
    switch (quantitativeColumns?.page) {
      case "analysis":
        return <ColumnAnalysis setColumns={setQuantitativeColumns} />;
      case "grouping":
        return (
          <ColumnGrouping
            groupingData={quantitativeColumns?.data}
            setColumns={({ page }) =>
              setQuantitativeColumns((prev) => ({ ...prev, page }))
            }
          />
        );
      case "final":
        return (
          <ColumnFinal
            finalData={quantitativeColumns?.data}
            setColumns={setQuantitativeColumns}
          />
        );
      default:
        <AnalysisColumns />;
        break;
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-blue-50 p-6 mt-20">
      {switchComponents()}
    </div>
  );
};

export default Analysis;
