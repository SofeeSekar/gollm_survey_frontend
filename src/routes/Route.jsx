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
import Landing from "../page/Landing";
import Upload1 from "../page/Upload1";
import SelectAnalysis from "../page/SelectAnalysis";
import ColumnAnalysis from "../page/ColumnAnalysis";
import ColumnGrouping from "../page/ColumnGrouping";
import ColumnFinal from "../page/ColumnFinal";
import Quantitative from "../page/Quantitative";
import Introduction from "../page/Introduction";
import Sentiment from "../page/Sentiment";
import Cluster from "../page/Cluster";
const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      // { path: "/", element: <Home /> },
      { path: "/", element: <Landing /> },
      { path: "/upload", element: <Upload /> },
      { path: "/upload1", element: <Upload1 /> },
      { path: "/select-analysis", element: <SelectAnalysis /> },
      { path: "/column-analysis", element: <ColumnAnalysis /> },
      { path: "/column-grouping", element: <ColumnGrouping /> },
      { path: "/column-final", element: <ColumnFinal /> },
      { path: "/quantitative", element: <Quantitative /> },
      { path: "/introduction", element: <Introduction /> },
      { path: "/sentiment", element: <Sentiment /> },
      {path:"/cluster",element:<Cluster />},

      { path: "/analysis", element: <Analysis /> },
      { path: "/grouping", element: <GroupingColumns /> },
      { path: "/final", element: <FinalColumn /> },
      { path: "/quantitative-analysis", element: <QuantitativeAnalysis /> },
      { path: "/cluster-analysis", element: <ClusterAnalysis /> },
      { path: "/introduction-analysis", element: <IntroductionAnalysis /> },
      { path: "/sentiment-analysis", element: <SentimentalAnalysis /> },
    ],
  },
];

const AppRoutes = createBrowserRouter(routes);

export default AppRoutes;
