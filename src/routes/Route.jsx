import { createBrowserRouter } from "react-router-dom";
import Home from "../page/Home";
import Upload from "../page/Upload";
import Layout from "../component/layout/Layout";
import Analysis from "../page/Analysis";
import GroupingColumns from "../component/home/QuantitativeAnalysis/GroupingColumns";
import FinalColumn from "../component/home/QuantitativeAnalysis/FinalColumn";
import ClusterAnalysis from "../component/home/cluster-analysis/ClusterAnalysis";
import IntroductionAnalysis from "../component/home/Introduction-analysis/IntroductionAnalysis";
import SentimentalAnalysis from "../component/home/Sentimental-analysis/sentimentalAnalysis";
import QuantitativeAnalysis from "../component/home/QuantitativeAnalysis/QuantitativeAnalysis";
const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/upload", element: <Upload /> },
      { path: "/analysis", element: <Analysis /> },
      { path: "/grouping", element: <GroupingColumns /> },
      {path: "/final", element: <FinalColumn />},
      {path: "/quantitative-analysis", element: <QuantitativeAnalysis />},
      { path: "/cluster-analysis", element: <ClusterAnalysis /> },
      {path:"/introduction-analysis", element: <IntroductionAnalysis />},
      {path:"/sentiment-analysis", element: <SentimentalAnalysis />},
    ],
  },
];

const AppRoutes = createBrowserRouter(routes);

export default AppRoutes;