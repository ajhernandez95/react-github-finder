import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Components/Navbar';
import SearchBar from './Components/SearchBar';
import Spinner from './Components/Spinner';
import Alert from './Components/Alert';
import Users from './Components/Users';
import User from './Components/pages/User';
import About from './Components/pages/About';

import GithubState from './context/github/GithubState';
import './styles/styles.css';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [userRepos, setRepos] = useState([]);
  const [err, setErr] = useState(false);
  const [alert, setAlert] = useState(null);

  const getUsers = async name => {
    setLoading(true);

    const res = await axios.get(
      `https://api.github.com/search/users?q=${name}&client_app_id=${
        process.env.REACT_APP_CLIENT_ID
      }&client_app_secret=${process.env.REACT_APP_CLIENT_SECRET}`
    );

    setLoading(false);
    setUsers(res.data.items);
  };

  const getUser = async name => {
    setLoading(true);

    const res = await axios.get(
      `https://api.github.com/users/${name}?client_app_id=${
        process.env.REACT_APP_CLIENT_ID
      }&client_app_secret=${process.env.REACT_APP_CLIENT_SECRET}`
    );
    const repos = await axios.get(`${res.data.repos_url}?per_page=10`);

    setLoading(false);
    setUser(res.data);
    setRepos(repos.data);
  };

  const clear = () => {
    setUsers([]);
  };

  return (
    <GithubState>
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            {err && <Alert alert={alert} />}
            <Switch>
              <Route
                exact
                path='/'
                render={props => (
                  <Fragment>
                    <SearchBar
                      getUsers={getUsers}
                      clear={clear}
                      isShown={users.length > 0 && true}
                    />
                    {loading ? <Spinner /> : <Users users={users} />}
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route
                exact
                path='/user/:name'
                render={props => (
                  <User
                    key={user.id}
                    {...props}
                    getUser={getUser}
                    user={user}
                    repos={userRepos}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
