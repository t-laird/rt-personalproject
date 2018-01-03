import React, { Component } from 'react';
import './GroupData.css';
import { connect } from 'react-redux';

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
	      <h2>{this.props.group.group_name || 'Group'}</h2>
	      <h3>Group points awarded this week: <span className="group-span">{this.currentPoints()}</span></h3>
	      <h3>Total - all time: <span className="group-span">{this.totalPoints()}</span></h3>
	    </div>
	  ); 
	}
}

export const mapStateToProps = ( store ) => ({
  group: store.Group,
  GroupTransactions: store.GroupTransactions
});

export default connect(mapStateToProps, null)(GroupData);