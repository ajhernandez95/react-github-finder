import React from 'react';

const Repo = ({ forks, watchers, url, name }) => {
  return (
    <div className='card grid-2'>
      <div>
        <h2>{name}</h2>
        <p>
          <span className='badge badge-primary'>Forks: {forks}</span>
          <span className='badge badge-success'>Watchers: {watchers}</span>
        </p>
      </div>
      <div style={{ textAlign: 'right' }}>
        <a
          href={url}
          target='_blank'
          rel='noopener noreferrer'
          className='btn btn-dark'
        >
          Go To Repoository
        </a>
      </div>
    </div>
  );
};

export default Repo;
