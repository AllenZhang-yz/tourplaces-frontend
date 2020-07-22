import React, { FC } from 'react';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import PlaceItem from './PlaceItem';
import { IPlaceList } from '../../interfaces/places/place';

import './PlaceList.scss';

const PlaceList: FC<IPlaceList> = ({ items, onDelete }) => {
  if (items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No Places found. Maybe create one?</h2>
          <Button to="/places/new">Share Place</Button>
        </Card>
      </div>
    );
  }
  return (
    <ul className="place-list">
      {items.map(({ id, ...restProps }) => (
        <PlaceItem key={id} id={id} {...restProps} onDelete={onDelete} />
      ))}
    </ul>
  );
};

export default PlaceList;
