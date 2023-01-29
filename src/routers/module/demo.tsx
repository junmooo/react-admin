import React from "react";
import type { RouteObject } from "react-router-dom";
import Layouts from "@/layouts";

const Demo = React.lazy(() => import("@/containers/demo"));
const Demo2 = React.lazy(() => import("@/containers/demo/demo2"));

export default [
  {
    element: <Layouts />,
    children: [{ path: "/demo", element: <Demo /> }],
  },
  {
    element: <Layouts />,
    children: [{ path: "/demo2", element: <Demo2 /> }],
  },
] as RouteObject[];
