import React, { Component } from 'react';
import { connect } from 'react-redux';
import { VictoryArea, VictoryAxis, VictoryLabel, VictoryChart } from 'victory';
import './GroupProfile.css';
import PropTypes from 'prop-types';


export class GroupProfile extends Component {

  generateChartArea = () => {
    const { GroupTransactions } = this.props;
    if (GroupTransactions.length && Object.keys(this.props.Group).length) {
      const weeklyData = GroupTransactions.reduce((array, week, index) => {
        array.push({
          x: index,
          y: week.transactions.reduce((pointsReceived, transaction) => {
            pointsReceived += transaction.point_value;
            return pointsReceived;
          }, 0)
        });
        return array;
      }, []);

      return (
        <VictoryArea 
          data={weeklyData}
          style={{data: {fill: '#e9e9e9'}}}
        />
      );
    }
  }

  getTickValues = () => {
    if (this.props.GroupTransactions.length && Object.keys(this.props.Group).length) {
      const transactionCount = this.props.GroupTransactions.reduce((count, week) => {
        count += week.transactions.length;
        return count;
      }, 0)

      if (transactionCount > 0) {
        return null;
      }
    } 
      
    return ['100', '200', '300', '400', '500'];
  }

  generateChart = () => {
    return (
      <div className="group-profile-component">
     
        <h4>{`${this.props.Group.group_name || 'Group'} - Snaps Awarded - LAST ${this.props.GroupTransactions.length} WEEK${this.props.GroupTransactions.length === 1 ? '' : 'S'}`}</h4>
        <VictoryChart>
          {this.generateChartArea()}

          <VictoryAxis 
            tickValues={['']}
            style={{
              axis: {stroke: "#c9c6c7", strokeWidth: 6}
            }}
          />
          <VictoryAxis 
            tickValues={this.getTickValues()}
            dependentAxis={true}
            style={{
              axis: {stroke: "#c9c6c7", strokeWidth: 6},
              tickLabels: {fill: "#c9c6c7", fontFamily: "semplicitapro"}
            }}
          />
          <VictoryLabel 
            text={"this week"}
            x={"82%"}
            y={"90%"}
            style={{fill: '#c9c6c7', fontSize: '14', fontWeight: 500, fontFamily: "semplicitapro"}}
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
  GroupTransactions: store.GroupTransactions,
  Group: store.Group
});

export default connect(mapStateToProps, null)(GroupProfile);

GroupProfile.propTypes = {
  GroupTransactions: PropTypes.array,
  Group: PropTypes.object
};