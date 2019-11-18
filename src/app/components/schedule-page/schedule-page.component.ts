import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Output } from '@angular/core';
import { ShiftService } from 'src/app/services/shift.service';
import { AuthenticationService } from 'src/app/services';
import { User } from 'src/app/models/User';
import { Subscription } from 'rxjs';
import { Shift } from 'src/app/models/shift.model';
import { IDate } from 'src/app/models/date.model';


@Component({
  selector: 'app-schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.css']
})
export class SchedulePageComponent implements OnInit {

  currentUser: User;
  shifts: Shift[];
  currentlyDate: IDate;

  constructor(
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    const date = new Date().toLocaleDateString();
    const splittedDate = date.split('/');
    this.currentlyDate = { month: +splittedDate[1], year: +splittedDate[2] };
  }

}
