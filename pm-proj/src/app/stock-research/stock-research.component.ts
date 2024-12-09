import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stock-research',
  templateUrl: './stock-research.component.html',
  styleUrls: ['./stock-research.component.css']
})
export class StockResearchComponent {
  @Input() ticker: string = '';
}
