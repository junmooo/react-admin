import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import workbench from "./module/workbench";
import login from "./module/loginRouter";
import sys from "./module/sysRouter";

const routeConfig = [
  ...workbench,
  ...login,
  ...sys,
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "*",
    element: <div>404</div>,
  },
] as RouteObject[];

export default routeConfig;
