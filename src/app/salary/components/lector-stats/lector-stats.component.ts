import { Component, OnInit, Input } from '@angular/core';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-lector-stats',
  templateUrl: './lector-stats.component.html',
  styleUrls: ['./lector-stats.component.css']
})
export class LectorStatsComponent implements OnInit {
  @Input() lecData;
  
  constructor(private statService: StatsService) { }

  ngOnInit() {
    this.statService.getStatsPerMonth(this.lecData.type, this.lecData.stat, this.lecData.date).subscribe(
      data => console.log(data)
    );
  }


}
