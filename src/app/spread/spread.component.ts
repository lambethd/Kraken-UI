import { Component, OnInit, ViewChild } from '@angular/core';
import { SpreadService } from '@/_services/spread.service';
import { Spread } from '@/_models/spread';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ItemService } from '@/_services/item.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateSpreadComponent } from '@/create-spread/create-spread.component';

@Component({
  selector: 'app-spread',
  templateUrl: './spread.component.html',
  styleUrls: ['./spread.component.css']
})
export class SpreadComponent implements OnInit {

  spreads: Spread[] = [];
  dataSource: MatTableDataSource<Spread>;
  selection: SelectionModel<Spread>;
  displayedColumns: string[] = ['icon', 'name', 'lowerBound', 'upperBound', 'spreadSize', 'roi', 'enteredDate'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private spreadService: SpreadService,
    private itemService: ItemService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.spreads);
    this.selection = new SelectionModel<Spread>(true, []);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.itemName.toLowerCase().includes(filter)
    };

    this.loadSpreads();
  }

  private loadSpreads() {
    this.spreadService.getSpreads().subscribe((data) => {
      this.spreads = [];
      data.forEach(async spread => {
        console.log("Finding item for " + spread.itemId);
        var item = await this.itemService.getItem(spread.itemId);
        console.log("Got item for " + spread.itemId);
        spread.icon = item.iconLink;
        spread.itemName = item.name;

        this.spreads.push(spread);
        //TODO: change this around so it doesn't keep refreshing
        this.dataSource = new MatTableDataSource(this.spreads);
      });
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createSpread() {
    let dialogRef = this.dialog.open(CreateSpreadComponent, {
      data: null,
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadSpreads();
    });
  }
}
