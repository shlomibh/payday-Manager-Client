import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LectorStatsComponent } from './lector-stats.component';

describe('LectorStatsComponent', () => {
  let component: LectorStatsComponent;
  let fixture: ComponentFixture<LectorStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LectorStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LectorStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
