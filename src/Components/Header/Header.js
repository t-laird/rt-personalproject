import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css'

const Header = () => {

	return (
		<div className="header-component">
			<NavLink exact to='/'><h1>APP NAME</h1></NavLink>
			<NavLink className="login" to='/login'>LOGIN</NavLink>
			<NavLink className="user" to='/user'>USER</NavLink>
			<NavLink className="group" to='/group'>GROUP</NavLink>
		</div>
	)
}

export default Header;