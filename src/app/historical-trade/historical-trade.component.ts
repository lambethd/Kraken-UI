import { Component, OnInit, ViewChild } from '@angular/core';
import { TradeService } from '@/_services/trade.service';
import { Trade } from '@/_models/trade';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ItemService } from '@/_services/item.service';

@Component({
  selector: 'app-historical-trade',
  templateUrl: './historical-trade.component.html',
  styleUrls: ['./historical-trade.component.css']
})
export class HistoricalTradeComponent implements OnInit {
  trades: Trade[] = [];
  dataSource: MatTableDataSource<Trade>;
  selection: SelectionModel<Trade>;
  displayedColumns: string[] = ['abortedCompleted', 'icon', 'buySell', 'name', 'requestQuantity', 'requestPrice', 'finalQuantity', 'finalPrice', 'finishDate'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private tradeService: TradeService,
    private itemService: ItemService
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.trades);
    this.selection = new SelectionModel<Trade>(true, []);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.itemName.toLowerCase().includes(filter)
    };

    this.tradeService.getHistoricalTrades().subscribe((data) => {
      data.forEach(async trade => {
        var item = await this.itemService.getItem(trade.itemId);
        trade.icon = item.iconLink;
        trade.itemName = item.name;

        this.trades.push(trade);
        //TODO: change this around so it doesn't keep refreshing
        this.dataSource = new MatTableDataSource(this.trades);
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
}
