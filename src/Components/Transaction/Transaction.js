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
      validInput: true
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

  recipientOptions() {
    if (this.props.userList) {
      const filterSelf = this.props.UserList.filter( user => user.name !== this.props.User.name);
      const userOptions = filterSelf.map( (user, index) => {
        return <option value={user.name} key={`userOption${index}`}>{user.name}</option>;
      });
  
      return userOptions;
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
    }
  }

  // formatChartData = () => {
  //   const { UserTransactions } = this.props;
  //   if (UserTransactions.length && Object.keys(this.props.Group).length) {
  //     const weeklyTransactions = UserTransactions.reduce((array, week, index) => {
  //       array.push({
  //         sent: week.sent.reduce((pointsSent, transaction) => {
  //           pointsSent += transaction.point_value;
  //           return pointsSent;
  //         }, 0),
  //         received: week.received.reduce((pointsReceived, transaction) => {
  //           pointsReceived += transaction.point_value;
  //           return pointsReceived;
  //         }, 0)
  //       });
        
  //       return array
  //     }, [])
  //     console.log(weeklyTransactions)
  //   }
  // }

  

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
            <select>
              {this.recipientOptions()}
            </select> 
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