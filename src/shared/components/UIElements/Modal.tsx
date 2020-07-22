import React, { FC, FormEvent } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import Backdrop from './Backdrop';
import { IModalOverlay, IModal } from '../../../interfaces/other/Modal';
import './Modal.scss';

const ModalOverlay: FC<IModalOverlay> = ({
  className,
  style,
  headerClass,
  header,
  contentClass,
  onSubmit,
  footerClass,
  footer,
  children,
}) => {
  const content = (
    <div className={`modal ${className}`} style={style}>
      <header className={`modal__header ${headerClass}`}>
        <h2>{header}</h2>
      </header>
      <form
        onSubmit={
          onSubmit
            ? onSubmit
            : (event: FormEvent<HTMLFormElement>) => event.preventDefault()
        }
      >
        <div className={`modal__content ${contentClass}`}>{children}</div>
        <footer className={`modal__footer ${footerClass}`}>{footer}</footer>
      </form>
    </div>
  );
  // const content = <div style={{ color: 'white' }}>hello world!!</div>;
  return ReactDOM.createPortal(
    content,
    document.getElementById('modal-hook') as HTMLElement
  );
};

const Modal: React.FC<IModal> = (props) => {
  const { show, onCancel } = props;
  return (
    <>
      {show && <Backdrop onClick={onCancel} />}
      <CSSTransition
        in={show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </>
  );
};

export default Modal;
