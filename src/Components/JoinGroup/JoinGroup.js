import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../Actions';
import { NavLink } from 'react-router-dom';


class JoinGroup extends Component {
	constructor() {
		super();

		this.state = {
			passphrase: '',
			message: `You haven't joined a group yet.  And you should!  Enter your group passphrase below:`
		}
	}

	handleChange = (event) => {
		const { target } = event;
		const { name, value } = target;

		this.setState({[name]: value})
	}

	joinGroup = (event) => {
		event.preventDefault();
		this.validateGroup(this.state.passphrase)
	}

	validateGroup = async (passphrase) => {
		console.log(this.props.user)
		const response = await fetch(`http://localhost:3000/api/v1/group/validate/${passphrase}/${this.props.user.user_id}`)
		if (response.status >= 400) {
			this.setState({message: 'Passphrase not valid!  Please try again.'})
		} else {
			const cleanResponse = await response.json();
			console.log(cleanResponse)
			this.props.updateUser(cleanResponse[0])
		}
	}

	render() {
		return (
			<div>
				<h4>{this.state.message}</h4>
				<form>
					<input 
						value={this.state.passphrase}
						onChange={this.handleChange}
						placeholder='passphrase' 
						name='passphrase' />
					<button
						onClick={this.joinGroup}
					>submit</button>
				</form>

				<NavLink to='/creategroup'>Create Group</NavLink>

			</div>
		) 
	}
}

const mapStateToProps = ( store ) => ({
	user: store.User
})

const mapDispatchToProps = dispatch => ({
	updateUser: user => {
		dispatch(actions.updateUser(user))
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(JoinGroup);