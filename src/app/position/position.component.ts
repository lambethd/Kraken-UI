import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Trade } from '@/_models/trade';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { ItemService } from '@/_services/item.service';
import { PositionService } from '@/_services/position.service';
import { ItemPosition } from '@/_models/position';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {
  dataSource: MatTableDataSource<ItemPosition>;
  selection: SelectionModel<ItemPosition>;
  displayedColumns: string[] = ['icon', 'name', 'positionSize', 'quantity'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private positionService: PositionService, private itemService: ItemService) { }

  async ngOnInit(): Promise<void> {
    this.dataSource = new MatTableDataSource(await this.positionService.getPositions());
    this.selection = new SelectionModel<ItemPosition>(true, []);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.itemName.toLowerCase().includes(filter)
    };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
