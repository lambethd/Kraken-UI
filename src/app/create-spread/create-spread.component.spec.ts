import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSpreadComponent } from './create-spread.component';

describe('CreateSpreadComponent', () => {
  let component: CreateSpreadComponent;
  let fixture: ComponentFixture<CreateSpreadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSpreadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSpreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
