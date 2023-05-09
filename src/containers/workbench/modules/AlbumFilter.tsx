/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Button, Row, Col, message, FormInstance } from "antd";
import moment from "moment";
import { ALBUM, SEACH_COLUMNS } from "../config/constants";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

import { getField } from "@/components/common/commenFunc";
import { useEffect } from "react";
import { useRequest } from "ahooks";
import { album } from "@/api";

type IProps = {
  runQueryByPage: (p: QueyAlbumParam) => void;
  setModalProps: (p: FormModalProps) => void;
  modalProps: FormModalProps;
  modalForm: FormInstance<any>;
  show: boolean;
  setShow: (p: boolean) => void;
  loading: boolean;
  setLoading: (p: boolean) => void;
};
function AlbumFilter(props: IProps) {
  const {
    runQueryByPage,
    setModalProps,
    modalProps,
    modalForm,
    show,
    setShow,
    setLoading,
  } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (!show) {
      runQueryByPage({ pgNum: 1, pgSize: 10 });
    }
  }, [runQueryByPage, show]);

  const { run: runAddAlbum } = useRequest(album.addAlbum, {
    onSuccess() {
      message.info("新增成功");
      setShow(false);
      setLoading(false);
    },
    onError(err) {
      if (err.message) message.error(err.message);
    },
    manual: true,
  });

  return (
    <>
      <Form
        form={form}
        style={{ margin: "30px 20px", minWidth: "750px" }}
        initialValues={{ remember: true }}
        onFinish={(val) => {
          runQueryByPage({
            keyword: val.keyword,
            start: val?.date && moment(val.date[0]).valueOf(),
            end: val?.date && moment(val.date[1]).valueOf(),
            pgNum: 1,
            pgSize: 10,
          });
        }}
        layout="vertical"
      >
        <Row gutter={24}>
          {SEACH_COLUMNS.map((item) => {
            return (
              <Col span={12} key={item.key || item.name}>
                <Form.Item
                  label={item.label}
                  name={item.name}
                  key={item.key || item.name}
                  style={{}}
                >
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
                  setShow(true);
                  setModalProps({
                    ...modalProps,
                    title: "新增专辑",
                    columns: ALBUM,
                    footer: [
                      <Button
                        type="primary"
                        htmlType="submit"
                        key={"create"}
                        block
                        onClick={() => {
                          modalForm.validateFields().then((res) => {
                            setLoading(true);
                            runAddAlbum(res);
                          });
                        }}
                      >
                        创建
                      </Button>,
                    ],
                  });
                }}
              >
                <PlusOutlined />
                新增
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default AlbumFilter;
