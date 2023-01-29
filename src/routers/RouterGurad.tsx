import React, { Fragment, useEffect, useState } from "react";

import type { RouteObject } from "react-router-dom";
import { useRoutes, useSearchParams } from "react-router-dom";
/**
 * 路由守卫
 * 处理url中传递来的单点登录的用户信息和国际化配置
 */
const RouterGurad = React.memo(function RouterGurad(props: {
  routes: RouteObject[];
}) {
  const { routes } = props;
  const route = useRoutes(routes);
  return route;
});

export default RouterGurad;
