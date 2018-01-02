import React from 'react';
import './UserData.css';
import { connect } from 'react-redux';

export const UserData = (props) => {

  return (
    <div className="user-data-component">
      <h2>Welcome, {props.user.User.name}!</h2>
    </div>
  ); 
};

const mapStateToProps = store => {
  return {
    user: store
  };
};

export default connect(mapStateToProps, null)(UserData);