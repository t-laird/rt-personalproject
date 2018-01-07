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
      return (
        <div>
          <div className="current-group">
            <h5>You are currently a member of: </h5>
            <h4><Link to="/group">{this.props.group.group_name}</Link></h4>
          </div>
          <div className="passphrase">
            <h5>Your group's passphrase is:</h5>
            <input 
              placeholder={this.props.group.group_passphrase}
              value={this.state.passphrase}
              onChange={this.handleChange}
              name='passphrase'
            />
          </div>
          <div className="join-group-last">
            <h5>To switch groups, simply enter your new group's passphrase in the box.</h5>
            <img className="arrow-graphic" src={require('./assets/curved-arrow.svg')} />
          </div>
          <button
            onClick={this.joinGroup}
          >SUBMIT</button>
        </div>
      );
    } else if (!this.props.group.group_name) {
      return (
        <div>
          <div className="current-group">
            <h5>You are not currently a member of a group!</h5>
          </div>
          <div className="passphrase">
            <h5>To join a group, enter your group passphrase</h5>
            <input 
              placeholder={this.props.group.group_passphrase}
              value={this.state.passphrase}
              onChange={this.handleChange}
              name='passphrase'
            />
          </div>
          <button
            onClick={this.joinGroup}
          >SUBMIT</button>
        </div>
      );
    }

    return null;
  }

  componentDidMount() {
    if (!this.props.user.name) {
      this.props.history.push('/login');
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
        message: <h5>You're already in that group!</h5>
      });
      return;
    }
    const response = await validateGroup(this.state.passphrase, this.props.user.user_id);

    if (response.status === 'success') {
      const userResponse = await getUser();
      return this.updateUserInfo(userResponse);
    } else if (!this.props.user.name) {
      this.setState({
        message: <h5>You must be logged in to join a group.</h5>
      });
    } else {
      this.setState({
        message: <h5>Failed to join group.  Please try again.</h5>
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
      message: 
        <div>
          <h5>You successfully joined {groupData.group_name}!</h5>
          <h5>You should check out your <Link to="/group">group page</Link> or <Link to="/user">user page.</Link></h5>
        </div>,
      hideintro: true
    });
  }

  render() {
    return (
      <div>
        <div className="join-group-component">
          <div className="join-group-header">
            <h4>JOIN A GROUP</h4>
          </div>
          <div className="join-container">
            {this.groupPageMessage()}
            {this.state.message}
          </div>
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