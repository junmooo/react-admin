import request from "@/api/axios";

const queryByPage = async (params: QueyAlbumParam) => {
  return await request({
    url: `/api/album/queryByPage`,
    method: "GET",
    params,
  });
};
const hide = async (params: { id: string }) => {
  return await request({
    url: `/api/album/hide`,
    method: "GET",
    params,
  });
};
const activate = async (params: { id: string }) => {
  return await request({
    url: `/api/album/activate`,
    method: "GET",
    params,
  });
};
const addAlbum = async (params: Album) => {
  return await request({
    url: `/api/album/add`,
    method: "POST",
    data: params,
  });
};
const updateAlbum = async (params: Album) => {
  return await request({
    url: `/api/album/update`,
    method: "POST",
    data: params,
  });
};
const updatePhoto = async (params: Photo) => {
  return await request({
    url: `/api/photo/updatePhoto`,
    method: "POST",
    data: params,
  });
};
const addPhoto = async (params: FormData) => {
  return await request({
    url: `/api/photo/addPhoto`,
    method: "POST",
    data: params,
  });
};
const queryByAlbum = async (params: { id: string }) => {
  return await request({
    url: `/api/photo/queryByAlbum`,
    method: "GET",
    params,
  });
};
const deleteById = async (params: { id: string; fileName: string }) => {
  return await request({
    url: `/api/photo/deleteById`,
    method: "GET",
    params,
  });
};

const album = {
  queryByPage,
  addAlbum,
  hide,
  activate,
  updateAlbum,
  addPhoto,
  queryByAlbum,
  updatePhoto,
  deleteById,
};
export default album;
