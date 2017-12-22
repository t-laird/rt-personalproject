import React from 'react';
import './UserData.css';
import { connect } from 'react-redux';

export const UserData = (props) => {

	return (
		<div className="user-data-component">
			<h2>Welcome, {props.user.User.name}!</h2>
			<h4>available points to award</h4>
			<h4>points received - this week</h4>
			<h4 className="give-points">GIVE POINTS</h4>
		</div>
	) 
}

const mapStateToProps = store => {
	return {
		user: store
	}
}

export default connect(mapStateToProps, null)(UserData)