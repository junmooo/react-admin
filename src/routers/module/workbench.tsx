import React from "react";
import type { RouteObject } from "react-router-dom";
import Layouts from "@/layouts";

const Workbench = React.lazy(() => import("@/containers/workbench"));
const Demo2 = React.lazy(() => import("@/containers/workbench/demo2"));

export default [
  {
    element: <Layouts />,
    children: [{ path: "/workbench", element: <Workbench /> }],
  },
  {
    element: <Layouts />,
    children: [{ path: "/demo2", element: <Demo2 /> }],
  },
] as RouteObject[];
