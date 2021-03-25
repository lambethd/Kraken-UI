import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemComponent } from './item/item.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AccountComponent } from './account/account.component';
import { TradeComponent } from './trade/trade.component';
import { HistoricalTradeComponent } from './historical-trade/historical-trade.component';
import { PositionComponent } from './position/position.component';
import { SpreadComponent } from './spread/spread.component';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { TwitterFeedComponent } from './twitter-feed/twitter-feed.component';
import { JobStatusGraphComponent } from './job-status-graph/job-status-graph.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'items', component: ItemComponent },
  { path: 'user', component: UserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'account', component: AccountComponent },
  { path: 'trades', component: TradeComponent },
  { path: 'history', component: HistoricalTradeComponent },
  { path: 'position', component: PositionComponent },
  { path: 'spread', component: SpreadComponent },
  { path: 'news', component: NewsFeedComponent },
  { path: 'twitter', component: TwitterFeedComponent },
  { path: 'jobs', component: JobStatusGraphComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
