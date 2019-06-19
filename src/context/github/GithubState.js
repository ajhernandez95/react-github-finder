import React, { useReducer } from 'react';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import axios from 'axios';
import {
  SEARCH_USERS,
  SEARCH_USER,
  SEARCH_REPOS,
  SET_LOADING,
  CLEAR_USERS
} from '../types';

let githubClientID, githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
  githubClientID = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientID = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = props => {
  const initialState = {
    loading: false,
    users: [],
    user: {},
    userRepos: [],
    err: false,
    alert: null
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // actions go here
  const getUsers = async name => {
    setLoading();

    const res = await axios.get(
      `https://api.github.com/search/users?q=${name}&client_app_id=${githubClientID}&client_app_secret=${githubClientSecret}`
    );

    dispatch({ type: SEARCH_USERS, payload: res.data.items });
  };

  const getUser = async name => {
    setLoading();

    const res = await axios.get(
      `https://api.github.com/users/${name}?client_app_id=${githubClientID}&client_app_secret=${githubClientSecret}`
    );

    dispatch({ type: SEARCH_USER, payload: res.data });
  };

  const getRepos = async name => {
    setLoading();

    const repos = await axios.get(
      `https://api.github.com/users/${name}/repos?per_page=10&client_app_id=${githubClientID}&client_app_secret=${githubClientSecret}`
    );

    dispatch({ type: SEARCH_REPOS, payload: repos.data });
  };

  const setLoading = () => dispatch({ type: SET_LOADING });

  const clearUsers = () => dispatch({ type: CLEAR_USERS });
  return (
    <GithubContext.Provider
      value={{
        loading: state.loading,
        users: state.users,
        user: state.user,
        userRepos: state.userRepos,
        name: state.name,
        err: state.err,
        alert: state.alert,
        getUsers,
        getUser,
        getRepos,
        clearUsers
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
