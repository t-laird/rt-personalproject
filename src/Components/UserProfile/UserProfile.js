import React, { Component } from 'react';
import './UserProfile.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { 
  VictoryClipContainer, 
  VictoryChart, 
  VictoryLine,
  VictoryLegend,
  VictoryAxis,
  VictoryLabel } from 'victory';

export class UserProfile extends Component {

  generateReceivedLine = () => {
    const { UserTransactions } = this.props;
    if (UserTransactions.length && Object.keys(this.props.Group).length) {
      const weeklyReceived = UserTransactions.reduce((array, week, index) => {
        array.push({
          x: index,
          y: week.received.reduce((pointsReceived, transaction) => {
            pointsReceived += transaction.point_value;
            return pointsReceived;
          }, 0)
        });
        return array;
      }, []);

      return (
        <VictoryLine
          groupComponent={
            <VictoryClipContainer 
              clipPadding={{ top: 5, right: 10 }} />
          }
          style={{ data: { stroke: "#7e6e7a", strokeWidth: 10} }}
          data={weeklyReceived}
        /> 
      );
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
          }, 0)
        });
        return array;
      }, []);

      return (
        <VictoryLine
          groupComponent={
            <VictoryClipContainer 
              clipPadding={{ top: 5, right: 10 }} />
          }
          style={{ data: { stroke: "#fff", strokeWidth: 10} }}
          data={weeklySent}
        />
      );
    }
  }

  getTickValues = () => {
    if (this.props.UserTransactions.length && Object.keys(this.props.Group).length) {
      const transactionCount = this.props.UserTransactions.reduce((count, week) => {
        count += week.sent.length + week.received.length;
        return count;
      }, 0);

      if (transactionCount > 0) {
        return null;
      }
    } 
      
    return ['10', '20', '30', '40', '50'];
  }

  generateChart = () => {
    return (
      <div className="user-profile-component">
        <h4>
          {
            `Last ${this.props.UserTransactions.length} 
            Week${this.props.UserTransactions.length === 1 ? '' : 's'}`
          }
        </h4>
        <VictoryChart>
          {this.generateReceivedLine()}
          {this.generateSentLine()}
          <VictoryLegend
            data={[ 
              {
                name: "SNAPS GIVEN", 
                symbol: { 
                  fill: "#fff", 
                  type: "square" 
                }, 
                labels: {
                  fontSize: 12, 
                  fill: "#fff", 
                  fontFamily: "semplicitapro", 
                  padding: 0, 
                  fontWeight: 900
                }
              },
              {
                name: "SNAPS RECEIVED", 
                symbol: { 
                  fill: "#7e6e7a", 
                  type: "square" 
                }, 
                labels: {
                  fontSize: 12, 
                  fill: "#7e6e7a", 
                  fontFamily: "semplicitapro", 
                  padding: 0, 
                  fontWeight: 900
                }
              }
            ]}
            orientation="horizontal"
            gutter={20}
            y={280}
          />
          <VictoryAxis 
            tickValues={['']}
            style={{
              axis: {stroke: "#7e6e7a", strokeWidth: 6}
            }}
          />
          <VictoryAxis 
            tickValues={this.getTickValues()}
            dependentAxis={true}
            style={{
              axis: {stroke: "#7e6e7a", strokeWidth: 6},
              tickLabels: {fill: "#7e6e7a", fontFamily: "semplicitapro"}
            }}
          />
         
          <VictoryLabel 
            text={"this week"}
            x={"82%"}
            y={"90%"}
            style={
              {
                fill: '#7e6e7a', 
                fontSize: '14', 
                fontWeight: 500, 
                fontFamily: "semplicitapro"
              }
            }
          />
        </VictoryChart>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.generateChart()}
      </div>
    ); 
  }
}

export const mapStateToProps = ( store ) => ({
  UserTransactions: store.UserTransactions,
  Group: store.Group
});

export default connect(mapStateToProps, null)(UserProfile);

UserProfile.propTypes = {
  UserTransactions: PropTypes.array,
  Group: PropTypes.object
};