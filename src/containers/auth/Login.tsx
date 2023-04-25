import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import "./login.less";
import { auth } from "@/api";
import { useNavigate } from "react-router-dom";
import Register from "./modules/Register";

const Login: React.FC = () => {
  const [show, isShow] = useState(false);
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    auth
      .login(values)
      .then(() => {
        message.success("登陆成功");
        navigate("/workbench");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="login-container">
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        style={{ width: 500 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        // autoComplete="off"
        layout="horizontal"
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
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ span: 24 }}
        >
          <div className="submit-bar">
            <Button
              type="link"
              onClick={() => {
                isShow(true);
              }}
            >
              注册
            </Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form.Item>
      </Form>

      <Register isShow={isShow} show={show} title={"注册"} />
    </div>
  );
};

export default Login;
