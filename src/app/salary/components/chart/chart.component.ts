import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
    @ViewChild('chart', { static: false }) chart: ElementRef;
    @Input() maxCount;
    @Input() minCount;
    @Input() title;
    @Input() index;

    barChart = [];
    chart1 = [];
    chart2 = [];
    constructor() { }

    ngOnInit() {
        console.log(this.title);
        switch (this.index) {
            case 0: {
                console.log(this.index);
                this.barChart = setChart('cancelChart');
                break;
            }
            case 1: {
                console.log(this.index);
                this.barChart = setChart('sickChart');
                break;
            }
            case 2: {
                console.log(this.index);
                break;
            }
            case 3: {
                console.log(this.index);
                break;
            }
        }

    }


}

function setChart(name: string) {
    return new Chart(`${this.title}`, {
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
