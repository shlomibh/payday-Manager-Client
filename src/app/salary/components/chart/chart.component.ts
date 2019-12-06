import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input() maxCount;
  @Input() minCount;
  @Input() title;
  @Input() index;

  barChart = [];
  chart1 = [];
  chart2 = [];
  constructor() { }

  ngOnInit() {
        this.barChart = new Chart(`barChart${this.index}`, {
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
}
