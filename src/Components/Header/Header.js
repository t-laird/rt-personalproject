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

	let noUser;
	let userLoggedIn;

	if (!Object.keys(props.user).length) {
		noUser = (<a className="login" href="https://tr-personal-proj.e1.loginrocket.com">LOGIN / SIGNUP</a>)
	} else {
		userLoggedIn = (
			<div>
		    <NavLink className="logout" to='/' onClick={logout} >LOGOUT</NavLink>
				<NavLink className="user" to='/user'><span>User: </span>{props.user.name}</NavLink>
		    <NavLink className="group" to='/group'><span>Group: </span>{props.group.group_name}</NavLink>
	    </div>
		)
	}



	return (
	  <div className="header-component">
	    <NavLink exact to='/'><h1>APP NAME</h1></NavLink>
	  	{noUser}
	  	{userLoggedIn}
	    
	  </div>
	)
}

const mapStateToProps = store => ({
	user: store.User,
	group: store.Group
});

const mapDispatchToProps = dispatch => ({
	logoutUser: () => {
		dispatch(actions.logoutUser())
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Header)