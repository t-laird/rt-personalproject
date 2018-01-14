import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserData from '../UserData/UserData';
import UserProfile from '../UserProfile/UserProfile';
import './User.css';
import Transaction from '../Transaction/Transaction';
import Comments from '../Comments/Comments';
import PropTypes from 'prop-types';

export class User extends Component {

  componentDidMount() {
    if (!this.props.User.name) {
      this.props.history.push('/snap-ninja/login');
    }
  }

  render() {
    return (
      <div className="user-component">
        <UserData />
        <Transaction />
        <Comments />
        <UserProfile />
      </div>
    );
  }
}

export const mapStateToProps = ( store ) => ({
  User: store.User
});

export default connect(mapStateToProps, null)(User);

User.propTypes = {
  User: PropTypes.object,
  history: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ])
};