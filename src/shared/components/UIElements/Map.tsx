import React, { FC, useRef, useEffect } from 'react';
import { IMap } from '../../../interfaces/other/Map';

import './Map.scss';

const Map: FC<IMap> = ({ className, style, center, zoom }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        center,
        zoom,
      });
      new window.google.maps.Marker({ position: center, map });
    }
  }, [center, zoom]);

  return <div ref={mapRef} className={`map ${className}`} style={style}></div>;
};

export default Map;
