import React, { Component } from 'react';
import { connect } from 'react-redux';
import LeaderboardDisplay from '../LeaderboardDisplay/LeaderboardDisplay';
import './Leaderboard.css';


class Leaderboard extends Component {

  getGivers = () => {
    const recentWeek = this.props.GroupTransactions[this.props.GroupTransactions.length - 1].transactions;
    const givers = recentWeek.reduce((accum, transaction) => {
      if (!accum[transaction.send_name]) {
        accum[transaction.send_name] = { points: 0 }
      }
      accum[transaction.send_name].points += transaction.point_value
      return accum;
    }, {})
    const array = Object.keys(givers).map(user => {
      return { name: user, points: givers[user].points }
    })
    const result = array.sort((a, b) => b.points - a.points)

    return result
  }

  getReceivers = () => {

  }

  displayLeaders = (dataSet) => {
    let data;
    if (dataSet === 'givers') {
      data = this.getGivers();
    } else {
      data = this.getReceivers();
    }

    const display = data.map((obj, index) => {
      return <LeaderboardDisplay 
        name={obj.name}
        points={obj.points}
        key={index}
        position={index + 1}
      />
    })

    return display;
  }


  render() {
    return (
      <div className="leaderboard-component">
        {this.displayLeaders('givers')}
      </div>
    )
  }
}

const mapStateToProps = ( store ) => ({
  GroupTransactions: store.GroupTransactions
})

export default connect(mapStateToProps, null)(Leaderboard);