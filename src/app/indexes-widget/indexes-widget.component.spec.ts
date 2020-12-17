import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexesWidgetComponent } from './indexes-widget.component';

describe('IndexesWidgetComponent', () => {
  let component: IndexesWidgetComponent;
  let fixture: ComponentFixture<IndexesWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexesWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexesWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
