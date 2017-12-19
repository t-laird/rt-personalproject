import React, { Component } from 'react';
import './Group.css';
import GroupData from '../GroupData/GroupData';


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
			</div>
		) 
	}
}

export default Group;