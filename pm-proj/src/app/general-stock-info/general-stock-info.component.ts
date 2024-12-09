import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DataServiceService, boughtStocksSchema } from '../data-service.service';
import { MatDialog } from '@angular/material/dialog';
import { TransactionComponent, transactionResult, transactionType } from '../transaction/transaction.component';
import { watchlistSchema } from '../data-service.service';

@Component({
  selector: 'app-general-stock-info',
  templateUrl: './general-stock-info.component.html',
  styleUrls: ['./general-stock-info.component.css'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule]
})
export class GeneralStockInfoComponent implements OnChanges{
  @Input() ticker: string = '';
  @Input() companyName: string = '';
  @Input() country: string = '';
  @Input() currency: string = '';
  price: number = 0.0;
  percentageChange = 0.0;
  boughtStock: boughtStocksSchema = {
    ticker_symbol: '',
    amount_invested: 0,
    stock_name: '',
    volume: 0
  }

  addedToWatchList: boolean = false;
  isBought: boolean = false; 

  constructor(private dataService: DataServiceService, public dialog: MatDialog) {}

  // checks when a search for a new symbol is made
  ngOnChanges(changes: SimpleChanges) {
    this.dataService.getLiveStockPrice(this.ticker).subscribe(
      (received: any) => {
        this.price = received?.price;

        let  yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1); 

        // calculate percentage change ((yesterday_close_price - current_price) / 100)
        this.dataService.getStockInfo(this.ticker, yesterday, new Date()).subscribe((received: any) => {
          this.percentageChange = ( this.price - received[0]?.close_price) / 100;
        });
      }
    );

    this.checkIfBoughtStock()

    // check if stock is already in watch list
    this.dataService.getOneWatchlist(this.ticker).subscribe(
      (received: any) => { // stock is in watchlist
        console.log(received);
        if(received == null) {
          this.addedToWatchList = false;
        } else if (received.ticker_symbol == this.ticker) {
          this.addedToWatchList = true; 
        }
      }
    );
  }

  checkIfBoughtStock() {
    this.dataService.getOneBoughtStock(this.ticker).subscribe(
      (received: any) => {
        if(received?.ticker_symbol == this.ticker) {
          this.boughtStock = received
          this.isBought = this.isBought == false ? !this.isBought : this.isBought;
        }
      },
      //if stock is not bought then an error will be returned
      (err: Error) => {
        console.log("stock not bought");
        this.isBought = this.isBought == true ? !this.isBought : this.isBought;
      }
    );
  }


  toggleWatchList() {
    if (this.addedToWatchList) {
      // remove from watchlist
      this.dataService.deleteWatchlistItem(this.ticker).subscribe((received: any) => {
        console.log(received);
      });
    } else { 
      // add to watchlist
      let watchListItem: watchlistSchema = {
        ticker_symbol: this.ticker
      }
      this.dataService.postWatchlistItem(watchListItem).subscribe((received: any) => {
        console.log(received);
      });
    }

    this.addedToWatchList = !this.addedToWatchList;
  }
  
  buyStock() {
    const transacDialog = this.dialog.open(TransactionComponent, {
			data: {type: transactionType.Buy, 
        stock: {ticker_symbol: this.ticker,
                amount_invested: 0,
                stock_name: this.companyName,
                volume: 0}}
		})

		transacDialog.afterClosed().subscribe((result) => {
			if (result == transactionResult.Success) {
			  this.checkIfBoughtStock()
			}
		});
  }

  sellStock() {
    const transacDialog = this.dialog.open(TransactionComponent, {
			data: {type: transactionType.Sell, stock: this.boughtStock}
		})

		transacDialog.afterClosed().subscribe((result) => {
			if (result == transactionResult.SoldAll) {
			  this.checkIfBoughtStock()
			}
		});
  }
}
