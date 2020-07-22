import React from 'react';

import './MainHeader.scss';

const MainHeader: React.FC = ({ children }) => {
  return <header className="main-header">{children}</header>;
};

export default MainHeader;
