import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExplorePageComponent } from './explore-page/explore-page.component';
import { PortfolioPageComponent } from './portfolio-page/portfolio-page.component';
import { WatchlistPageComponent } from './watchlist-page/watchlist-page.component';

const routes: Routes = [
  // angular will find the first match and show it
  { path: '', redirectTo: 'explore', pathMatch: 'full' },
  {path: 'explore', component: ExplorePageComponent},
  {path: 'portfolio', component: PortfolioPageComponent},
  {path: 'watchlist', component: WatchlistPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
