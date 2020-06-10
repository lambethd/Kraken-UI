import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Spread } from '../_models/spread';

@Injectable({
  providedIn: 'root'
})
export class SpreadService {

  constructor(private apiService: ApiService ) {}

  public getSpreads(){
    return this.apiService.getSpreads();
  }

  public createSpread(spread: Spread){
    return this.apiService.createSpread(spread);
  }
}
