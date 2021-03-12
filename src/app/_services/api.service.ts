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
import { mergeMap } from 'rxjs/operators';
import { of, interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';
import { Dashboard } from '@/_models/dashboard';

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
  public getGraph(id: number, range: string): Observable<Graph> {
    return this.httpClient.get<Graph>(AppConfig.rsEndpoint + '/graph/' + id + '/' + range);
  }
  public getGraphs(ids: number[], range: string): Observable<Graph[]> {
    var graphObservables = ids.map(i => this.getGraph(i, range))
    return forkJoin(graphObservables);
    //return of(ids).pipe(mergeMap(i => this.httpClient.get<Graph>(AppConfig.rsEndpoint + '/graph/' + i + '/' + range)));
  }
  //#endregion

  //#region Position
  public getPositions() :Observable<ItemPosition[]> {
    return this.httpClient.get<ItemPosition[]>(AppConfig.rsEndpoint + '/position');
  }
  public updatePosition(position: ItemPosition){
    return this.httpClient.post(AppConfig.rsEndpoint + "/position", position);
  }
  public deletePosition(position: ItemPosition){
    return this.httpClient.delete(AppConfig.rsEndpoint + "/position/" + position.id);
  }
  //#endregion

  //#region Trade
  public getTrades() :Observable<Trade[]>{
    return this.httpClient.get<Trade[]>(AppConfig.rsEndpoint + "/trade/current");
  }
  public createTrade(trade: Trade) :Observable<Trade> {
    return this.httpClient.put<Trade>(AppConfig.rsEndpoint + "/trade/current", trade);
  }
  public updateTrade(trade: Trade){
    return this.httpClient.post(AppConfig.rsEndpoint + "/trade/current", trade);
  }
  //#endregion

  //#region Historical Trades
  public getHistoricalTrades() :Observable<Trade[]> {
    return this.httpClient.get<Trade[]>(AppConfig.rsEndpoint + "/trade/historical");
  }
  //#endregion

  //#region Spread
  public getSpreads() : Observable<Spread[]> {
    return this.httpClient.get<Spread[]>(AppConfig.rsEndpoint + "/spread");
  }
  public createSpread(spread: Spread) : Observable<Spread> {
    return this.httpClient.post<Spread>(AppConfig.rsEndpoint + "/spread", spread);
  }
  //#endregion

  //#region Event
  public getEvents(range: string) : Observable<EventDto[]> {
    return this.httpClient.get<EventDto[]>(AppConfig.rsEndpoint + "/event/" + range);
  }
  //#endregion

  //#region Dashboard
  public getDashboard() : Observable<Dashboard>{
    return this.httpClient.get<Dashboard>(AppConfig.rsEndpoint + "/dashboard");
  }
  //#endregion
}