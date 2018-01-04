import React, { Component } from 'react';
import { connect } from 'react-redux';
import LeaderboardDisplay from '../LeaderboardDisplay/LeaderboardDisplay';
import './Leaderboard.css';
import PropTypes from 'prop-types';

export class Leaderboard extends Component {

  getData = (value) => {
    const recentWeek = this.props.GroupTransactions[this.props.GroupTransactions.length - 1].transactions;
    const givers = recentWeek.reduce((accum, transaction) => {
      if (!accum[transaction[value]]) {
        accum[transaction[value]] = { points: 0 };
      }
      accum[transaction[value]].points += transaction.point_value;
      return accum;
    }, {});
    const array = Object.keys(givers).map(user => {
      return { name: user, points: givers[user].points };
    });
    const result = array.sort((a, b) => b.points - a.points);

    return result.slice(0, 5);
  }

  displayLeaders = (dataSet) => {
    if (this.props.GroupTransactions.length) {
      const data = this.getData(dataSet);
      const display = data.map((obj, index) => {
        return <LeaderboardDisplay 
          name={obj.name}
          points={obj.points}
          key={index}
          position={index + 1}
        />;
      });

      return display;
    }
  }

  render() {
    return (
      <div className="leaderboard-component">
        <div className="givers">
          <h2>Top Givers this week:</h2>
          {this.displayLeaders('send_name')}
        </div>
        <div className="senders">
          <h2>Top Earners this week:</h2>
          {this.displayLeaders('received_name')}
        </div>
      </div>
    );
  }
}

export const mapStateToProps = ( store ) => ({
  GroupTransactions: store.GroupTransactions
});

export default connect(mapStateToProps, null)(Leaderboard);

Leaderboard.propTypes = {
  GroupTransactions: PropTypes.array
};