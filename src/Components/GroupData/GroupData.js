import React, { Component } from 'react';
import './GroupData.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class GroupData extends Component {

  totalPoints = () => {
    const totals = this.props.GroupTransactions.reduce((accum, week) => {
      accum += week.transactions.reduce((accum, transaction) => {
        accum += transaction.point_value;
        return accum;
      }, 0);
      return accum;
    }, 0);
    return totals;
  }

  currentPoints = () => {
    if (this.props.GroupTransactions.length > 0) {
      const allCurrent = (this.props.GroupTransactions[this.props.GroupTransactions.length - 1]);			
      const currentTotals = allCurrent.transactions.reduce((accum, transaction) => {
        accum += transaction.point_value;
        return accum;
      }, 0);

      return currentTotals;
    }
  }

  render() {
    return (
      <div className="group-data-component">
        <div className="group-header">
          <h4>{this.props.group.group_name} group</h4>
        </div>

        <div className="current-points">
          <div className="this-week">
            <span className="group-span">{this.currentPoints()}</span>
            <h6>THIS WEEK</h6>
          </div>

          <div className="divider">
            <h4>SNAPS</h4>
            <span>IN TOTAL</span>
          </div>

          <div className="all-time">
            <span className="group-span">{this.totalPoints()}</span>
            <h6>ALL TIME</h6>
          </div>
        </div>

      </div>
    ); 
  }
}

export const mapStateToProps = ( store ) => ({
  group: store.Group,
  GroupTransactions: store.GroupTransactions
});

export default connect(mapStateToProps, null)(GroupData);

GroupData.propTypes = {
  GroupTransactions: PropTypes.array,
  group: PropTypes.object
};