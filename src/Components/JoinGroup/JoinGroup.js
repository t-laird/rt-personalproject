/* eslint-disable max-len */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../Actions';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import validateGroup from '../../helpers/validateGroup';
import './JoinGroup.css';
import getUser from '../../helpers/fetches/getUser/getUser';
import getUsersInGroup from '../../helpers/fetches/getUsersInGroup/getUsersInGroup';
import getGroupSettings from '../../helpers/fetches/getGroupSettings/getGroupSettings';
import getGroupTransactionData from '../../helpers/fetches/getGroupTransactionData/getGroupTransactionData';
import getTransactionData from '../../helpers/fetches/getTransactionData/getTransactionData';


export class JoinGroup extends Component {
  constructor() {
    super();

    this.state = {
      passphrase: '',
      message: null,
      hideintro: false
    };
  }

  groupPageMessage = () => {
    if (this.state.hideintro) {
      return null;
    }

    if (this.props.group.group_name) {
      return <h3>You are a member of: <Link to="/group">{this.props.group.group_name}</Link>.  To switch groups, enter new passphrase below.</h3>;
    } else if (this.props.user.group_id) {
      return <h3>You are already a member of a group!  To switch groups, enter new passphrase below.</h3>;
    } else if (!this.props.user.name) {
      return  <h3><Link to="/login">Login</Link> to join a group or to see your group status!</h3>;
    }
  }

  handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;

    this.setState({[name]: value});
  }

  joinGroup = async (event) => {
    event.preventDefault();
    if (this.state.passphrase === this.props.group.group_passphrase) {
      this.setState({
        message: <h3>You're already in that group!</h3>
      });
      return;
    }
    const response = await validateGroup(this.state.passphrase, this.props.user.user_id);

    if (response.status === 'success') {
      const userResponse = await getUser();
      return this.updateUserInfo(userResponse);
    } else if (!this.props.user.name) {
      this.setState({
        message: <h3>You must be logged in to join a group.</h3>
      });
    } else {
      this.setState({
        message: <h3>Failed to join group... please try again</h3>
      });
    }
  }

  updateUserInfo = async (userResponse) => {
    this.props.updateUser(userResponse);

    const userTransactions = await getTransactionData(userResponse);
    const usersInGroup = await getUsersInGroup(userResponse);
    const groupData = await getGroupSettings(userResponse);
    const groupTransactions = await getGroupTransactionData(groupData);

    this.props.updateUserList(usersInGroup);
    this.props.updateGroup(groupData);
    this.props.updateUserTransactions(userTransactions);
    this.props.updateGroupTransactions(groupTransactions);

    this.setState({
      message: <h3>You successfully joined {groupData.group_name}! Click <Link to="/group">here</Link> to visit your group page or <Link to="/user">here</Link> to visit your user page.</h3>,
      hideintro: true
    });
  }

  render() {
    return (
      <div className="join-group-component">
        <div className="join-container">
          {this.groupPageMessage()}
          <form>
            <input 
              value={this.state.passphrase}
              onChange={this.handleChange}
              placeholder='passphrase'
              name='passphrase' />
            <button
              onClick={this.joinGroup}
            >SUBMIT</button>
          </form>
          {this.state.message}
        </div>
        <div className="link-holder">
          <NavLink className="create-group-link" to='/creategroup'>CREATE NEW GROUP</NavLink>
        </div>
      </div>
    ); 
  }
}

export const mapStateToProps = ( store ) => ({
  user: store.User,
  group: store.Group
});

export const mapDispatchToProps = dispatch => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(JoinGroup);

JoinGroup.propTypes = {
  group: PropTypes.object,
  user: PropTypes.object,
  updateUser: PropTypes.func,
  updateUserList: PropTypes.func,
  updateGroup: PropTypes.func,
  updateUserTransactions: PropTypes.func,
  updateGroupTransactions: PropTypes.func
};