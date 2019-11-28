//קומפונטה האחראית על ״בחירת תאריך מלוח שנה המובנה בדף״
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { IDate } from 'src/app/models/date.model';
// node.js שימוש ב״מומנט״-אובייקט מסוג זה עובד גם בדפדפן וגם ב 
//משתמשים באובייקט זה כאשר רוצים לעבוד עם תאריכים וזמנים
const moment = _moment;

export const MY_FORMATS = { // הפורמט בו המשתמש יכול להזין כל סוג של תאריך עם כל פורמט ויפורמט לפורמט שנציין למטה
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {  // הפורמטים הקיימים
    dateInput: 'MM/YYYY', //כתיבת התאריך המדויק 
    monthYearLabel: 'MMM YYYY', //בחירת התאריך מלו״ח שנה שיוצג
    dateA11yLabel: 'LL', 
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class DateSelectorComponent implements OnInit {
  @Output() dateEE = new EventEmitter();
  dateToSend: IDate;
  date = new FormControl(moment());

  constructor() { }

  ngOnInit() {
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  showShifts() {
    if (this.date.value["_isValid"]) {
      const date = new Date(this.date.value["_d"]).toLocaleDateString();
      const splitedDate = date.split('/');
      // console.log(splitedDate);
      this.dateToSend = {
        month: +splitedDate[0], // Shlomi: +splitedDate[0]
        year: +splitedDate[2]
      };
      console.log(this.dateToSend);
      this.dateEE.emit(this.dateToSend);
    } else {
      console.log('you did not choose date');
    }
  }

}
