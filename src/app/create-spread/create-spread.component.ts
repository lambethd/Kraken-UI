import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Item } from '@/_models/item';
import { AlertService } from '@/_services/alert.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ItemService } from '@/_services/item.service';
import { startWith, map } from 'rxjs/operators';
import { Spread } from '@/_models/spread';
import { SpreadService } from '@/_services/spread.service';

@Component({
  selector: 'app-create-spread',
  templateUrl: './create-spread.component.html',
  styleUrls: ['./create-spread.component.css']
})
export class CreateSpreadComponent implements OnInit {
  createForm: FormGroup;
  loading = false;
  submitted = false;
  items: Item[];
  filteredItems: Observable<Item[]>;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private itemService: ItemService,
    private spreadService: SpreadService,
    @Inject(MAT_DIALOG_DATA) public data: string,
    public dialogRef: MatDialogRef<CreateSpreadComponent>
  ) { }

  async ngOnInit(): Promise<void> {
    this.createForm = this.formBuilder.group({
      item: ['', Validators.required],
      lowerBound: ['', [Validators.required, Validators.min(1)]],
      upperBound: ['', [Validators.required, Validators.min(1)]]
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

    var spread = new Spread();
    spread.lowerBound = this.f.lowerBound.value;
    spread.upperBound = this.f.upperBound.value;
    spread.itemId = item.id;

    this.spreadService.createSpread(spread).subscribe((data) => {
      this.loading = false;
      this.dialogRef.close();
    });
  }
}
