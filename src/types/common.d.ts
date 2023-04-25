interface FormModalProps {
  columns: any[];
  show: boolean;
  setShow: (show: boolean) => void;
  onOk?: (p: any) => void;
  title?: string;
  footer?: React.ReactNode[];
  form?: FormInstance<any>;
  loading?: boolean;
}
