import React from 'react';
import './GroupData.css';
import { connect } from 'react-redux';

export const GroupData = (props) => {

	

	return (
		<div className="group-data-component">
			<h2>{props.group.group_name}</h2>
			<h3>this week points available to award</h3>
			<h3>points awarded this week</h3>
			<h3>points awarded - total</h3>
		</div>
	) 
}

const mapStateToProps = ( store ) => ({
	group: store.Group,
	GroupTransactions: store.GroupTransactions
});

export default connect(mapStateToProps, null)(GroupData);