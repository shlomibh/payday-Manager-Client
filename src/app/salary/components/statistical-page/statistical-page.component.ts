import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StatsContainerComponent } from '../stats-container/stats-container.component';
import { LectorStatsComponent } from '../lector-stats/lector-stats.component';
import { StatsService } from 'src/app/services/stats.service';
import { DepartmentStatsComponent } from '../department-stats/department-stats.component';

@Component({
  selector: 'app-statistical-page',
  templateUrl: './statistical-page.component.html',
  styleUrls: ['./statistical-page.component.css']
})
export class StatisticalPageComponent implements OnInit {
  isLecStats: boolean;
  isDepartStats: boolean;
  lecData;
  depData;
  lecStatsComp = new LectorStatsComponent(this.statsService);
  depStatsComp = new DepartmentStatsComponent();

  constructor(
    private route: ActivatedRoute,
    private statsService: StatsService
    ) { }

  ngOnInit() {
    if(this.route.snapshot.url[0].path === 'lectorStatistics') {
      this.isLecStats = true;
    }
    else if(this.route.snapshot.url[0].path === 'departmentStatistics'){
      this.isDepartStats = true;
    }
  }

  updateLecData(data: any) {
    this.statsService.getStatsPerMonth(data.type, data.stat, data.date).subscribe(
      (dataFromDb: any) => this.lecData = dataFromDb
    );
    this.lecStatsComp.refresh();
  }

  updateDepData(data: any) {
    this.depData = data;
    this.depStatsComp.refresh();
  }

}
