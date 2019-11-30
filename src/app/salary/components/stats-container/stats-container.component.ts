import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stats-container',
  templateUrl: './stats-container.component.html',
  styleUrls: ['./stats-container.component.css']
})
export class StatsContainerComponent implements OnInit, OnDestroy {
  @Input() lecData;
  @Input() depData;
  @Input() isLecStats;
  @Input() isDepartStats;
  constructor() { }

  ngOnInit() {
  }

  refresh() {
    this.ngOnDestroy();
    this.ngOnInit();
  }

  ngOnDestroy(): void {
  }


}
