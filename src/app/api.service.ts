import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  public getItems(){
    return this.httpClient.get<Item[]>('http://localhost:8080/item');
  }

  public getGraph(id:number){
    return this.httpClient.get<Graph>('http://localhost:8080/graph/' + id);
  }
}

//#region Item
export interface Item {
  id: number;
  name: string;
  type: string;
  iconLink: string;
  largeIconLink: string;
  description: string;
  members:boolean;
  current: ItemMovement;
  today: ItemMovement;
}
export interface ItemMovement{
  trend: string;
  price: number;
}
//#endregion

//#region Graph
export interface Graph {
  id: number,
  daily: GraphPoint [],
  average: GraphPoint [],
}
export interface GraphPoint{
  key: string,
  value: number
}
////#endregion