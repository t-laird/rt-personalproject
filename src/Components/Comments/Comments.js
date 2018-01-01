import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentCard from '../CommentCard/CommentCard';
import './Comments.css';
import moment from 'moment';

class Comments extends Component {

  getReceivedData = () => {
    const receivedPoints = this.props.UserTransactions.reduce((accum, week) => {
      week.received.forEach(transaction => {
        if (transaction.created_time > (moment(Date.now()).subtract(30, 'days'))) {
          accum.push(transaction);
        }
      })
      return accum;
    }, [])
    return receivedPoints;
  }

  randomNum = () => {
    const num = Math.floor(Math.random() * 5)
    return num;
  }

  displayComments = () => {
    const commentsArray = this.getReceivedData();
    const display = commentsArray.map((comment, index) => {
      return <CommentCard 
        displayTextValue={this.randomNum()}
        value={comment.point_value}
        sender={comment.send_id} //change this to send name when available!
        day={moment(comment.created_at).format('dddd').toUpperCase()}
        key={index}
      />
    })
    return display;
  }

  render() {
    return (
      <div className="comments-component">
        {this.displayComments()}
      </div>
    )
  }
}

const mapStateToProps = ( store ) => ({
  UserTransactions: store.UserTransactions
});

export default connect(mapStateToProps, null)(Comments);