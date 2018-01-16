import React, { Component } from 'react';
import { connect } from 'react-redux';
import Member from '../Member/Member';
import './GroupMembers.css';

class GroupMembers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: 'list-hidden',
      buttonText: `SHOW ALL MEMBERS - ${this.props.Group.group_name}`
    }
  }

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
      })

      const display = sorted.map((user) => {
        return <Member 
          name={user.name}
          key={user.user_id}
        />
      })

      return display;
    }
  }

  toggleDisplay = () => {
    if (this.state.display === 'list-hidden') {
      this.setState({
        display: 'list-active',
        buttonText: 'HIDE'
      })
    } else {
      this.setState({
        display: 'list-hidden',
        buttonText: `SHOW ALL MEMBERS - ${this.props.Group.group_name}`
      })
    }
  }

  render() {
    return (
      <div className="group-members-component">
        <button
          onClick={() => this.toggleDisplay()}
        >{this.state.buttonText}
        </button>
        <div className={this.state.display} >
          {this.displayGroupMembers()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  UserList: store.UserList,
  Group: store.Group
})

export default connect(mapStateToProps, null)(GroupMembers);