import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalTradeComponent } from './historical-trade.component';

describe('HistoricalTradeComponent', () => {
  let component: HistoricalTradeComponent;
  let fixture: ComponentFixture<HistoricalTradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricalTradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricalTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
