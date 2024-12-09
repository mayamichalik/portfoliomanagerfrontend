import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DataServiceService, stockInfoSchema } from '../data-service.service';

export interface priceDataPoint {
	x: Date,
	y: number[]
}

export interface volumeDataPoint {
	x: Date,
	y: number
}

enum DefaultRangeValues {
	week= "week",
	month= "month",
	sixMonth = "six_month",
	year = "year",
	custom = "custom"
}

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnChanges{
	chart: any;
	button_toggle_val = DefaultRangeValues.month;

	validRange: boolean = true;
	range_start: string = ""
	range_end: string = ""
	
	@Input() ticker: string = "AAPL"

	priceData: priceDataPoint[] = []
	volumeData: volumeDataPoint[] = []

	labelFormatter = (e:any) => {
		var suffixes = ["", "K", "M", "B"];
 
		var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
		if(order > suffixes.length - 1)
			order = suffixes.length - 1;
 
		var suffix = suffixes[order];
		return ('$' +(e.value / Math.pow(1000, order)) + suffix);
	}

	chartOptions = {
		animationEnabled: true,
		theme: "light2",
		title:{
			text: "Stock History"
		},
		axisX:{
			valueFormatString: "D MMM"
		},
		axisY: {
			title: "Price ($USD)"
		},
		axisY2: {
			labelFormatter: this.labelFormatter
		},
		toolTip: {
			shared: true
		},
		legend: {
			cursor: "pointer",
			itemclick: function (e: any) {
				if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
					e.dataSeries.visible = false;
				} else {
					e.dataSeries.visible = true;
				} 
				e.chart.render();
			}
		},
		data: [{
			type: "candlestick",
			showInLegend: true,
			name: "Stock Price",
			xValueFormatString: "MMM DD, YYYY",
			yValueFormatString: "$#,###.00",
			dataPoints: this.priceData
		},{
			type: "line",
			showInLegend: true,
			name: "Volume",
			axisYType: "secondary",
			dataPoints: this.volumeData
		}]
	}


	constructor(private dataService:DataServiceService) {}

	ngOnChanges(changes: SimpleChanges) {
		this.determineDateRange(DefaultRangeValues.month)
		this.loadData()
	}

	loadData() {
		this.dataService.getStockInfo(this.ticker, new Date(this.range_start), new Date(this.range_end))
		.subscribe(this.handleStockInfo())
	}
	
	handleStockInfo() {
		return (received:any) => {
			let result: stockInfoSchema[] = received

			this.priceData = []
			this.volumeData = []
			result.forEach((a) => {
				this.priceData.push({x: new Date(a.dateTime), y: [a.open_price, a.close_price, a.low_price, a.highPrice]})
				this.volumeData.push({x: new Date(a.dateTime), y: a.volume})
			})

			this.chartOptions.data[0].dataPoints = this.priceData
			this.chartOptions.data[1].dataPoints = this.volumeData
			this.chart.render()
		}
	}


	/*
	Event Handlers
	*/

	dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
		this.button_toggle_val = DefaultRangeValues.custom;

		try {
			this.range_start = (new Date(dateRangeStart.value)).toISOString().split('T')[0];
			this.range_end = (new Date(dateRangeEnd.value)).toISOString().split('T')[0];
			this.validRange = true
			this.loadData();
		} catch (error) {
			this.validRange = false
		}
	}

	buttonToggleChange(event:any) {
		if (event) {
			this.button_toggle_val = event.value
			this.determineDateRange(event.value)
			this.loadData();
		}
	}

	getChartInstance(chart: object) {
		this.chart = chart;
		console.log("GOT INSTANCE)")
		this.chart.render()
	}

	/*
	Helpers
	*/
	
	determineDateRange(range: string) {	
		let tempDate = new Date();
		this.range_end = tempDate.toISOString().split('T')[0]

		switch (range) {
			case DefaultRangeValues.week:
				tempDate.setDate(tempDate.getDate() - 7)
				break;
			case DefaultRangeValues.month:
				tempDate.setMonth(tempDate.getMonth() - 1)
				break;
			case DefaultRangeValues.sixMonth:
				tempDate.setMonth(tempDate.getMonth() - 6)
				break;
			case DefaultRangeValues.year:
				tempDate.setFullYear(tempDate.getFullYear() - 1)
				break;
			default:
				break;
		}
		this.range_start = tempDate.toISOString().split('T')[0]
		this.validRange = true;
	}
		
}
