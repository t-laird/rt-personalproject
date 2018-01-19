import React, { Component } from 'react';
import { connect } from 'react-redux';
import Member from '../Member/Member';
import './GroupMembers.css';
import PropTypes from 'prop-types';

class GroupMembers extends Component {

  displayGroupMembers = () => {
    if (this.props.UserList.length) {
      const allMembers = this.props.UserList;
      const sorted = allMembers.sort((a, b) => {
        let nameA = a.name.toUpperCase();
        let nameB = b.name.toUpperCase();

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });

      const display = sorted.map((user) => {
        return <Member 
          updateRecipient={this.props.updateRecipient}
          name={user.name}
          key={user.user_id}
        />;
      });

      return display;
    }
  }

  render() {
    return (
      <div className="group-members-component">
        <div className="group-members-header">
          <h4>ALL {this.props.Group.group_name} MEMBERS</h4>
        </div>
        <div className="members-container">
          {this.displayGroupMembers()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  UserList: store.UserList,
  Group: store.Group
});

export default connect(mapStateToProps, null)(GroupMembers);

GroupMembers.propTypes = {
  UserList: PropTypes.array,
  Group: PropTypes.object,
  updateRecipient: PropTypes.func
};