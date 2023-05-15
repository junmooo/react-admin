import { store } from "@/api";
import {
  Button,
  List,
  message,
  Skeleton,
  Layout,
  Upload,
  UploadProps,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { useRequest } from "ahooks";
import { useEffect, useState } from "react";
const { Content, Sider } = Layout;

function Store() {
  const [data, setData] = useState([]);
  const { loading: listLoading, run: runList } = useRequest(store.listStore, {
    manual: true,
    onSuccess: (res) => {
      setData(res.data);
      message.success("操作成功");
    },
  });
  const { run: runDel } = useRequest(store.delStore, {
    manual: true,
    onSuccess: () => {
      message.success("操作成功");
      runList();
    },
  });
  const { run: runStore } = useRequest(store.upStore, {
    manual: true,
    onSuccess: () => {
      message.success("操作成功");
      runList();
    },
  });
  useEffect(() => {
    runList();
  }, [runList]);

  const props: UploadProps = {
    name: "file",
    headers: {
      authorization: "authorization-text",
    },
    beforeUpload: (file) => {
      const form = new FormData();
      form.append("file", file);
      runStore(form);
      return false;
    },
  };
  return (
    <Layout>
      <Sider>
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>点击上传</Button>
        </Upload>
      </Sider>
      <Content>
        <List
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button onClick={() => runDel({ fileName: item })}>
                  删除
                </Button>,
              ]}
            >
              <Skeleton avatar title={false} loading={listLoading} active>
                <List.Item.Meta
                  title={
                    <a
                      href={`https://qingbing.top/store/${item}`}
                      target="blank"
                    >
                      {item}
                    </a>
                  }
                />
              </Skeleton>
            </List.Item>
          )}
          dataSource={data}
        />
      </Content>
    </Layout>
  );
}

export default Store;
