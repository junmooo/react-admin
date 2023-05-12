import request from "@/api/axios";
const listStore = async () => {
  return await request({
    url: `/api/file/listStore`,
    method: "GET",
  });
};
const delStore = async (params: { fileName: string }) => {
  return await request({
    url: `/api/file/delStore`,
    method: "GET",
    params,
  });
};
const upStore = async (params: any) => {
  return await request({
    url: `/api/file/store`,
    method: "POST",
    data: params,
  });
};

const store = {
  listStore,
  delStore,
  upStore,
};
export default store;
