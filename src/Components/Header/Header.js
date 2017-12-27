import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css'
import { connect } from 'react-redux'
import * as actions from '../../Actions/index.js';
import clearLocalStorage from '../../helpers/clearLocalStorage';

export const Header = (props) => {

	const logout = () => {
		props.logoutUser();
		clearLocalStorage();
	}

	let headerDisplay;

	if (!Object.keys(props.user).length) {
		headerDisplay = (<a className="login" href="https://tr-personal-proj.e1.loginrocket.com">LOGIN / SIGNUP</a>)
	} else {
		headerDisplay = (
			<div>
				<NavLink className="user" to='/user'>{props.user.name}<img src={require('./assets/user.svg')} /></NavLink>
		    <NavLink className="group" to='/group'>{props.group.group_name} group<img src={require('./assets/group.svg')} /></NavLink>
		    <NavLink className="logout" to='/' onClick={logout} >LOGOUT</NavLink>
	    </div>
		)
	}

	return (
	  <div className="header-component">
	    <NavLink exact to='/'><h1>SNAP<img className="header-logo" src={require('./assets/ninja-logo.svg')} />NINJA</h1></NavLink>
	  	{headerDisplay}
	  </div>
	)
}


const mapStateToProps = store => ({
	user: store.User,
	group: store.Group
});

export const mapDispatchToProps = dispatch => ({
	logoutUser: () => {
		dispatch(actions.logoutUser())
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Header)