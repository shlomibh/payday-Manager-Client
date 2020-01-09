import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ShiftService } from 'src/app/services/shift.service';
import { Shift } from 'src/app/models/shift.model';
import { Subscription } from 'rxjs';
import { IDate } from 'src/app/models/date.model';
import { AuthenticationService } from 'src/app/services';

@Component({
  selector: 'app-shifts-container',
  templateUrl: './shifts-container.component.html',
  styleUrls: ['./shifts-container.component.css']
})
export class ShiftsContainerComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  shifts: Shift[];
  allSubmitted: boolean = true;
  currentUserRole: string;

  @Input() currentUserId: string;
  @Input() date: IDate;

  constructor(
    private shiftService: ShiftService,
    private authService: AuthenticationService
    ) { }

  ngOnInit() {
    this.currentUserRole = this.authService.getCurrentUser().role;
    this.subscriptions.push(this.shiftService.getPerMonth(this.currentUserId, this.date)
      .subscribe(data => {
        this.shifts = data;
        this.shifts.forEach( shift => {
          if(shift.submitted === false) this.allSubmitted = false;
        });
       

        this.shifts.sort((a: Shift, b: Shift) => new Date(a.date).getTime() - new Date(b.date).getTime());
      }));
  }

  changeStringDate(date: string) {
    const splittedDate = date.split('/');
    return `${splittedDate[1]}/${splittedDate[0]}/${splittedDate[2]}`;
  }

  refresh() {
    this.ngOnDestroy();
    this.shifts = undefined;
    this.ngOnInit();    
  }
// בחירת תאריך ע״י המשתמש ואז מרענן
  updateDate(dateFromSelector: IDate) {
    this.date = dateFromSelector;
    this.refresh();
  }

  submitAll() {
    this.subscriptions.push(this.shiftService.submitShifts(this.currentUserId, this.date).subscribe(
      (data: boolean) => this.allSubmitted = data
    ));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(elem => elem.unsubscribe());
    this.subscriptions = [];
  }

}
