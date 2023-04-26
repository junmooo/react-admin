import { SearchParams, DataType } from "@/types/auth";
import { Image, Badge } from "antd";
import { ColumnsType } from "antd/es/table";
import moment from "moment";

const RULE_REQUIRED = [{ required: true, message: "该项为必填项" }];

const TABLE_COLUMNS: (ColumnsType<DataType>[number] & {
  editable?: boolean;
  dataIndex: string;
})[] = [
  {
    title: "专辑名称",
    dataIndex: "albumName",
    key: "albumName",
  },
  {
    title: "标题",
    dataIndex: "albumTitle",
    key: "albumTitle",
  },
  {
    title: "副标题",
    dataIndex: "albumSubTitle",
    key: "albumSubTitle",
  },
  {
    title: "专辑描述",
    dataIndex: "albumDesc",
    key: "albumDesc",
    ellipsis: true,
  },
  {
    title: "创建时间",
    dataIndex: "timeCreated",
    key: "timeCreated",
    render: (value, record, index) => {
      return moment(value).format("yy-MM-DD hh:mm");
    },
  },
];
const SEACH_COLUMNS: SearchParams = [
  {
    label: "关键词：（标题、副标题、描述、备注）",
    name: "keyword",
    key: "keyword",
  },
  {
    label: "创建时间：",
    name: "date",
    valueType: "dateRange",
    key: "date",
  },
];

const ALBUM = [
  {
    title: "专辑名称",
    name: "albumName",
    key: "albumName",
    rules: RULE_REQUIRED,
  },
  {
    title: "标题",
    name: "albumTitle",
    key: "albumTitle",
    rules: RULE_REQUIRED,
  },
  {
    title: "副标题",
    name: "albumSubTitle",
    key: "albumSubTitle",
  },
  {
    title: "专辑描述",
    name: "albumDesc",
    valueType: "textArea",
    key: "albumDesc",
  },
];

const EXPANDED_ROW_COLUMN: ColumnsType<DataType> = [
  {
    title: "上传时间",
    dataIndex: "timeCreated",
    key: "timeCreated",
    render: (value) => {
      return moment(value).format("yy-MM-DD hh:mm");
    },
  },
  {
    title: "显示/隐藏",
    dataIndex: "hideFlag",
    key: "hideFlag",
    render: (v: string) => {
      if (v === "01") {
        return <Badge status="success" text="显示" />;
      } else {
        return <Badge status="error" text="隐藏" />;
      }
    },
  },
  {
    title: "预览",
    dataIndex: "url",
    key: "url",
    render: (v: string) => {
      const offsetIndex = v.lastIndexOf(".");
      const preUrl =
        v.substring(0, offsetIndex) + "-pre" + v.substring(offsetIndex);
      return <Image src={preUrl} preview={false} />;
    },
  },
];

export { SEACH_COLUMNS, TABLE_COLUMNS, ALBUM, EXPANDED_ROW_COLUMN };
