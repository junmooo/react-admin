import React from "react";
import type { RouteObject } from "react-router-dom";
import Layouts from "@/layouts";

const UserManage = React.lazy(
  () => import("@/containers/system/user/UserManage")
);
const RoleManage = React.lazy(
  () => import("@/containers/system/role/RoleManage")
);
const AuthManage = React.lazy(
  () => import("@/containers/system/auth/AuthManage")
);

export default [
  {
    element: <Layouts />,
    children: [{ path: "/auth", element: <AuthManage /> }],
  },
  {
    element: <Layouts />,
    children: [{ path: "/role", element: <RoleManage /> }],
  },
  {
    element: <Layouts />,
    children: [{ path: "/user", element: <UserManage /> }],
  },
] as RouteObject[];
