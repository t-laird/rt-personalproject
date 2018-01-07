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
        <div className="leaderboard-header">
          <h4>LEADERBOARD</h4>
        </div>
        <div className="leaderboard-subhead">
          <h4 className="givers-heading">TOP GIVERS</h4>
          <div className="this-week-center">
            <img className="this-week-arrows" src={require('./assets/arrow-left.svg')} />
            <h5>THIS WEEK</h5>
            <img className="this-week-arrows" src={require('./assets/arrow-right.svg')} />
          </div>
          <h4>TOP EARNERS</h4>
        </div>
        <div className="leaders-holder">
          <h4 className="small-only">TOP GIVERS</h4>
          <div className="givers">
            <img className="ribbon" src={require('./assets/ribbon-white.svg')} />
            {this.displayLeaders('send_name')}
          </div>
          <h4 className="small-only">TOP EARNERS</h4>
          <div className="earners">
            <img className="ribbon" src={require('./assets/ribbon-brown.svg')} />
            {this.displayLeaders('received_name')}
          </div>
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