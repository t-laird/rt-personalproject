import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserData from '../UserData/UserData';
import UserProfile from '../UserProfile/UserProfile';
import * as actions from '../../Actions/';
import './User.css';
import { NavLink } from 'react-router-dom';
import Transaction from '../Transaction/Transaction';
import getUser from '../../helpers/fetches/getUser/getUser';
import getUsersInGroup from '../../helpers/fetches/getUsersInGroup/getUsersInGroup';
import getGroupSettings from '../../helpers/fetches/getGroupSettings/getGroupSettings';
import getGroupTransactionData from '../../helpers/fetches/getGroupTransactionData/getGroupTransactionData';
import getTransactionData from '../../helpers/fetches/getTransactionData/getTransactionData';
import Comments from '../Comments/Comments';

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      joinText: 'JOIN A GROUP'
    }
  }

  componentDidMount = async (props) => {
    const userData = await this.loadUser();
    await this.loadTransactionData(userData);
    await this.loadUsersInGroup(userData);
    const groupData = await this.loadGroupSettings(userData);
    if (userData.group_id !== null) {
      await this.loadGroupTransactionData(groupData)
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.user.group_id > 0) {
      this.setState({joinText: 'SWITCH GROUPS'})
    }
  }

  loadUser = async () => {
  	try {
      const user = await getUser();
      this.props.updateUser(user);
      return user;
  	} catch (e) {
    	window.location="https://tr-personal-proj.e1.loginrocket.com"
    	return;
  	}
  }

  loadTransactionData = async (userData) => {
    try {
      const userTransactions = await getTransactionData(userData);
      this.props.updateUserTransactions(userTransactions);
    } catch (e) {
      console.log('hmmmmmmm ');
    	window.location="https://tr-personal-proj.e1.loginrocket.com"
      return;
    }
  }

  loadUsersInGroup = async (userData) => {
    try {
      const usersInGroup = await getUsersInGroup(userData)

      this.props.updateUserList(usersInGroup);
    } catch (error) {
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
      console.log('hmmmmmmm ');
      window.location="https://tr-personal-proj.e1.loginrocket.com"
      return;
    }
  }

  render() {
    return (
      <div className="user-component">
        <UserData />
        <Transaction />
        <Comments />
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

export default connect(mapStateToProps, mapDispatchToProps)(User);