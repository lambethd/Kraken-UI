import { Component, OnInit, Inject } from '@angular/core';
import { TradeService } from '@/_services/trade.service';
import { ApiService } from '@/_services/api.service';
import { Trade } from '@/_models/trade';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { BookTradeDialogComponent } from '@/book-trade-dialog/book-trade-dialog.component';
import { UpdateTradeDialogComponent } from '@/update-trade-dialog/update-trade-dialog.component';
import { ItemService } from '@/_services/item.service';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit {

  constructor(private tradeService: TradeService, private apiService: ApiService, public dialog: MatDialog, private itemService: ItemService) { }

  ngOnInit(): void {
    this.getTrades();
  }

  trades: Trade[];

  getTrades() {
    this.trades = [null,null,null,null,null,null,null];
    this.tradeService.getTrades().subscribe((data) => {
      data.forEach(async (trade) => {
        if (!trade.currentQuantity) {
          trade.currentQuantity = 0;
          trade.currentTotalPrice = 0;
        }
        trade.currentPercentage = trade.currentQuantity / trade.requestQuantity * 100;
        var item = await this.itemService.getItem(trade.itemId);
        trade.icon = item.largeIconLink;
        trade.itemName = item.name;
        this.trades[trade.location] = trade;
      })
    });
  }

  createTradeDialog(cell: number, buySell: string) {
    let dialogRef = this.dialog.open(BookTradeDialogComponent, {
      data: {buySell: buySell, cell: cell},
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getTrades();
    });
  }

  updateTradeDialog(cell: number) {
    if (this.trades[cell]) {
      let dialogRef = this.dialog.open(UpdateTradeDialogComponent, {
        data: this.trades[cell],
        width: '400px'
      });

      dialogRef.afterClosed().subscribe(result => {
        this.getTrades();
      });
    }
  }
}
