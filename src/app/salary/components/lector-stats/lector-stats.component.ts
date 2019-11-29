import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { StatsService } from 'src/app/services/stats.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lector-stats',
  templateUrl: './lector-stats.component.html',
  styleUrls: ['./lector-stats.component.css']
})
export class LectorStatsComponent implements OnInit, OnDestroy {
  @Input() lecData;
  subscriptions : Subscription[] = [];
  constructor(private statService: StatsService) { }

  ngOnInit() {
    console.log(this.lecData);
    if(this.lecData!== undefined)
      this.subscriptions.push(this.statService.getStatsPerMonth(this.lecData.type, this.lecData.stat, this.lecData.date).subscribe(
        data => console.log(data)
      ));
  }

  refresh() {
    this.ngOnDestroy();
    this.ngOnInit();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
    this.subscriptions = [];
  }

}
