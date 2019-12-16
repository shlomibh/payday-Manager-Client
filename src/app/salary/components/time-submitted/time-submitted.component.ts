import { Component, OnInit } from '@angular/core';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-time-submitted',
  templateUrl: './time-submitted.component.html',
  styleUrls: ['./time-submitted.component.css']
})
export class TimeSubmittedComponent implements OnInit {
  inTime;
  delayed;
  constructor(private statsService: StatsService) { }

  ngOnInit() {
    this.statsService.getLectorsStats().subscribe(
      data => {
        console.log(data);
        this.inTime = data["inTime"];
        this.delayed = data["delayed"];
      }
    );
  }

}
