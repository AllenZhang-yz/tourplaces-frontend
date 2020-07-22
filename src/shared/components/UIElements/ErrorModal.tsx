import React, { FC } from 'react';
import { IErrorModal } from '../../../interfaces/other/ErrorModal';
import Modal from './Modal';
import Button from '../FormElements/Button';

const ErrorModal: FC<IErrorModal> = ({ onClear, error }) => {
  return (
    <Modal
      onCancel={onClear}
      header="An Error Occurred!"
      show={!!error}
      footer={<Button onClick={onClear}>Okay</Button>}
    >
      <p>{error}</p>
    </Modal>
  );
};

export default ErrorModal;
