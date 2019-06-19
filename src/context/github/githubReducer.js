import {
  SEARCH_USERS,
  SEARCH_USER,
  SEARCH_REPOS,
  SET_LOADING,
  CLEAR_USERS
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case SEARCH_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    case SEARCH_USER:
      return {
        ...state,
        user: action.payload,
        loading: false
      };

    case SEARCH_REPOS:
      return {
        ...state,
        userRepos: action.payload,
        loading: false
      };
    case CLEAR_USERS:
      return {
        ...state,
        users: []
      };

    default:
      return state;
  }
};
