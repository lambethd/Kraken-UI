import { ItemPosition } from '@/_models/position';
import { AlertService } from '@/_services/alert.service';
import { ItemService } from '@/_services/item.service';
import { PositionService } from '@/_services/position.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-position',
  templateUrl: './edit-position.component.html',
  styleUrls: ['./edit-position.component.css']
})
export class EditPositionComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private alertService: AlertService,
    private positionService: PositionService,
    private itemService: ItemService,
    @Inject(MAT_DIALOG_DATA) public data: ItemPosition,
    public dialogRef: MatDialogRef<EditPositionComponent>) {
    this.position = data;
  }
  position: ItemPosition;
  updateForm: FormGroup;
  loading = false;
  submitted = false;

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      item: new FormControl({ value: this.position.itemName, disabled: true }),
      price: ['', [Validators.required, Validators.min(1)]],
      quantity: ['', [Validators.required, Validators.min(1)]]
    });
    
    this.f.quantity.setValue(this.position.quantity);
    this.f.price.setValue(this.position.purchasePrice);
  }

  updatePosition() {
    console.log("Update: " + this.f.quantity.value + ", " + this.f.price.value);
    let position = this.position;
    position.quantity = this.f.quantity.value;
    position.purchasePrice = this.f.price.value;
    
    this.positionService.updatePosition(position).subscribe(data => {
      console.log("Success!");
      console.log(data);
      this.dialogRef.close();
    });
  }

  get f() { return this.updateForm.controls; }
}
