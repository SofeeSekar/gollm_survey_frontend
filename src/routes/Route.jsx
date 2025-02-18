import { createBrowserRouter } from "react-router-dom";
import Home from "../page/Home";
import Upload from "../page/Upload";
import Layout from "../component/layout/Layout";
import Analysis from "../page/Analysis";
import GroupingColumns from "../component/home/QuantitativeAnalysis/GroupingColumns";
import FinalColumn from "../component/home/QuantitativeAnalysis/FinalColumn";
import ClusterAnalysis from "../component/home/cluster-analysis/ClusterAnalysis";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/upload", element: <Upload /> },
      { path: "/analysis", element: <Analysis /> },
      { path: "/grouping", element: <GroupingColumns /> },
      { path: "/cluster-analysis", element: <ClusterAnalysis /> },
      {path: "/final", element: <FinalColumn />}
    ],
  },
];

const AppRoutes = createBrowserRouter(routes);

export default AppRoutes;