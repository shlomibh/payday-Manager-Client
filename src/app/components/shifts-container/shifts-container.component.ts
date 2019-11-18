import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ShiftService } from 'src/app/services/shift.service';
import { Shift } from 'src/app/models/shift.model';
import { Subscription } from 'rxjs';
import { IDate } from 'src/app/models/date.model';

@Component({
  selector: 'app-shifts-container',
  templateUrl: './shifts-container.component.html',
  styleUrls: ['./shifts-container.component.css']
})
export class ShiftsContainerComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  shifts: Shift[];

  @Input() currentUserId: string;
  @Input() date: IDate;

  constructor(private shiftService: ShiftService) { }

  ngOnInit() {
    this.subscriptions.push(this.shiftService.getPerMonth(this.currentUserId, this.date)
      .subscribe(data => {
        this.shifts = data;
        // need on Oren Computer.
        this.shifts.forEach(elem => elem.date = this.changeStringDate(elem.date));
        // - checks without on Shlomi Computer

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

  updateDate(dateFromSelector: IDate) {
    this.date = dateFromSelector;
    this.refresh();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(elem => elem.unsubscribe());
    this.subscriptions = [];
  }

}
