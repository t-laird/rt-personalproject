import React from 'react';
import './Group.css';
import GroupData from '../GroupData/GroupData';
import GroupProfile from '../GroupProfile/GroupProfile';
import Leaderboard from '../Leaderboard/Leaderboard';

const Group = () => {
	return (
		<div className="group-component">
			<GroupData />
			<GroupProfile />
			<Leaderboard />
		</div>
	) 
}

export default Group;