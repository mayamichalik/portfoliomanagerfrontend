import { Component } from '@angular/core';
import { DataServiceService, boughtStocksSchema, livePriceScheme } from '../data-service.service';
import { MatDialog } from '@angular/material/dialog';
import { TransactionComponent, transactionResult, transactionType } from '../transaction/transaction.component';

export interface boughtStocksData {
	worth: number,
	hasGained: boolean,
	stock: boughtStocksSchema
}
@Component({
  selector: 'app-bought-stocks',
  templateUrl: './bought-stocks.component.html',
  styleUrls: ['./bought-stocks.component.css']
})
export class BoughtStocksComponent {
  data: boughtStocksData[] = []
  liveGainMap = new Map<string, number>()

	constructor(private dataService:DataServiceService, 
				private dialog: MatDialog) {}
	
	ngOnInit() {
		this.loadData()
	}

	loadData() {
		this.data = []
		this.dataService.getAllBoughtStocks()
		.subscribe(this.handleBoughtStocks())
	}
	
	handleBoughtStocks() {
		return (received:any) => {
			let boughtStocks: boughtStocksSchema[] = received
			boughtStocks.forEach((a) => this.data.push({worth: 0, hasGained: true, stock: a}))
			this.data.forEach((a) => {
				this.dataService.getLiveStockPrice(a.stock.ticker_symbol).subscribe(this.handleLiveStockPrice())
			})
		}
	}

 	handleLiveStockPrice() {
		return (received:any) => {
			const livePrice: livePriceScheme = received
			let componentData = this.data.filter((a) => a.stock.ticker_symbol == livePrice.symbol)
			if (componentData.length == 1) {
				let invested: number = componentData[0].stock.amount_invested
				let worth = livePrice.price * componentData[0].stock.volume
				componentData[0].worth = worth
				if (worth >= invested) {
					componentData[0].hasGained = true
				} else {
					componentData[0].hasGained = false
				}
			}
		}
	}

	startSellTransation(stock: boughtStocksSchema) {
		const transacDialog = this.dialog.open(TransactionComponent, {
			data: {type: transactionType.Sell, stock: stock}
		})

		transacDialog.afterClosed().subscribe((result) => {
			if (result == transactionResult.Success || result == transactionResult.SoldAll) {
			  this.loadData()
			}
		  }
		)
	}
		
}
