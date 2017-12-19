import React from 'react';
import UserData from '../UserData/UserData';
import UserProfile from '../UserProfile/UserProfile';
import './User.css';

const User = () => {

	return (
		<div className="user-component">
			<UserData />
			<UserProfile />
		</div>
	) 
}

export default User;