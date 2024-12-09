import { Injectable } from '@angular/core';
import { stocksSchema } from './data-service.service';

@Injectable({
  providedIn: 'root'
})
export class ContextService {
  stocksList: stocksSchema[] = []
  searchedStock: string = ""

  constructor() { }

}
