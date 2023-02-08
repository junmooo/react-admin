import React from "react";
import type { RouteObject } from "react-router-dom";
const Login = React.lazy(() => import("@/containers/auth/Login"));

export default [
  {
    path: "/login",
    element: <Login />,
  },
] as RouteObject[];
