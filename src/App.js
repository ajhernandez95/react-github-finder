import React from 'react';
import GithubState from './context/github/GithubState';
import AlertState from './context/alerts/AlertState';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components//pages/Home';
import User from './Components/pages/User';
import About from './Components/pages/About';
import NotFound from './Components/pages/NotFound';
import './styles/styles.css';

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className='App'>
            <Navbar />
            <div className='container'>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/about' component={About} />
                <Route exact path='/user/:name' component={User} />} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
};

export default App;
