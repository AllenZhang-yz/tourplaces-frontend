import React from 'react';
import UserItem from './UserItem';
import Card from '../../shared/components/UIElements/Card';
import { IUsersList } from '../../interfaces/user/user';
import './UsersList.scss';

interface IUsersListProps extends IUsersList {}

const UsersList: React.FC<IUsersListProps> = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No users found</h2>
        </Card>
      </div>
    );
  }
  return (
    <ul className="users-list">
      {items.map(({ id, image, name, places }) => (
        <UserItem key={id} image={image} name={name} places={places} id={id} />
      ))}
    </ul>
  );
};

export default UsersList;
