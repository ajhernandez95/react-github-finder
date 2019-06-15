import React from 'react';
import { Link } from 'react-router-dom';

const UserTile = ({ user: { avatar_url, html_url, login } }) => {
  return (
    <div className="card text-center">
      <img
        src={avatar_url}
        style={{ width: '60px' }}
        className="round-img"
        alt="profile"
      />
      <h4>{login}</h4>
      <div>
        <Link to={`/user/${login}`} className="btn btn-dark btn-sm">
          More
        </Link>
      </div>
    </div>
  );
};

export default UserTile;
