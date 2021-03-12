import { ItemService } from './item.service';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { ItemPosition } from '@/_models/position';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private apiService: ApiService, private itemService: ItemService) { }

  public async getPositions() {
    var result = await this.apiService.getPositions().toPromise();
    result.forEach(async pos => {
      var item = await this.itemService.getItem(pos.itemId);
      pos.itemName = item.name;
      pos.icon = item.iconLink;
      pos.currentPrice = item.current.price;
    });
    return result;
  }

  public updatePosition(position: ItemPosition){
    return this.apiService.updatePosition(position);
  }

  public deletePosition(position: ItemPosition){
    return this.apiService.deletePosition(position);
  }
}
