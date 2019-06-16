import React, { Fragment, Component } from 'react';
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

class App extends Component {
  state = {
    title: 'GitHub Finder',
    icon: 'fab fa-github',
    loading: false,
    users: [],
    user: {},
    userRepos: [],
    name: '',
    err: false,
    alert: null
  };

  handleSubmit = async e => {
    e.preventDefault();
    if (this.state.name === '') {
      this.setState({
        name: '',
        err: true,
        alert: {
          class: 'alert alert-info',
          msg: 'Please enter a name...'
        }
      });
      setTimeout(
        () =>
          this.setState({
            err: false,
            alert: null
          }),
        3000
      );
      return;
    }
    this.setState({ loading: true });

    const res = await axios.get(
      `https://api.github.com/search/users?q=${this.state.name}&client_app_id=${
        process.env.REACT_APP_CLIENT_ID
      }&client_app_secret=${process.env.REACT_APP_CLIENT_SECRET}`
    );

    if (res.data.items.length === 0) {
      this.setState({
        loading: false,
        name: '',
        err: true,
        alert: {
          class: 'alert alert-info',
          msg: 'No users found...'
        },
        users: []
      });
      setTimeout(
        () =>
          this.setState({
            err: false,
            alert: null
          }),
        3000
      );
    } else {
      this.setState({ loading: false, err: false, users: res.data.items });
    }
  };

  getUser = async name => {
    this.setState({ loading: true });

    const res = await axios.get(
      `https://api.github.com/users/${name}?client_app_id=${
        process.env.REACT_APP_CLIENT_ID
      }&client_app_secret=${process.env.REACT_APP_CLIENT_SECRET}`
    );
    const repos = await axios.get(`${res.data.repos_url}?per_page=10`);

    this.setState({ loading: false, user: res.data, userRepos: repos.data });
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  clear = () => {
    this.setState({ users: [], name: '' });
  };

  render() {
    const { loading, users, user, userRepos, name, err, alert } = this.state;
    return (
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
                      name={name}
                      handleChange={this.handleChange}
                      handleSubmit={this.handleSubmit}
                      clear={this.clear}
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
                    {...props}
                    getUser={this.getUser}
                    user={user}
                    repos={userRepos}
                    loading={loading}
                    id={user.id}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
