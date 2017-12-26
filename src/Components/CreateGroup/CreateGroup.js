import React, { Component } from 'react';
import { connect } from 'react-redux';
import generator from 'generate-password';
import * as actions from '../../Actions';
import getKeyFromLS from '../../helpers/getKeyFromLS';
import validateGroup from '../../helpers/validateGroup';


class CreateGroup extends Component {
	constructor() {
		super();

		this.state = {
			groupName: '',
			weeklyPoints: '',
			message: 'Create a new group'
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
			<div>
				<h4>{this.state.message}</h4>
				<form>
					<input 
						onChange={this.handleChange}
						placeholder='choose group name'
						value={this.state.groupName}
						name='groupName'
					/>
					<input 
						onChange={this.handleChange}
						placeholder='choose number of weekly points members receive'
						value={this.state.weeklyPoints}
						name='weeklyPoints'
					/>
					<button
						onClick={(event) => this.createGroup(event, this.state.groupName, this.state.weeklyPoints)}
					>submit
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