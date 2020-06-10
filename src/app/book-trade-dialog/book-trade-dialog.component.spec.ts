import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTradeDialogComponent } from './book-trade-dialog.component';

describe('BookTradeDialogComponent', () => {
  let component: BookTradeDialogComponent;
  let fixture: ComponentFixture<BookTradeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookTradeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookTradeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
