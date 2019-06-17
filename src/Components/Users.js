import React from 'react';
import UserTile from './UserTile';

const Users = ({ users }) => {
  return (
    <div style={userStyle}>
      {users.map(user => (
        <UserTile key={user.id} user={user} />
      ))}
    </div>
  );
};

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem'
};

export default Users;
