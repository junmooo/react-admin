import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import demo from "./module/demo";

const routeConfig = [
  ...demo,
  {
    path: "/",
    element: <Navigate to="/demo" replace />,
  },
  {
    path: "*",
    element: <div>404</div>,
  },
] as RouteObject[];

export default routeConfig;
