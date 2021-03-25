import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobStatusGraphComponent } from './job-status-graph.component';

describe('JobStatusGraphComponent', () => {
  let component: JobStatusGraphComponent;
  let fixture: ComponentFixture<JobStatusGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobStatusGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobStatusGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
