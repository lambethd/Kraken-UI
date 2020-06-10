import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTradeDialogComponent } from './update-trade-dialog.component';

describe('UpdateTradeDialogComponent', () => {
  let component: UpdateTradeDialogComponent;
  let fixture: ComponentFixture<UpdateTradeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTradeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTradeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
