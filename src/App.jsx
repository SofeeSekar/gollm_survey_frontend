import { RouterProvider } from "react-router-dom";
import AppRoutes from "./routes/Route";

function App() {
  return (
   <RouterProvider router={AppRoutes} />
  );
}

export default App;
