import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '@/_services/alert.service';
import { TradeService } from '@/_services/trade.service';
import { Trade } from '@/_models/trade';
import { ItemService } from '@/_services/item.service';
import { Item } from '@/_models/item';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/operators';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-book-trade-dialog',
  templateUrl: './book-trade-dialog.component.html',
  styleUrls: ['./book-trade-dialog.component.css']
})
export class BookTradeDialogComponent implements OnInit {
  createForm: FormGroup;
  loading = false;
  submitted = false;
  buySell: string;
  items: Item[];
  filteredItems: Observable<Item[]>;
  cell: number;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private tradeService: TradeService,
    private itemService: ItemService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<BookTradeDialogComponent>
  ) {
    this.buySell = data.buySell;
    this.cell = data.cell;
  }

  async ngOnInit(): Promise<void> {
    this.createForm = this.formBuilder.group({
      item: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(0)]],
      price: ['', [Validators.required, Validators.min(0)]]
    });

    this.items = await this.itemService.getItems();

    this.filteredItems = this.f.item.valueChanges
      .pipe(
        startWith(''),
        map(item => item.length >= 3 ? this.filterItems(item) : this.items.slice(0, 0))
      );
  }

  private filterItems(value: string): Item[] {
    const filterValue = value.toLowerCase();

    return this.items.filter(item => item.name.toLowerCase().indexOf(filterValue) >= 0);
  }

  // convenience getter for easy access to form fields
  get f() { return this.createForm.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.createForm.invalid) {
      return;
    }

    this.loading = true;

    var item = this.items.find(item => item.name == this.f.item.value);

    var trade = new Trade();
    trade.requestQuantity = this.f.quantity.value;
    trade.requestPrice = this.f.price.value;
    trade.itemId = item.id;
    trade.tradeStatus = "Pending";
    trade.buySell = this.buySell;
    trade.location = this.cell;

    this.tradeService.createTrade(trade).subscribe((data) => {
      this.loading = false;
      this.dialogRef.close();
    });
  }
}
