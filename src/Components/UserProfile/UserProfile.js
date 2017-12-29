import React, { Component } from 'react';
import './UserProfile.css';
import { connect } from 'react-redux';
import { VictoryClipContainer, VictoryChart, VictoryLine, VictoryLegend, VictoryAxis } from 'victory';

class UserProfile extends Component {
  constructor() {
    super();
  }

  formatSent = () => {
    const { UserTransactions } = this.props;
    if (UserTransactions.length && Object.keys(this.props.Group).length) {

      const weeklySent = UserTransactions.reduce((array, week, index) => {
        array.push({
          x: index,
          y: week.sent.reduce((pointsSent, transaction) => {
            pointsSent += transaction.point_value;
            return pointsSent;
          }, 0),
        });
        return array
      }, [])

      return weeklySent;
    }
  }

  formatReceived = () => {
    const { UserTransactions } = this.props;
    if (UserTransactions.length && Object.keys(this.props.Group).length) {
      const weeklyReceived = UserTransactions.reduce((array, week, index) => {
        array.push({
          x: index,
          y: week.received.reduce((pointsReceived, transaction) => {
            pointsReceived += transaction.point_value;
            return pointsReceived;
          }, 0),
        });
        return array
      }, [])
      return weeklyReceived;
    }
  }

  chartLabels = () => {
    let labelArray = ['this week']
    const dataLength = this.props.UserTransactions.length;
    if (dataLength > 0) {
    console.log(dataLength)
      for (let i = 1; i < dataLength - 1; i++) {
        labelArray.unshift('-' + i.toString())
        console.log(labelArray)
      }
    }

    return labelArray;
  }


  render() {
    return (
      <div className="user-profile-component">
        <VictoryChart>
          <VictoryLine
            groupComponent={<VictoryClipContainer clipPadding={{ top: 5, right: 10 }}/>}
            style={{ data: { stroke: "#85c0de", strokeWidth: 10} }}
            data={this.formatSent()}
          />
          <VictoryLine
            groupComponent={<VictoryClipContainer clipPadding={{ top: 5, right: 10 }}/>}
            style={{ data: { stroke: "#006699", strokeWidth: 10} }}
            data={this.formatReceived()}
          />
          <VictoryLegend
            data={[ 
              {name: "POINTS SENT", symbol: { fill: "#006699", type: "square" }, labels: {fontSize: 12, fill: "#006699"}},
              {name: "POINTS RECEIVED", symbol: { fill: "#85c0de", type: "square" }, labels: {fontSize: 12, fill: "#85c0de"}}
            ]}
            orientation="horizontal"
            gutter={20}
          />
          <VictoryAxis 
            tickValues={this.chartLabels()}
            // tickFormat={this.chartLabels()}
          />
          <VictoryAxis 
            dependentAxis={true}
          />
        </VictoryChart>
      </div>
    ) 
  }
}

const mapStateToProps = ( store ) => ({
  UserTransactions: store.UserTransactions,
  UserList: store.UserList,
  User: store.User,
  Group: store.Group
});

export default connect(mapStateToProps, null)(UserProfile);