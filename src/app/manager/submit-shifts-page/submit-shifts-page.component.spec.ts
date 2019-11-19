import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitShiftsPageComponent } from './submit-shifts-page.component';

describe('SubmitShiftsPageComponent', () => {
  let component: SubmitShiftsPageComponent;
  let fixture: ComponentFixture<SubmitShiftsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitShiftsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitShiftsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
