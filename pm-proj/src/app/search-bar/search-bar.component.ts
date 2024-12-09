import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService, stocksSchema } from '../data-service.service'; // Import your data service
import { ContextService } from '../context.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  fetchedStock: any;
  fetchStock() {
    throw new Error('Method not implemented.');
  }
  searchQuery: string = '';
  // Specify the type here
  // fetchedStock: stocksSchema | null;
  searchSymbol: string = '';
  stocksList: stocksSchema[] = [];
  @Output() searchResult = new EventEmitter<stocksSchema>();

  constructor(private contextService: ContextService) {}

  searchStock() {
    if (this.contextService.stocksList.length > 0 && this.searchSymbol != "") {
      let result: stocksSchema[] = this.contextService.stocksList.filter(
        (a) => a.symbol === this.searchSymbol
      );
      if (result.length > 0) {
        this.contextService.searchedStock = this.searchSymbol
        this.searchResult.emit(result[0]); // pass back the search result
      }
    }
  }

  ngOnInit() {
    if (this.contextService.searchedStock != "") {
      this.searchSymbol = this.contextService.searchedStock
      this.searchStock()
    }
  }
}
