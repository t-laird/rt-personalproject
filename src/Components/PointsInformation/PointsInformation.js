import React, { Component } from 'react';
import { connect } from 'react-redux';


class PointsInformation extends Component {
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

  newUserMessage = () => {
    if (!Object.keys(this.props.Group).length) {
      return <h5>Join a group to send and receive snaps.</h5>;
    }
  }

  render() {
    return (
      <div className="PointsInformation">
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
      </div>
    );
  }
};

export const mapStateToProps = ( store ) => ({
  UserTransactions: store.UserTransactions,
  Group: store.Group
});


export default connect(mapStateToProps, null)(PointsInformation);