import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { GeneralStockInfoComponent } from "../general-stock-info/general-stock-info.component";
import { DataServiceService, stocksSchema, watchlistSchema } from '../data-service.service';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-watchlist-component',
    templateUrl: './watchlist-component.component.html',
    styleUrls: ['./watchlist-component.component.css'],
    standalone: true,
    imports: [MatListModule, GeneralStockInfoComponent, BrowserModule, CommonModule]
})
export class WatchlistComponentComponent {
  watchlist: Array<watchlistSchema> = [];
  watchlistStockInfo: Array<stocksSchema> = []

  constructor(private dataService: DataServiceService) {}

  ngOnInit() {
    this.dataService.getWatchlist().subscribe((received: any) => {
      this.watchlist = received;

      this.watchlist.forEach(watchlist_item => {
        this.dataService.getOneStock(watchlist_item.ticker_symbol).subscribe((received: any) => {
          this.watchlistStockInfo.push(received);
        });
      })
    });
  }
}
