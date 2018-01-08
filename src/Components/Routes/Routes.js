import React from 'react';
import Login from '../Login/Login';
import Header from '../Header/Header';
import Homepage from '../Homepage/Homepage';
import User from '../User/User';
import Group from '../Group/Group';
import Slack from '../Slack/Slack';
import JoinGroup from '../JoinGroup/JoinGroup';
import CreateGroup from '../CreateGroup/CreateGroup';
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import './Routes.css';

const Routes = ({ location }) => {
  return (
    <div className="routes">
      <Route path='/login' component={Login} />
      <Route path='/' component={Header} />
      <TransitionGroup className="switch-routes">
        <CSSTransition 
          key={location.key} 
          classNames="fade" 
          timeout={250}>
          <div className="switch-wrapper">
            <Switch 
              location={location}>
              <Route path='/user' component={User} />
              <Route path='/group' component={Group} />
              <Route path='/joingroup' component={JoinGroup} />
              <Route path='/creategroup' component={CreateGroup} />
              <Route path='/slack' component={Slack} />
              <Route path='/' component={Homepage} />
            </Switch>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default Routes;

Routes.propTypes = {
  location: PropTypes.object
};