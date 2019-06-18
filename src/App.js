import React, { Fragment, useContext } from 'react';
import GithubState from './context/github/GithubState';
import GithubContext from './context/github/githubContext';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Components/Navbar';
import SearchBar from './Components/SearchBar';
import Spinner from './Components/Spinner';
import Users from './Components/Users';
import User from './Components/pages/User';
import About from './Components/pages/About';
import './styles/styles.css';

const App = () => {
  const githubContext = useContext(GithubContext);
  return (
    <GithubState>
      {console.log(githubContext.loading)}
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Fragment>
                    <SearchBar />
                    {false ? <Spinner /> : <Users />}
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/user/:name"
                render={props => <User {...props} />}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
