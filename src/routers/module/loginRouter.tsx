import React from "react";
import type { RouteObject } from "react-router-dom";
const Login = React.lazy(() => import("@/containers/auth/Login"));
const Store = React.lazy(() => import("@/containers/store"));

export default [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/store",
    element: <Store />,
  },
] as RouteObject[];
