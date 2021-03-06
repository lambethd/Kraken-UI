import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Trade } from '@/_models/trade';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { ItemService } from '@/_services/item.service';
import { PositionService } from '@/_services/position.service';
import { ItemPosition } from '@/_models/position';
import { MatDialog } from '@angular/material/dialog';
import { EditPositionComponent } from '@/edit-position/edit-position.component';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {
  dataSource: MatTableDataSource<ItemPosition>;
  selection: SelectionModel<ItemPosition>;
  displayedColumns: string[] = ['icon', 'name', 'quantity', 'paidPositionValue', 'currentPositionValue', 'profit', 'paidPricePer', 'currentPricePer', 'profitPer', 'editDelete'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private positionService: PositionService, private itemService: ItemService, public dialog: MatDialog) { }

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

  editPosition(position: ItemPosition){
    let dialogRef = this.dialog.open(EditPositionComponent, {
    data: position,
    width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.positionService.getPositions().then(p=>this.dataSource.data = p);
    });
  }

  deletePosition(position: ItemPosition){
    if(confirm("Are you sure you want to completely remove this position?")){
      this.positionService.deletePosition(position).subscribe(async ()=>this.dataSource.data = await this.positionService.getPositions());
    };
  }
}
