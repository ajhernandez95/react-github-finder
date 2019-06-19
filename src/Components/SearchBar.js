import React, { useState, useContext } from 'react';
import GithubContext from '../context/github/githubContext';
import AlertContext from '../context/alerts/alertContext';
import Alert from './Alert';

const SearchBar = () => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);
  const [name, setName] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (name === '') {
      alertContext.setAlert('Please enter a name...', 'alert alert-primary');
      return;
    } else {
      githubContext.getUsers(name);
    }
  };

  const handleChange = e => {
    setName(e.target.value);
  };

  return (
    <div>
      {alertContext.alert && <Alert />}
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={name}
          name='name'
          onChange={handleChange}
          placeholder='Search User...'
        />
        <input
          type='submit'
          className='btn btn-dark btn-block'
          value='Search'
        />
        {githubContext.users.length > 0 && (
          <button
            className='btn btn-light btn-block'
            onClick={() => {
              githubContext.clearUsers();
              setName('');
            }}
          >
            Clear
          </button>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
