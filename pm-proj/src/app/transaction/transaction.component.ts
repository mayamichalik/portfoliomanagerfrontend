import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataServiceService, accountDetailsSchema, boughtStocksSchema, livePriceScheme, transactionScheme } from '../data-service.service';


export enum transactionResult {
  Success= "success",
  Closed= "closed",
  SoldAll = "sold_all"
}

export enum transactionType {
  Buy= "Buy",
  Sell= "Sell"
}

export interface transactionData {
  type: transactionType,
  stock: boughtStocksSchema
}

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})

export class TransactionComponent {
  isBuyTransaction = this.data.type == transactionType.Buy
  isValidTransaction = false
  sufficientBuyAlert = false
  sufficientSellAlert = false
  numShares = 0
  price = 2
  total = 0
  finalVolume = 0

  accounts: accountDetailsSchema[] = []
  selectedAccount = null

  constructor(
    private dialogRef: MatDialogRef<TransactionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: transactionData,
    private dataService: DataServiceService) {} 

  
  ngOnInit() {
    this.loadData()
  }

  loadData() {
		this.dataService.getAllAccounts()
		.subscribe(this.handleAccounts())
    this.dataService.getLiveStockPrice(this.data.stock.ticker_symbol)
    .subscribe(this.handleLiveStockPrice())
    this.dataService.getOneBoughtStock(this.data.stock.ticker_symbol)
    .subscribe(this.handleOwnedStock())
	}
	
	handleAccounts() {
		return (received:any) => {
			this.accounts = received
		}
	}

  handleLiveStockPrice() {
		return (received:any) => {
      const result: livePriceScheme = received
			this.price = result.price
		}
	}

  handleOwnedStock() {
    return (received:any) => {
      if (received != null) {
        this.data.stock = received
      }
    }
  }
    
  validateTransaction() {
    this.total = +(this.price * this.numShares).toFixed(2)

    this.sufficientBuyAlert = false
    this.sufficientSellAlert = false

    if (this.selectedAccount == null) {
      this.isValidTransaction = false;
    } else if (this.isBuyTransaction) {
      const account: accountDetailsSchema = this.selectedAccount
      const balance = account.balance

      if (balance >= this.total && this.total > 0) {
        this.isValidTransaction = true
      } else {
        this.isValidTransaction = false
        this.sufficientBuyAlert = this.total > 0
      }

    } else if (this.numShares > 0 && this.numShares <= this.data.stock.volume) {
      this.isValidTransaction = true;
    } else {
      this.isValidTransaction = false;
      this.sufficientSellAlert = this.numShares > 0;
    }
  }

  onCancelClick() {
    this.dialogRef.close(transactionResult.Closed)
  }

  onConfirmClick() {
    if (this.isValidTransaction && this.selectedAccount != null) {
      let account: accountDetailsSchema = this.selectedAccount
      let stock = this.data.stock

      if (this.isBuyTransaction) {
        account.balance -= this.total
        stock.amount_invested += this.total
        stock.volume += this.numShares
      } else {
        account.balance += this.total
        stock.amount_invested -= this.total
        stock.volume -= this.numShares
      }
      this.finalVolume = stock.volume
      const transaction: transactionScheme = {account: account, stock: stock}
      this.dataService.postTransaction(transaction).subscribe(this.handleCompletedTransaction())
    }
  }

  handleCompletedTransaction() {
    return (received:any) => {
      if (!this.isBuyTransaction && this.finalVolume == 0) {
        this.dialogRef.close(transactionResult.SoldAll)
      } else {
        this.dialogRef.close(transactionResult.Success)
      }
    }
  }

}
