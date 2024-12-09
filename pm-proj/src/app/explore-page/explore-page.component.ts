import { Component } from '@angular/core';
import { stocksSchema } from '../data-service.service';

@Component({
  selector: 'app-explore-page',
  templateUrl: './explore-page.component.html',
  styleUrls: ['./explore-page.component.css']
})
export class ExplorePageComponent {
  searchResult: stocksSchema = {
    symbol: '',
    country: '',
    currency: '',
    exchange: '',
    micCode: '',
    name: '',
    type: ''
  };

  onSearchResultChange(searchResult: stocksSchema): void {
    this.searchResult = searchResult;
  }
}
