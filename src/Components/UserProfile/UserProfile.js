import React, { Component } from 'react';
import './UserProfile.css';
import { connect } from 'react-redux';
import { VictoryClipContainer, VictoryChart, VictoryLine, VictoryLegend, VictoryAxis, VictoryLabel } from 'victory';

class UserProfile extends Component {
  constructor() {
    super();
  }

  generateReceivedLine = () => {
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

      return (
        <VictoryLine
          groupComponent={<VictoryClipContainer clipPadding={{ top: 5, right: 10 }}/>}
          style={{ data: { stroke: "#006699", strokeWidth: 10} }}
          data={weeklyReceived}
        /> 
      )
    }
  }

  generateSentLine = () => {
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

      return (
        <VictoryLine
          groupComponent={<VictoryClipContainer clipPadding={{ top: 5, right: 10 }}/>}
          style={{ data: { stroke: "#fe5630", strokeWidth: 10} }}
          data={weeklySent}
        />
      )
    }
  }

  generateChart = () => {
    return (
      <div className="user-profile-component">
        <VictoryChart>
          {this.generateReceivedLine()}
          {this.generateSentLine()}
          <VictoryLegend
            data={[ 
              {name: "POINTS SENT", symbol: { fill: "#fe5630", type: "square" }, labels: {fontSize: 12, fill: "#fe5630", fontFamily: "semplicitapro", padding: 0, fontWeight: 900}},
              {name: "POINTS RECEIVED", symbol: { fill: "#006699", type: "square" }, labels: {fontSize: 12, fill: "#006699", fontFamily: "semplicitapro", padding: 0, fontWeight: 900}}
            ]}
            orientation="horizontal"
            gutter={20}
            y={280}
          />
          <VictoryAxis 
            tickValues={['']}
            style={{
              axis: {stroke: "#b9e5fb", strokeWidth: 6},
            }}
          />
          <VictoryAxis 
            dependentAxis={true}
            style={{
              axis: {stroke: "#b9e5fb", strokeWidth: 6},
              tickLabels: {fill: "#85c0de", fontFamily: "semplicitapro"}
            }}
          />
          <VictoryLabel 
            text={`Last ${this.props.UserTransactions.length} Week${this.props.UserTransactions.length === 1 ? '' : 's'}`}
            x={"38%"}
            y={"4%"}
            style={{fill: '#006699', fontSize: '18', fontWeight: 900, fontFamily: "semplicitapro"}}
          />
          <VictoryLabel 
            text={"this week"}
            x={"82%"}
            y={"90%"}
            style={{fill: '#85c0de', fontSize: '14', fontWeight: 500, fontFamily: "semplicitapro"}}
          />
        </VictoryChart>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.generateChart()}
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