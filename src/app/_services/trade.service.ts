import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AppConfig } from '@/app.config';
import { Trade } from '@/_models/trade';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TradeService {

  constructor(private apiService: ApiService) { }
  
  public getTrades(){
    return this.apiService.getTrades();
  }

  public createTrade(trade: Trade){
    return this.apiService.createTrade(trade);
  }

  public updateTrade(trade: Trade){
    return this.apiService.updateTrade(trade);
  }

  public getHistoricalTrades(){
    return this.apiService.getHistoricalTrades();
  }
}
