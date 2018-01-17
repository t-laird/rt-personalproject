import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Account.css';

class Account extends Component {
  constructor() {
    super();

    this.state = {
      groupActive: false
    }
  }

  componentDidMount = () => {
    if (this.props.Group.group_name) {
      this.setState({groupActive: true})
    }
  }

  joinButtonText = () => {
    if (this.state.groupActive === false) {
      return 'JOIN GROUP'
    } else {
      return 'SWITCH GROUPS'
    }
  }

  currentGroupText = () => {
    if (this.state.groupActive === false) {
      return (
        <div className="current-group">
          <h5>You are not currently a member of a group.  You should join or create one!</h5>
        </div>
      )
    } else {
      return (
        <div>
          <div className="current-group">
            <h5>You are currently a member of: </h5>
            <h4><Link to="/snap-ninja/group">{this.props.Group.group_name}</Link></h4>
          </div>
          <div className="passphrase">
            <h5>Your group's passphrase is: </h5>
            <span className="passphrase-span">{this.props.Group.group_passphrase}</span>
          </div> 
        </div>
      )
    }
  }   

  render() {
    return (
      <div className="account-component">

        <div className="account-heading">
          <h4>Account</h4>
        </div>

        <div className="account-container">
          {this.currentGroupText()}
          <div className="account-links">
            <button><Link to="/snap-ninja/account/creategroup">CREATE GROUP</Link></button>
            <button><Link to="/snap-ninja/account/joingroup">{this.joinButtonText()}</Link></button>
          </div>
        </div>

      </div>
    )
  }
}

const mapStateToProps = store => ({
  User: store.User,
  Group: store.Group
})

export default connect(mapStateToProps, null)(Account);