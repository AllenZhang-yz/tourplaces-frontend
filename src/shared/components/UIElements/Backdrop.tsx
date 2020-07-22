import React from 'react';
import ReactDOM from 'react-dom';

import { IBackdropProps } from '../../../interfaces/other/Backdrop';

import './Backdrop.scss';

const Backdrop: React.FC<IBackdropProps> = ({ onClick }) => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={onClick}></div>,
    document.getElementById('backdrop-hook') as HTMLElement
  );
};

export default Backdrop;
