import React, { Component } from 'react';
import './Group.css';
import GroupData from '../GroupData/GroupData';
import GroupProfile from '../GroupProfile/GroupProfile';
import getKeyFromLS from '../../helpers/getKeyFromLS';


class Group extends Component {
	constructor() {
		super();

		this.state = {

		}
	}

	render() {
		return (
			<div className="group-component">
				<GroupData />
				<GroupProfile />
			</div>
		) 
	}
}

export default Group;