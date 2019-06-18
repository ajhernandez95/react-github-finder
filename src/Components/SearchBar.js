import React, { useState } from 'react';

const SearchBar = ({ getUsers, isShown, clear }) => {
  // const githubContext = useContext(GithubContext);

  const [name, setName] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    getUsers(name);
  };

  const handleChange = e => {
    setName(e.target.value);
  };

  return (
    <div>
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
        {isShown && (
          <button className='btn btn-info btn-block' onClick={clear}>
            Clear
          </button>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
