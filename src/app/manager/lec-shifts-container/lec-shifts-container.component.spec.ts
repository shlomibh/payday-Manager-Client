import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LecShiftsContainerComponent } from './lec-shifts-container.component';

describe('LecShiftsContainerComponent', () => {
  let component: LecShiftsContainerComponent;
  let fixture: ComponentFixture<LecShiftsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LecShiftsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LecShiftsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
