import React from 'react';

const SearchBar = ({ handleChange, handleSubmit, isShown, clear, name }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          name="name"
          onChange={handleChange}
          placeholder="Search User..."
        />
        <input
          type="submit"
          className="btn btn-dark btn-block"
          value="Search"
        />
        {isShown && (
          <button className="btn btn-info btn-block" onClick={clear}>
            Clear
          </button>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
