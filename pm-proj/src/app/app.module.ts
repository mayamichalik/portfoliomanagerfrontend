import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { BoughtStocksComponent } from './bought-stocks/bought-stocks.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { TransactionComponent } from './transaction/transaction.component';
import { AddAccountComponent } from './add-account/add-account.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { StockResearchComponent } from './stock-research/stock-research.component';
import { ChartsComponent } from './charts/charts.component';
import { InsightsComponent } from './insights/insights.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table'; 
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ExplorePageComponent } from './explore-page/explore-page.component';
import { GeneralStockInfoComponent } from './general-stock-info/general-stock-info.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { PortfolioPageComponent } from './portfolio-page/portfolio-page.component';
import { UserComponent } from './user/user.component';
import { WatchlistPageComponent } from './watchlist-page/watchlist-page.component';
import { WatchlistComponentComponent } from './watchlist-component/watchlist-component.component';
import { EditUserComponent } from './edit-user/edit-user.component';

 @NgModule({
  declarations: [
    AppComponent,
    StockResearchComponent,
    ChartsComponent,
    InsightsComponent,
    ExplorePageComponent,
    BoughtStocksComponent,
    TransactionComponent,
    AddAccountComponent,
    DeleteAccountComponent,
    SearchBarComponent,
    PortfolioPageComponent,
    UserComponent,
    WatchlistPageComponent,
    EditUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    NavbarComponent,
    MatTabsModule,
    MatTableModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    CanvasJSAngularChartsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatTooltipModule,
    MatListModule,
    GeneralStockInfoComponent,
    MatExpansionModule,
    MatDividerModule,
    MatInputModule,
    MatSelectModule,    
    MatDialogModule,
    MatIconModule,
    MatButtonModule, 
    MatIconModule,
    WatchlistComponentComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
