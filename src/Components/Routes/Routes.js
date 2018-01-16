/* eslint-disable no-useless-escape */

import React, { Component } from 'react';
import Header from '../Header/Header';
import Homepage from '../Homepage/Homepage';
import User from '../User/User';
import Group from '../Group/Group';
import Slack from '../Slack/Slack';
import JoinGroup from '../JoinGroup/JoinGroup';
import Transaction from '../Transaction/Transaction';
import CreateGroup from '../CreateGroup/CreateGroup';
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import './Routes.css';
import clearLocalStorage from '../../helpers/clearLocalStorage';
import getUsersInGroup from '../../helpers/fetches/getUsersInGroup/getUsersInGroup';
import getGroupSettings from '../../helpers/fetches/getGroupSettings/getGroupSettings';
import getGroupTransactionData from 
  '../../helpers/fetches/getGroupTransactionData/getGroupTransactionData';
import getTransactionData from '../../helpers/fetches/getTransactionData/getTransactionData';
import getUser from '../../helpers/fetches/getUser/getUser';
import { connect } from 'react-redux';
import * as actions from '../../Actions/index.js';

class Routes extends Component {
  componentDidMount() {
    const mockProps = {
      location: this.props.location,
      initialLoad: true
    };
    this.componentWillReceiveProps(mockProps);
  }

  fetchUserData = async () => {    
    this.checkForKey();

    const userData = await this.loadUser();

    if (userData) {
      await this.loadTransactionData(userData);
      if (userData.group_id !== null) {
        await this.loadUsersInGroup(userData);
        const groupData = await this.loadGroupSettings(userData);
        await this.loadGroupTransactionData(groupData);
      }
      if (!userData.group_id) {
        this.props.history.push('/snap-ninja/joingroup');
        return;
      }
    }
  }

  loadUser = async () => {
    try {
      const user = await getUser();
      this.props.updateUser(user);
      return user;
    } catch (error) {
      window.location="https://tr-personal-proj.e1.loginrocket.com";
      return;
    }
  }

  loadTransactionData = async (userData) => {
    try {
      const userTransactions = await getTransactionData(userData);
      this.props.updateUserTransactions(userTransactions);
    } catch (error) {
      window.location="https://tr-personal-proj.e1.loginrocket.com";
      return;
    }
  }

  loadUsersInGroup = async (userData) => {
    try {
      const usersInGroup = await getUsersInGroup(userData);

      this.props.updateUserList(usersInGroup);
    } catch (error) {
      window.location="https://tr-personal-proj.e1.loginrocket.com";
      return;
    }
  }

  loadGroupSettings = async (userData) => {
    try {
      if (!userData.group_id) {
        throw new Error('user not in group');
      }
      const groupData = await getGroupSettings(userData);

      this.props.updateGroup(groupData);
      return groupData;
    } catch (error) {
      window.location="https://tr-personal-proj.e1.loginrocket.com";
      return; 
    }
  }

  loadGroupTransactionData = async (groupData) => {
    try {
      const groupTransactions = await getGroupTransactionData(groupData);
      this.props.updateGroupTransactions(groupTransactions);

    } catch (error) {
      window.location="https://tr-personal-proj.e1.loginrocket.com/";
      return;
    }
  }

  checkForKey() {
    const userKey = JSON.parse(localStorage.getItem('123rtx-token'));
    if (this.props.location.search.length > 200) {
      const passedToken = this.getToken();
      localStorage.setItem('123rtx-token', JSON.stringify(passedToken));
    } else if (userKey) {
      return;
    } else {
      clearLocalStorage();
      window.location="https://tr-personal-proj.e1.loginrocket.com/";
      return;
    }
  }

  getToken () {
    const removeToken = new RegExp(/\?token=/);
    const removeSignup = new RegExp(/\&signup=true/);  
    const parseToken = this.props.location.search.replace(removeToken, '');
    const parseSignup = parseToken.replace(removeSignup, '');

    return parseSignup;
  }

  componentWillReceiveProps = async (nextProps) => {
    const { pathname } = this.props.location;
    if (
      pathname !== nextProps.location.pathname ||
      nextProps.initialLoad
    ) {
      if (pathname.includes('/snap-ninja/login/slack')) {
        await this.fetchUserData();
        this.props.history.push('/snap-ninja/slack');
        return;
      } else if (
        pathname.includes('/snap-ninja/login') ||
        pathname.includes('/snap-ninja/user') ||
        pathname.includes('/snap-ninja/group') ||
        pathname.includes('/snap-ninja/send') ||
        pathname.includes('/snap-ninja/account') ||
        (
          pathname.includes('/snap-ninja/creategroup') && 
          nextProps.initialLoad
        ) ||
        (
          pathname.includes('/snap-ninja/joingroup') && 
          nextProps.initialLoad) ||
        (
          pathname.includes('/snap-ninja/slack') && 
          nextProps.initialLoad
        )
      ) {
        await this.fetchUserData();

        if (nextProps.initialLoad) {
          this.props.history.push('/snap-ninja/user');
        }
      }
    }

  }

  render () {
    return (
      <div className="routes">
        <Route path='/snap-ninja/' component={Header} />
        <TransitionGroup className="switch-routes">
          <CSSTransition 
            key={this.props.location.key} 
            classNames="fade" 
            timeout={250}>
            <div className="switch-wrapper">
              <Switch 
                location={this.props.location}>
                <Route path='/snap-ninja/user' component={User} />
                <Route path='/snap-ninja/group' component={Group} />
                <Route path='/snap-ninja/send' component={Transaction} />
                <Route path='/snap-ninja/joingroup' component={JoinGroup} />
                <Route path='/snap-ninja/creategroup' component={CreateGroup} />
                <Route path='/snap-ninja/slack' component={Slack} />
                <Route path='/snap-ninja/' component={Homepage} />
              </Switch>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  logoutUser: () => {
    dispatch(actions.logoutUser());
  },
  updateUser: user => {
    dispatch(actions.updateUser(user));
  },
  updateUserTransactions: transactions => {
    dispatch(actions.updateUserTransactions(transactions));
  },
  updateGroupTransactions: groupTransactions => {
    dispatch(actions.updateGroupTransactions(groupTransactions));
  },
  updateUserList: users => {
    dispatch(actions.updateUserList(users));
  },
  updateGroup: group => {
    dispatch(actions.updateGroup(group));
  }
});

export default connect(null, mapDispatchToProps)(Routes);

Routes.propTypes = {
  location: PropTypes.object
};