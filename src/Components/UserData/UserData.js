import React from 'react';
import './UserData.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export const UserData = (props) => {

  return (
    <div className="user-data-component">
      <h2>Welcome, {props.user.name}!</h2>
    </div>
  ); 
};

export const mapStateToProps = store => {
  return {
    user: store.User
  };
};

export default connect(mapStateToProps, null)(UserData);

UserData.propTypes = {
  user: PropTypes.object
};