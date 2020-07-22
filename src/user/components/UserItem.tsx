import React from 'react';
import { Link } from 'react-router-dom';
import './UserItem.scss';
import { IUserItem } from '../../interfaces/user/user';
import Avatar from '../../shared/components/UIElements/Avatar';
import Card from '../../shared/components/UIElements/Card';

interface IUserItemProps extends IUserItem {}

const UserItem: React.FC<IUserItemProps> = ({ id, name, places, image }) => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${id}/places`}>
          <div className="user-item__image">
            <Avatar
              image={`${process.env.REACT_APP_BACKEND_URL}/${image}`}
              alt={name}
            />
          </div>
          <div className="user-item__info">
            <h2>{name}</h2>
            <h3>
              {places.length}&nbsp;
              {places.length <= 1 ? 'Place' : 'Places'}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
