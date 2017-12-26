import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../Actions';
import { NavLink } from 'react-router-dom';
import validateGroup from '../../helpers/validateGroup';



class JoinGroup extends Component {
	constructor() {
		super();

		this.state = {
			passphrase: '',
			message: `You haven't joined a group yet.  And you should!  Enter your group passphrase below:`
		}
	}

	componentDidMount = () => {
		if (this.props.group.group_name) {
			this.setState({message: `You are a member of: ${this.props.group.group_name}`})
		} else if (this.props.user.group_id) {
			this.setState({message: 'You are a member of a group!'})
		}
	}

	handleChange = (event) => {
		const { target } = event;
		const { name, value } = target;

		this.setState({[name]: value})
	}

	joinGroup = async (event) => {
		event.preventDefault();
		const response = await validateGroup(this.state.passphrase, this.props.user.user_id)
		this.props.updateUser(response[0])
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
	user: store.User,
	group: store.Group
})

const mapDispatchToProps = dispatch => ({
	updateUser: user => {
		dispatch(actions.updateUser(user))
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(JoinGroup);