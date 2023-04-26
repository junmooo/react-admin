import { DataType } from "@/types/auth";
import { DatePicker, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import ImgUpload from "./ImgUpload";
const { RangePicker } = DatePicker;

const getOptions = (enums: { [x: string]: { text: string } }) => {
  return Object.keys(enums).map((key) => {
    return <Select.Option value={key}>{enums[key].text}</Select.Option>;
  });
};

const getField = (item: DataType) => {
  switch (item.valueType) {
    case "select":
      return (
        <Select
          placeholder={item.placeholder || "请选择"}
          allowClear={item.allowClear || true}
          defaultValue={item.initialValue}
          showSearch={item.showSearch}
        >
          {getOptions(item.valueEnum)}
        </Select>
      );
    case "dateRange":
      return (
        <RangePicker
          allowClear={item.allowClear || true}
          placeholder={item.placeholder || ["请选择", "请选择"]}
          format={item.dateFormatter}
        />
      );
    case "textArea":
      return (
        <TextArea
          allowClear={item.allowClear || true}
          rows={5}
          placeholder={item.placeholder || "请输入"}
        />
      );
    case "imgUpload":
      return (
        <ImgUpload
          onUpload={item.onUpload}
          fileList={item.fileList}
          onRemove={item.onRemove}
        />
      );
    default:
      return (
        <Input
          allowClear={item.allowClear || true}
          placeholder={item.placeholder || "请输入"}
        />
      );
  }
};

export { getField };
