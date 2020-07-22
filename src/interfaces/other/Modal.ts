export interface IModalOverlay {
  className?: string;
  style?: any;
  headerClass?: string;
  header?: string;
  onSubmit?: () => void;
  contentClass?: string;
  footerClass?: string;
  footer?: JSX.Element;
}

export interface IModal extends IModalOverlay {
  show: boolean;
  onCancel: () => void;
}
