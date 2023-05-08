import React from "react";

import { Breadcrumb, Layout, theme } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import CustMenu from "./menu";
import "./style.less";

const { Header, Sider } = Layout;

const Layouts: React.FC = (props) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { pathname } = useLocation();

  return (
    <Layout style={{ minWidth: "1200px" }}>
      <Header className="header">
        <div className="logo">摄影专辑 管理后台</div>
      </Header>
      <Layout>
        <Sider width={250} style={{ background: colorBgContainer }}>
          <CustMenu />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>{pathname.split("/").join(" | ")}</Breadcrumb.Item>
          </Breadcrumb>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Layouts;
