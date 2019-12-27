import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { IDate } from 'src/app/models/date.model';

const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-submit-header',
  templateUrl: './submit-header.component.html',
  styleUrls: ['./submit-header.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class SubmitHeaderComponent implements OnInit {
  @Input() lectors;
  @Output() dataEE = new EventEmitter();
  dateToSend: IDate;
  date = new FormControl(moment());
  selected;

  constructor() { }

  ngOnInit() {
    console.log(this.lectors); 
  }
//בחירת שנה
  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }
//בחירת חודש
  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }
// פונקציה הקשורה לבחירת תאריך ומרצה
  showShifts() {
    console.log(this.selected); 
    if(this.selected !== undefined) {
      if (this.date.value["_isValid"]) {
        const date = new Date(this.date.value["_d"]).toLocaleDateString();
        const splitedDate = date.split('/');
        // console.log(splitedDate); 
        this.dateToSend = {
          month: +splitedDate[0], // Shlomi: +splitedDate[0]
          year: +splitedDate[2]
        };
        const dataToSend = { lector: this.selected, date: this.dateToSend};
        console.log(dataToSend);
        this.dataEE.emit(dataToSend);
      }
  } else {
      console.log('you did not choose date or lector');
    }
  }
}
