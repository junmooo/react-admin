import { Button, Form, Modal, message } from "antd";
import { memo, useEffect } from "react";
import { TABLE_COLUMNS } from "../config/constants";
import { getField } from "@/components/common/commenFunc";

type AuthModalType = {
  isShow: Function;
  show: boolean;
  title: string;
  record?: any;
};

const AuthModal = memo((props: AuthModalType) => {
  const [form] = Form.useForm();
  const { isShow, show, title, record } = props;
  const onFinish = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values);
      })
      .catch((info) => {
        message.error("校验失败" + info.errorFields);
      });
  };

  useEffect(() => {
    if (record) {
      form.setFieldsValue(record);
    }
  }, [form, record]);
  return (
    <Modal
      width={"700px"}
      open={show}
      onCancel={() => {
        isShow(false);
      }}
      onOk={(values) => {
        console.log(values);
      }}
      footer={[
        <Button type="primary" onClick={onFinish}>
          确定
        </Button>,
      ]}
      title={
        <div style={{ textAlign: "center", fontSize: "20px" }}>{title}</div>
      }
    >
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        style={{ maxWidth: 600, margin: "50px 0" }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        {TABLE_COLUMNS.map((item) => {
          return (
            <Form.Item
              label={item.title}
              name={item.dataIndex}
              key={item.dataIndex}
              rules={item.rules}
            >
              {getField(item)}
            </Form.Item>
          );
        })}
      </Form>
    </Modal>
  );
});

export default AuthModal;
