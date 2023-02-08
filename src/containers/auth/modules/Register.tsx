import { Button, Form, Input, Modal, message } from "antd";
import { auth } from "@/api";
import { useEffect } from "react";

type registerType = {
  isShow: Function;
  show: boolean;
  title: string;
  record?: any;
};

function Register(props: registerType) {
  const [form] = Form.useForm();
  const { isShow, show, title, record } = props;
  const onFinish = () => {
    form
      .validateFields()
      .then((values) => {
        auth.register(values).then(() => {
          isShow(false);
        });
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
        // onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="operName"
          key={"operName"}
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="operPwd"
          key={"operPwd"}
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password disabled={record ? true : false} />
        </Form.Item>

        <Form.Item
          label="Email"
          name="operEmail"
          key={"operEmail"}
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Phone No" name="phoneNo" key={"phoneNo"}>
          <Input />
        </Form.Item>

        <Form.Item label="Remark" name="remark" key={"remark"}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default Register;
