import React from 'react';
import './UserData.css';

const UserData = () => {

	return (
		<div className="user-data-component">
			<h2>username</h2>
			<h4>available points to award</h4>
			<h4>points received - this week</h4>
			<h4 className="give-points">GIVE POINTS</h4>
		</div>
	) 
}

export default UserData;