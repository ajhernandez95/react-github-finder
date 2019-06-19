import React, { useContext } from 'react';
import GithubContext from '../context/github/githubContext';
import Spinner from './Spinner';
import UserTile from './UserTile';

const Users = () => {
  const githubContext = useContext(GithubContext);
  return githubContext.loading ? (
    <Spinner />
  ) : (
    <div style={userStyle}>
      {githubContext.users.map(user => (
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
