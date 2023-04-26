/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState } from "react";
import { Button, Form, Spin, Table, message, InputNumber } from "antd";
import type { ColumnsType } from "antd/es/table";
import { album } from "@/api";
import { ALBUM, EXPANDED_ROW_COLUMN, TABLE_COLUMNS } from "./config/constants";
import { DataType } from "@/types/auth";
import { useRequest } from "ahooks";
import FormModal from "@/components/common/FormModal";
import AlbumFilter from "./modules/AlbumFilter";
import { debounce } from "lodash";

type AlbumVO = { album: Album; photos: Photo[] };
const AlbumManage: React.FC = () => {
  const [data, setData] = useState<Album[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalForm] = Form.useForm();
  const [modalProps, setModalProps] = useState<FormModalProps>({
    columns: [],
    title: "",
    show: showModal,
    setShow: setShowModal,
    footer: [<></>],
  });
  const { loading: upLoadLoading, run: runUpload } = useRequest(
    album.addPhoto,
    {
      manual: true,
      onSuccess: () => {
        message.success("操作成功");
      },
    }
  );
  const { loading: updateLoading, run: runUpdateAlbum } = useRequest(
    album.updateAlbum,
    {
      onSuccess() {
        message.success("修改成功");
        setShowModal(false);
      },
      onError(err) {
        if (err.message) message.error(err.message);
      },
      manual: true,
    }
  );
  const { loading: updatePhotoLoading, run: runUpdatePhoto } = useRequest(
    album.updatePhoto,
    {
      onSuccess() {
        message.success("修改成功");
        setShowModal(false);
        runQueryByPage({
          pgNum: 1,
          pgSize: 10,
        });
      },
      onError(err) {
        if (err.message) message.error(err.message);
      },
      manual: true,
    }
  );
  const { loading: deleteByIdLoading, run: deleteById } = useRequest(
    album.deleteById,
    {
      onSuccess() {
        message.success("修改成功");
        runQueryByPage({
          pgNum: 1,
          pgSize: 10,
        });
      },
      onError(err) {
        if (err.message) message.error(err.message);
      },
      manual: true,
    }
  );
  const { loading: queryByPageLoading, run: runQueryByPage } = useRequest(
    album.queryByPage,
    {
      onSuccess({ data: { records } }: { data: { records: AlbumVO[] } }) {
        const albums = records.map((e) => ({ ...e.album, photos: e.photos }));
        setData(albums);
      },
      onError(err) {
        if (err.message) message.error(err.message);
      },
      manual: true,
    }
  );
  const tableActions = (_: any, record: any) => (
    <>
      {record.hideFlag === "01" ? (
        <Button
          type="link"
          style={{ color: "red" }}
          onClick={() => {
            runUpdateAlbum({ id: record.id, hideFlag: "00" });
          }}
        >
          隐藏
        </Button>
      ) : (
        <Button
          type="link"
          style={{ color: "green" }}
          onClick={() => {
            runUpdateAlbum({ id: record.id, hideFlag: "01" });
          }}
        >
          激活
        </Button>
      )}
      <Button
        type="link"
        onClick={() => {
          setShowModal(true);
          modalForm.setFieldsValue(record);
          setModalProps({
            ...modalProps,
            title: "修改专辑",
            columns: ALBUM,
            footer: [
              <Button
                type="primary"
                htmlType="submit"
                key={"create"}
                block
                onClick={() => {
                  modalForm.validateFields().then((res) => {
                    runUpdateAlbum({ ...res, id: record.id });
                  });
                }}
              >
                修改
              </Button>,
            ],
          });
        }}
      >
        修改
      </Button>
      <Button
        type="link"
        onClick={() => {
          setShowModal(true);
          setModalProps({
            ...modalProps,
            title: "添加照片",
            columns: [
              {
                title: "",
                name: "url",
                key: "url",
                valueType: "imgUpload",
                fileList: record.photos.map((e: Photo) => ({
                  uid: e.id,
                  name: e.name,
                  url:
                    e?.url?.substring(0, e.url.lastIndexOf(".")) +
                    "-pre" +
                    e?.url?.substring(e.url.lastIndexOf(".")),
                  status: "done",
                })),
                onRemove: (p: { id: string; fileName: string }) => {
                  deleteById(p);
                },
                onUpload: (file: File) => {
                  const fd = new FormData();
                  fd.append("file", file);
                  fd.append("album", record.id);
                  fd.append("sortOrder", "0");
                  runUpload(fd);
                },
              },
            ],

            footer: [],
          });
        }}
      >
        添加照片
      </Button>
    </>
  );

  const updateSort = useCallback(
    debounce((value) => {
      runUpdateAlbum(value);
    }, 1000),
    []
  );
  const updateSortPhoto = useCallback(
    debounce((value) => {
      runUpdatePhoto(value);
    }, 1000),
    []
  );
  const columns: ColumnsType<DataType> = [
    ...TABLE_COLUMNS,
    {
      title: "排序",
      dataIndex: "sortOrder",
      key: "sortOrder",
      width: "120px",
      render: (value, record) => {
        return (
          <InputNumber
            bordered={false}
            // addonBefore={<EditOutlined />}
            // addonAfter={<EditOutlined />}
            min={0}
            defaultValue={value}
            onChange={(value) => updateSort({ ...record, sortOrder: value })}
          />
        );
      },
    },
    {
      title: "操作",
      key: "action",
      align: "center",
      fixed: "right",
      width: "250px",
      render: tableActions,
    },
  ];
  const PHOTOS_COLUNM: ColumnsType<DataType> = [
    ...EXPANDED_ROW_COLUMN,
    {
      title: "排序",
      dataIndex: "sortOrder",
      key: "sortOrder-photo",
      width: "120px",
      render: (value, record) => {
        return (
          <InputNumber
            bordered={false}
            min={0}
            defaultValue={value}
            onChange={(value) =>
              updateSortPhoto({ ...record, sortOrder: value })
            }
          />
        );
      },
    },
    {
      title: "操作",
      dataIndex: "operation",
      key: "operation-photo",
      render: (_: any, record: any) => {
        const flag = record.hideFlag === "01";
        return (
          <>
            <Button
              type="link"
              style={{ color: `${flag ? "red" : "green"}` }}
              onClick={() => {
                runUpdatePhoto({
                  ...record,
                  hideFlag: `${flag ? "00" : "01"}`,
                });
              }}
            >
              {flag ? "隐藏" : "激活"}
            </Button>
            <Button
              type="link"
              style={{ color: "red" }}
              onClick={() => {
                deleteById({ id: record.id, fileName: record.name });
              }}
            >
              删除
            </Button>
          </>
        );
      },
    },
  ];

  const expandedRowRender = (param: Album) => {
    return (
      <Table
        columns={PHOTOS_COLUNM}
        dataSource={param.photos}
        pagination={false}
        rowKey={"id"}
      />
    );
  };
  return (
    <Spin
      spinning={
        updateLoading ||
        upLoadLoading ||
        updatePhotoLoading ||
        deleteByIdLoading
      }
    >
      <div>
        <AlbumFilter
          runQueryByPage={runQueryByPage}
          setModalProps={setModalProps}
          modalProps={modalProps}
          modalForm={modalForm}
          show={showModal}
          loading={loading}
          setShow={setShowModal}
          setLoading={setLoading}
        />
        <Table
          loading={queryByPageLoading}
          columns={columns}
          expandable={{ expandedRowRender }}
          rowKey={"id"}
          dataSource={data}
          sticky={true}
          scroll={{ x: 1000 }}
        />
        <FormModal
          {...modalProps}
          form={modalForm}
          show={showModal}
          loading={loading}
        />
      </div>
    </Spin>
  );
};

export default AlbumManage;
