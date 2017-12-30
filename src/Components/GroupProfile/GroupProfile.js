import React, { Component } from 'react';
import { connect } from 'react-redux';
import { VictoryArea, VictoryAxis, VictoryLabel, VictoryLegend, VictoryChart } from 'victory';
import './GroupProfile.css';


class GroupProfile extends Component {
	constructor() {
		super();

	}

	generateChartArea = () => {
		const { GroupTransactions } = this.props;
		if (GroupTransactions.length && Object.keys(this.props.Group).length) {
			const weeklyData = GroupTransactions.reduce((array, week, index) => {
				array.push({
					x: index,
					y: week.transactions.reduce((pointsReceived, transaction) => {
						pointsReceived += transaction.point_value;
						return pointsReceived
					}, 0)
				});
				return array
			}, [])

				return (
					<VictoryArea 
						data={weeklyData}
						style={{data: {fill: '#b9e5fb'}}}
					/>
				)
			console.log(weeklyData)
		}
	}

	generateChart = () => {
		return (
			<div className="group-profile-component">
				<VictoryChart>
					{this.generateChartArea()}
					
					<VictoryAxis 
					  tickValues={['']}
					  style={{
					    axis: {stroke: "#85c0de", strokeWidth: 6},
					  }}
					/>
					<VictoryAxis 
						dependentAxis={true}
						style={{
						  axis: {stroke: "#85c0de", strokeWidth: 6},
						  tickLabels: {fill: "#ffffff", fontFamily: "semplicitapro"}
						}}
					/>
					<VictoryLabel 
					  text={`${this.props.Group.group_name || 'Group'} - Points Awarded - LAST ${this.props.GroupTransactions.length} WEEK${this.props.GroupTransactions.length === 1 ? '' : 'S'}`}
					  x={"14%"}
					  y={"4%"}
					  style={{fill: '#ffffff', fontSize: '16', fontWeight: 900, fontFamily: "semplicitapro"}}
					/>
					<VictoryLabel 
					  text={"this week"}
					  x={"82%"}
					  y={"90%"}
					  style={{fill: '#ffffff', fontSize: '14', fontWeight: 500, fontFamily: "semplicitapro"}}
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
	GroupTransactions: store.GroupTransactions,
	Group: store.Group
});

export default connect(mapStateToProps, null)(GroupProfile);