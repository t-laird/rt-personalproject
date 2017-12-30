import React, { Component } from 'react';
import './Transaction.css';
import getKeyFromLS from '../../helpers/getKeyFromLS';
import { connect } from 'react-redux';

class Transaction extends Component {
  constructor() {
    super();
    this.state = {
      points: '',
      recipient: '',
      validInput: true,
      suggestions: [],
      focus: null
    };
  }

  handleInput = (e) => {
    const {value, name} = e.target;

    this.setState({[name]: value});
  }

  pointStatus() {
    const { points } = this.state;
    const parsePoints = parseInt(points);

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
      return <h3>Remaining weekly points to award: <span className="current-span">{weeklyPoints-spentPoints}</span></h3>;
    } 
    return <h3>login to send points!</h3>;
  }

  async handleSubmit() {
    const send_id = 123;
    const receive_id = parseInt(this.state.recipient);
    const group_id = 123;
    const point_value = parseInt(this.state.points);

    const submitEvent = await fetch('http://localhost:3000/api/v1/eventtracking/new', {
      method: 'POST',
      headers: {
        'CONTENT-TYPE': 'application/json',
        'x-token': getKeyFromLS()
      },
      body: JSON.stringify({send_id, receive_id, group_id, point_value})
    });

    const submitResponse = await submitEvent.json();
    console.log(submitResponse);
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
    }
  }

  autoComplete = (e) => {
    this.setState({
      recipient: e.target.innerText
    });
    const mockEvent = {target: {value: e.target.innerText}};

    this.populateSuggestions(mockEvent);
  }

  populateSuggestions = (e) => {
    const { value } = e.target;
    const query = new RegExp(value, 'gi');

    const userNames = this.props.UserList.map( user => user.name);
    const filterSelf = userNames.filter ( user => user !== this.props.User.name);

    const filterUsers = filterSelf.filter( user => query.test(user));
    const firstFive = filterUsers.slice(0, 5);

    if (value.length) {
      this.setState({
        suggestions: filterUsers
      });
    } else {
      this.setState({
        suggestions: []
      });
    }
  }

  navigateSuggestions = (e) => {
    if (e.key === 'ArrowDown' && 
    this.state.suggestions.slice(0, 5)[this.state.focus + 1]) {
      e.preventDefault();
      console.log(this.state.suggestions);
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
    } else if (e.key === 'ArrowUp' && this.state.focus !== null) {
      e.preventDefault();
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
          onClick={(e) => {this.autoComplete(e)}} 
          key={`suggestion${index}`}>{user}</li> 
      );
    });

    if (this.state.recipient.length && !this.state.suggestions.length) {
      return <li 
        onClick={
          () => this.setState({recipient: ''})
        }
        className="empty-suggestions">NO USERS FOUND</li>
    }
    return listItems;
  }
  

  render() {
    return (
      <div className="Transaction">
        <div className="current-points">
          <div className="remaining-points">
            {this.getRemainingPoints()}
          </div>
          <div className="received-points">
            <h3>Points received this week: <span className="current-span">{this.getReceivedPoints()}</span></h3>
          </div>
        </div>
        <div className="points-block">
          <h2>Award points: </h2>
          <div className="award">
            <h3>Send </h3>
            <input 
              type="text" 
              name="points" 
              placeholder="QTY" 
              value={this.state.points} 
              onChange={(e) => { this.handleInput(e); }} />
            {this.pointStatus()}
            <h3 className="points-to">points to</h3>
            <div className="recipient-input">
              <input 
                type="text" 
                name="recipient" 
                value={this.state.recipient} 
                onKeyDown={this.navigateSuggestions}
                onChange={(e) => {this.handleInput(e); this.populateSuggestions(e); }} />
              <ul>
                {this.generateSuggestions()}
              </ul>
            </div>
            <button onClick={()=> { this.handleSubmit(); }}>SEND</button>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = ( store ) => ({
  UserTransactions: store.UserTransactions,
  UserList: store.UserList,
  User: store.User,
  Group: store.Group
});


export default connect(mapStateToProps, null)(Transaction);