import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { ISideDrawerProps } from '../../../interfaces/other/SideDrawer';

import './SideDrawer.scss';

const SideDrawer: React.FC<ISideDrawerProps> = ({
  children,
  show,
  onClick,
}) => {
  const content = (
    <CSSTransition
      in={show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside className="side-drawer" onClick={onClick}>
        {children}
      </aside>
    </CSSTransition>
  );
  return ReactDOM.createPortal(
    content,
    document.getElementById('drawer-hook') as HTMLElement
  );
};

export default SideDrawer;
