import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import demo from "./module/demo";
import login from "./module/loginRouter";
import sys from "./module/sysRouter";

const routeConfig = [
  ...demo,
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
