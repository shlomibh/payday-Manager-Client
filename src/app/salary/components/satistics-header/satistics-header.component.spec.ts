import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SatisticsHeaderComponent } from './satistics-header.component';

describe('SatisticsHeaderComponent', () => {
  let component: SatisticsHeaderComponent;
  let fixture: ComponentFixture<SatisticsHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SatisticsHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SatisticsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
