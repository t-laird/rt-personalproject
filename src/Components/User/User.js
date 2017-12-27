import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserData from '../UserData/UserData';
import UserProfile from '../UserProfile/UserProfile';
import * as actions from '../../Actions/';
import './User.css';
import clearLocalStorage from '../../helpers/clearLocalStorage';
import { NavLink } from 'react-router-dom';
import getKeyFromLS from '../../helpers/getKeyFromLS';
import Transaction from '../Transaction/Transaction';

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      joinText: 'Join a Group'
    }
  }

  componentDidMount = async (props) => {
    const userData = await this.loadUser();
    await this.loadTransactionData(userData);
    await this.loadUsersInGroup(userData);
    await this.loadGroupSettings(userData);
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.user.group_id > 0) {
      this.setState({joinText: 'SWITCH GROUPS'})
    }
  }

  loadUser = async () => {
  	try {
	    const user = await fetch('http://localhost:3000/api/v1/users', {
	      method: 'GET',
	      headers: {
	        "x-token": getKeyFromLS(),
	        "CONTENT-TYPE": 'application/json'
	      }
	    });
	    const userData = await user.json();

	    this.props.updateUser(userData[0]);
      return userData[0];
  	} catch (e) {
  		console.log('heeeeeeeyo')
    	window.location="https://tr-personal-proj.e1.loginrocket.com"
    	return;
  	}
  }

  loadTransactionData = async (userData) => {
    try {
      const userTransactionData = await fetch('http://localhost:3000/api/v1/events/getuserdata/', {
        method: 'POST',
        headers: {
          "x-token": getKeyFromLS(),
          "CONTENT-TYPE": 'application/json'
        },
        body: JSON.stringify({user: userData})
      });

      const userTransactions = await userTransactionData.json();

      this.props.updateUserTransactions(userTransactions);

    } catch (e) {
      console.log('hmmmmmmm ');
    	window.location="https://tr-personal-proj.e1.loginrocket.com"
      return;
    }
  }

  loadUsersInGroup = async (userdata) => {
    try {
      const usersInGroupResponse = await fetch(`http://localhost:3000/api/v1/users/group/${userdata.group_id}`, {
        method: 'GET',
        headers: {
          "x-token": getKeyFromLS(),
          'CONTENT-TYPE': 'application/json'
        }
      });

      const usersInGroup = await usersInGroupResponse.json();
      this.props.updateUserList(usersInGroup);
    } catch (error) {
      console.log('error: ', error);
    }
  }

  loadGroupSettings = async (userdata) => {
    try {
      if (!userdata.group_id) {
        throw new Error('user not in group');
      }
      const groupDataResponse = await fetch(`http://localhost:3000/api/v1/group/${userdata.group_id}`, {
        method: 'GET',
        headers: {
          'CONTENT-TYPE': 'application/json',
          'x-token': getKeyFromLS()
        }
      });

      const groupData = await groupDataResponse.json();
      this.props.updateGroup(groupData[0]);

    } catch (error) {
      return 'error retrieving group data';
    }
  }

  render() {
    return (
      <div className="user-component">
        <UserData />
        <Transaction />
        <UserProfile />
        <NavLink className="join-group" to='/joingroup'>{this.state.joinText}</NavLink>
      </div>
    )
  }
}

const mapStateToProps = ( store ) => ({
  user: store.User
});

const mapDispatchToProps = dispatch => ({
  updateUser: user => {
    dispatch(actions.updateUser(user));
  },
  updateUserTransactions: transactions => {
    dispatch(actions.updateUserTransactions(transactions));
  },
  updateUserList: users => {
    dispatch(actions.updateUserList(users));
  },
  updateGroup: group => {
    dispatch(actions.updateGroup(group));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(User);