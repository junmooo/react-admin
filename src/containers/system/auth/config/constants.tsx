import { TableMetaData } from "@/types/auth";

const MENU_FLAG_ENUMS = {
  0: { text: "否" },
  1: { text: "是" },
};

const HAS_CHILD_ENUMS = {
  0: { text: "不含" },
  1: { text: "含有" },
};

const TABLE_COLUMNS: TableMetaData[] = [
  {
    title: "ID",
    dataIndex: "resourceId",
    key: "resourceId",
    rules: [{ required: true, message: `Please input resourceId` }],
  },
  {
    title: "资源名称",
    dataIndex: "resourceName",
    key: "resourceName",
    rules: [{ required: true, message: `Please input resourceName` }],
  },
  {
    title: "父节点ID",
    dataIndex: "parentId",
    key: "parentId",
    rules: [{ required: true, message: `Please input parentId` }],
  },
  {
    title: "资源路径",
    dataIndex: "resourcePath",
    key: "resourcePath",
    rules: [{ required: true, message: `Please input resourcePath` }],
  },
  {
    title: "是否是菜单",
    valueType: "select",
    dataIndex: "menuFlag",
    valueEnum: MENU_FLAG_ENUMS,
    key: "menuFlag",
    rules: [{ required: true, message: `Please input menuFlag` }],
  },
  {
    title: "是否有子菜单",
    dataIndex: "hasChild",
    valueType: "select",
    key: "hasChild",
    valueEnum: HAS_CHILD_ENUMS,
    rules: [{ required: true, message: `Please input hasChild` }],
  },
  {
    title: "排序序号",
    dataIndex: "sortNum",
    key: "sortNum",
    rules: [{ required: true, message: `Please input sortNum` }],
  },
  {
    title: "备注",
    dataIndex: "remark",
    key: "REMARK",
  },
];

export { TABLE_COLUMNS, MENU_FLAG_ENUMS, HAS_CHILD_ENUMS };
