import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TransactionComponent } from './transaction/transaction.component';
import { AddAccountComponent } from './add-account/add-account.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { DataServiceService } from './data-service.service';
import { ContextService } from './context.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'pm-proj';

  constructor(public dialog: MatDialog,
    private dataService: DataServiceService,
    private contextService: ContextService) {}
    
  ngOnInit() {
    this.dataService.getAllStock().subscribe(this.handleStockList())
  }

  handleStockList() {
    return (received:any) => {
      this.contextService.stocksList = received
    }
  }
}