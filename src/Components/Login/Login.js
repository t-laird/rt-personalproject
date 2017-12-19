import React, { Component } from 'react';
import './Login.css';

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
			<div className="login-component">
				<h2>Create an account</h2>
				<input 
					className="userName"
					type="text"
					placeholder="name"
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
				<button>SUBMIT</button>
			</div>
		) 
	}
}

export default Login;