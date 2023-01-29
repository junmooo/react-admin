import merge from "lodash.merge";
import dev from "./dev";
import type { MenuProps } from "antd";
import production from "./production";
import test from "./test";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";

export type ConfigType = {
  /** @name api域名 */
  API_BASR_URL: string;
  /** @name api接口的前缀，默认/api */
  API_PREFIX: string;
  /** @name 存在本地的用户鉴权信息的key */
  JWT_LOCALSTORAGE_KEY: string;
  /** @name 存在本地的国际化配置的key */
  LANG_LOCALSTORAGE_KEY: string;
  /** @name 代理（仅本地环境有效） */
  proxy?: Record<string, unknown>;
};

const baseConfig: Partial<ConfigType> = {
  API_BASR_URL: "https://some-domain.com",
  API_PREFIX: "/api",
  JWT_LOCALSTORAGE_KEY: "Authorization",
  LANG_LOCALSTORAGE_KEY: "Lang",
};

export const menuConfig: MenuProps["items"] = [
  {
    key: "DashBoard",
    icon: React.createElement(UserOutlined),
    label: "DashBoard",
    children: [
      {
        key: "/demo",
        label: "option1",
      },
      {
        key: "/demo2",
        label: "option2",
      },
    ],
  },
];

export default (function () {
  switch (process.env.REACT_APP_ENV) {
    case "dev":
      return merge(baseConfig, dev);
    case "test":
      return merge(baseConfig, test);
    case "production":
      return merge(baseConfig, production);
    default:
      return baseConfig;
  }
})() as ConfigType;
