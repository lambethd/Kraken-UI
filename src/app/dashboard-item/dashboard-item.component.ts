import { DashboardItem } from '@/_models/dashboardItem';
import { Item } from '@/_models/item';
import { ItemService } from '@/_services/item.service';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.css']
})
export class DashboardItemComponent implements OnChanges {

  constructor(private itemService: ItemService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['dashboardItems']){
      if(this.dashboardItems){
        this.dashboardItems.forEach(di=>{
          this.itemService.getItem(di.itemId).then(item=>{
            di.item = item;
          });
        });
      }
    }
  }
  @Input()
  public dashboardItems : DashboardItem[];

  @Input()
  public itemsToShow : number;

  public dashboardItemsToShow : DashboardItem[];
}
