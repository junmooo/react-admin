import React from "react";
import type { RouteObject } from "react-router-dom";
import Layouts from "@/containers/layouts";

const Demo = React.lazy(() => import("@/containers/demo"));

export default [
  {
    element: <Layouts />,
    children: [{ path: "/demo", element: <Demo /> }],
  },
] as RouteObject[];
