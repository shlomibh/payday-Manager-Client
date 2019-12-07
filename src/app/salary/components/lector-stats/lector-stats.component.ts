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
  options = ['ביטול שיעור', 'מחלה', 'חופש', 'הגשת דוח בזמן'];
  engOpt = ['cancel', 'sick', 'dayoff', 'report'];

  constructor() { }

  ngOnInit() {
  }

}

function setChart(name: string) {
  return new Chart(`${name}`, {
    type: 'bar',
    data: {
      labels: ['Green', 'Red'],
      datasets: [{
        label: '',
        data: [3, 3],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
