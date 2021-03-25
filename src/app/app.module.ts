import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ItemComponent } from './item/item.component';
import { DemoMaterialModule } from './material-modules';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PriceGraphComponent } from './price-graph/price-graph.component';
import { TopbannerComponent } from './topbanner/topbanner.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AlertComponent } from './alert/alert.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { AppConfig } from '@/app.config';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AccountComponent } from './account/account.component';
import { TradeComponent } from './trade/trade.component';
import { BookTradeDialogComponent } from './book-trade-dialog/book-trade-dialog.component';
import { UpdateTradeDialogComponent } from './update-trade-dialog/update-trade-dialog.component';
import { HistoricalTradeComponent } from './historical-trade/historical-trade.component';
import { PositionComponent } from './position/position.component';
import { SpreadComponent } from './spread/spread.component';
import { CreateSpreadComponent } from './create-spread/create-spread.component';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { TwitterFeedComponent } from './twitter-feed/twitter-feed.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { IndexesWidgetComponent } from './indexes-widget/indexes-widget.component';
import { DashboardItemComponent } from './dashboard-item/dashboard-item.component';
import { NumberUnitPipe } from './_pipes/number-unit.pipe';
import { EditPositionComponent } from './edit-position/edit-position.component';
import { JobStatusGraphComponent } from './job-status-graph/job-status-graph.component'

@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    PriceGraphComponent,
    TopbannerComponent,
    LoginComponent,
    UserComponent,
    AlertComponent,
    RegisterComponent,
    HomeComponent,
    ContactComponent,
    AccountComponent,
    TradeComponent,
    BookTradeDialogComponent,
    UpdateTradeDialogComponent,
    HistoricalTradeComponent,
    PositionComponent,
    SpreadComponent,
    CreateSpreadComponent,
    NewsFeedComponent,
    TwitterFeedComponent,
    DashboardComponent,
    IndexesWidgetComponent,
    DashboardItemComponent,
    NumberUnitPipe,
    EditPositionComponent,
    JobStatusGraphComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    NgxChartsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }