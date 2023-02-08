import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Spin, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { auth } from "@/api";
import Register from "@/containers/auth/modules/Register";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { SEACH_COLUMNS, TABLE_COLUMNS } from "./config/constants";
import { DataType } from "@/types/auth";
import { useRequest } from "ahooks";
import { getField } from "@/components/common/commenFunc";

const { confirm } = Modal;
const UserManage: React.FC = () => {
  const [data, setData] = useState([]);
  const columns: ColumnsType<DataType> = [
    ...TABLE_COLUMNS,
    {
      title: "操作",
      key: "action",
      align: "center",
      render: (_, record) => (
        <>
          <Button
            type="link"
            style={{ color: "red" }}
            onClick={() => {
              confirm({
                title: `确定要删除?`,
                onOk() {
                  delOperator(record);
                },
              });
            }}
          >
            删除
          </Button>
          <Button
            type="link"
            onClick={() => {
              setCurrent(record);
              isShow(true);
              setRegisterTitle("修改");
            }}
          >
            修改
          </Button>
          <Button
            type="link"
            style={{ color: "green" }}
            onClick={() => {
              const flag = record.operStatus === "00";
              const text = flag ? "禁用" : "启用";
              setCurrent(record);
              confirm({
                title: `确定要${text}?`,
                onOk() {
                  record.operStatus = flag ? "01" : "00";
                  updateOper(record);
                },
              });
            }}
          >
            {record.operStatus === "00" ? "禁用" : "启用"}
          </Button>
        </>
      ),
    },
  ];
  const { loading: getListloading, run: getList } = useRequest(auth.operList, {
    onSuccess(res) {
      setData(res.data);
    },
    onError(err) {
      if (err.message) message.error(err.message);
    },
    manual: true,
  });
  const { loading, run: updateOper } = useRequest(auth.updateOpers, {
    onSuccess(res) {
      getList({});
    },
    onError(err) {
      if (err.message) message.error(err.message);
    },
    manual: true,
  });

  const [form] = Form.useForm();
  const [show, isShow] = useState(false);
  const [registerTitle, setRegisterTitle] = useState("修改");
  const [current, setCurrent] = useState<DataType | null>();
  useEffect(() => {
    if (!show) {
      getList({});
    }
  }, [getList, show]);
  const delOperator = (record: DataType) => {
    auth
      .delOper({ operId: record.operId })
      .then(() => {
        message.success("删除成功");
        getList({});
      })
      .catch((e) => message.error(e));
  };
  function onSearch(values: DataType): void {
    auth
      .operList(values)
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => message.error(e));
  }

  return (
    <Spin spinning={loading}>
      <div>
        <Form
          form={form}
          style={{ margin: "30px 20px" }}
          initialValues={{ remember: true }}
          onFinish={onSearch}
        >
          <Row gutter={24}>
            {SEACH_COLUMNS.map((item) => {
              return (
                <Col span={6} key={item.key || item.name}>
                  <Form.Item label={item.label} name={item.name}>
                    {getField(item)}
                  </Form.Item>
                </Col>
              );
            })}
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: "right" }}>
              <Button type="primary" htmlType="submit">
                <SearchOutlined />
                查询
              </Button>
              <span style={{ marginLeft: "10px" }}>
                <Button
                  type="primary"
                  onClick={() => {
                    isShow(true);
                    setRegisterTitle("新增");
                    setCurrent(null);
                  }}
                >
                  <PlusOutlined />
                  新增
                </Button>
              </span>
            </Col>
          </Row>
        </Form>
        <Table
          loading={getListloading}
          columns={columns}
          rowKey={"operId"}
          dataSource={data}
        />
        <Register
          isShow={isShow}
          show={show}
          title={registerTitle}
          record={current}
        ></Register>
      </div>
    </Spin>
  );
};

export default UserManage;
