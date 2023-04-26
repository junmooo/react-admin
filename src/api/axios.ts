import axios from "axios";
import { message } from "antd";
import Cookies from "js-cookie";

/**
 * 生成每个请求唯一的键
 * @param {*} config
 * @returns string
 */

type Config = {
  url?: string | undefined;
  method?: string;
  params?: object;
  data?: object | string;
  cancelToken?: any;
  headers?: any;
};

function request(axiosConfig: Config) {
  const service = axios.create({
    baseURL: "/",
    timeout: 60000,
  });

  service.interceptors.request.use(
    (config) => {
      if (config.url !== "/api/auth/login") {
        const token = Cookies.get("token");
        if (token) {
          config.headers.token = token;
        } else {
          window.location.href = "/#/login";
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  service.interceptors.response.use(
    (response) => {
      if (response.data.code !== 1) {
        message.error(response?.data.msg, 3);
        return Promise.reject(response.data);
      }

      return Promise.resolve(response.data);
    },
    (error) => {
      if (error.response.status === 403) {
        message.error("token过期，请重新登录", 3);
        window.location.href = "/#/login";
      }
      return Promise.reject(error);
    }
  );
  return service(axiosConfig);
}

export default request;
