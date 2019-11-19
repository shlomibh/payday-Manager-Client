import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitHeaderComponent } from './submit-header.component';

describe('SubmitHeaderComponent', () => {
  let component: SubmitHeaderComponent;
  let fixture: ComponentFixture<SubmitHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
