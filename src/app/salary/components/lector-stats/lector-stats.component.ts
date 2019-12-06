import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-lector-stats',
  templateUrl: './lector-stats.component.html',
  styleUrls: ['./lector-stats.component.css']
})
export class LectorStatsComponent implements OnInit {
  @Input() lecStat;
  @Input() index;
  options = ['ביטול שיעור', 'מחלה', 'חופש', 'הגשת דוח בזמן', 'שעות נוספות'];

  constructor() { }

  ngOnInit() {
  }

}
