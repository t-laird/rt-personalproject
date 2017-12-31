import React, { Component } from 'react';
import { connect } from 'react-redux';
import generator from 'generate-password';
import * as actions from '../../Actions';
import getKeyFromLS from '../../helpers/getKeyFromLS';
import validateGroup from '../../helpers/validateGroup';
import './CreateGroup.css';


class CreateGroup extends Component {
	constructor() {
		super();

		this.state = {
			groupName: '',
			weeklyPoints: '',
			message: 'Create a new group:'
		}
	}

	createGroup = async (event, groupName, weeklyPoints) => {
		event.preventDefault();
		const password = generator.generate({
			length: 6,
			number: true
		})

		const response = await fetch('http://localhost:3000/api/v1/group/new', {
			method: 'POST',
			body: JSON.stringify({
				group_name: groupName,
				group_passphrase: password,
				weekly_points: weeklyPoints
			}),
			headers: {
				'Content-Type': 'application/json',
	      'x-token': getKeyFromLS(),

			}
		})

		const groupResponse = await response.json();
		this.props.updateGroup(groupResponse[0])

		const userResponse = await validateGroup(groupResponse[0].group_passphrase, this.props.user.user_id)
		this.props.updateUser(userResponse[0])
	}

	handleChange = (event) => {
		const { target } = event;
		const { name, value } = target;

		this.setState({[name]: value})
	}

	render() {
		return (
			<div className="create-group-component">
				<h3>{this.state.message}</h3>
				<form>
					<input 
						className="group-name-input"
						onChange={this.handleChange}
						placeholder='group name'
						value={this.state.groupName}
						name='groupName'
					/>
					<h3>How many points will group members be able to give away each week? <span className="join-span">(we recommend 50)</span></h3>
					<input
						className="points-input"
						onChange={this.handleChange}
						placeholder='points'
						value={this.state.weeklyPoints}
						name='weeklyPoints'
					/>
					<button
						onClick={(event) => this.createGroup(event, this.state.groupName, this.state.weeklyPoints)}
					>SUBMIT
					</button>
				</form>
			</div>
		)
	}
}

const mapStateToProps = ( store ) => ({
	user: store.User
});

const mapDispatchToProps = dispatch => ({
	updateGroup: group => {
		dispatch(actions.updateGroup(group))
	},
	updateUser: user => {
		dispatch(actions.updateUser(user))
	}
});



export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup);