import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSubmittedComponent } from './time-submitted.component';

describe('TimeSubmittedComponent', () => {
  let component: TimeSubmittedComponent;
  let fixture: ComponentFixture<TimeSubmittedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeSubmittedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSubmittedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
