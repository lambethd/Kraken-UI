import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AlertService } from '@/_services/alert.service';
import { TradeService } from '@/_services/trade.service';
import { ItemService } from '@/_services/item.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BookTradeDialogComponent } from '@/book-trade-dialog/book-trade-dialog.component';
import { Trade } from '@/_models/trade';
import { min } from 'rxjs/operators';

@Component({
  selector: 'app-update-trade-dialog',
  templateUrl: './update-trade-dialog.component.html',
  styleUrls: ['./update-trade-dialog.component.css']
})
export class UpdateTradeDialogComponent implements OnInit {
  trade: Trade;
  updateForm: FormGroup;
  loading = false;
  submitted = false;
  buySell: string;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private tradeService: TradeService,
    private itemService: ItemService,
    @Inject(MAT_DIALOG_DATA) public data: Trade,
    public dialogRef: MatDialogRef<BookTradeDialogComponent>) {
    this.trade = data;
    this.buySell = this.trade.buySell;
  }

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      item: new FormControl({ value: this.trade.itemName, disabled: true }),
      price: new FormControl({ value: this.trade.requestPrice, disabled: true }),
      quantity: new FormControl({ value: this.trade.requestQuantity, disabled: true }),
      currentQuantity: ['', [Validators.required, Validators.min(this.trade.currentQuantity), Validators.max(this.trade.requestQuantity)]],
      total: ['', Validators.required],
    });
    
    this.f.currentQuantity.setValue(this.trade.currentQuantity);
    this.f.total.setValue(this.trade.currentTotalPrice);
  }

  updateTrade() {
    console.log("Update: " + this.f.currentQuantity.value + ", " + this.f.total.value);
    let trade = this.trade;
    trade.tradeStatus = "Partial";
    trade.currentQuantity = this.f.currentQuantity.value;
    trade.currentTotalPrice = this.f.total.value;
    this.tradeService.updateTrade(trade).subscribe(data => {
      console.log("Success!");
      console.log(data);
      this.dialogRef.close();
    });
  }

  completeTrade() {
    console.log("Complete: " + this.f.currentQuantity.value + ", " + this.f.total.value);
    let trade = this.trade;
    trade.tradeStatus = "Complete";
    trade.currentQuantity = trade.requestQuantity;
    trade.currentTotalPrice = this.f.total.value;
    this.tradeService.updateTrade(trade).subscribe(data => {
      console.log("Success!");
      console.log(data);
      this.dialogRef.close();
    });
  }

  abortTrade() {
    console.log("Abort: " + this.f.currentQuantity.value + ", " + this.f.total.value);
    let trade = this.trade;
    trade.tradeStatus = "Aborted";
    trade.currentQuantity = this.f.currentQuantity.value;
    trade.currentTotalPrice = this.f.total.value;
    this.tradeService.updateTrade(trade).subscribe(data => {
      console.log("Success!");
      console.log(data);
      this.dialogRef.close();
    });
  }

  get f() { return this.updateForm.controls; }

}
