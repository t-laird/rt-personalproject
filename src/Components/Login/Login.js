import React, { Component } from 'react';
import './Login.css';
import clearLocalStorage from '../../helpers/clearLocalStorage';
import getUsersInGroup from '../../helpers/fetches/getUsersInGroup/getUsersInGroup';
import getGroupSettings from '../../helpers/fetches/getGroupSettings/getGroupSettings';
import getGroupTransactionData from '../../helpers/fetches/getGroupTransactionData/getGroupTransactionData';
import getTransactionData from '../../helpers/fetches/getTransactionData/getTransactionData';
import getUser from '../../helpers/fetches/getUser/getUser';
import { connect } from 'react-redux';
import * as actions from '../../Actions/index.js';

class Login extends Component {
  constructor() {
    super();
  }

  componentDidMount = async () => {
    this.checkForKey();
    
    const userData = await this.loadUser();
    if (userData) {
      await this.loadTransactionData(userData);
      if (userData.group_id !== null) {
        await this.loadUsersInGroup(userData);
        const groupData = await this.loadGroupSettings(userData);
        await this.loadGroupTransactionData(groupData);
      }
    }
    this.props.history.push('/user');
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.user.group_id > 0) {
      this.setState({joinText: 'SWITCH GROUPS'});
    }
  }

  loadUser = async () => {
  	try {
      const user = await getUser();
      this.props.updateUser(user);
      return user;
  	} catch (e) {
    	window.location="https://tr-personal-proj.e1.loginrocket.com";
    	return;
  	}
  }

  loadTransactionData = async (userData) => {
    try {
      const userTransactions = await getTransactionData(userData);
      this.props.updateUserTransactions(userTransactions);
    } catch (e) {
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
      
      console.log('error: ', error);
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
      return 'error retrieving group data';
    }
  }

  loadGroupTransactionData = async (groupData) => {
    try {
      const groupTransactions = await getGroupTransactionData(groupData);

      this.props.updateGroupTransactions(groupTransactions);

    } catch (e) {
      window.location="https://tr-personal-proj.e1.loginrocket.com";
      return;
    }
  }
  
	 componentDidMount() {
    this.checkForKey();    
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
    	window.location="https://tr-personal-proj.e1.loginrocket.com";
    }
  }

  getToken () {
  	////REGEX NEEDS TO CUT OFF WHEN THERE IS MORE ON THE END
  	///  for ex.   &signup=true   match between = and & OR end of string
    const tokenRegex = new RegExp(/\?token=/);
    const parseToken = this.props.location.search.replace(tokenRegex, '');

    return parseToken;
  }


  render() {
    return (
      <div className="login-component">
			
      </div>
    ); 
  }
}

const mapDispatchToProps = dispatch => ({
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