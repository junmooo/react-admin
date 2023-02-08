import { SearchParams, Enums, DataType } from "@/types/auth";
import { Tag } from "antd";
import { ColumnsType } from "antd/es/table";

const OPER_STATUS_ENUMS: Enums = {
  "00": { text: "正常" },
  "01": { text: "锁定" },
};
const DELETE_FLAG_ENUMS: Enums = {
  "1": { text: "未删除" },
  "0": { text: "已删除" },
};
const TABLE_COLUMNS: ColumnsType<DataType> = [
  {
    title: "ID",
    dataIndex: "operId",
    key: "OPER_ID",
  },
  {
    title: "密码",
    dataIndex: "operPwd",
    key: "OPER_PWD",
  },
  {
    title: "用户名",
    dataIndex: "operName",
    key: "OPER_NAME",
  },
  {
    title: "邮箱",
    dataIndex: "operEmail",
    key: "OPER_EMAIL",
  },
  {
    title: "电话",
    dataIndex: "phoneNo",
    key: "PHONE_NO",
  },
  {
    title: "状态",
    dataIndex: "operStatus",
    key: "OPER_STATUS",
    render: (tag: string) => {
      let color = "green";
      let text = "正常";
      if (tag === "01") {
        color = "volcano";
        text = "锁定";
      }
      return (
        <Tag color={color} key={tag}>
          {text}
        </Tag>
      );
    },
  },
  {
    title: "备注",
    dataIndex: "remark",
    key: "REMARK",
  },
];
const SEACH_COLUMNS: SearchParams = [
  {
    label: "Name",
    name: "operName",
  },
  {
    label: "Email",
    name: "operEmail",
  },
  {
    label: "Phone No",
    name: "phoneNo",
  },
  {
    label: "Operator Status",
    name: "operStatus",
    valueType: "select",
    valueEnum: OPER_STATUS_ENUMS,
  },
  {
    label: "Delete Flag",
    name: "deleteFlag",
    valueType: "select",
    valueEnum: DELETE_FLAG_ENUMS,
  },
  {
    label: "REMARK",
    name: "remark",
  },
];

export { OPER_STATUS_ENUMS, DELETE_FLAG_ENUMS, SEACH_COLUMNS, TABLE_COLUMNS };
