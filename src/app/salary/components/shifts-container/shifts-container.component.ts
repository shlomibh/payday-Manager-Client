import { Component, OnInit, Input } from '@angular/core';
import { LectorService } from 'src/app/services/lector.service';
import { ActivatedRoute } from '@angular/router';
import { IDate } from 'src/app/models/date.model';

@Component({
  selector: 'app-stat-shifts-container',
  templateUrl: './shifts-container.component.html',
  styleUrls: ['./shifts-container.component.css']
})
export class ShiftsContainerComponent implements OnInit {
  id;
  shifts;
  currentlyDate: IDate;
  constructor(
    private route: ActivatedRoute,
    private lectorService: LectorService
    ) { }

  ngOnInit() {
    const month = (new Date().getMonth() + 1);
    const year = new Date().getFullYear();
    this.currentlyDate = {month: month, year: year};
    this.id = this.route.snapshot.url[1].path;
  }

}
