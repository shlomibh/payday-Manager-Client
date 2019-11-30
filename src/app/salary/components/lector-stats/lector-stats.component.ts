import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { StatsService } from 'src/app/services/stats.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lector-stats',
  templateUrl: './lector-stats.component.html',
  styleUrls: ['./lector-stats.component.css']
})
export class LectorStatsComponent implements OnInit {
  @Input() lecStat;
  @Input() index;
  options = ['ביטול שיעור', 'מחלה', 'חופש', 'שעות נוספות', 'הגשת דוח בזמן'];

  constructor() { }

  ngOnInit() {
  }

}
