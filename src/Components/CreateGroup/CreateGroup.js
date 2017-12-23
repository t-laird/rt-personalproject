import React, { Component } from 'react';
import { connect } from 'react-redux';
import generator from 'generate-password';
import * as actions from '../../Actions';

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
				weekly_points: weeklyPoints,
				administrator_id: this.props.user.user_id
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})

		const cleanResponse = await response.json();
		console.log('1234', response, cleanResponse)
		this.props.updateGroup(cleanResponse[0])
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
	}
});



export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup);