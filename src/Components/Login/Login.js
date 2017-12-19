import React, { Component } from 'react';

class Login extends Component {
	constructor() {
		super();

		this.state = {
			userName:'',
			email: '',
			password: ''
		}
	}

	handleChange = (event) => {
		const { target } = event;
		const { name, value } = target;

		this.setState({[name]: value});
	}

	render() {
		return (
			<div>
				<input 
					className="userName"
					type="text"
					placeholder="userName"
					onChange={this.handleChange}
					value={this.state.userName}
					name="userName"
				/>
				<input 
					className="email"
					type="text"
					placeholder="email"
					onChange={this.handleChange}
					value={this.state.email}
					name="email"
				/>
				<input 
					className="password"
					type="text"
					placeholder="password"
					onChange={this.handleChange}
					value={this.state.password}
					name="password"
				/>
				<button>submit</button>
			</div>
		) 
	}
}

export default Login;