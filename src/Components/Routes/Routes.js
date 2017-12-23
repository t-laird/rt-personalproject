import React from 'react';
import Login from '../Login/Login';
import Header from '../Header/Header';
import Homepage from '../Homepage/Homepage';
import User from '../User/User';
import Group from '../Group/Group';
import JoinGroup from '../JoinGroup/JoinGroup';
import CreateGroup from '../CreateGroup/CreateGroup';
import { Route, Switch } from 'react-router-dom';

const Routes = () => {

  return (
    <div>
      <Route path='/' component={Header} />
      <Route path='/login' component={Login} />
      <Switch>
        <Route path='/user' component={User} />
        <Route path='/group' component={Group} />
        <Route exact path='/' component={Homepage} />
        <Route path='/joingroup' component={JoinGroup} />
        <Route path='/creategroup' component={CreateGroup} />
      </Switch>
    </div>
  ) 
}

export default Routes;