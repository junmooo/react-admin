import { useEffect, useState } from "react";
import { Button, Tree, Spin, message, Descriptions } from "antd";
import type { TreeProps } from "antd/es/tree";

import { auth } from "@/api";
import { TABLE_COLUMNS, MENU_FLAG_ENUMS } from "./config/constants";
import { ResourceWrapper, TableMetaData } from "@/types/auth";
import { useRequest } from "ahooks";

import "./auth.less";
import AuthModal from "./modules/AuthModal";

function AuthManage() {
  const [data, setData] = useState<ResourceWrapper>();
  const [currData, setCurrData] = useState<any>();
  const [show, isShow] = useState(false);
  const { loading, run: getResources } = useRequest(auth.resources, {
    onSuccess(res) {
      setCurrData(res.data[0]);
      setData(res.data);
    },
    onError(err) {
      if (err.message) message.error(err.message);
    },
    manual: true,
  });

  const onSelect: TreeProps["onSelect"] = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
  };

  const onCheck: TreeProps["onCheck"] = (checkedKeys, info) => {
    console.log("onCheck", checkedKeys, info);
  };

  useEffect(() => {
    getResources({});
  }, [getResources]);

  const getFieldMapping = (item: TableMetaData) => {
    const dataIndex = item.dataIndex;
    if (!currData) {
      return "";
    }
    if (dataIndex === "menuFlag") {
      const menuFlag = currData.menuFlag as number;

      return (
        (menuFlag === 1 || menuFlag === 0) && MENU_FLAG_ENUMS[menuFlag].text
      );
    }
    if (dataIndex === "hasChild") {
      const hasChild = currData.hasChild as number;
      return (
        (hasChild === 1 || hasChild === 0) && MENU_FLAG_ENUMS[hasChild].text
      );
    }
    return currData[dataIndex];
  };

  return (
    <Spin spinning={loading}>
      <div className="auth-manage-ctn">
        <div className="tree-ctn">
          <Tree
            fieldNames={{ title: "resourceName", key: "resourceId" }}
            onSelect={onSelect}
            onCheck={onCheck}
            onClick={(_, val) => {
              setCurrData(val);
            }}
            treeData={data as any}
          />
        </div>

        <Descriptions
          title="资源详情信息"
          bordered
          style={{ width: "100%" }}
          extra={
            <div className="description-actions">
              <Button
                type="primary"
                onClick={() => {
                  isShow(true);
                }}
              >
                新增
              </Button>
              <Button type="primary">修改</Button>
              <Button type="primary">删除</Button>
            </div>
          }
        >
          {TABLE_COLUMNS.map((item: TableMetaData) => {
            return (
              <Descriptions.Item label={item.title}>
                {getFieldMapping(item)}
              </Descriptions.Item>
            );
          })}
        </Descriptions>
      </div>
      <AuthModal isShow={isShow} show={show} title="添加" />
    </Spin>
  );
}
export default AuthManage;
