import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-statistical-page',
  templateUrl: './statistical-page.component.html',
  styleUrls: ['./statistical-page.component.css']
})
export class StatisticalPageComponent implements OnInit {
  isLecStats: boolean;
  isDepartStats: boolean;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    if(this.route.snapshot.url[0].path === 'lectorStatistics') {
      this.isLecStats = true;
    }
    else if(this.route.snapshot.url[0].path === 'departmentStatistics'){
      this.isDepartStats = true;
    }
  }

}
