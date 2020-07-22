import React from 'react';
import './Avatar.scss';
import { IAvatarProps } from '../../../interfaces/other/Avatar';

const Avatar: React.FC<IAvatarProps> = ({
  className,
  style,
  image,
  alt,
  width,
  height,
}) => {
  return (
    <div className={`avatar ${className}`} style={style}>
      <img src={image} alt={alt} style={{ width: width, height: height }} />
    </div>
  );
};

export default Avatar;
