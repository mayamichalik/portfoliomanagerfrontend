import { Component, Input } from '@angular/core';
import { DataServiceService, insightsScheme } from '../data-service.service';

export interface insightsTableData {
  metric: string
  value: any
}

@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.css']
})
export class InsightsComponent {
  insightsDisplayedColumns: string[] = ['metric', 'value']
  insightsDataSource: insightsTableData[] = []
  @Input() ticker = "" 

  formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  constructor(private dataService:DataServiceService) {}

	ngOnChanges() {
		this.loadData()
	}

	loadData() {
		this.dataService.getStockInsights(this.ticker)
		.subscribe(this.handleInsights())
	}
	
	handleInsights() {
		return (received:any) => {
      let insights: insightsScheme = received
      this.insightsDataSource= [
        {metric: "Market Cap", value: this.formatter.format(insights.marketCap)},
        {metric: "PE Ratio", value: insights.peRatio},
        {metric: "PEG Ratio", value: insights.pegRatio},
        {metric: "Dividends Per Share", value: this.formatter.format(insights.dividendPerShare)},
        {metric: "Dividend Yield", value: this.formatter.format(insights.dividedYield)},
        {metric: "Earnings Per Share", value: this.formatter.format(insights.eps)},
        {metric: "52 Week High", value: this.formatter.format(insights.fiftyTwoWeekHigh)},
        {metric: "52 Week Low", value: this.formatter.format(insights.fiftyTwoWeekLow)},
        {metric: "50 Day Moving Average", value: this.formatter.format(insights.fiftyDayMovingAvg)},
        {metric: "200 Day Moving Average", value: this.formatter.format(insights.twoHundredDayMovingAvg)}]
		}
	}
}
