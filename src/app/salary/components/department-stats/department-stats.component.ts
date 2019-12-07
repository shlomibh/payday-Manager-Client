import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-department-stats',
  templateUrl: './department-stats.component.html',
  styleUrls: ['./department-stats.component.css']
})
export class DepartmentStatsComponent implements OnInit {
  @Input() depStat;
  @Input() index;
  options = ['ביטול שיעור', 'מחלה', 'חופש', 'הגשת דוח בזמן'];

  constructor() { }

  ngOnInit() {
  }

}
