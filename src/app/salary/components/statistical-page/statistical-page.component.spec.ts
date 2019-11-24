import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticalPageComponent } from './statistical-page.component';

describe('StatisticalPageComponent', () => {
  let component: StatisticalPageComponent;
  let fixture: ComponentFixture<StatisticalPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticalPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
