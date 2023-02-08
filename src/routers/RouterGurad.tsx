import Cookies from "js-cookie";
import React from "react";

import { RouteObject, useLocation, useNavigate } from "react-router-dom";
import { useRoutes } from "react-router-dom";
/**
 * 路由守卫
 * 处理url中传递来的单点登录的用户信息和国际化配置
 */
const RouterGurad = React.memo(function RouterGurad(props: {
  routes: RouteObject[];
}) {
  const { routes } = props;
  const route = useRoutes(routes);
  const location = useLocation();
  const navigate = useNavigate();
  const token = Cookies.get("token");
  console.log(location.pathname);

  if (location.pathname !== "/login" && !token) {
    navigate("/login");
  }
  return route;
});

export default RouterGurad;
