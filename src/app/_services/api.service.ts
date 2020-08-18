import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '@/_models/item';
import { Graph } from '@/_models/graph';

import { AppConfig } from '@/app.config';
import { ItemPosition } from '@/_models/position';
import { Trade } from '@/_models/trade';
import { Spread } from '@/_models/spread';
import { EventDto } from '@/_models/event';
import { GraphService } from './graph.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }
  //#region Item
  public getItems() {
    return this.httpClient.get<Item[]>(AppConfig.rsEndpoint + "/item");
  }
  public getItem(id: number) {
    return this.httpClient.get<Item>(AppConfig.rsEndpoint + "/item/" + id);
  }
  //#endregion

  //#region Graph
  public getGraph(id: number, range: string) {
    return this.httpClient.get<Graph>(AppConfig.rsEndpoint + '/graph/' + id + '/' + range);
  }
  public getGraphs(ids: number[], range: string) : Graph[]{
    var graphs = [];
    ids.forEach(i=>this.httpClient.get<Graph>(AppConfig.rsEndpoint + '/graph/' + i + '/' + range));
    this.httpClient.get<Graph>(AppConfig.rsEndpoint + '/graph/' + id + '/' + range);
    return Observable.of(graphs);
  }
  //#endregion

  //#region Position
  public getPositions() {
    return this.httpClient.get<ItemPosition[]>(AppConfig.rsEndpoint + '/position');
  }
  //#endregion

  //#region Trade
  public getTrades() {
    return this.httpClient.get<Trade[]>(AppConfig.rsEndpoint + "/trade/current");
  }
  public createTrade(trade: Trade) {
    return this.httpClient.put<Trade>(AppConfig.rsEndpoint + "/trade/current", trade);
  }
  public updateTrade(trade: Trade) {
    return this.httpClient.post(AppConfig.rsEndpoint + "/trade/current", trade);
  }
  //#endregion

  //#region Historical Trades
  public getHistoricalTrades() {
    return this.httpClient.get<Trade[]>(AppConfig.rsEndpoint + "/trade/historical");
  }
  //#endregion

  //#region Spread
  public getSpreads(){
    return this.httpClient.get<Spread[]>(AppConfig.rsEndpoint + "/spread");
  }
  public createSpread(spread: Spread){
    return this.httpClient.post<Spread>(AppConfig.rsEndpoint + "/spread", spread);
  }
  //#endregion

  //#region Event
  public getEvents(range: string){
    return this.httpClient.get<EventDto[]>(AppConfig.rsEndpoint + "/event/" + range);
  }
  //#endregion
}