import React, { Component } from 'react';
import './Slack.css';
import { connect } from 'react-redux';
import validateSlackId from '../../helpers/fetches/validateSlackId/validateSlackId';

class Slack extends Component {
  constructor() {
    super();
    this.state = {
      slackId: '',
      message: null
    };
  }

  handleInput = (e) => {
    const {name, value} = e.target;
    
    this.setState({
      [name]: value
    });
  }

  handleSubmit = async () => {
    const { slackId } = this.state;
    const validateInput = await validateSlackId(slackId);

    if (validateInput.status === 'success') {
      this.setState({
        message: <h5>Your Slack id <span>{this.state.slackId}</span> was successfully added to your Snap Ninja account! Try <span>/snap help</span> for help using Snap Ninja from slack!</h5>
      });
    } else {
      this.setState({
        message: <h5>You Slack id <span>{this.state.slackId}</span> could not be added. Are you sure you put in the right information? Type /snap in slack to get your ID!</h5>
      });
    }
  }

  componentDidMount() {
    if (!this.props.User.name) {
      this.props.history.push('/login');
    }
  }

  componentContent = () => {
    if (this.props.User.slack_id) {
      return (
        <div className="Slack">
          <div className="slack-header">
            <h4>CONNECT TO SLACK</h4>
          </div>
          <h6>Your Slack ID is {this.props.User.slack_id}</h6>
          <h5>You have already connected your Slack and Snap Ninja accounts! If you need help using Snap Ninja slash commands in Slack, try <span>/snap help</span>.</h5>
        </div>
      );
    }

    return (
      <div className="Slack">
        <div className="slack-header">
          <h4>CONNECT TO SLACK</h4>
        </div>
        <h5>Type /snap anywhere in Slack to get your User Id! (case sensitive)</h5>
        <input 
          type="text" 
          value={this.state.slackId} 
          placeholder="Slack ID"
          onChange={(e) => {this.handleInput(e)}}
          name="slackId" /> <br/>
        <button onClick={this.handleSubmit}>UPDATE</button>
        {this.state.message}
      </div>
    );
  }

  render() {
    return this.componentContent();
  }
}

export const mapStateToProps = ( store ) => ({
  User: store.User
});


export default connect(mapStateToProps, null)(Slack);