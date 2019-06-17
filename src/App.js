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
import './styles/styles.css';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [userRepos, setRepos] = useState([]);
  const [name, setName] = useState('');
  const [err, setErr] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    if (name === '') {
      setErr(true);
      setAlert({
        class: 'alert alert-info',
        msg: 'Please enter a name'
      });

      setTimeout(() => {
        setErr(false);
        setAlert(null);
      }, 3000);
      return;
    }
    setLoading(true);

    const res = await axios.get(
      `https://api.github.com/search/users?q=${name}&client_app_id=${
        process.env.REACT_APP_CLIENT_ID
      }&client_app_secret=${process.env.REACT_APP_CLIENT_SECRET}`
    );

    if (res.data.items.length === 0) {
      setLoading(false);
      setName('');
      setErr(true);
      setAlert({
        class: 'alert alert-info',
        msg: 'No users found...'
      });
      setUsers([]);

      setTimeout(() => {
        setErr(false);
        setAlert({
          err: false,
          alert: null
        });
      }, 3000);
      return;
    } else {
      setLoading(false);
      setErr(false);
      setUsers(res.data.items);
    }
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

  const handleChange = e => {
    setName(e.target.value);
  };

  const clear = () => {
    setUsers([]);
    setName('');
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          {err && <Alert alert={alert} />}
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Fragment>
                  <SearchBar
                    name={name}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    clear={clear}
                    isShown={users.length > 0 && true}
                  />
                  {loading ? <Spinner /> : <Users users={users} />}
                </Fragment>
              )}
            />
            <Route exact path="/about" component={About} />
            <Route
              exact
              path="/user/:name"
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
  );
};

export default App;
