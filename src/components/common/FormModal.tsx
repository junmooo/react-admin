import { Form, Modal, Spin } from "antd";
import { getField } from "./commenFunc";

const FormModal = (props: FormModalProps) => {
  const {
    columns,
    show,
    setShow,
    title,
    footer,
    form,
    loading = false,
  } = props;
  // const [form] = Form.useForm();

  return (
    <Modal
      open={show}
      width={"80vw"}
      onCancel={() => {
        setShow(false);
      }}
      footer={<></>}
      title={
        <div style={{ textAlign: "center", fontSize: "20px" }}>{title}</div>
      }
    >
      <Spin spinning={loading}>
        {columns.length > 0 && (
          <Form
            form={form}
            layout="vertical"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{
              width: "calc(80vw - 100px)",
              padding: "50px 0 50px 100px",
              maxHeight: "70vh",
              // overflowY: "scroll",
            }}
          >
            {columns.map((item) => (
              <Form.Item
                label={item.title}
                name={item.name}
                key={item.key || item.name}
                rules={item.rules}
              >
                {getField(item)}
              </Form.Item>
            ))}
            <Form.Item wrapperCol={{ span: 24 }} key={"footer"}>
              {footer && [...footer]}
            </Form.Item>
          </Form>
        )}
      </Spin>
    </Modal>
  );
};

export default FormModal;
