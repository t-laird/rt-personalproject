import React, { Component } from 'react';
import './Group.css';
import GroupData from '../GroupData/GroupData';
import GroupProfile from '../GroupProfile/GroupProfile';
import { connect } from 'react-redux';


class Group extends Component {

  componentDidMount() {
    if (!this.props.User.name) {
      this.props.history.push('/login');
    }
  }

  render() {
    return (
      <div className="group-component">
        <GroupData />
        <GroupProfile />
      </div>
    ); 
  }
}

const mapStateToProps = ( store ) => ({
  User: store.User
});

export default connect(mapStateToProps, null)(Group);