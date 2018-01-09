/* eslint-disable no-useless-escape */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import clearLocalStorage from '../../helpers/clearLocalStorage';
import getUsersInGroup from '../../helpers/fetches/getUsersInGroup/getUsersInGroup';
import getGroupSettings from '../../helpers/fetches/getGroupSettings/getGroupSettings';
import getGroupTransactionData from 
  '../../helpers/fetches/getGroupTransactionData/getGroupTransactionData';
import getTransactionData from '../../helpers/fetches/getTransactionData/getTransactionData';
import getUser from '../../helpers/fetches/getUser/getUser';
import { connect } from 'react-redux';
import * as actions from '../../Actions/index.js';

export class Login extends Component {

  componentDidMount = async () => {
    await this.fetchUserData();
    if (this.props.location.pathname === '/snap-ninja/login/slack') {
      this.props.history.push('/snap-ninja/slack');
    }
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
      this.props.history.push('/snap-ninja/user');
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


  render() {
    return (
      <div className="login-component">
			
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

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  user: PropTypes.object,
  history: PropTypes.oneOfType([
    PropTypes.object, 
    PropTypes.array
  ]),
  updateUser: PropTypes.func,
  updateUserTransactions: PropTypes.func,
  updateUserList: PropTypes.func,
  updateGroupTransactions: PropTypes.func,
  updateGroup: PropTypes.func,
  location: PropTypes.object
};
