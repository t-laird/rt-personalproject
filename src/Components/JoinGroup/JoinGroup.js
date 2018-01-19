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
  constructor(props) {
    super(props);

    this.state = {
      passphrase: '',
      message: null,
      hideintro: false,
      placeholder: this.props.group.group_passphrase
    };
  }

  replacePlaceholder = () => {
    this.setState({
      placeholder: ''
    });
  }

  restorePlaceholder = () => {
    this.setState({
      placeholder: this.props.group.group_passphrase
    });
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
            <h4><Link to="/snap-ninja/group">{this.props.group.group_name}</Link></h4>
          </div>
          <div className="passphrase">
            <h5>{'Your group\'s passphrase is:'}</h5>
            <input 
              placeholder={this.state.placeholder}
              value={this.state.passphrase}
              onChange={this.handleChange}
              onFocus={() => { this.replacePlaceholder() }}  
              onBlur={() => { this.restorePlaceholder() }}            
              name='passphrase'
            />
          </div>
          <div className="join-group-last">
            <h5>{'To switch groups, simply enter your new group\'s passphrase in the box.'}</h5>
            <img className="arrow-graphic" alt="arrow" src={require('./assets/curved-arrow.svg')} />
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
              placeholder=''
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
      this.props.history.push('/snap-ninja/login');
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
      this.errorMessage("You're already in that group!");
      return;
    } else if (!this.state.passphrase.length) {
      this.errorMessage('Please enter a new passphrase.');
      return;
    }
    const response = await validateGroup(this.state.passphrase, this.props.user.user_id);

    if (response.status === 'success') {
      const userResponse = await getUser();
      return this.updateUserInfo(userResponse);
    } else if (!this.props.user.name) {
      this.errorMessage('You must be logged in to join a group.');
    } else {
      this.errorMessage('Failed to join group.  Please try again.');
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

    document.querySelector('.j-message-1').className = 'j-message-1 j-message-1-new';
    document.querySelector('.join-message').className = 'join-message join-message-new';
    document.querySelector('.join-container').className = 'join-container join-container-new';

    this.setState({
      message: 
        <div>
          <h5 className="success-adj">You successfully joined {groupData.group_name}!</h5>
          <h5 className="success-adj">You should check out your <Link to="/snap-ninja/group">group page</Link> or <Link to="/snap-ninja/user">user page.</Link></h5>
        </div>,
      hideintro: true
    });
  }

  errorMessage = (message) => {
    if (document.querySelector('.j-message-1')) {
      document.querySelector('.j-message-1').className = 'j-message-0';
      this.setState({message: <div><img className="warning-icon" src={require('./assets/warning.svg')} alt="warning" />{message}</div> })
      setTimeout(() => {
        document.querySelector('.j-message-0').className = 'j-message-1';
      }, 10)
      setTimeout(() => {
        if (document.querySelector('.j-message-1')) {
          document.querySelector('.j-message-1').className = 'j-message-2';
        }
      }, 4010)
      setTimeout(() => {
        if (document.querySelector('.j-message-2')) {
          this.setState({message: null});
          document.querySelector('.j-message-2').className = 'j-message-1';
        }
      }, 4410);
    }
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
            <div className="join-message">
              <h5 className="j-message-1">{this.state.message}</h5>
            </div>
          </div>
        </div>
        <div className="link-holder">
          <NavLink className="create-group-link" to='/snap-ninja/account'>BACK TO ACCOUNT</NavLink>
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
  updateGroupTransactions: PropTypes.func,
  history: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ])
};