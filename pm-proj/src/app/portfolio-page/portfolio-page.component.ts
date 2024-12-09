import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddAccountComponent } from '../add-account/add-account.component';
import { DeleteAccountComponent } from '../delete-account/delete-account.component';
// import { MatDividerModule } from '@angular/material/divider'
// import { BoughtStocksComponent } from '../bought-stocks/bought-stocks.component';

@Component({
  selector: 'app-portfolio-page',
  templateUrl: './portfolio-page.component.html',
  styleUrls: ['./portfolio-page.component.css'],
  // standalone: true,
  // imports: [MatDividerModule]
})
export class PortfolioPageComponent {

  constructor(public dialog: MatDialog) {}

  openAddDialog() {
    this.dialog.open(AddAccountComponent);
  }
  openDeleteDialog() {
    this.dialog.open(DeleteAccountComponent);
  }

}
