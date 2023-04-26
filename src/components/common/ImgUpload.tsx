import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

type Iprops = {
  onUpload: (p: File) => void;
  fileList: UploadFile[];
  onRemove: (p: { id: string; fileName: string }) => void;
};

const ImgUpload = ({ onUpload, fileList: files, onRemove }: Iprops) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>(files || []);

  const handleCancel = () => setPreviewOpen(false);

  useEffect(() => {
    setFileList(files);
  }, [files]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(
      file.url?.replaceAll("-pre", "") || (file.preview as string)
    );
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    // console.log("hi", hi);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <div style={{ height: "60vh", overflowY: "scroll" }}>
      <Upload
        listType="picture-card"
        beforeUpload={(file) => {
          // setFileList([...fileList, file]);
          onUpload(file);
          return false;
        }}
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={(file) => {
          onRemove({ id: file.uid, fileName: file.name });
        }}
      >
        {fileList.length >= 100 ? null : uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </div>
  );
};

export default ImgUpload;
