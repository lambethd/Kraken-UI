import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
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
    NewsFeedComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DemoMaterialModule
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
