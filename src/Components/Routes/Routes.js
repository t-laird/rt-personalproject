import React from 'react';
import Login from '../Login/Login';
import Header from '../Header/Header';
import Homepage from '../Homepage/Homepage';
import User from '../User/User';
import Group from '../Group/Group';
import JoinGroup from '../JoinGroup/JoinGroup';
import CreateGroup from '../CreateGroup/CreateGroup';
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './Routes.css';

const Routes = ({ location }) => {
  return (
    <div className="routes">
      <Route path='/' component={Header} />
      <Route path='/login' component={Login} />
      <TransitionGroup className="switch-routes">
        <CSSTransition 
          key={location.key} 
          classNames="fade" 
          timeout={400}>
          <div className="switch-wrapper">
            <Switch 
              location={location}>
              <Route exact path='/' component={Homepage} />
              <Route path='/user' component={User} />
              <Route path='/group' component={Group} />
              <Route path='/joingroup' component={JoinGroup} />
              <Route path='/creategroup' component={CreateGroup} />
            </Switch>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default Routes;