import type { DataNode } from "antd/es/tree";

type LoginParam = {
  operName: string;
  operPwd: string;
};

interface RegisterParam extends LoginParam {
  phoneNo: string;
  operEmail: string;
  remark: string;
}

type Enums = {
  [x: string]: { text: string };
};

type SearchParam = {
  label: string;
  name: string;
  valueType?: string;
  key?: string;
  valueEnum?: Enums;
};

type SearchParams = SearchParam[];

interface DataType {
  [x: string]: any;
}

type TableMetaData = {
  [x: string]: any;
  title: string;
  dataIndex: string;
  key: string;
  valueType?: string;
  rules?: { required?: boolean; message?: string; [x: string]: any }[];
};

interface Resource extends DataNode {
  [x: string]: string;
  resourceId?: string;
  resourceName?: string;
  parentId?: string;
  resourcePath?: string;
  menuFlag?: number;
  hasChild?: number;
  sortNum?: number;
  resourceCode?: string;
  resourceUrl?: string;
  remark?: string;
  deleteFlag?: string;
  timeCreated?: number;
  timeUpdated: ?number;
}

interface ResourceWrapper extends Resource {
  children: Resource[];
}
