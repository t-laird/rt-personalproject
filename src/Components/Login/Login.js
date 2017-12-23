import React, { Component } from 'react';
import './Login.css';
import clearLocalStorage from '../../helpers/clearLocalStorage';

class Login extends Component {
	constructor() {
		super();
	}

	 componentDidMount() {
    this.checkForKey();    
  }

  // async sendKey (key) {
  //   const loginResponse = await fetch('http://localhost:3000/api/v1/login', {
  //     method: 'GET',
  //     headers: {
  //       "x-token": key,
  //       "CONTENT-TYPE": 'application/json'
  //     }
  //   });
  //   const userData = await loginResponse.json();

  //   this.props.updateUser(userData[0]);
  //   this.props.history.push('/user');
  // }

  checkForKey() {
    const userKey = JSON.parse(localStorage.getItem('123rtx-token'));
    if (this.props.location.search.length > 200) {
      const passedToken = this.getToken();
      localStorage.setItem('123rtx-token', JSON.stringify(passedToken));
      this.props.history.push('/user');
      // this.sendKey(passedToken);
    } else if (userKey) {
      // this.sendKey(userKey);
      this.props.history.push('/user');

    } else {
    	clearLocalStorage();
    	window.location="https://tr-personal-proj.e1.loginrocket.com"
    }
  }

  getToken () {
  	////REGEX NEEDS TO CUT OFF WHEN THERE IS MORE ON THE END
  	///  for ex.   &signup=true   match between = and & OR end of string
    const tokenRegex = new RegExp(/\?token=/);
    const parseToken = this.props.location.search.replace(tokenRegex, '');

    return parseToken;
  }





	render() {
		return (
			<div className="login-component">
			
			</div>
		) 
	}
}

export default Login;