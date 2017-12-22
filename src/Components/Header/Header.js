import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css'
import { connect } from 'react-redux'
import * as actions from '../../Actions/index.js';
import clearLocalStorage from '../../helpers/clearLocalStorage';

const Header = (props) => {

	const logout = () => {
		props.logoutUser();
		clearLocalStorage();
	}

	return (
	  <div className="header-component">
	    <NavLink exact to='/'><h1>APP NAME</h1></NavLink>
	    <a className="login" href="https://tr-personal-proj.e1.loginrocket.com">LOGIN/SIGNUP</a>
	    <NavLink className="user" to='/user'>USER</NavLink>
	    <NavLink className="group" to='/group'>GROUP</NavLink>
	    <NavLink className="logout" to='/' onClick={logout} >LOGOUT</NavLink>
	  </div>
	)
}

const mapDispatchToProps = dispatch => ({
	logoutUser: () => {
		dispatch(actions.logoutUser())
	}
});

export default connect(null, mapDispatchToProps)(Header)