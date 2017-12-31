import React from 'react';
import './Group.css';
import GroupData from '../GroupData/GroupData';
import GroupProfile from '../GroupProfile/GroupProfile';

const Group = () => {
	return (
		<div className="group-component">
			<GroupData />
			<GroupProfile />
		</div>
	) 
}

export default Group;