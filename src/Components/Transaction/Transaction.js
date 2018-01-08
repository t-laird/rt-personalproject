/* eslint-disable max-len */

import React, { Component } from 'react';
import './Transaction.css';
import getKeyFromLS from '../../helpers/getKeyFromLS';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../Actions';
import getUsersInGroup from '../../helpers/fetches/getUsersInGroup/getUsersInGroup';
import getGroupSettings from '../../helpers/fetches/getGroupSettings/getGroupSettings';
import getGroupTransactionData from '../../helpers/fetches/getGroupTransactionData/getGroupTransactionData';
import getTransactionData from '../../helpers/fetches/getTransactionData/getTransactionData';
import getUser from '../../helpers/fetches/getUser/getUser';


export class Transaction extends Component {
  constructor() {
    super();
    this.state = {
      points: '',
      recipient: '',
      note: '',
      validInput: true,
      suggestions: [],
      focus: null,
      transactionMessage: null
    };
  }

  handleInput = (event) => {
    const {value, name} = event.target;

    this.setState({[name]: value});
  }

  pointStatus() {
    const { points } = this.state;
    const parsePoints = parseInt(points, 10);

    if (
      (isNaN(parsePoints) || 
      parsePoints > 100) &&
      points.length
    ) {
      return <span className="point-error">X</span>;
    } else {
      return null;
    }
  }

  getRemainingPoints() {
    const { UserTransactions } = this.props;
    if (UserTransactions.length && Object.keys(this.props.Group).length) {
      const recentTransactions = UserTransactions[UserTransactions.length - 1];
      const spentPoints = recentTransactions.sent.reduce( (total, transaction) => {
        total += transaction.point_value;
        return total;
      }, 0);
      const weeklyPoints = this.props.Group.weekly_points;
      return <span className="points">{weeklyPoints-spentPoints}</span>;
    } 
    return <span className="points">0</span>;
  }

  async handleSubmit() {
    const recipient = new RegExp(this.state.recipient, 'gi');
    const findReceivingUser = this.props.UserList.find( user => recipient.test(user.name) );

    if (!findReceivingUser) {
      this.setState({
        transactionMessage: "We can't find your receiving user.  You should try again!",
        suggestions: [],
        recipient: ''
      });
      return;
    }

    const transactionInformation = {
      send_id: this.props.User.user_id,
      receive_id: findReceivingUser.user_id,
      group_id: this.props.User.group_id,
      point_value: parseInt(this.state.points, 10),
      recipient_name: findReceivingUser.name,
      note: this.state.note
    };


    for (let requiredParameter of [
      'send_id', 
      'receive_id', 
      'group_id', 
      'point_value', 
      'recipient_name'
    ]) {
      if (!transactionInformation[requiredParameter]) {
        this.setState({
          transactionMessage: `Please send a valid ${requiredParameter}.`,
          suggestions: [],
          recipient: ''
        });
      }
    }

    if (this.state.recipient.length < 3) {
      return;
    }

    const submitEvent = await fetch('https://snapninja.herokuapp.com/api/v1/eventtracking/new', {
      method: 'POST',
      headers: {
        'CONTENT-TYPE': 'application/json',
        'x-token': getKeyFromLS()
      },
      body: JSON.stringify({
        send_id: transactionInformation.send_id, 
        receive_id: transactionInformation.receive_id, 
        group_id: transactionInformation.group_id, 
        point_value: transactionInformation.point_value,
        note: transactionInformation.note
      })
    });

    const submitResponse = await submitEvent.json();

    if (submitResponse.status === 'success') {
      this.setState({
        recipient: '',
        suggestions: [],
        transactionMessage: `Successfully sent ${this.state.points} points to ${transactionInformation.recipient_name}.`,
        points: ''
      });

      this.fetchUserData();

    } else if (submitResponse.status === 'failure') {
      this.setState({
        recipient: '',
        suggestions: [],
        transactionMessage: submitResponse.error
      });
    }

  }

  fetchUserData = async () => {
    const userData = await this.loadUser();
    if (userData) {
      await this.loadTransactionData(userData);
      if (userData.group_id !== null) {
        await this.loadUsersInGroup(userData);
        const groupData = await this.loadGroupSettings(userData);
        await this.loadGroupTransactionData(groupData);
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

  getReceivedPoints = () => {
    const { UserTransactions } = this.props;
    if (UserTransactions.length && Object.keys(this.props.Group).length) {
      const recentTransactions = UserTransactions[UserTransactions.length - 1];
      const receivedPoints = recentTransactions.received.reduce( (total, transaction) => {
        total += transaction.point_value;
        return total;
      }, 0);
      return receivedPoints;
    } else {
      return 0;
    }
  }

  autoComplete = (event) => {
    this.setState({
      recipient: event.target.innerText
    });
    const mockEvent = {target: {value: event.target.innerText}};

    this.populateSuggestions(mockEvent);
  }

  populateSuggestions = (event) => {
    const { value } = event.target;
    const query = new RegExp(value, 'gi');

    const userNames = this.props.UserList.map( user => user.name);
    const filterSelf = userNames.filter( user => user !== this.props.User.name);

    const filterUsers = filterSelf.filter( user => query.test(user));
    const firstFive = filterUsers.slice(0, 5);

    if (value.length) {
      this.setState({
        suggestions: firstFive
      });
    } else {
      this.setState({
        suggestions: []
      });
    }
  }

  navigateSuggestions = (event) => {
    if (event.key === 'ArrowDown' && 
    this.state.suggestions.slice(0, 5)[this.state.focus + 1]) {
      event.preventDefault();
      if (this.state.focus === null) {
        this.setState({
          focus: 0, 
          recipient: this.state.suggestions[0]
        });
      } else {
        this.setState({
          focus: (Math.min(this.state.focus + 1, 4)), 
          recipient: this.state.suggestions[this.state.focus + 1]
        });
      }
    } else if (event.key === 'ArrowUp' && this.state.focus !== null) {
      event.preventDefault();
      if (this.state.focus === 0) {
        this.setState({
          focus: null, 
          recipient: ''});
      } else {
        this.setState({
          focus: this.state.focus - 1, 
          recipient: this.state.suggestions[this.state.focus - 1]
        });
      }
    }
  }

  generateSuggestions = () => {    
    const listItems = this.state.suggestions.map( (user, index) => {
      const shouldHighlight = index === this.state.focus ? 'highlight' : '';
      return (
        <li 
          className={shouldHighlight} 
          onClick={(event) => { this.autoComplete(event); }} 
          key={`suggestion${index}`}>{user}</li> 
      );
    });

    if (this.state.recipient === this.state.suggestions[0] && this.state.suggestions.length === 1) {
      return null;
    }

    if (this.state.recipient.length && !this.state.suggestions.length) {
      return <li 
        onClick={
          () => this.setState({recipient: ''})
        }
        className="empty-suggestions">no users found</li>;
    }
    return listItems;
  }

  newUserMessage = () => {
    if (!Object.keys(this.props.Group).length) {
      return <h5>Join a group to send and receive snaps.</h5>;
    }
  }

  render() {
    return (
      <div className="Transaction">
        <div className="new-user-message">
          {this.newUserMessage()}
        </div>
        <div className="current-points">
          <div className="remaining-points">
            {this.getRemainingPoints()}
            <h6>REMAINING</h6>
          </div>
          <div className="divider">
            <h4>SNAPS</h4>
            <span>THIS WEEK</span>
          </div>
          <div className="received-points">
            <span className="points">{this.getReceivedPoints()}</span>
            <h6>RECEIVED</h6>
          </div>
        </div>
        <div className="award-header">
          <h4>AWARD</h4>
        </div>
        <div className="points-block">
          <div className="award">
            <div className="send-input">
              <h5 className="send">Send</h5>
              <input 
                type="text" 
                name="points" 
                placeholder="QTY" 
                value={this.state.points} 
                onChange={(event) => { this.handleInput(event); }} />            
            </div>
            <div className="recipient-input">
              <h5 className="snaps">snaps to:</h5>
              <input 
                type="text" 
                name="recipient" 
                placeholder="find a teammate"
                value={this.state.recipient} 
                onKeyDown={this.navigateSuggestions}
                onChange={(event) => { this.handleInput(event); this.populateSuggestions(event); }} />
              <ul>
                {this.generateSuggestions()}
              </ul>
            </div>
          </div>
          <textarea
            className="note-input"
            type="text"
            name="note"
            placeholder="add a message"
            value={this.state.note}
            onChange={(event) => { this.handleInput(event); }}
          >
          </textarea>
          <button onClick={()=> { this.handleSubmit(); }}>SEND</button>
          <div className="transaction-message">
            <h3>{this.state.transactionMessage}</h3>
          </div>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = ( store ) => ({
  UserTransactions: store.UserTransactions,
  UserList: store.UserList,
  User: store.User,
  Group: store.Group
});

export const mapDispatchToProps = ( dispatch ) => ({
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


export default connect(mapStateToProps, mapDispatchToProps)(Transaction);

Transaction.propTypes = {
  User: PropTypes.object,
  Group: PropTypes.object,
  UserList: PropTypes.array,
  UserTransactions: PropTypes.array,
  updateUser: PropTypes.func,
  updateUserTransactions: PropTypes.func,
  updateGroupTransactions: PropTypes.func,
  updateUserList: PropTypes.func,
  updateUserGroup: PropTypes.func,
  updateGroup: PropTypes.func
};