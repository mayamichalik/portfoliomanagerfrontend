import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface accountDetailsSchema {
  id?: number,
  accountType: string,
  balance: number,
  currency: string,
  userId: number
}

export interface userSchema {
  id?: number;
  fullname: string;
  email: string;
  phone_number: string;
  accounts?: Array<accountDetailsSchema>;
}

export interface boughtStocksSchema {
  ticker_symbol: string,
  amount_invested: number,
  stock_name: string,
  volume: number
}

export interface stocksSchema {
  symbol: string;
  country: string;
  currency: string;
  exchange: string;
  micCode: string;
  name: string;
  type: string;
}

export interface stockInfoSchema {
  ticker_symbol: string,
  dateTime: string,
  open_price: number,
  close_price: number,
  low_price: number,
  highPrice: number,
  volume: number
}

export interface insightsScheme {
  symbol: string,
  marketCap: number,
  peRatio: string,
  pegRatio: string,
  dividendPerShare: number,
  dividedYield: number,
  eps: number,
  fiftyTwoWeekHigh: number,
  fiftyTwoWeekLow: number,
  fiftyDayMovingAvg: number,
  twoHundredDayMovingAvg: number
}

export interface livePriceScheme {
  symbol: string,
  price: number
}

export interface transactionScheme {
  account: accountDetailsSchema,
  stock: boughtStocksSchema
}

export interface liveStockPriceSchema {
  symbol: string,
  price: number
}

export interface watchlistSchema {
  ticker_symbol: string
}

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  // TODO: this link will change after the BE is deployed on the cloud
  apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  /* User queries */

  /**
   * GET portfolio user
   * @returns portfolio user
   */
  getAllUser() {
    return this.getRequest(`${this.apiUrl}/user/1`); // get the first user
  }

  /**
   * PUT user info (edit existing)
   * @param user - details for the edited User
   * @returns user info of the edited user
   */
  putUser(user: userSchema) {
    return this.postRequest(`${this.apiUrl}/user`, user);
  }

  /* Account Details queries */

  /**
   * GET portfolio users account details
   * @returns account details of all the users accounts
   */
  getAllAccounts() {
    return this.getRequest(`${this.apiUrl}/accountdetails`);
  }

  /**
   * GET singular accounts details
   * @param id - account ID
   * @returns account details for searched account
   */
  getOneAccount(id: number) {
    return this.getRequest(`${this.apiUrl}/accountdetails/${id}`);
  }

  /**
   * POST new account info
   * @param newAccount - details for new Account
   * @returns account details of new account
   */
  postAccount(newAccount: accountDetailsSchema) {
    return this.postRequest(`${this.apiUrl}/accountdetails`, newAccount);
  }

  /**
   * PUT account info (edit existing)
   * @param account - details for the edited Account
   * @returns account details of edited account
   */
  putAccount(account: accountDetailsSchema) {
    return this.postRequest(`${this.apiUrl}/accountdetails`, account);
  }

  /**
   * DELETE account info
   * @param accountId
   * @returns
   */
  deleteAccount(accountId: number) {
    return this.deleteRequest(`${this.apiUrl}/accountdetails/${accountId}`);
  }

  /* Bought Stock queries */

  /**
   * GET all the bought stocks of a user
   * @returns bought stock info
   */
  getAllBoughtStocks() {
    return this.getRequest(`${this.apiUrl}/BoughtStocks`);
  }

  /**
   * GET singular bought stock
   * @param symbol - bought stock name
   * @returns singular bought stock
   */
  getOneBoughtStock(symbol: string) {
    return this.getRequest(`${this.apiUrl}/BoughtStocks/${symbol}`);
  }

  /**
   * POST new bought stock (new stock bought)
   * @param newBoughtStock - details for new bought stock
   * @returns stock details of new bought stock
   */
  postBoughtStock(newBoughtStock: boughtStocksSchema) {
    return this.postRequest(`${this.apiUrl}/BoughtStocks`, newBoughtStock);
  }

  /**
   * PUT bought stock (edit existing)
   * @param boughtStock - details for the editing bought stock
   * @returns stock details of edited bought stock
   */
  putBoughtStock(boughtStock: boughtStocksSchema) {
    return this.postRequest(`${this.apiUrl}/BoughtStocks`, boughtStock);
  }

  /**
   * DELETE bought stock (sell)
   * @param symbol - name of stock being sold 
   * @returns stock details of the bought stock being deleted/sold 
   */
  sellStock(symbol: string) {
    return this.deleteRequest(`${this.apiUrl}/BoughtStocks/${symbol}`);
  }

  /* Stock queries */

  /**
   * GET all the stocks
   * @returns stock details for all available stocks
   */
  getAllStock() {
    return this.getRequest(`${this.apiUrl}/stocks`);
  }

  /**
   * GET the general stock info for a singular stock by its ticker
   * @param symbol - stock ticker symbol
   * @returns stock details for an availabe stock
   */
  getOneStock(symbol: string) {
    return this.getRequest(`${this.apiUrl}/stocks/${symbol}`);
  }

  /**
   * POST new stock info
   * @param newStock - new stock object
   * @returns stock details of new added stock
   */
  postStock(newStock: stocksSchema) {
    return this.postRequest(`${this.apiUrl}/stocks`, newStock);
  }

  /* Stock Info queries */

  /**
   * GET stock info for a certian stock
   * @param ticker - ticker symbol of a certian stock
   * @param startDate - param start search date
   * @param endDate - param end search date
   * @returns stock info of a certian stock over specified period
   */
  getStockInfo(ticker: string, startDate: Date, endDate: Date) {
    let params: HttpParams = new HttpParams()
      .set('start_date', startDate.toISOString().slice(0, 10)) // get date in yyyy-MM-dd format
      .set('end_date', endDate.toISOString().slice(0, 10));
    return this.getRequest(`${this.apiUrl}/InfoStocks/${ticker}`, params);
  }

  /**
   * POST new stock info for a certian stock
   * @param newStockInfo - new stock info to be posted
   * @returns stock info detail for stock info entry
   */
  postStockInfo(newStockInfo: stockInfoSchema) {
    return this.postRequest(`${this.apiUrl}/InfoStocks`, newStockInfo);
  }

  /* Live Stock Price */

  /**
   * GET live price of a singular stock
   * @param ticker
   * @returns live price of a symbol
   */
  getLiveStockPrice(ticker: string) {
    return this.getRequest(`${this.apiUrl}/livedata/${ticker}`);
  }

  /* Watch list queries */

   /**
   * GET all the watchlist item of a user 
   * @returns watchlist
   */
   getWatchlist() {
    return this.getRequest(`${this.apiUrl}/watchlist`);
  }

  /**
   * GET one watchlist item by ticker
   * @param ticker_symbol 
   * @returns 
   */
  getOneWatchlist(ticker_symbol: string) {
    return this.getRequest(`${this.apiUrl}/watchlist/${ticker_symbol}`);
  }

  /**
   * DELETE watchlist item
   * @param ticker_symbol 
   * @returns 
   */
  deleteWatchlistItem(ticker_symbol: string) {
    return this.deleteRequest(`${this.apiUrl}/watchlist/${ticker_symbol}`);
  }

   /**
   * POST new watchlist item to watchlist
   * @param newWatchlistItem - new item to be posted
   * @returns watchlist for watchlist item entry 
   */
   postWatchlistItem(newWatchlistItem: watchlistSchema) {
    return this.postRequest(`${this.apiUrl}/watchlist`, newWatchlistItem);
  }

  /* Stock Insights */

  /**
   * GET insights for a singular stock
   * @param ticker 
   * @returns insights for a symbol
   */
  getStockInsights(ticker: string) {
    return this.getRequest(`${this.apiUrl}/insights/${ticker}`);
  }

  /**
   * POST transaction
   * @param transaction - buy/sell transaction
   * @returns response code of the result
   */
  postTransaction(transaction: transactionScheme) {
    return this.postRequest(`${this.apiUrl}/transaction`, transaction);
  }

  /* Boiler-plate CRUD functions */

  /**
   * boiler-plate code for a GET request
   * @param url - API request URL
   * @param params - request params (optional)
   * @returns Observable of the API results
   */
  getRequest(url: string, params?: HttpParams) {
    try {
      if (params) {
        return this.http.get(url, { params });
      }
      return this.http.get(url);
    } catch (err) {
      return new Observable();
    }
  }

  /**
   * boiler-plate code for a POST request
   * @param url - API request URL
   * @param newObject - new object to POST
   * @returns Observable of the added object
   */
  postRequest(url: string, newObject: any) {
    try {
      return this.http.post(url, newObject);
    } catch (err) {
      return new Observable();
    }
  }

  /**
   * boiler-plate code for PUT request
   * @param url - API request URL
   * @param newObject - new object to PUT (edit existing object)
   * @returns Observable of the edited object
   */
  putRequest(url: string, newObject: any) {
    try {
      return this.http.put(url, newObject);
    } catch (err) {
      return new Observable();
    }
  }

  /**
   * boiler-plate code for DELETE request
   * @param url - API request URL
   * @param objectId - object identifier of the entry that is to be deleted
   * @returns
   */
  deleteRequest(url: string) {
    try {
      return this.http.delete(url);
    } catch (err) {
      return new Observable();
    }
  }
}
