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
  constructor() {
    super();
  }

  componentDidMount = async () => {
    const userData = await this.loadUser();
    await this.loadTransactionData(userData);
    await this.loadUsersInGroup(userData);
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

  render() {
    return (
      <div className="user-component">
        <UserData />
        <UserProfile />
        <NavLink to='/joingroup' >Join / Switch Group</NavLink>
        <Transaction />
      </div>
    )
  }
}

const mapStateToProps = ( store ) => ({
  user: store.user
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
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(User);