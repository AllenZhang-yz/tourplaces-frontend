import React from 'react';

import './Card.scss';
import { ICardProps } from '../../../interfaces/other/Card';

const Card: React.FC<ICardProps> = ({ className, style, children }) => {
  return (
    <div className={`card ${className}`} style={style}>
      {children}
    </div>
  );
};

export default Card;
