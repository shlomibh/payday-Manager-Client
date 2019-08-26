import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportFillComponent } from './report-fill.component';

describe('ReportFillComponent', () => {
  let component: ReportFillComponent;
  let fixture: ComponentFixture<ReportFillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportFillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportFillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
