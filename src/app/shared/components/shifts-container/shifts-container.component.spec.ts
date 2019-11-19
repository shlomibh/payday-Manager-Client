import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftsContainerComponent } from './shifts-container.component';

describe('ShiftsContainerComponent', () => {
  let component: ShiftsContainerComponent;
  let fixture: ComponentFixture<ShiftsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
