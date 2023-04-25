import request from "@/api/axios";
import { LoginParam, RegisterParam } from "@/types/auth";
import { md5 } from "@/utils/md5";
import Cookies from "js-cookie";

const login = async (params: LoginParam) => {
  params.operPwd = md5(params.operPwd);
  const res = await request({
    url: `/api/auth/login`,
    method: "POST",
    data: { ...params },
  });

  Cookies.set("token", res?.data.token);
  return Promise.resolve(res?.data || {});
};

const register = async (params: RegisterParam) => {
  params.operPwd = md5(params.operPwd);
  return await request({
    url: `/api/auth/register`,
    method: "POST",
    data: { ...params },
  });
};
const operList = async (params: any) => {
  return await request({
    url: `/api/auth/operList`,
    method: "POST",
    data: { ...params },
  });
};
const resources = async (params: any) => {
  return await request({
    url: `/api/auth/allResources`,
    method: "POST",
    data: { ...params },
  });
};
const delOper = async (params: any) => {
  return await request({
    url: `/api/auth/delOper`,
    method: "GET",
    params,
  });
};
const updateOpers = async (params: any) => {
  return request({
    url: `/api/auth/updateOper`,
    method: "POST",
    data: { ...params },
  });
};

const auth = { login, register, operList, delOper, updateOpers, resources };
export default auth;
